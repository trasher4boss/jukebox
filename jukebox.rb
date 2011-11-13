#!/usr/bin/env ruby

require 'rev'
require 'socket'
require 'cgi'
require 'yaml.rb'
require 'json'
require 'yaml'
require 'rpam'

include Rpam

load 'stream.rb'
load 'http.rb'
load 'mp3.rb'
load 'channel.rb'
load 'encode.rb'
load 'db.rb'
load 'json_api.rb'
load 'basic_api.rb'
load 'web_debug.rb'

raise("Not support ruby version < 1.9") if(RUBY_VERSION < "1.9.0");

$error_file = File.open("error.log", "a+");

library = Library.new();
channelList = {};

# Config

config = {}
begin
  fd = File.open("jukebox.cfg");
  data = fd.read();
  config = YAML.load(data);
  fd.close;
rescue => e
  error("Config file error: #{e.to_s}", true, $error_file);
end

# Encode

Thread.new() {
  begin
    e = Encode.new(library, config[:encode.to_s]);
    e.attach(Rev::Loop.default);
    Rev::Loop.default.run();
  rescue => e
    error(e, true, $error_file);
  end
}


# Create HTTP server

json   = JsonManager.new(channelList, library);
basic  = BasicApi.new(channelList);
debug  = DebugPage.new();
main   = HttpNodeMapping.new("html");
stream = Stream.new(channelList, library);

main.addAuth() { |s, req, user, pass|
#  next nil if(s.ssl != true);
  next "guest" if(user == "guest");
  next "PAM"   if(authpam(user, pass) == true);
  nil;
}

root = HttpRootNode.new({ "/api/json" => json,
                          "/api"      => basic,
                          "/debug"    => debug,
                          "/"         => main,
                          "/stream"   => stream});

if(config[:server.to_s] == nil)
  error("Config file error: no server section", true, $error_file);
  exit(1);
end
config[:server.to_s].each { |server_config|
  h = HttpServer.new(root, server_config);
  h.attach(Rev::Loop.default)
}

# Main loop
begin
  Rev::Loop.default.run();
rescue => e
  fd = File.open("exception_stat", File::RDONLY | File::CREAT, 0600);
  data = fd.read();
  stat = YAML::load(data);
  stat = {} if(stat == false);
  fd.close();

  detail = ([ e.to_s ] + e.backtrace).join("\n")
  puts detail;
  stat[detail]  = 0 if(stat[detail] == nil);
  stat[detail] += 1;

  fd = File.open("exception_stat", "w");
  data = YAML::dump(stat);
  fd.write(data);
  fd.close();

  File.open("crash#{Time.now.to_i}", "w") { |fd|
    fd.puts(detail);
    fd.puts("----- Last events -----");
    fd.puts(dump_events);
  }
end



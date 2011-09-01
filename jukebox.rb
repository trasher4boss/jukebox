#!/usr/bin/env ruby

require 'rev'
require 'socket'
require 'cgi'
require 'yaml.rb'
require 'json'

load 'http.rb'
load 'mp3.rb'
load 'channel.rb'
load 'encode.rb'
load 'db.rb'

library = Library.new();

e = Encode.new(library, ARGV[0], ARGV[1]);
e.attach(Rev::Loop.default);

channelList = {};

h = HttpServer.new();

h.addPath("/ch", channelList) { |s, req, list|
  uri = req.uri[4 .. -1];
  uri = "" if(uri == nil)
  channelName, action = uri.split("/", 2);
  if(channelName == "")
    channelName = "general";
  end
  ch = channelList[channelName];
  if(action == nil)
    options = {
      "Connection"   => "Close",
      "Content-type" => "audio/mpeg"};
    rep = HttpResponse.new(req.proto, 200, "OK", options);
    s.write(rep.to_s);

    if(ch == nil)
      ch = Mp3Channel.new(channelName, library);
      channelList[channelName] = ch;
    end
    ch.register(s);

    s.on_disconnect(ch) { |s, ch|
      ch.unregister(s);
    }    
  else
    rep = HttpResponse.new(req.proto, 200, "OK");
    if(ch == nil)
      rep.setData("<html><head><title>Error</title></head><body><H1>Unknown channel #{channelName}</H1></body></head>");
    else
      case(action)
      when "previous"
        rep.setData("<html><head><title>Previous</title></head><body><H1>Previous</H1></body></head>");
        ch.previous()
      when "next"
        rep.setData("<html><head><title>next</title></head><body><H1>Next</H1></body></head>");
        ch.next()
      when "control"
        params = req.data.split(/&/);
        options = {
        "Content-type" => "application/json"};
        query = CGI::unescape(req.data)
        req_string = query[6..-2]
        json_struct = JSON.parse(req_string)
        reply = "{\"timestamp\":1314886609.21,\"current_song\":{\"id\":2,\"title\":\"Titre euhhhh\",\"artist\":\"Artisteeuhhhh\",\"total_time\":203,\"elapsed_time\":70},\"channel_infos\":{\"listener_count\":3},\"play_queue\":{\"songs\":[{\"artist\":\"Artiste\",\"title\":\"Titre\",\"duration\":270},{\"artist\":\"Muse\",\"title\":\"New Born\",\"duration\":260},{\"artist\":\"Metallica\",\"title\":\"Master of Puppets\",\"duration\":560}]}}";
        json_obj = JSON.load(reply)
        json_gen = JSON.generate(json_obj)
        if(json_struct["action"] == "next")
          ch.next()
        elsif(json_struct["action"] == "previous")
          ch.previous()
        end
        rep.setData(json_gen)
      else
        rep.setData("<html><head><title>Error</title></head><body><H1>Unknown action #{action}</H1></body></head>");
      end
    end
    s.write(rep.to_s);
  end
}

h.attach(Rev::Loop.default)

begin
  Rev::Loop.default.run();
rescue => e
  fd = File.open("exception_stat", File::RDONLY | File::CREAT, 0600);
  data = fd.read();
  stat = YAML::load(data);
  stat = {} if(stat == false);
  fd.close();

  detail = ([ e.class ] + e.backtrace).join("\n")
  puts detail;
  stat[detail]  = 0 if(stat[detail] == nil);
  stat[detail] += 1;

  fd = File.open("exception_stat", "w");
  data = YAML::dump(stat);
  fd.write(data);
  fd.close();
end



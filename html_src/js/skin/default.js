/* jshint multistr: true, sub: true */
/* global Jukebox */

Jukebox.UI.skins["default"] = {
    params: {
        allowTabs: true,
        dragdrop: true,
        playQueueNode: 'ul',
        songNode: 'li'
    },
    templates: {
        player: '<div class="#{root}">\
<div class="#{root}-header">\
	<div class="#{root}-user-header-login">\
	#{welcomeLabel} <span class="#{root}-user-display">#{user}</span> \
	</div> \
	<span class="#{root}-expand-button">&gt;</span>\
	<span class="#{root}-collapse-button">&lt;</span>\
	<span class="#{root}-activity"></span>\
</div>\
<div class="#{root}-user-header">\
	<a class="#{root}-user-header-deco" href="javascript:void(0)">#{decoLabel}</a>\
	<a class="#{root}-user-header-signin" href="javascript:void(0)">#{signIn}</a>\
	<a class="#{root}-user-header-chooseCanal" href="javascript:void(0)">#{canalLabel}</a>\
	<div class="#{root}-user-header-create" style="display:none;">\
		Créer un compte :<br/>\
		<table>\
		<tbody>\
			<tr><td>Identifiant : </td><td><input type="text" class="#{root}-user-header-create-nickname" size="10" value="" /></td></tr>\
			<tr><td>Mot de passe : </td><td><input type="password" class="#{root}-user-header-create-password" size="10"/></td></tr>\
			<tr><td>Confirmer le mot de passe : </td><td><input type="password" class="#{root}-user-header-create-password2" size="10"/></td></tr>\
		</tbody>\
		</table><br />\
		<input type="submit" class="#{root}-user-header-create-submit" value="Créer">\
	</div> \
	<div class="#{root}-user-header-canal" style="display:none;">\
	#{canalLabel} <br/> \
<input type="text" class="#{root}-channel" /><input type="button" class="#{root}-channel-button" value="#{canalValue}" />\
	</div> \
</div>\
<div class="#{root}-main">\
	<div class="#{root}-controls">\
		<span class="#{root}-previous-button"></span><span class="#{root}-next-button"></span>\
		#{currentSong}\
		<div class="#{root}-progressbar-wrapper">\
			<div class="#{root}-progressbar"></div>\
			<p class="#{root}-song-time-box">\
				<span class="#{root}-song-time"></span> / <span class="#{root}-song-total-time"></span>\
			</p>\
		</div>\
	</div>\
	<div class="#{root}-playqueue">\
		<div class="#{root}-playqueue-content"></div>\
	</div>\
</div>\
\
<div class="#{root}-tabs">\
	<div class="#{root}-tabs-links">\
		<a class="#{root}-tab-upload">#{UploadTabName}</a>\
		<a class="#{root}-tab-account">#{AccountTabName} <span class="#{root}-user-display">#{user}</span></a>\
		<a class="#{root}-tab-query">#{QueryTabName}</a>\
		<a class="#{root}-tab-notifs">#{NotificationsTabName}</a>\
		<a class="#{root}-tab-debug">#{DebugTabName}</a>\
		<a class="#{root}-tab-playlist">#{PlaylistTabName}</a>\
	</div>\
	<div class="#{root}-tabs-head">\
		#{searchLabel} <input type="text" class="#{root}-search-input" />\
		<select class="#{root}-search-genres" style="display:none;"></select>\
		<select class="#{root}-search-field">\
			<option value="artist">#{artist}</option>\
			<option value="title">#{title}</option>\
			<option value="album">#{album}</option>\
			<option value="genre">#{genre}</option>\
		</select> \
		<select class="#{root}-results-per-page">\
			<option value="10">10</option>\
			<option value="20" selected="selected">20</option>\
			<option value="30">30</option>\
			<option value="40">40</option>\
			<option value="50">50</option>\
			<option value="60">60</option>\
			<option value="70">70</option>\
			<option value="80">80</option>\
			<option value="90">90</option>\
			<option value="100">100</option>\
		</select> \
		<input type="button" class="#{root}-search-button" value="#{searchButton}" />\
	</div>\
	<div class="#{root}-tabs-header"></div>\
	<div class="#{root}-tabs-content"></div>\
</div>\
\
<div class="#{root}-footer">\
	<input type="button" class="#{root}-refresh-button" value="#{refreshButton}" />\
	<input type="checkbox" name="#{root}-autorefresh" class="#{root}-autorefresh" checked="checked" value="autorefresh" /><label for="#{root}-autorefresh"> #{refreshLabel}</label>\
	<br />\
	#{pluginLabel} <input type="text" class="#{root}-plugin" value="#{pluginDefault}" style="width: 100px;" />\
	<input type="button" class="#{root}-plugin-button" value="#{pluginButton}" />\
</div>\
\
<div class="#{root}-stream">\
	<a class="#{root}-stream-play">#{play}</a>\
	<a class="#{root}-stream-stop">#{stop}</a>\
</div>\
<span class="#{root}-volume">\
	<span>#{volume}&nbsp;</span>\
	<div class="#{root}-slider #{root}-volume-slider">\
		<div class="#{root}-slider-handle"></div>\
	</div>\
	<br clear="all" />\
</span>\
</div>',
        song: '<p class="#{root}-song">\
<a class="#{root}-song-artist" href="javascript:;">#{artist}</a> - \
<a class="#{root}-song-album" href="javascript:;">#{album}</a> - \
<span class="#{root}-song-title">#{title}</span>\
</p>',
        playQueue: '<li class="#{root}-playqueue-first #{root}-playqueue-droppable">#{playQueueLabel}\
<div>\
	<span class="#{root}-listening-ico"></span>\
	<span class="#{root}-listening-count">#{listenersCount}</span>\
</div>\
<a><span class="#{root}-playqueue-shuffle"></span></a>\
<a><span class="#{root}-playqueue-delete"></span></a>\
</li>',
        playQueueSong: '<li class="#{root}-playqueue-#{index} #{root}-playqueue-droppable">\
<div class="#{root}-playqueue-song-#{index} #{root}-playqueue-draggable">\
	<div class="#{root}-playqueue-handle-#{index} #{root}-playqueue-handle">\
		<a href="javascript:;">#{artist}</a> - \
		<a href="javascript:;">#{album}</a> - \
		#{title} (#{duration})\
	</div>\
	<a><span class="#{root}-playqueue-move-top"></span></a>\
	<a><span class="#{root}-playqueue-move-bottom"></span></a>\
	<a><span class="#{root}-playqueue-delete"></span></a>\
</div>\
</li>',
        tabs: {
            AccountTab: {
                main: '<h2>Informations personnelles de #{user}</h2> <br/> \
<div class="#{root}-account-informations">\
	<ul>\
		<li><b>user:</b>#{user}</li>\
		<li><b>token:</b>#{token}</li>\
		<li><b>home:</b>#{home}</li>\
		<li><b>sid:</b>#{sid}</li>\
		<li><b>ip:</b>#{ip}</li>\
		<li><b>user agent:</b>#{userAgent}</li>\
	</ul>\
</div>\
<div class="#{root}-account-change-password">\
<h2>Changer de mot de passe</h2>\
<table>\
<tbody>\
	<tr><td>Ancien mot de passe : </td><td><input class="#{root}-account-old-password" type="password" /></td></tr>\
	<tr><td>Nouveau mot de passe : </td><td><input class="#{root}-account-new-password" type="password" /></td></tr>\
	<tr><td>Confirmer le nouveau mot de passe : </td><td><input class="#{root}-account-new-password2" type="password" /></td></tr>\
</tbody>\
</table>\
<input class="#{root}-account-change-password-submit" type="submit" value="Valider"/></br> \
</div> \
<div class="#{root}-account-available-rights"></div>',
                rights_controller: 'TODO : Right controller part',
                rights_header: 'TODO right header part',
                rights_list: 'TODO list rights',
                rights_footer: 'TODO footer rights'
            },
            UploadTab: {
                main: '<div class="#{root}-file-uploader"></div>\
<h2>#{uploadedFilesLabel}</h2>\
<div class="#{root}-uploaded-files"></div>',
                tableController: '<select class="#{root}-upload-global-action-select">\
	<option value="artist">Artist</option>\
	<option value="album">Album</option>\
	<option value="year">Year</option>\
	<option value="trackNb">TrackNb</option>\
	<option value="genre">Genre</option>\
	<option value="fillfromfilename">Fill title with filename</option>\
	<option value="delete">Delete</option>\
	<option value="update">Update</option>\
	<option value="validate">Validate</option>\
</select>\
<input class="#{root}-upload-global-action-input" type="text" value="" />\
<select class="#{root}-upload-global-action-genre-select" ></select>\
<select class="#{root}-upload-global-action-fill-dst" >\
	<option value="title">Title</option>\
	<option value="album">Album</option>\
	<option value="artist">Artist</option>\
	<option value="trackNb">TrackNb</option>\
</select>\
<input class="#{root}-upload-global-min-idx" type="text" value="min" size=4/>\
<input class="#{root}-upload-global-max-idx" type="text" value="max" size=4/>\
<input class="#{root}-upload-global-submit" type="submit" value="Appliquer" />',
                tableHead: '<tr>\
	<th class="#{root}-upload-selector">\
		<input class="#{root}-upload-selector-checkbox" type="checkbox" />\
	</th>\
	<th class="#{root}-upload-filename">Filename</th>\
	<th class="#{root}-upload-artist">Artist</th>\
	<th class="#{root}-upload-album">Album</th>\
	<th class="#{root}-upload-title">Title</th>\
	<th class="#{root}-upload-year">Year</th>\
	<th class="#{root}-upload-track">Track</th>\
	<th class="#{root}-upload-trackNb">TrackNb</th>\
	<th class="#{root}-upload-genre">Genre</th>\
	<th class="#{root}-upload-actions">Actions</th>\
</tr>',
                tableBody: '<tr id="#{rowId}">\
	<td class="#{root}-upload-cell-static"><input class="#{root}-upload-cell-checkbox" type="checkbox" /></td>\
	<td class="#{root}-upload-cell-static #{root}-upload-cell-filename">#{filename}</td>\
	<td class="#{root}-upload-cell-artist">#{artist}</td>\
	<td class="#{root}-upload-cell-album">#{album}</td>\
	<td class="#{root}-upload-cell-title" >#{title}</td>\
	<td class="#{root}-upload-cell-year">#{year}</td>\
	<td class="#{root}-upload-cell-track">#{track}</td>\
	<td class="#{root}-upload-cell-trackNb">#{trackNb}</td>\
	<td class="#{root}-upload-cell-genre">#{genre}</td>\
	<td class="#{root}-uploaded-file-actions #{root}-upload-cell-static">\
		<a href="javascript:;" class="#{root}-uploaded-file-delete">X</a>\
		<a href="javascript:;" class="#{root}-uploaded-file-update" style="display:none;">Update</a>\
		<a href="javascript:;" class="#{root}-uploaded-file-validate">Validate</a>\
	</td>\
</tr>'
            },
            SearchTab: {
                main: '<div class="#{pagelistClass}">\
	\\#{slider}\
	\\#{links}\
</div>\
<div class="#{contentClass}"></div>\
<div class="#{pagelistClass}">\
	\\#{links}\
	\\#{slider}\
</div>',
                tableHead: '<tr>\
	<th class="#{root}-search-artist">Artist</th>\
	<th class="#{root}-search-album">Album</th>\
	<th class="#{root}-search-title">Title</th>\
	<th class="#{root}-search-track">Track</th>\
	<th class="#{root}-search-genre">Genre</th>\
	<th class="#{root}-search-duration">Duration</th>\
	<th class="#{root}-search-controls"></th>\
</tr>'
            }
        }
    }
};

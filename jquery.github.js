/**
 * jquery.github.js <https://github.com/kmacrow/jquery.github.js>
 * The easiest way to display your most recent GitHub contributions.
 * 
 * Copyright (C) Kalan MacRow, 2013
 *
 * This code is MIT licensed <http://opensource.org/licenses/MIT>
 * 
*/

(function($)
{
	"use strict";

	var api_base = 'https://api.github.com';
	
	// defaults
	var settings = {
		'display': 5,
		'user': null
	};

	function debug(msg)
	{
		console.log('github:', msg);
	}

	// for date as iso8601 for github
	function iso8601(date)
	{
		var  year = date.getFullYear(),
		    month = '' + date.getMonth() + 1, 
		      day = '' + date.getDate();

		return year + '-'
			   + (month.length == 1 ? '0' + month : month) + '-' +
			   + (day.length   == 1 ? '0' + day   : day);
	}

	// generates string indicating how many
	// minutes/hours/days/months/years ago date was
	function ago(date)
	{
		var diff = Date.now() - date.getTime();
		
		function pl(qt, unit)
		{
			var m = Math.ceil(diff/qt), u = unit;
			if(m > 1) u += 's'
			return m + ' ' + u + ' ago';
		}

		if(diff < 60*1000){ // a minute
			return 'less than a minute ago';
		}

		diff = Math.ceil(diff/1000); // seconds

		if(diff < 60*60){ // an hour
			return pl(60, 'minute');
		}

		if(diff < 60*60*24){ // a day
			return pl(60*60, 'hour');
		}

		if(diff < 60*60*24*31){ // a month
			return pl(60*60*24, 'day');
		}

		if(diff < 60*60*24*365){ // a year
			return pl(60*60*24*31, 'month');
		}

		return pl(60*60*24*365, 'year');
	}

	// [(name,url)] of all user's repos
	function getRepos(cb)
	{
		var repos = [];

		$.ajax({   
				   'url': api_base + '/users/' + settings.user + '/repos',
			   'success': function(data)
			   {
			   		if( !(data instanceof Array) ) {
			   			cb(repos)
			   			return;
			   		}

			   		for(var i = 0; i < data.length; i++) {
			   			var repo = data[i];
			   			repos.push({
			   				   'name': repo.name,
			   				    'url': repo.html_url
			   			});
			   		}

			   		cb(repos);
			   } 
		});
	}

	// [(repo,msg,link)] of n most recent commits
	function getCommits(repos, cb)
	{
		var   index = {},
			commits = [], 
			    bar = repos.length,
			  since = iso8601(new Date(Date.now() - 2629740000));;

		function lower() {
			if(--bar == 0) {
				complete();
			}
		}

		function complete() {
			// sort by time
			commits.sort(function(a, b) {
				return b.date.getTime() - a.date.getTime();
			});

			cb(commits.slice(0, settings.display));
		} 
		
		$.each(repos, function(i, repo){

			$.ajax({
				    'url': (api_base + '/repos/' 
							         + settings.user 
							         + '/' + repo.name + '/commits'),
				   'data': {'since': since},
				'success': function(data) 
				{
					if( !(data instanceof Array) ) { 
						lower();
						return;
					}

					for(var i = 0; i < data.length; i++) {
						var commit = data[i];
						commits.push({
							'repo': repo,
							'user': {
								  'name': commit.author.login,
								'avatar': commit.author.avatar_url,
								   'url': 'https://github.com/' 
								   		  + commit.author.login
							 },
							 'msg': commit.commit.message,
							 'sha': commit.sha,
							 'url': ('https://github.com/' + settings.user 
							 		+ '/' + repo.name + '/commit/' + commit.sha),
							'tree': ('https://github.com/' + settings.user
									+ '/' + repo.name + '/tree/' + commit.sha),
							'date': new Date(Date.parse(commit.commit.author.date))
						});
					}

					lower();
				}
			});
		});

	}

	$.fn.github = function(options)
	{
		var $this = this;

		for(var key in settings) {
			if(options.hasOwnProperty(key)
				&& typeof options[key] != 'undefined') {
				settings[key] = options[key];
			}
		}

		if(!settings.user) {
			console.error('github: please provide username');
			return;
		}

		debug(settings);

		getRepos(function(repos) 
		{
			debug(repos);

			getCommits(repos, function(commits) 
			{
				debug(commits);

				var html = '<table class="table table-bordered table-striped table-condensed">'
						  +'<tr>'
						  	+'<td colspan="3" style="text-align:center">'
						  		+'<i class="icon-github" style="position:relative;top:3.5px"></i> '
						  		+':<small class="muted"><b>stream</b> /</small> <small>'
						  		+'<a href="https://github.com/'+ settings.user +'">'
						  		+ settings.user+'</a></small>'
						  	+'</td>'
						  +'</tr>';

				for(var i = 0; i < commits.length; i++) {
					
					var commit = commits[i];
					html += '<tr>'
								+'<td style="width:36px"><img src="'+commit.user.avatar
									+'" class="img-rounded" '
									+'style="height:36px;width:36px" />'
								+'</td>'
								+'<td style="border-left:0">'
									+'<a style="color:#000" href="'
										+ commit.url + '" target="_blank"><strong>' + commit.msg + '</strong></a><br />'
									+'<div class="visible-desktop"><small><a href="' + commit.user.url + '" target="_blank">'
										+ commit.user.name + '</a> <span class="muted">'
										+ ago(commit.date) + ' to </span>'
										+'<a href="'+commit.repo.url+'">'+commit.repo.name+'</a></small>'
									+'</div>'
								+'</td>'
								+'<td style="border-left:0;text-align:right">'
									+'<a href="'+commit.url+'" target="_blank"><span class="badge" style="font-weight:regular">'
										+ commit.sha.substring(0,10) + '</span></a><br />'
									+'<small><a class="muted" target="_blank" href="'
										+ commit.tree +'"><strong>Browse code &raquo;</strong>'
									+ '</a></small>'
								+'</td>'
							+'</tr>';
				}

				html += '</table>';
				$this.html(html);
			});
		});
	}

})(jQuery);

"use strict";
// Validate the Incoming Request
function initialize() {
    var validrequest = validaterequest();
	if (validrequest) {
        requestforalbumdata();
	}
}

var validaterequest = function() {
 return true;
};
//for handle the request data of album
var requestforalbumdata = function() {
  var albumid = getParameterValue("id");
  $.getJSON('https://api.spotify.com/v1/albums/' + albumid, alumdata);
};
//for the process of data of album
var alumdata = function(data) {
	var imageurl = data.images[0].url;
	var albumtitle = data.name;
	var releasedate = data.release_date;
	var artist = data.artists[0].name;
	var html = '<div><img class="album-cover-image" src="' + imageurl + '"></div><div class="album-title">' + albumtitle +
	'</div><div class="album-year">' + releasedate + '</div><div class="album-artist">' + artist + '</div>';
	$(data.tracks.items).each(function (index, track) {
		html +='<li class="song">' + track.name + '</li>';
	});
	$('#album').html(html);
};

//for the value of a query string 
function getParameterValue(str){
	var value = "";
	var prmindex = window.location.href.indexOf("&" + str + "=");
	if (prmindex === -1) {
		prmindex = window.location.href.indexOf("?" + str + "=");
	}
	if (prmindex > -1) {
		var startindex = window.location.href.indexOf("=",prmindex) + 1;
		var endindex = window.location.href.indexOf('&',startindex);
		if (endindex === -1) {
			endindex = window.location.href.length;
		}
		value = window.location.href.substring(startindex, endindex);
	}
	return value;
}

initialize();
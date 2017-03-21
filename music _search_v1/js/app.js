"use strict";


function initialize() {
	searchbuttonevent();
}


/*Display search results on the page

.....The data should load inside the #albums <ul>
.......Please see the comments in index.html for samples of the HTML you'll need to dynamically create with JavaScript
.....For each album returned, render an <li> displaying these items inside:
.....Album title
.....Album art image
.....Render an <img> that displays the 640px x 640px album art image via the src attribute
.....Make sure you use the exact class names provided in the CSS*/

//event handling when submit for search
function searchbuttonevent() {
	$('.search-form').submit(handleforsearch);
}

//handle for search album on submit
var handleforsearch=function(e){
e.preventDefault();
var url = 'https://api.spotify.com/v1/search?type=album&q=' + encodeURI($('#search').val());
    $.getJSON(url,succesfulsearch).fail(function(jqXhr){
	alert(jqXhr.statusText);
	});
};
//for succesful search result

var succesfulsearch=function(result) {
    var $html = "";
	if (result.albums.items.length > 0) {
	$(result.albums.items).each(function (index, album){
		var id = album.id;
		var imageurl = album.images[0].url;
		var name = album.name;
		var link = album.external_urls.spotify;
		var artist = album.artists[0].name;
		$html += '<li><a href="album.html?id=' + id + '"><div class="album-wrap"><img class="album-art" src="' + imageurl + '"></div></a><a href="' + link + '"><span class="album-title">' + name + '</span></a><span class="album-artist">' + artist + '</span></li>';
	}); } 
	//when search result are not found
	else {
		$html = '<li class="no-albums"><i class="material-icons icon-help">help_outline</i>No albums found that match: ' + $('#search').val() + '</li>';
	}
	
	$('#albums').html($html);
};
initialize();
























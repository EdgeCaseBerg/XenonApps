document.addEventListener('DOMContentLoaded',function(){
	var map = L.map('map').setView([43.876, -72.081], 8)
	L.tileLayer('http://{s}.tiles.mapbox.com/v3/hyrule10.i5lkp4k8/{z}/{x}/{y}.png', {
    	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    	maxZoom: 18
	}).addTo(map);


})
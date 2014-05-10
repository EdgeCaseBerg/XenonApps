document.addEventListener('DOMContentLoaded',function(){
	var map = L.map('map').setView([43.876, -72.081], 8)
	L.tileLayer('http://{s}.tiles.mapbox.com/v3/hyrule10.i5lkp4k8/{z}/{x}/{y}.png', {
    	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    	maxZoom: 18
	}).addTo(map)

	$.get('//greenup.xenonapps.com/dash/_greenupvisuals.php', function(res){
			if(res.status_code < 500){
				heatmapDatum = res.data.heatmapJS
				console.log(res)
				var options = {
					maxZoom: 18,
					gradient: {0: 'blue', 0.65: 'lime', 1: 'green'}
				}
				var heat = L.heatLayer(heatmapDatum, options).addTo(map);

				$('#hmLoaderContainer').fadeOut(500, function(evt){
					$('#hmLoaderContainer').html('<input id="visual-slider" type="range" name="hour_of_day" min="0" max="23">')
					$('#hmLoaderContainer').fadeIn()
				});
				$('#hmLoaderContainer').on('change', '#visual-slider', function(){
					var val = $(this).val()
					
					var idx = '00'
					if(val < 10)
						idx = '0' + val
					else
						idx = ''+val;
					
					if(res.data.heatmapLapse[val]){
						heat.setLatLngs(res.data.heatmapLapse[val])	
					}else{
						heat.setLatLngs([])
					}
					
				})
			}else{
				$('#hmLoaderContainer').fadeOut()
			}


		})

})
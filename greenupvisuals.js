document.addEventListener('DOMContentLoaded',function(){
	var map = L.map('map').setView([43.876, -72.081], 8)
	L.tileLayer('http://{s}.tiles.mapbox.com/v3/hyrule10.i5lkp4k8/{z}/{x}/{y}.png', {
    	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    	maxZoom: 18
	}).addTo(map)

	$.get('//greenup.xenonapps.com/dash/_greenupvisuals.php', function(res){
			if(res.status_code < 500){
				heatmapDatum = res.data.heatmapJS
				
				
				
				var options = {
					maxZoom: 18,
					gradient: {	0: '#004c00', 
								0.15: '#006600', 
								0.25: '#007f00',
								0.5: '#009900',
								0.6: '#00b200',
								0.7: '#00cc00',
								0.8: '#00e500',
								1: '#00ff00'
							},
					radius: 15,
				}
				var heat = L.heatLayer(heatmapDatum, options).addTo(map);

				$('#hmLoaderContainer').fadeOut(500, function(evt){
					$('#hmLoaderContainer').html('<div id="slider-container"><span>Hour Of Day: May 2nd Midnight</span><input id="visual-slider" type="range" name="hour_of_day" min="0" max="23"><span>May 3rd Midnight</span></div>')
					$('#hmLoaderContainer').fadeIn()
				});
				$('#hmLoaderContainer').on('change', '#visual-slider', function(){
					var val = $(this).val()
					var idx = 23 - val //23 becuase our array is actually upside down
					if(res.data.heatmapLapse[idx]){
						heat.setLatLngs(res.data.heatmapLapse[idx])
					}else{
						heat.setLatLngs([])
					}
					
				})
			}else{
				$('#hmLoaderContainer').fadeOut()
			}


		})

})
document.addEventListener('DOMContentLoaded',function(){
	var backButton = document.getElementById("back")
	if(backButton) backButton.onclick = function(){ window.history.back(); return false }

	/* sigh, including jquery just for this one bit because I'm feeling lazy this morning */
	$('p a[href^=#]').on("click",function(){
    	var t= $(this.hash);
	    var t=t.length&&t||$('[name='+this.hash.slice(1)+']');
	    if(t.length){
	        var tOffset=t.offset().top;
	        $('html,body').animate({scrollTop:tOffset-80},'slow');
	        return false;
	    }
	});

	/* client-side validation for contact form in contact.ejs */
	function processForm(e) {
	    if (e.preventDefault) e.preventDefault();
	    var emailValue = document.getElementById('entry_289848397').value;
	    var filter=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
		if (filter.test(emailValue)) {
			document.getElementById("contact-form").submit();
		}
		else {
			var errors = document.getElementsByClassName("error")
			for (i = 0; i < errors.length; ++i) {
				errors[i].style.display = "block";
			}
		}
	    // prevent the default form behavior
	    return false;
	}
	var form = document.getElementById('contact-form');
	if (form.attachEvent) {
	    form.attachEvent("submit", processForm);
	} else {
	    form.addEventListener("submit", processForm);
	}

	
		var rawData= $.get('https://www.xenonapps.com/dashauth/stats.php', function(res){
			if(res.status_code < 500){{
				var numberOfComments = parseInt(res.data.numberOfComments.num)
				var numberOfMarkers = parseInt(res.data.numberOfMarkers.num)
				var numberOfHeatmaps = parseInt(res.data.numberOfHeatmaps.num)

				var commentsOverTimeData = res.data.commentsOverTime
				var intensityOverTimeData = res.data.intensityOverTime

				var data = {
					labels : ["Comments","Markers","Heatmap"],
					datasets : [
						{
							fillColor : "rgba(220,220,220,0.5)",
							strokeColor : "rgba(220,220,220,1)",
							data : [numberOfComments, numberOfMarkers, numberOfHeatmaps]
						},
					]
				}

				var data3 = {
					labels : intensityOverTimeData.map(function(obj){
						var date = new Date(parseInt(obj.the_time)*1000)
						return ''+obj.the_time
					}),
					datasets : [
						{
							fillColor : "rgba(220,220,220,0.5)",
							strokeColor : "rgba(220,220,220,1)",
							data : intensityOverTimeData.map(function(obj){
								return parseInt(obj.intensity)
							})
						},
					]
				}

				var ctx = $('#greenupDataBar').get(0).getContext('2d')
				var thechart = new Chart(ctx).Bar(data);

				var ctx3 = $('#greenupDataHeat').get(0).getContext('2d')
				var thechart3 = new Chart(ctx3).Bar(data3);


			}}
		})

		



});
document.addEventListener('DOMContentLoaded',function(){
	var backButton = document.getElementById("back")
	if(backButton) backButton.onclick = function(){ window.history.back(); return false }

	/* sigh, including jquery just for this one bit because I'm feeling lazy this morning */
	$('a[href^=#]').on("click",function(){
    var t= $(this.hash);
	    var t=t.length&&t||$('[name='+this.hash.slice(1)+']');
	    if(t.length){
	        var tOffset=t.offset().top;
	        $('html,body').animate({scrollTop:tOffset-80},'slow');
	        return false;
	    }
	});
});
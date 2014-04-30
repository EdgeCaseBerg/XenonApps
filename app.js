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
});
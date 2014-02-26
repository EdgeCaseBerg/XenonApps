document.addEventListener('DOMContentLoaded',function(){
	var backButton = document.getElementById("back")
	if(backButton) backButton.onclick = function(){ window.history.back(); return false }
});
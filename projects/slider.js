goog.provide('sliderJs');

var el = document.getElementById('s1');
var s = new goog.ui.Slider;
s.decorate(el);
s.addEventListener(goog.ui.Component.EventType.CHANGE, function() {
	console.log(s.getValue());
	slide(100, 100);
});
s.setMoveToPointEnabled(true);

function toggleSliderEnable(button, slider) {
	var buttonValue = slider.isEnabled() ? 'Enable Slider' : 'Disable Slider';
	button.value = buttonValue;
	slider.setEnabled(!slider.isEnabled());
}

function slide(a, b) {
	// not sliding for some reason
	console.log('got to slide')
	var el = document.getElementById('s-h');
	var duration = 1000;
	var x = el.offsetLeft;
	var y = 0;
	var anim = new goog.fx.dom.Slide(el, [x, y], [a, b], duration,goog.fx.easing.easeOut);
	anim.play();
}
goog.fx.Animation.setAnimationWindow(window);
var menuOpen = false;
var duration = 400;
var parent;

var init=function(opts){
	$.drawermainview.add(opts.mainview);
	$.drawermenuview.add(opts.menuview);
	duration=opts.duration;
	parent=opts.parent;

	if(OS_IOS && Alloy.Globals.isIos7Plus) {
		var topParam = "64dp";
	}
	else if (OS_IOS) {
		var topParam = "44dp";
	}
	else if (OS_ANDROID) {
		var topParam = "48dp";
	}

	hoverScreen = Ti.UI.createView({
		top: topParam,
		left: "0",
		width: Alloy.Globals.jolicode.pageflow.width,
		height: Alloy.Globals.jolicode.pageflow.height,
		backgroundColor: "#000",
		opacity: 0
	});

	console.log('initialized');
	setSwipe();
}

var setSwipe=function(){
	parent.addEventListener('swipe',function(e){
	    if(menuOpen == false && e.direction == 'right'){
	        showhidemenu();
	        menuOpen = true;
	    }

	    if(menuOpen == true && e.direction == 'left' ){
	        showhidemenu();
	        menuOpen = false;
	    }
	});
}

var showhidemenu=function(){
	if (OS_ANDROID)
		if (menuOpen){
			moveTo = Alloy.Globals.jolicode.menudrawer.right;
			menuOpen = false;
			$.drawermainview.remove(hoverScreen);
			hoverScreen.opacity = 0
		}else{
			moveTo = "0";
			menuOpen = true;
			$.drawermainview.add(hoverScreen);
			hoverScreen.animate({
				opacity: 0.7,
				curve : Ti.UI.ANIMATION_CURVE_EASE_OUT,
				duration: 500
			});
		}

	if (OS_IOS)
		if (menuOpen){
			moveTo = "0";
			menuOpen = false;
			$.drawermainview.remove(hoverScreen);
			hoverScreen.opacity = 0
		}else{
			moveTo = "250dp";
			menuOpen = true;
			$.drawermainview.add(hoverScreen);
			hoverScreen.animate({
				opacity: 0.7,
				curve : Ti.UI.ANIMATION_CURVE_EASE_OUT,
				duration: 500
			});
		}

	var newWidth = Ti.Platform.displayCaps.platformWidth;
	if (OS_ANDROID)
    	newWidth /= Ti.Platform.displayCaps.logicalDensityFactor;
	$.drawermainview.width=newWidth;

	if (OS_IOS)
		$.drawermainview.animate({
			left: moveTo,
			curve : Ti.UI.ANIMATION_CURVE_EASE_OUT,
			duration: duration
		});

	if (OS_ANDROID)
		$.drawermenuview.animate({
			left: moveTo,
			curve : Ti.UI.ANIMATION_CURVE_EASE_OUT,
			duration: duration
		});
}

Ti.Gesture.addEventListener('orientationchange', function(e) {
    var newWidth;
    newWidth = Ti.Platform.displayCaps.platformWidth;
    if (OS_ANDROID)
        newWidth /= Ti.Platform.displayCaps.logicalDensityFactor;
		$.drawermenuview.height = Alloy.Globals.jolicode.menudrawer.height;

    $.drawermainview.width = newWidth;

	hoverScreen.width = Alloy.Globals.jolicode.pageflow.width;
	hoverScreen.height = Alloy.Globals.jolicode.pageflow.height;
});

exports.init=init;
exports.showhidemenu=showhidemenu;
exports.menuOpen=menuOpen;
exports.setDuration=function(dur){
	duration = dur;
};

Alloy.Globals.isIos7Plus = OS_IOS && parseInt(Ti.Platform.version.split(".")[0]) >= 7
Alloy.Globals.jolicode = {}
Alloy.Globals.jolicode.pageflow = {}
Alloy.Globals.jolicode.pageflow.height = Ti.Platform.displayCaps.platformHeight
Alloy.Globals.jolicode.pageflow.width = Ti.Platform.displayCaps.platformWidth
if (OS_ANDROID)
    Alloy.Globals.jolicode.pageflow.height = Ti.Platform.displayCaps.platformHeight / Ti.Platform.displayCaps.logicalDensityFactor - 25
    Alloy.Globals.jolicode.pageflow.width = Ti.Platform.displayCaps.platformWidth / Ti.Platform.displayCaps.logicalDensityFactor

Ti.Gesture.addEventListener 'orientationchange', (e) ->
    Alloy.Globals.jolicode.pageflow.height = Ti.Platform.displayCaps.platformHeight
    Alloy.Globals.jolicode.pageflow.width = Ti.Platform.displayCaps.platformWidth
    if (OS_ANDROID)
        Alloy.Globals.jolicode.pageflow.height = Ti.Platform.displayCaps.platformHeight / Ti.Platform.displayCaps.logicalDensityFactor - 25
        Alloy.Globals.jolicode.pageflow.width = Ti.Platform.displayCaps.platformWidth / Ti.Platform.displayCaps.logicalDensityFactor

Alloy.Globals.jolicode.menudrawer = {}
Alloy.Globals.jolicode.menudrawer.width = Ti.Platform.displayCaps.platformWidth

if OS_ANDROID
    Alloy.Globals.jolicode.menudrawer.right = '-' + Ti.Platform.displayCaps.platformWidth;
    Alloy.Globals.jolicode.menudrawer.width = Math.floor(Ti.Platform.displayCaps.platformWidth / Ti.Platform.displayCaps.logicalDensityFactor * 0.85)
    Alloy.Globals.jolicode.menudrawer.height = ((Ti.Platform.displayCaps.platformHeight) / Ti.Platform.displayCaps.logicalDensityFactor) - 25 - 48

Ti.Gesture.addEventListener 'orientationchange', (e) ->
    Alloy.Globals.jolicode.menudrawer.height = (Ti.Platform.displayCaps.platformHeight / Ti.Platform.displayCaps.logicalDensityFactor) - 25 - 48

# get main and menu view as objects
menuView = Alloy.createController 'menuview'
mainView = Alloy.createController 'mainview'

# Minor changes to click event. Update the menuOpen status;
Ti.App.addEventListener 'app.navbar.menubutton', (e) ->
    $.drawermenu.showhidemenu()
    $.drawermenu.menuOpen =! $.drawermenu.menuOpen
    # method is exposed by widget

$.drawermenu.init({
    menuview: menuView.getView(),
    mainview: mainView.getView(),
    duration: 200,
    parent: $.index
})

$.index.open()

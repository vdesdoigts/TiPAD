$.navbarMenuButton.addEventListener 'click', (e) ->
    Ti.App.fireEvent 'app.navbar.menubutton'

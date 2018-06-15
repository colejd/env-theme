# EnvTheme

This plugin styles a Firefox window red if any of its tabs have a url containing `localhost`.

This project is currently blocked until one of the following are resolved:

1. `theme.reset()` always restores a window to the default theme, not the theme 
    from before any calls to `theme.update()` as the docs say. This prevents 
    EnvTheme from restoring the original theme after it changes a window.
2. `theme.getCurrent()` returns an empty object if your browser is on the 
    default, light, or dark themes that come with Firefox. This also prevents
    EnvTheme from restoring the original theme after it changes a window.

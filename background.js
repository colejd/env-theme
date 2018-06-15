// browser.windows.onCreated.addListener(themeWindow);

async function saveTheme() {
  let themeInfo = await browser.theme.getCurrent()
  console.log("Saved theme:")
  console.log(themeInfo)
  browser.storage.sync.set({
    theme: themeInfo
  })
}

function restoreTheme(windowId) {

  // I'd just do this but it (currently by design) resets the window to the "default" theme,
  // not the theme to any `browser.theme.update` calls as the docs say.
  //browser.theme.reset(window.id)

  var storageItem = browser.storage.sync.get("theme");
  storageItem.then((res) => {
    browser.theme.update(windowId, res.theme);
  })
}

function themeWindow(window) {
  let hasMatchingTab = window.tabs.some(function(_tab) {
    return _tab.url.includes('localhost')
  })

  if (hasMatchingTab) {
    browser.theme.update(window.id, {
      images: {
        headerURL: "",
      },
      colors: {
        accentcolor: "red",
        textcolor: "white",
        toolbar: "red",
        toolbar_text: "white",
        // tab_background_separator: "red", // Doesn't exist?
        toolbar_bottom_separator: "red",
        // toolbar_field_border: "red",
        toolbar_top_separator: "red",

      }
    })
  }
  else {
    restoreTheme(window.id);
  }
}


// --------------------------------
// Runtime stuff
// --------------------------------

// Store the current theme for restoration later
saveTheme()

// Theme all currently open windows
browser.windows.getAll({ populate: true }).then(wins => wins.forEach(themeWindow))

// Listen for any tabs that change their URLs
browser.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.url) {
    browser.windows.get(tab.windowId, { populate: true })
      .then(function(window) {
        themeWindow(window)
      })
  }
})

// Listen for any tabs that get removed
browser.tabs.onRemoved.addListener(function(tabId, removeInfo) {
    browser.windows.get(removeInfo.windowId, { populate: true })
      .then(function(window){
        themeWindow(window)
      })
})

// TODO: Probably need to listen for tabs that get added too (link opened in new tab, for example)

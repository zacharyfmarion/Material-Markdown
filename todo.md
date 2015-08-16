# A Markdown Editor for the Material Era

> It is a very clean font and I very much like it, although I certainly think that there could be some beneficial changes made to it in order to increase the amount of awesomeness it contains.

### What comes next

- ~~Change the REGEX or whatever on the editor to bold headers and italisize _italisized_ text. **Bold** stuff in a plain text editor is really kind of boring.~~
  - ~~Add Bold, Italic, and Underlined options in the toolbar~~
  - ~~Add functionality to these functions (insert character in editor).~~
  - ~~Put cursor in center of text if no text selected~~
  - Add keybindings to these functions

- Add settings functionality (at least now settings.json can persist the changes, so the problem of interacting between browser  windows is no longer an issue).
  - ~~Find out why Page.js is not working...not exactly sure what is going on with that..~~
  - Need to bind the settings both directions...in other words change settings.json when the settings states change and also load these changes from settings.json into the main application on startup/refresh

- Fix stylesEditor and HTML export problem with js_beautify (still have no idea why it's not working)

- Add multiple font-weights and more fonts...also in settings add option to import a new font...basically copy it into fonts and add it to the fonts array.

- ~~Add fullscreen editing mode~~
  - ~~**Fix wierd fullscreen issue where it makes the marked pane larger instead of hiding it**~~
  - ~~Fix problem in the editor where the entire screen vertically is not filled up (wierd thing with chrome dev tools...kinda an edge case, shouldn't need to worry about it too much).~~

- Default title of saved document to first header in document (not sure if possible with electron)

- ~~Add find support...maybe do a bottom widget like in atom, or have the toolbar turn into the find bar like in a lot of material apps~~
  - Scratch that apparently find support already exists...just need to link it to electron's menu

- Find a way to center the title span in the menubar

- Add fullscreen mode to rendered HTML `marked-element` as well.

- ~~Fix cut (remove selection from the editor)~~

- Add context menus to the editor...no sure whether you should make it native electron or material designy...maybe experiment with both.

- ~~Add revision history...saved to a separate json file...basically have it like:~~

```
{
  blah/hello.md : [
    {
      time: "06/08/2015 9:45",
      content: "#This is a test"
    },
    {
      time: "06/08/2015 10:31",
      content: "#This is a test\n> This is a blockquote."
    }
  ],
  nextfile/test.md: [
    {
      time: "09/08/2015 16:19",
      content: "#I really like this markdown thing"
    }
  ]
}
```

- ~~Have the file saving correctly, now just need a revision inspector...modal? side panel? Not sure...~~
  - ~~Find out why history isn't working anymore...getting a type error for some reason...~~
  - Find out why history array for a document just gets reset/replaced each time you call `history[filename].push({});`
  - Change implementation to mirror git (only save changes...have an insertions and deletions key or something, look up how git actually does it).

- When the width of the window gets to be too small, change the formatting buttons on the toolbar to a `paper-icon-button` with `icon = editor:format-list-numbered`. Maybe make a custom element that shows the specific buttons below on click...unless there is already an element you can use which does this.

- **Reduce the filesize by a lot by removing unnecesarry stuff (like other ace builds / ace files you don't need)...right now the folder is half a gig which is obscene...**

- **_Keep it up, you should be able to release 1.0 stable soon (after you learn how to package it)._**

### Bugs

- When you open a document and then hit undo, the document goes back to its prior empty state...make a new `undoManager()` or whatever on document load
- The fullscreen button for the ace editor gets obfuscated when text is under it. (add a background with a very low opacity or something).
- ~~Can't scroll down in the view pane (add #marked{overflow: scroll})~~
  - ~~Still can't scroll for some reason...???????~~
- When you replace a file, the filepath refreshes to the old filepath for some reason...not sure how to solve this.
- Still a lot of wierd stuff going on at the bottom of the screen when resizing happens
- Scrolling when the element is already at the bottom of its content does not scroll the entire application when in the Ace editor, but it does in the marked-element pane...find the css property that you need to change. Actually it sometimes does and sometimes doesn't in the ace editor...wierd.
- Currently the bullet and numbered list buttons do not check for whether you are selecting a whole line or really do any sort of checks...change this to avoid wierd outputs like dashes in the middle of a line.
- when dragging over marked element call e.preventDefault() to stop the electron thing of filling the entire window with text.

### Ideas for Future Directions

- Switch out Marked for Remarkable (more extensibility support / options)
  - Would need to make an element...model from [this element](https://github.com/aktowns/polymer-re-markable/blob/master/re-markable.html) and `marked-element.html`.
  - See [my current repo](https://github.com/zacharyfmarion/Remarkable-Element) for progress.
- Scroll-sync???
- Support for [MathJax](https://www.mathjax.org/)
- Support for extended markdown features (tables, footnotes, etc)
- Add support for comments

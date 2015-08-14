# This is a test of the Roboto Font

> It is a very clean font and I very much like it, although I certainly think that there could be some beneficial changes made to it in order to increase the amount of awesomeness it contains.

### What comes next

- ~~Change the REGEX or whatever on the editor to bold headers and italisize _italisized_ text. **Bold** stuff in a plain text editor is really kind of boring.~~
  - ~~Add Bold, Italic, and Underlined options in the toolbar~~
  - Add functionality to these functions (insert character in editor).

- Add settings functionality (at least now settings.json can persist the changes, so the problem of interacting between browser  windows is no longer an issue).
  - Find out why Page.js is not working...not exactly sure what is going on with that..

- Fix stylesEditor and HTML export problem with js_beautify (still have no idea why it's not working)

- ~~Add fullscreen editing mode~~
  - **Fix wierd fullscreen issue where it makes the marked pane larger instead of hiding it**
  - Fix problem in the editor where the entire screen vertically is not filled up (wierd thing with chrome dev tools...kinda an edge case, shouldn't need to worry about it too much).

- Default title of saved document to first header in document

- Keep it up, you should be able to release 1.0 stable soon (after you learn how to package it).

- Add find support...maybe do a bottom widget like in atom, or have the toolbar turn into the find bar like in a lot of material apps

- Find a way to center the title span in the menubar

- Change the fullscreen button to paper-fab

- ~~Fix cut (remove selection from the editor)~~

- Add revision history...saved to a separate json file...basically have it like:

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

  - Have the file saving correctly, now just need a revision inspector...modal? side panel? Not sure...
  - ~~Find out why history isn't working anymore...getting a type error for some reason...~~
  - Now I don't think it works after the first time...
  - Change implementation to mirror git (only save changes...have an insertions and deletions key or something, look up how git actually does it).

### Bugs

- When you open a document and then hit undo, the document goes back to its prior empty state...make a new undoManager() or whatever on document load
- The fullscreen button for the ace editor is underneath the current line of the editor (change z-index).
- ~~Can't scroll down in the view pane (add #marked{overflow: scroll})~~
  - ~~Still can't scroll for some reason...???????~~
- When you replace a file, the filepath refreshes to the old filepath for some reason...not sure how to solve this.


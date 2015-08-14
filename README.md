## Material Markdown

![](https://raw.githubusercontent.com/zacharyfmarion/Markdown/master/Screenshot.png?raw=true "Material Markdown")

This is a markdown editor for Mac made using [Electron](http://electron.atom.io/) and [Polymer](https://www.polymer-project.org/), and is still under heavy development.

## Build instructions

Make a directory and navigate into it:

`mkdir Mardown && cd $_`

Clone into the file:

`git clone https://github.com/zacharyfmarion/Markdown.git`

Install Dependecies:

`npm install && bower install`

Run gulp to build a distribution version

`gulp`

Open the application using Electron:

`node_modules/electron-prebuilt/dist/Electron.app/Contents/MacOS/Electron .`

I realize this is a bit convoluted at the moment...once a stable build is reached I will package it using Electron and provide a download link.

## Contributing

All pull requests are welcome!

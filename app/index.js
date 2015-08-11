var scope = document.querySelector('template[is="dom-bind"]');

// Dom elements
var ribbonToggle = document.getElementById('toggleRibbon');
var editor = document.getElementsByTagName('markdown-editor')[0];
var styleSettings = document.getElementById('style-settings');
var stylesEditor = document.getElementsByTagName('styles-editor')[0];
var title = document.getElementById('title');

// Adjust height of editor when window is resized
window.addEventListener('resize', function(){
  editor.resizeEditor();
}, true);

editor.addEventListener('file-opened', function(){
  title.textContent = editor.filepath.replace(/^.*(\\|\/|\:)/, '');
}, false);

// Toggle ribbon when the toggle button is clicked
ribbonToggle.addEventListener('click', function(){
  editor.toggleRibbon();
}, false);

// open
styleSettings.addEventListener('click', function(){
  stylesEditor.open();
}, false);

// Allow user to drag a file into the editor to open it

var holder = document.getElementById('editor');

holder.ondragover = function () {
  editor.style.opacity = '.6';
  return false;
};
holder.ondragleave = holder.ondragend = function () {
  editor.style.opacity = '1';
  return false;
};
holder.ondrop = function (e) {
  e.preventDefault();
  editor.style.opacity = '1';
  var file = e.dataTransfer.files[0];
  // only allow file drag if there is no filepath already specified
  if (editor.filepath === null){
    editor.setFilePath(file.path);
  }
  return false;
};



/* ----------- Frequency ----------- */
function saveOptions() {
  var frequency = document.getElementById('frequency').value;
  chrome.storage.sync.set({'blockFrequency': frequency});
  var status = document.getElementById('status');
  status.textContent = 'Reblock time set.';
}

function restoreOptions (curVal) {

  if (isNaN(curVal)) {
    document.getElementById('frequency').value = 30;
  }
  else {
    document.getElementById('frequency').value = curVal;
  }
}

function checkFreq() {
  chrome.storage.sync.get('blockFrequency', function (freqObj) {restoreOptions(freqObj.blockFrequency);})
}

/* ----------- Things ----------- */

function preClearThing() {
  var position = (this.id).replace("remove", '');
  chrome.storage.sync.get('thingsKey', function (thingObj) {clearThing(thingObj.thingsKey, position);});
}

function clearThing (curThing, position) {
  curThing.splice((position-1), 1);
  chrome.storage.sync.set({'thingsKey': curThing});
  location.reload();
}

function preAddThing(key) {
  
  var position;

  if(typeof(key) == 'string'){
    position = (key).replace("inputThing", '');
  }
  else {
    position = (this.id).replace("add", '');
  }

  chrome.storage.sync.get('thingsKey', function (thingObj) {addThing(thingObj.thingsKey, position);});
}

function addThing (curThing, position) {
  
  if (curThing == undefined) curThing = [];

  if ((document.getElementById(['inputThing' + position]).value) == '') {
    clearThing(curThing, position);
  }

  else if ((document.getElementById(['inputThing' + (curThing.length+1)]).value) != '') {
    var toCSS = document.getElementById(['inputThing' + position]);
    toCSS.setAttribute('class', 'green');
    curThing.push((document.getElementById(['inputThing' + (curThing.length+1)]).value));
    chrome.storage.sync.set({'thingsKey': curThing});
    addInput((curThing.length + 1));
  }

  else if ( (document.getElementById(['inputThing' + position]).value) != (curThing[position-1]) ) {
    var toCSS = document.getElementById(['inputThing' + position]);
    toCSS.setAttribute('class', 'flash');
    curThing.splice((position-1), 1, (document.getElementById(['inputThing' + position]).value));
    chrome.storage.sync.set({'thingsKey': curThing});
  }
}

var things = [];

/* ----------- DOM ----------- */

function addInput (inputs) {

  window['removeButton' + (inputs-1)] = document.createElement("BUTTON");
  var removeLabel = document.createTextNode("Remove");
  (window['removeButton' + (inputs-1)]).appendChild(removeLabel);
  (window['removeButton' + (inputs-1)]).setAttribute('id', String('remove' + (inputs-1)));
  (window['removeButton' + (inputs-1)]).setAttribute('style', 'margin-bottom:10px');
  settings.appendChild(window['removeButton' + (inputs-1)]);

  var lineBreak = document.createElement("br");
  document.body.appendChild(lineBreak);

  window['thingText' + inputs] = document.createElement("p");
  var textLabel = document.createTextNode("Things I want to do: ");
  (window['thingText' + inputs]).setAttribute('style', 'display:inline');
  (window['thingText' + inputs]).appendChild(textLabel);
  settings.appendChild(window['thingText' + inputs]);

  window['thingInput' + inputs] = document.createElement("input");
  (window['thingInput' + inputs]).setAttribute('style', 'display:inline');
  (window['thingInput' + inputs]).setAttribute('type', 'text');
  (window['thingInput' + inputs]).setAttribute('placeholder', 'I want to...');
  (window['thingInput' + inputs]).setAttribute('id', String('inputThing' + inputs));
  settings.appendChild(window['thingInput' + inputs]);

  window['addButton' + inputs] = document.createElement("BUTTON");
  var addLabel = document.createTextNode("Add");
  (window['addButton' + inputs]).appendChild(addLabel);
  (window['addButton' + inputs]).setAttribute('id', String('add' + inputs));
  (window['addButton' + inputs]).setAttribute('style', 'margin-left:5px;margin-right:4px');
  settings.appendChild(window['addButton' + inputs]);

  document.getElementById(['inputThing' + inputs]).addEventListener('keydown', function(e) {
    var key = e.which || e.keyCode;
    if (key == 13) preAddThing(this.id);
  });
  document.getElementById(['add' + inputs]).addEventListener('click', preAddThing);
  document.getElementById(['remove' + (inputs-1)]).addEventListener('click', preClearThing);

  document.getElementById(['inputThing' + inputs]).focus();

}

function setup (elements) {

  if (elements == undefined) elements = [];
  var removeCount = 0;
  for (i = 1; i <= (1+elements.length); i++) {
    
    var lineBreak = document.createElement("br");
    document.body.appendChild(lineBreak);

    window['thingText' + i] = document.createElement("p");
    var textLabel = document.createTextNode("Things I want to do: ");
    (window['thingText' + i]).setAttribute('style', 'display:inline');
    (window['thingText' + i]).appendChild(textLabel);
    settings.appendChild(window['thingText' + i]);

    window['thingInput' + i] = document.createElement("input");
    (window['thingInput' + i]).setAttribute('style', 'display:inline');
    (window['thingInput' + i]).setAttribute('type', 'text');
    if (i < (1+elements.length)) (window['thingInput' + i]).setAttribute('class', 'green');
    (window['thingInput' + i]).setAttribute('placeholder', 'I want to...');
    (window['thingInput' + i]).setAttribute('id', String('inputThing' + i));
    settings.appendChild(window['thingInput' + i]);

    window['addButton' + i] = document.createElement("BUTTON");
    var addLabel = document.createTextNode("Add");
    (window['addButton' + i]).appendChild(addLabel);
    (window['addButton' + i]).setAttribute('id', String('add' + i));
    (window['addButton' + i]).setAttribute('style', 'margin-left:5px;margin-right:4px');
    settings.appendChild(window['addButton' + i]);

    if (removeCount < (elements.length)) {
      window['removeButton' + i] = document.createElement("BUTTON");
      var removeLabel = document.createTextNode("Remove");
      (window['removeButton' + i]).appendChild(removeLabel);
      (window['removeButton' + i]).setAttribute('id', String('remove' + i));
      (window['removeButton' + i]).setAttribute('style', 'margin-bottom:10px');
      settings.appendChild(window['removeButton' + i]);
  
      document.getElementById(['remove' + i]).addEventListener('click', preClearThing);
      removeCount++;
    }

    document.getElementById(['inputThing' + i]).addEventListener('keydown', function(e) {
      var key = e.which || e.keyCode;
      if (key == 13) preAddThing(this.id);
    });
    document.getElementById(['add' + i]).addEventListener('click', preAddThing);
  }

  for (i = 1; i < (1+elements.length); i++) {
      document.getElementById(['inputThing' + i]).value = elements[(i-1)];
  }
  document.getElementById(['inputThing' + (1+elements.length)]).focus();
}

var settings = document.getElementById('settings');

/* ----------- On Load ----------- */
chrome.storage.sync.get('thingsKey', function (thingObj) {setup(thingObj.thingsKey);});
document.addEventListener('DOMContentLoaded', checkFreq);
document.getElementById('save').addEventListener('click', saveOptions);
document.getElementById('frequency').addEventListener('keydown', function(e) {
  var key = e.which || e.keyCode;
  if (key == 13) saveOptions();
});



function preQuickAdd () {
	chrome.storage.sync.get('thingsKey', function (thingObj) {quickAdd(thingObj.thingsKey);});
}

function quickAdd (curThing) {
	if (curThing == undefined) curThing = [];
	if ((input.value) != '') {
    	curThing.push((input.value));
    	chrome.storage.sync.set({'thingsKey': curThing});
    	input.setAttribute('style', 'background-color:#B2FFCC')
  		document.getElementById('status').textContent = 'Thing added.';
  		window.setTimeout(function(){window.close()}, 1000);
  	}
}

function opened() {
	document.getElementById('addButton').addEventListener('click', preQuickAdd);
	input.addEventListener('keydown', function(e) {
		var key = e.which || e.keyCode;
    	if (key == 13) preQuickAdd();
	});
}

var input = document.getElementById('addInput');
document.addEventListener('DOMContentLoaded', opened());

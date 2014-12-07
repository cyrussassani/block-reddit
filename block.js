function decision(elapsed, frequency) {
        if (elapsed > frequency){
            hideReddit();
        }
}

function preDecision(time) {
    var lastStamp = time/(1000*60);
    var newDate = new Date();
    var newStamp = (newDate.getTime())/(1000*60);
    var elapsed = Math.ceil(newStamp - lastStamp);
    chrome.storage.sync.get('blockFrequency', function (freqObj) {decision(elapsed, freqObj.blockFrequency);});
}

function hideReddit() {
    reddit.hide();
    target.append(otherOptions, things, hideButton);
}

function unHide() {
    reddit.show();
    $('.added').remove();
    var date = new Date();
    var timeStamp = date.getTime();

    chrome.storage.sync.set({'laterDate': timeStamp});
}

function prepThing (curThing) {
    if (curThing != undefined) {
        things = $("<p class='added'></p>").text(curThing)
        .css('font-size', '50px')
        .css('font-family', 'Sans-Serif')
        .css('position', 'relative')
        .css('left', '100px')
        .css('top', '75px');
    }
}

var reddit = $('#siteTable, .trending-subreddits-content, .side, .footer-parent, .debuginfo, .commentarea');
var target = $('.content')

var otherOptions = $("<p class='added'></p>").text("Didn't you say you wanted to:")
    .css('font-size', '30px')
    .css('font-family', 'Sans-Serif')
    .css('position', 'relative')
    .css('top', '50px');

var things;

var hideButton = $('<input class="added" name="clicker" type="button" value="Maybe Later">')
    .css('position', 'relative')
    .css('top', '120px')
    .css('left', '75px')
    .click(function(){
    unHide();
    });

chrome.storage.sync.get('thingtodo', function (thingObj) {prepThing(thingObj.thingtodo);})
chrome.storage.sync.get("laterDate", function (timeObj) {preDecision(timeObj.laterDate);});


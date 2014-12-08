
function decision (elapsed, frequency) {
        if (elapsed > frequency){
            hideReddit();
        }
        else if(isNaN(elapsed)){
            hideReddit();
        } 
}

function preDecision (time) {
    var lastStamp = time/(1000*60);
    var newDate = new Date();
    var newStamp = (newDate.getTime())/(1000*60);
    var elapsed = Math.ceil(newStamp - lastStamp);
    chrome.storage.sync.get('blockFrequency', function (freqObj) {decision(elapsed, freqObj.blockFrequency);});
}

function hideReddit () {
    reddit.hide();
//  target.append(otherOptions, things, hideButton);
    target.append(otherOptions);
    target.append(things);
    target.append(hideButton);
}

function unHide () {
    reddit.show();
    $('.added').remove();
    var date = new Date();
    var timeStamp = date.getTime();
    chrome.storage.sync.set({'laterDate': timeStamp});
}

function prepThing (curThing) {

   if (curThing == ''){
   things.push($("<p class='added'></p>").text("Do something!")
       .css('font-size', '50px')
       .css('font-family', 'Sans-Serif')
       .css('position', 'relative')
       .css('left', '125px')
       .css('top', '85px')
       .css('padding-bottom','20px')
       );
    }

   else if (curThing == undefined){
   things.push($("<p class='added'></p>").text("Do something!")
       .css('font-size', '50px')
       .css('font-family', 'Sans-Serif')
       .css('position', 'relative')
       .css('left', '125px')
       .css('top', '85px')
       .css('padding-bottom','20px')
       );
    }

    else if (curThing != '')  {
        for (i = 0; i < curThing.length; i++) {
            things.push($("<p class='added'></p>").text(curThing[i])
            .css('font-size', '50px')
            .css('font-family', 'Sans-Serif')
            .css('position', 'relative')
            .css('left', '125px')
            .css('top', '85px')
            .css('padding-bottom','20px')
            );
        }
    }

    else {
        things.push($("<p class='added'></p>").text("Do something!")
            .css('font-size', '50px')
            .css('font-family', 'Sans-Serif')
            .css('position', 'relative')
            .css('left', '125px')
            .css('top', '85px')
            .css('padding-bottom','20px')
            );
    }
}

var reddit = $('#siteTable, .trending-subreddits-content, .side, .footer-parent, .debuginfo, .commentarea');
var target = $('.content')

var otherOptions = $("<p class='added'></p>").text("Don't you want to:")
    .css('font-size', '30px')
    .css('font-family', 'Sans-Serif')
    .css('position', 'relative')
    .css('top', '50px');

var things = [];
var thingsIndex;

var hideButton = $('<input class="added" name="clicker" type="button" value="Maybe Later">')
    .css('position', 'relative')
    .css('top', '150px')
    .css('left', '75px')
    .click(function(){
    unHide();
    });

chrome.storage.sync.get("laterDate", function (timeObj) {preDecision(timeObj.laterDate);});
chrome.storage.sync.get('thingsKey', function (thingObj) {prepThing(thingObj.thingsKey);});


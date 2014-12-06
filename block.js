
function unHide() {
    reddit.show();
    $('.added').remove();
    var date = new Date();
    chrome.storage.local.set({'later': date});

}

var reddit = $('#siteTable, .trending-subreddits-content, .side, .footer-parent, .debuginfo, .commentarea');
var target = $('.content')

var otherOptions = $("<p class='added'></p>").text("Didn't you say you wanted to:")
    .css('font-size', '30px')
    .css('font-family', 'Sans-Serif')
    .css('position', 'relative')
    .css('top', '50px');

var hideButton = $('<input class="added" name="clicker" type="button" value="Maybe Later">')
    .css('position', 'relative')
    .css('top', '100px')
    .css('left', '75px')
    .click(function(){
    unHide();
    });

reddit.hide();

target.append(otherOptions, hideButton);


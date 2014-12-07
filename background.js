


function isReddit(tabId, changeInfo, tab) {
  if (tab.url.indexOf('www.reddit.com') > -1) {
    chrome.pageAction.show(tabId);
  }
}


function payload(tabId, changeInfo, tab) {

//	chrome.tabs.executeScript(tab.id, {code: 'chrome.storage.sync.clear()'}); // <--- Clear
    chrome.tabs.executeScript({ file: "jquery-1.11.1.min.js" }, function() {
    	if (changeInfo.status == "complete")
        chrome.tabs.executeScript(null, { file: "block.js" }, function() {
    	});
	});
}


chrome.tabs.onUpdated.addListener(isReddit);
chrome.tabs.onUpdated.addListener(payload);





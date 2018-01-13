(function() {
	chrome.browserAction.onCLicked.addListener(function(tab) {
		chrome.tabs.create({url: "index.html"});
	});
})();
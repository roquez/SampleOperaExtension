var tabsInWindow;

chrome.tabs.onRemoved.addListener(function(){
    chrome.tabs.update(tabsInWindow[tabsInWindow.length - 2], { active: true }); // actviate the second tab from the end
    updateTabList();
console.log("onremoved")
});

chrome.tabs.onCreated.addListener(function(){
    updateTabList();
});

function updateTabList(){
    tabsInWindow = [];
    chrome.windows.getAll({populate: true}, function(windows){
        var currentTab, window = windows[0];
        for(var i = 0, j = window.tabs.length; i < j; i++){
            currentTab = window.tabs[i];
            tabsInWindow[currentTab.index] = currentTab.id;
        }
    });
}

updateTabList();

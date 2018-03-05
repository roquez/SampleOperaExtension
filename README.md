# SampleOperaExtension
This extensions activates the second tab from the end to illustrate the bug in Opera

## Bug description
The bug applies to browser extensions and it occurs when you activate tab in tab remove event:

```javascript
chrome.tabs.onRemoved.addListener(function(){
    chrome.tabs.update(tabId, { active: true }); // activate tab
});
```
### Conditions
- The removed tab is at least 2 positions before the tab you want to activate
- The tab you want to activate is not the last tab

### Example
There are 5 tabs in a window:

| Tab 1|`Tab 2`|Tab 3|Tab 4|Tab 5|+|
|------|-----|-----|-----|-----|-|

and the code:

```javascript
chrome.tabs.onRemoved.addListener(function(){
    chrome.tabs.update(tab4, { active: true }); // activate tab 4
});
```
The selected tab is Tab 2. You remove the Tab 2 and the code activates Tab 4. It should look like this:

| Tab 1|Tab 3|`Tab 4`|Tab 5|+|
|------|-----|-----|-----|-|

But Opera changes the position of Tab 4:

| Tab 1|`Tab 4`|Tab 3|Tab 5|+|
|------|-----|-----|-----|-|

The selected tab is Tab 4. Now, if you click on Tab 3, Opera changes tab position again to:

| Tab 1|`Tab 3`|Tab 4|Tab 5|+|
|------|-----|-----|-----|-|

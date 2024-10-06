chrome.runtime.onInstalled.addListener(() => {
  console.log('Chrome Tab Zen extension installed.');
});

// Listen for tab events
chrome.tabs.onCreated.addListener((tab) => {
  console.log('Tab created:', tab);
});

chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
  console.log('Tab removed:', tabId);
});


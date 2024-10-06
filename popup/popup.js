document.addEventListener('DOMContentLoaded', function () {
  const tabList = document.getElementById('tab-list');
  const closeAllTabsBtn = document.getElementById('close-all-tabs');
  const groupTabsBtn = document.getElementById('group-tabs');

  // Fetch open tabs
  chrome.tabs.query({}, function (tabs) {
    tabs.forEach(tab => {
      const tabElement = document.createElement('div');
      tabElement.textContent = tab.title;
      tabList.appendChild(tabElement);
    });
  });

  // Close all tabs event
  closeAllTabsBtn.addEventListener('click', function () {
    chrome.tabs.query({}, function (tabs) {
      tabs.forEach(tab => {
        chrome.tabs.remove(tab.id);
      });
    });
  });

  // Group tabs by URL domain (basic example)
  groupTabsBtn.addEventListener('click', function () {
    chrome.tabs.query({}, function (tabs) {
      const tabGroups = {};
      tabs.forEach(tab => {
        const url = new URL(tab.url);
        const domain = url.hostname;
        if (!tabGroups[domain]) {
          tabGroups[domain] = [];
        }
        tabGroups[domain].push(tab);
      });

      // Perform grouping logic (optional: could involve Chrome's tab grouping feature)
      console.log('Grouped tabs:', tabGroups);
    });
  });
});


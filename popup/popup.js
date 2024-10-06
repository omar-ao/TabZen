document.addEventListener('DOMContentLoaded', function () {
  const tabList = document.getElementById('tab-list');
  const closeAllTabsBtn = document.getElementById('close-all-tabs');
  const groupTabsBtn = document.getElementById('group-tabs');

  // Fetch open tabs and display them in the list
  chrome.tabs.query({}, function (tabs) {
    tabs.forEach(tab => {
      const tabElement = document.createElement('div');
      tabElement.textContent = tab.title;
      tabElement.classList.add('tab-item');
      tabElement.addEventListener('click', function () {
        chrome.tabs.update(tab.id, { active: true });
      });
      tabList.appendChild(tabElement);
    });
  });

  // Close all tabs except the first one
  closeAllTabsBtn.addEventListener('click', function () {
    chrome.tabs.query({}, function (tabs) {
      // Skip the first tab, start from index 1
      for (let i = 1; i < tabs.length; i++) {
        chrome.tabs.remove(tabs[i].id);
      }
    });
  });

  // Group tabs by the date they were created
  groupTabsBtn.addEventListener('click', function () {
    chrome.tabs.query({}, function (tabs) {
      // Create a map of tabs grouped by the date they were created
      const tabGroups = {};

      tabs.forEach(tab => {
        const creationDate = new Date(tab.lastAccessed);
        const dateKey = creationDate.toDateString();  // Use the date as a key

        if (!tabGroups[dateKey]) {
          tabGroups[dateKey] = [];
        }

        tabGroups[dateKey].push(tab);
      });

      // Clear the current tab list display
      tabList.innerHTML = '';

      // Display the grouped tabs
      for (const [date, groupTabs] of Object.entries(tabGroups)) {
        const dateHeader = document.createElement('h3');
        dateHeader.textContent = date; // Group header by date
        tabList.appendChild(dateHeader);

        groupTabs.forEach(tab => {
          const tabElement = document.createElement('div');
          tabElement.textContent = tab.title;
          tabElement.classList.add('tab-item');
          
          // Make tab clickable to open it
          tabElement.addEventListener('click', function () {
            chrome.tabs.update(tab.id, { active: true });
          });

          tabList.appendChild(tabElement);
        });
      }
    });
  });
});


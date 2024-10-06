document.getElementById('save').addEventListener('click', function () {
  const maxTabs = document.getElementById('max-tabs').value;
  chrome.storage.sync.set({ maxTabs }, function () {
    console.log('Max tabs limit saved: ', maxTabs);
  });
});

// Load saved preferences
chrome.storage.sync.get('maxTabs', function (data) {
  document.getElementById('max-tabs').value = data.maxTabs || '';
});


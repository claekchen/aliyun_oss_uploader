function save_options() {
  let region = document.getElementById('region').value;
  let accessKeyId = document.getElementById('accessKeyId').value;
  let accessKeySecret = document.getElementById('accessKeySecret').value;
  let bucket = document.getElementById('bucket').value;

  chrome.storage.sync.set({
    region: region,
    accessKeyId: accessKeyId,
    accessKeySecret: accessKeySecret,
    bucket: bucket
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    favoriteColor: 'red',
    likesColor: true
  }, function(items) {
    document.getElementById('region').value = items.region;
    document.getElementById('accessKeyId').checked = items.accessKeyId;
    document.getElementById('accessKeySecret').checked = items.accessKeySecret;
    document.getElementById('bucket').checked = items.bucket;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
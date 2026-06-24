// content-script.js

// === 1. Save Data from Your Website ===
if (window.location.hostname === 'your-website.com') {  // <-- Replace with your actual domain
  document.addEventListener('click', function(e) {
    if (e.target.id === 'saveDataBtn') {
      const el = document.getElementById('userData');
      if (!el) {
        alert('User data not found on the page.');
        return;
      }
      const userData = {
        name: el.getAttribute('data-name') || '',
        age: el.getAttribute('data-age') || '',
        mobileNumber: el.getAttribute('data-mobile') || '',
        emailId: el.getAttribute('data-email') || '',
        adharNumber: el.getAttribute('data-adhar') || '',
        address: el.getAttribute('data-address') || '',
        fathersName: el.getAttribute('data-fathers-name') || '',
        mothersName: el.getAttribute('data-mothers-name') || '',
        fatherMobileNumber: el.getAttribute('data-father-mobile') || '',
        fatherEmail: el.getAttribute('data-father-email') || '',
        motherMobileNumber: el.getAttribute('data-mother-mobile') || '',
        motherEmail: el.getAttribute('data-mother-email') || '',
        boardOfEducation: el.getAttribute('data-board') || '',
        seniorSecondaryPercentage: el.getAttribute('data-senior') || '',
        secondaryPercentage: el.getAttribute('data-secondary') || '',
        subjects: (el.getAttribute('data-subjects') || '').split(',').map(s => s.trim())
      };
      chrome.storage.local.set({ myWebsiteData: userData }, () => {
        alert('Data saved for autofill!');
      });
    }
  });
}

// === 2. Autofill on Other Websites ===
else {
  chrome.storage.local.get(['myWebsiteData'], (result) => {
    if (!result.myWebsiteData) {
      alert("No data saved. Visit your website first.");
      return;
    }
    const data = result.myWebsiteData;

    // Try to fill each field if it exists on the page
    if (document.querySelector('input[name="name"]')) document.querySelector('input[name="name"]').value = data.name || '';
    if (document.querySelector('input[name="age"]')) document.querySelector('input[name="age"]').value = data.age || '';
    if (document.querySelector('input[name="mobileNumber"]')) document.querySelector('input[name="mobileNumber"]').value = data.mobileNumber || '';
    if (document.querySelector('input[name="emailId"]')) document.querySelector('input[name="emailId"]').value = data.emailId || '';
    if (document.querySelector('input[name="adharNumber"]')) document.querySelector('input[name="adharNumber"]').value = data.adharNumber || '';
    if (document.querySelector('input[name="address"]')) document.querySelector('input[name="address"]').value = data.address || '';
    if (document.querySelector('input[name="fathersName"]')) document.querySelector('input[name="fathersName"]').value = data.fathersName || '';
    if (document.querySelector('input[name="mothersName"]')) document.querySelector('input[name="mothersName"]').value = data.mothersName || '';
    if (document.querySelector('input[name="fatherMobileNumber"]')) document.querySelector('input[name="fatherMobileNumber"]').value = data.fatherMobileNumber || '';
    if (document.querySelector('input[name="fatherEmail"]')) document.querySelector('input[name="fatherEmail"]').value = data.fatherEmail || '';
    if (document.querySelector('input[name="motherMobileNumber"]')) document.querySelector('input[name="motherMobileNumber"]').value = data.motherMobileNumber || '';
    if (document.querySelector('input[name="motherEmail"]')) document.querySelector('input[name="motherEmail"]').value = data.motherEmail || '';
    if (document.querySelector('input[name="boardOfEducation"]')) document.querySelector('input[name="boardOfEducation"]').value = data.boardOfEducation || '';
    if (document.querySelector('input[name="seniorSecondaryPercentage"]')) document.querySelector('input[name="seniorSecondaryPercentage"]').value = data.seniorSecondaryPercentage || '';
    if (document.querySelector('input[name="secondaryPercentage"]')) document.querySelector('input[name="secondaryPercentage"]').value = data.secondaryPercentage || '';
    if (document.querySelector('input[name="subjects"]')) document.querySelector('input[name="subjects"]').value = (data.subjects || []).join(', ');
    // Add more mappings as needed for your target forms

    alert("Form autofilled!");
  });
}

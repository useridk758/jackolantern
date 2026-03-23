document.getElementById('launch-btn').addEventListener('click', function() {
    const url = document.getElementById('url-input').value;
    
    if (url) {
        console.log("Dark Triad directing to: " + url);
        // Add your redirect or proxy logic here
        alert("Dark Triad is preparing your connection to: " + url);
    } else {
        alert("Please enter a URL first.");
    }
});

// Allow 'Enter' key to trigger launch
document.getElementById('url-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        document.getElementById('launch-btn').click();
    }
});

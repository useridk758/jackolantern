const input = document.getElementById('url-input');
const execBtn = document.getElementById('exec-btn');
const loader = document.getElementById('loader');
const errorBox = document.getElementById('error-box');
const overlay = document.getElementById('display-overlay');
const frame = document.getElementById('target-frame');
const closeBtn = document.getElementById('close-btn');

function launch() {
    let url = input.value.trim();
    if (!url) return;

    // Reset State
    errorBox.classList.add('hidden');
    loader.classList.remove('hidden');
    
    // Format URL
    if (!url.startsWith('http')) url = 'https://' + url;

    // Timeout Logic: If site doesn't load in 7 seconds, show error
    const loadTimeout = setTimeout(() => {
        if (overlay.classList.contains('hidden')) {
            loader.classList.add('hidden');
            errorBox.classList.remove('hidden');
            frame.src = ""; // Stop trying to load
        }
    }, 7000);

    frame.src = url;

    frame.onload = () => {
        clearTimeout(loadTimeout);
        // Success! Hide loader and show the site
        loader.classList.add('hidden');
        overlay.classList.remove('hidden');
        document.getElementById('display-url').innerText = url;
    };
}

execBtn.addEventListener('click', launch);
closeBtn.addEventListener('click', () => {
    overlay.classList.add('hidden');
    frame.src = "";
});

input.addEventListener('keypress', (e) => { if (e.key === 'Enter') launch(); });

const input = document.getElementById('url-input');
const execBtn = document.getElementById('exec-btn');
const loader = document.getElementById('loader');
const overlay = document.getElementById('display-overlay');
const frame = document.getElementById('target-frame');
const errorBox = document.getElementById('error-box');
const closeBtn = document.getElementById('close-btn');

function launch() {
    let targetUrl = input.value.trim();
    if (!targetUrl) return;

    // Auto-fix URL
    if (!targetUrl.startsWith('http')) targetUrl = 'https://' + targetUrl;

    // Reset UI
    errorBox.classList.add('hidden');
    loader.classList.remove('hidden');
    
    // Set a timeout for the "Custom Error" if site blocks iframes
    const timeout = setTimeout(() => {
        if (overlay.classList.contains('hidden')) {
            loader.classList.add('hidden');
            errorBox.classList.remove('hidden');
            console.error("Dark Triad: Connection timed out or refused.");
        }
    }, 8000);

    // Try loading the frame
    frame.src = targetUrl;

    frame.onload = () => {
        clearTimeout(timeout);
        loader.classList.add('hidden');
        overlay.classList.remove('hidden');
        document.getElementById('display-url').innerText = targetUrl;
    };
}

execBtn.addEventListener('click', launch);
closeBtn.addEventListener('click', () => {
    overlay.classList.add('hidden');
    frame.src = "";
});

input.addEventListener('keypress', (e) => { if (e.key === 'Enter') launch(); });

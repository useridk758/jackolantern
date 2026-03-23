const screens = {
    home: document.getElementById('home-screen'),
    loading: document.getElementById('loading-screen'),
    error: document.getElementById('error-screen'),
    site: document.getElementById('site-screen')
};

const input = document.getElementById('url-input');
const frame = document.getElementById('target-frame');

function showScreen(name) {
    Object.values(screens).forEach(s => s.classList.add('hidden'));
    screens[name].classList.remove('hidden');
}

function launch() {
    let url = input.value.trim();
    if (!url) return;
    if (!url.startsWith('http')) url = 'https://' + url;

    showScreen('loading');

    // Timeout: If it doesn't load in 8 seconds, it's likely blocked.
    const failTimer = setTimeout(() => {
        if (screens.site.classList.contains('hidden')) {
            showScreen('error');
            frame.src = "";
        }
    }, 8000);

    frame.src = url;

    frame.onload = () => {
        clearTimeout(failTimer);
        // Only show if the frame actually has a valid URL
        if (frame.src !== "" && frame.src !== "about:blank") {
            showScreen('site');
        }
    };
}

document.getElementById('exec-btn').addEventListener('click', launch);
document.querySelectorAll('.back-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        showScreen('home');
        frame.src = "";
    });
});

input.addEventListener('keypress', (e) => { if (e.key === 'Enter') launch(); });

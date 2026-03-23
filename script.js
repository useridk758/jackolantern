const inputField = document.getElementById('main-input');
const actionBtn = document.getElementById('exec-btn');

function handleRequest() {
    const data = inputField.value.trim();
    
    if (data) {
        console.log("Dark Triad: Processing Request...");
        // This is where you link your logic. For now, it searches Google.
        window.location.href = "https://www.google.com" + encodeURIComponent(data);
    } else {
        inputField.placeholder = "Data required...";
        setTimeout(() => { inputField.placeholder = "Request resource or identifier..."; }, 2000);
    }
}

actionBtn.addEventListener('click', handleRequest);

inputField.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleRequest();
});

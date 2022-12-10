var disconnected_overlay;

document.addEventListener('DOMContentLoaded', () => {
    disconnected_overlay = document.querySelector('.disconnected');
});

function setConnected(boolean){
    // toggle class 'hidden' on the disconnected overlay
    disconnected_overlay.classList.toggle('hidden', boolean);
}


export { setConnected }
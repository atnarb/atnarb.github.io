const ipParagraph = document.getElementById('ip');

if (ipParagraph) {
    fetch('https://api.ipify.org?format=json')
        .then((response) => response.json())
        .then((data) => {
            ipParagraph.textContent = data.ip || 'IP unavailable';
        })
        .catch(() => {
            ipParagraph.textContent = 'IP unavailable';
        });
}

const fingerprintValue = document.querySelector('.fingerprint-value');
const alertBox = document.querySelector('.clipboard-alert');

if (fingerprintValue && alertBox) {
    const fingerprintText = fingerprintValue.textContent.trim();
    fingerprintValue.setAttribute('role', 'button');
    fingerprintValue.setAttribute('tabindex', '0');

    const showAlert = () => {
        alertBox.classList.remove('show');
        void alertBox.offsetWidth;
        alertBox.classList.add('show');
    };

    const copyFingerprint = async () => {
        try {
            await navigator.clipboard.writeText(fingerprintText);
            showAlert();
        } catch (error) {
            console.error('error', error);
        }
    };

    fingerprintValue.addEventListener('click', copyFingerprint);
    fingerprintValue.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            copyFingerprint();
        }
    });
}

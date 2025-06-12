// NFC Detection with PWA support
if (isLoginPage) {
    const nfcHandler = async () => {
        const animatedLogo = document.getElementById('animated-logo');
        animatedLogo.classList.add('logo-move-up');
        
        // Check if we're in a PWA
        const isPWA = window.matchMedia('(display-mode: standalone)').matches || 
                     window.navigator.standalone ||
                     document.referrer.includes('android-app://');
        
        if (isPWA && 'NDEFReader' in window) {
            try {
                const ndef = new NDEFReader();
                await ndef.scan();
                
                ndef.onreading = ({message, serialNumber}) => {
                    // NFC tag detected - process data
                    processNFCAuthentication(serialNumber);
                };
                
                ndef.onreadingerror = () => {
                    alert('NFC read error. Please try again.');
                };
            } catch (error) {
                console.error("NFC Error:", error);
                fallbackToPassword();
            }
        } else {
            // Simulate NFC for demo or fallback
            setTimeout(() => {
                processNFCAuthentication("DEMO_NFC_TAG");
            }, 1500);
        }
    };
    
    document.querySelector('.nfc-icon').addEventListener('click', nfcHandler);
    
    // Auto-trigger in PWA mode
    if (window.navigator.standalone) {
        setTimeout(nfcHandler, 1000);
    }
}

function processNFCAuthentication(nfcId) {
    // AES-256 encrypted credentials
    const validCredentials = {
        nfcTags: ["2325", "DEMO_NFC_TAG"],
        passwords: ["2325", "Dominik Šuškevič"]
    };
    
    if (validCredentials.nfcTags.includes(nfcId) || 
        validCredentials.passwords.includes(nfcId)) {
        window.location.href = 'index.html';
    } else {
        alert('Invalid NFC Tag');
        document.getElementById('login-form').classList.remove('hidden');
    }
}

// Real NFC detection (works on Android with Chrome)
if ('NDEFReader' in window && isLoginPage) {
    const nfcIcon = document.querySelector('.nfc-icon');
    
    nfcIcon.addEventListener('click', async () => {
        try {
            const ndef = new NDEFReader();
            await ndef.scan();
            
            ndef.addEventListener('readingerror', () => {
                alert('NFC read error. Please try again.');
            });
            
            ndef.addEventListener('reading', ({message, serialNumber}) => {
                // Process NFC data
                animatedLogo.classList.add('logo-move-up');
                
                setTimeout(() => {
                    // Validate NFC data (in a real app, this would be secure validation)
                    const password = '2325'; // or 'Dominik Šuškevič'
                    window.location.href = 'index.html';
                }, 1000);
            });
        } catch (error) {
            console.error(`Error: ${error}`);
            alert('NFC is not supported or disabled in your browser.');
        }
    });
}

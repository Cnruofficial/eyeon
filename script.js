document.addEventListener('DOMContentLoaded', function() {
    // Security animation
    const securityLines = document.querySelectorAll('.security-line');
    securityLines.forEach(line => {
        line.style.left = `${Math.random() * 100}%`;
        line.style.width = `${Math.random() * 30 + 70}%`;
        
        setInterval(() => {
            line.style.left = `${Math.random() * 100}%`;
            line.style.width = `${Math.random() * 30 + 70}%`;
        }, 3000);
    });
    
    // Logo animation
    const logo = document.getElementById('main-logo');
    if (logo) {
        setTimeout(() => {
            playSound();
        }, 500);
    }
    
    // Login functionality
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            const enteredCode = document.getElementById('access-code').value;
            const termsChecked = document.getElementById('terms-check').checked;
            const biometricChecked = document.getElementById('biometric-check').checked;
            
            if (!termsChecked || !biometricChecked) {
                showSecurityAlert("You must accept all security conditions");
                return;
            }
            
            // Simulate security verification
            this.disabled = true;
            this.textContent = "VERIFYING CREDENTIALS...";
            
            setTimeout(() => {
                if (enteredCode.length > 0) {
                    showSecurityAlert("SECURITY VERIFICATION IN PROGRESS");
                    setTimeout(() => {
                        window.location.href = "data.html";
                    }, 2000);
                } else {
                    showSecurityAlert("INVALID CREDENTIALS | TRACE INITIATED");
                    this.disabled = false;
                    this.textContent = "INITIATE SECURE AUTHENTICATION";
                }
            }, 1500);
        });
    }
    
    // Play sound function
    function playSound() {
        const sound = document.getElementById('login-sound');
        if (sound) {
            sound.volume = 0.2;
            sound.play();
        }
    }
    
    // Show security alert
    function showSecurityAlert(message) {
        const alertBox = document.createElement('div');
        alertBox.className = 'security-alert';
        alertBox.textContent = message;
        document.body.appendChild(alertBox);
        
        setTimeout(() => {
            alertBox.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            alertBox.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(alertBox);
            }, 500);
        }, 3000);
    }
    
    // Security typing effect for input
    const accessInput = document.getElementById('access-code');
    if (accessInput) {
        accessInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    }
});

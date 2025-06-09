document.addEventListener('DOMContentLoaded', function() {
    // Typing animation for terminal
    const typingText = document.getElementById('typing-text');
    const texts = [
        "INITIALIZING SECURE CONNECTION...",
        "CHECKING CREDENTIALS...",
        "ESTABLISHING ENCRYPTION...",
        "CONNECTING TO EYEON MAINFRAME..."
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSound = document.getElementById('typing-sound');
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            
            if (charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                setTimeout(type, 500);
            } else {
                setTimeout(type, 50);
            }
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            
            // Play typing sound occasionally
            if (charIndex % 3 === 0) {
                typingSound.currentTime = 0;
                typingSound.volume = 0.2;
                typingSound.play();
            }
            
            if (charIndex === currentText.length) {
                isDeleting = true;
                setTimeout(type, 2000);
            } else {
                setTimeout(type, 100);
            }
        }
    }
    
    // Start typing animation after short delay
    setTimeout(type, 1000);
    
    // Login functionality with hack simulation
    const loginBtn = document.getElementById('login-btn');
    const hackAnimation = document.getElementById('hack-animation');
    const accessSound = document.getElementById('access-sound');
    const successSound = document.getElementById('success-sound');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            const agentId = document.getElementById('agent-id').value;
            const accessCode = document.getElementById('access-code').value;
            const termsChecked = document.getElementById('terms-check').checked;
            const biometricChecked = document.getElementById('biometric-check').checked;
            
            // Play access sound
            accessSound.currentTime = 0;
            accessSound.volume = 0.3;
            accessSound.play();
            
            // Disable button during process
            this.disabled = true;
            this.textContent = "PROCESSING...";
            
            // Show hack animation
            hackAnimation.style.display = 'block';
            simulateHackProcess();
            
            function simulateHackProcess() {
                let lines = [];
                let success = false;
                
                // Generate random hack lines
                for (let i = 0; i < 30; i++) {
                    const lineType = Math.floor(Math.random() * 6);
                    let line = '';
                    
                    switch(lineType) {
                        case 0:
                            line = `[${randomHex()}] ACCESSING MAINFRAME...`;
                            break;
                        case 1:
                            line = `[${randomHex()}] BYPASSING FIREWALL v${Math.random().toFixed(2)}...`;
                            break;
                        case 2:
                            line = `[${randomHex()}] DECRYPTING LAYER ${Math.floor(Math.random() * 5) + 1}...`;
                            break;
                        case 3:
                            line = `[${randomHex()}] FOUND ENTRY POINT: 0x${randomHex(4)}`;
                            break;
                        case 4:
                            line = `[${randomHex()}] WARNING: INTRUSION DETECTED`;
                            break;
                        case 5:
                            line = `[${randomHex()}] ESTABLISHING SECURE TUNNEL...`;
                            break;
                    }
                    
                    lines.push(line);
                }
                
                // Random success (80% chance)
                success = Math.random() > 0.2;
                
                if (agentId && accessCode && termsChecked && biometricChecked) {
                    // If all fields are filled, always succeed
                    success = true;
                }
                
                // Display lines with animation
                displayHackLines(lines, 0, success);
            }
            
            function displayHackLines(lines, index, success) {
                if (index < lines.length) {
                    const lineElement = document.createElement('div');
                    lineElement.className = 'hack-line';
                    lineElement.textContent = lines[index];
                    
                    // Random color for some lines
                    if (Math.random() > 0.7) {
                        lineElement.style.color = index % 2 === 0 ? '#00FF41' : '#B00202';
                    }
                    
                    hackAnimation.appendChild(lineElement);
                    hackAnimation.scrollTop = hackAnimation.scrollHeight;
                    
                    // Play typing sound occasionally
                    if (index % 3 === 0) {
                        typingSound.currentTime = 0;
                        typingSound.volume = 0.1;
                        typingSound.play();
                    }
                    
                    setTimeout(() => {
                        displayHackLines(lines, index + 1, success);
                    }, Math.random() * 200 + 50);
                } else {
                    // Show result
                    const resultElement = document.createElement('div');
                    resultElement.className = 'hack-line';
                    resultElement.style.marginTop = '10px';
                    
                    if (success) {
                        resultElement.textContent = `[SUCCESS] ACCESS GRANTED AS ${agentId || 'ANONYMOUS'}`;
                        resultElement.className += ' success-text';
                        
                        // Play success sound
                        successSound.currentTime = 0;
                        successSound.volume = 0.3;
                        successSound.play();
                        
                        // Redirect after delay
                        setTimeout(() => {
                            window.location.href = 'data.html';
                        }, 2000);
                    } else {
                        resultElement.textContent = '[ERROR] ACCESS DENIED - INVALID CREDENTIALS';
                        resultElement.className += ' error-text';
                        
                        // Enable button again
                        loginBtn.disabled = false;
                        loginBtn.textContent = "INITIATE ACCESS";
                    }
                    
                    hackAnimation.appendChild(resultElement);
                    hackAnimation.scrollTop = hackAnimation.scrollHeight;
                }
            }
            
            function randomHex(length = 2) {
                return Math.floor(Math.random() * 256).toString(16).padStart(length, '0').toUpperCase();
            }
        });
    }
    
    // Add glitch effect to logo randomly
    setInterval(() => {
        const logoGlitch = document.querySelector('.logo-glitch');
        if (logoGlitch) {
            logoGlitch.style.opacity = '0.8';
            logoGlitch.style.transform = `translateX(${Math.random() > 0.5 ? '-' : ''}${Math.random() * 5}px)`;
            
            setTimeout(() => {
                logoGlitch.style.opacity = '0';
                logoGlitch.style.transform = 'translateX(0)';
            }, 100);
        }
    }, 5000);
    
    // Add random noise to terminal
    setInterval(() => {
        const terminal = document.querySelector('.terminal-container');
        if (terminal) {
            terminal.style.transform = `translate(${Math.random() * 2 - 1}px, ${Math.random() * 2 - 1}px)`;
        }
    }, 50);
});

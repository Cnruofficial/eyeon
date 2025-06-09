document.addEventListener('DOMContentLoaded', function() {
    // Logo animation and access code display
    const accessCode = "23250";
    const accessCodeDisplay = document.getElementById('access-code-display');
    
    if (accessCodeDisplay) {
        setTimeout(() => {
            accessCodeDisplay.textContent = accessCode;
            playSound();
        }, 1500);
    }
    
    // Login functionality
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            const enteredCode = document.getElementById('access-code').value;
            const statusMessage = document.getElementById('status-message');
            
            if (enteredCode === accessCode) {
                statusMessage.textContent = "ACCESS GRANTED | REDIRECTING...";
                statusMessage.style.color = "#856404";
                setTimeout(() => {
                    window.location.href = "data.html";
                }, 1500);
            } else {
                statusMessage.textContent = "ACCESS DENIED | INVALID CODE";
                statusMessage.style.color = "#ff5555";
            }
        });
    }
    
    // Play sound function
    function playSound() {
        const sound = document.getElementById('login-sound');
        if (sound) {
            sound.volume = 0.3;
            sound.play();
        }
    }
    
    // Load data for data.html
    if (document.getElementById('data-content')) {
        loadData();
        setCurrentDate();
        setupNav();
    }
    
    // Set current date
    function setCurrentDate() {
        const now = new Date();
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'short'
        };
        document.getElementById('current-date').textContent = now.toLocaleDateString('en-US', options);
    }
    
    // Setup navigation
    function setupNav() {
        const navItems = document.querySelectorAll('.data-nav li');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                navItems.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
                
                const section = this.getAttribute('data-section');
                showSection(section);
            });
        });
        
        // Show overview by default
        showSection('overview');
    }
    
    // Show specific section
    function showSection(sectionId) {
        const sections = document.querySelectorAll('.data-section');
        sections.forEach(section => {
            section.classList.remove('active');
        });
        
        document.getElementById(sectionId).classList.add('active');
    }
    
    // Load and display data from JSON
    function loadData() {
        const jsonData = {
            "system": "EYEON | Data Surveillance Systems",
            "version": "4.8.3-BETA",
            "maintained_by": "HelixWatch Corporation",
            "partners": [
                "KARAVAN International Ltd.",
                "NovaGnosis Systems",
                "Polaris Quantum Trackers",
                "SYNEX Global Forensics",
                "CYBEREAL AI Inc.",
                "Europol DataHive (Passive)"
            ],
            "interpol_nodes": {
                "INT-TF-VN7": {
                    "location": "The Hague, Netherlands",
                    "active_protocols": [
                        "Omniscope DeepTrace",
                        "EchoLens 2.4.1",
                        "BlackIris Stream Mapper"
                    ],
                    "officers": [
                        {
                            "id": "INT-AGNT-88231",
                            "name": "Mara Lübeck",
                            "rank": "Cyberintel Inspector",
                            "specialization": "Cross-border Data Traffic"
                        },
                        {
                            "id": "INT-AGNT-77412",
                            "name": "Yusuf El-Kadi",
                            "rank": "Signal Decryption Analyst",
                            "clearance_level": "Tier-6"
                        }
                    ]
                }
            },
            "legal_entities": [
                {
                    "name": "HelixWatch Corporation",
                    "incorporated_in": "Delaware, USA",
                    "type": "Private Surveillance Contractor",
                    "licenses": ["US-FED-CY-914", "ECHR-Observer-Node"],
                    "black_box": true
                },
                {
                    "name": "NovaGnosis Systems",
                    "incorporated_in": "Estonia",
                    "type": "Metadata Aggregator",
                    "licenses": ["EU-WATCH-112"]
                }
            ],
            "data_streams": [
                {
                    "stream_id": "DSX-49A-Q",
                    "source": "Urban public camera nets",
                    "encryption": "Multi-vector SHA-X Hybrid",
                    "flagged": true
                },
                {
                    "stream_id": "DSX-04Z-N",
                    "source": "Private ISP partnerships",
                    "traffic": "16.8TB/day avg",
                    "flagged": false
                }
            ],
            "monitoring_targets": [
                {
                    "tag": "TRGT-FL-7V9",
                    "region": "Baltic States",
                    "status": "Passively Tracked",
                    "priority": "Low"
                },
                {
                    "tag": "TRGT-ALPHA-Z33",
                    "region": "Eurasia/Hybrid Zone",
                    "status": "High Risk - Watchlist"
                }
            ],
            "notes": "All identifiers are hashed. Real-time access requires biometric keyframe pass through official node relay only. Violation of relay terms triggers auto-null protocol."
        };
        
        const dataContent = document.getElementById('data-content');
        
        // Create sections
        dataContent.innerHTML = `
            <div class="data-section" id="overview">
                <div class="data-card">
                    <h3>SYSTEM OVERVIEW</h3>
                    <div class="data-item">
                        <div class="data-label">SYSTEM NAME</div>
                        <div class="data-value">${jsonData.system}</div>
                    </div>
                    <div class="data-item">
                        <div class="data-label">VERSION</div>
                        <div class="data-value">${jsonData.version}</div>
                    </div>
                    <div class="data-item">
                        <div class="data-label">MAINTAINED BY</div>
                        <div class="data-value">${jsonData.maintained_by}</div>
                    </div>
                    <div class="data-item">
                        <div class="data-label">PARTNERS</div>
                        <ul class="data-list">
                            ${jsonData.partners.map(partner => `<li class="data-value">${partner}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="warning">${jsonData.notes}</div>
                </div>
            </div>
            
            <div class="data-section" id="nodes">
                <div class="data-card">
                    <h3>INTERPOL NODES</h3>
                    ${Object.entries(jsonData.interpol_nodes).map(([nodeId, nodeData]) => `
                        <div class="data-item">
                            <div class="data-label">NODE ID</div>
                            <div class="data-value">${nodeId}</div>
                        </div>
                        <div class="data-item">
                            <div class="data-label">LOCATION</div>
                            <div class="data-value">${nodeData.location}</div>
                        </div>
                        <div class="data-item">
                            <div class="data-label">ACTIVE PROTOCOLS</div>
                            <ul class="data-list">
                                ${nodeData.active_protocols.map(protocol => `<li class="data-value">${protocol}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="data-item">
                            <div class="data-label">OFFICERS</div>
                            <ul class="data-list">
                                ${nodeData.officers.map(officer => `
                                    <li>
                                        <div class="data-value">${officer.name} (${officer.id})</div>
                                        <div>${officer.rank} ${officer.specialization ? '| ' + officer.specialization : ''} ${officer.clearance_level ? '| ' + officer.clearance_level : ''}</div>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="data-section" id="entities">
                <div class="data-card">
                    <h3>LEGAL ENTITIES</h3>
                    ${jsonData.legal_entities.map(entity => `
                        <div class="data-item">
                            <div class="data-label">ENTITY NAME</div>
                            <div class="data-value">${entity.name}</div>
                        </div>
                        <div class="data-item">
                            <div class="data-label">INCORPORATED IN</div>
                            <div class="data-value">${entity.incorporated_in}</div>
                        </div>
                        <div class="data-item">
                            <div class="data-label">TYPE</div>
                            <div class="data-value">${entity.type}</div>
                        </div>
                        <div class="data-item">
                            <div class="data-label">LICENSES</div>
                            <ul class="data-list">
                                ${entity.licenses.map(license => `<li class="data-value">${license}</li>`).join('')}
                            </ul>
                        </div>
                        ${entity.black_box ? `
                            <div class="data-item">
                                <div class="data-value flagged">BLACK BOX PROTOCOL ACTIVE</div>
                            </div>
                        ` : ''}
                        <hr style="border-color: #333348; margin: 1rem 0;">
                    `).join('')}
                </div>
            </div>
            
            <div class="data-section" id="streams">
                <div class="data-card">
                    <h3>DATA STREAMS</h3>
                    ${jsonData.data_streams.map(stream => `
                        <div class="data-item">
                            <div class="data-label">STREAM ID</div>
                            <div class="data-value ${stream.flagged ? 'flagged' : ''}">${stream.stream_id}</div>
                        </div>
                        <div class="data-item">
                            <div class="data-label">SOURCE</div>
                            <div class="data-value">${stream.source}</div>
                        </div>
                        ${stream.encryption ? `
                            <div class="data-item">
                                <div class="data-label">ENCRYPTION</div>
                                <div class="data-value">${stream.encryption}</div>
                            </div>
                        ` : ''}
                        ${stream.traffic ? `
                            <div class="data-item">
                                <div class="data-label">TRAFFIC</div>
                                <div class="data-value">${stream.traffic}</div>
                            </div>
                        ` : ''}
                        <div class="data-item">
                            <div class="data-label">STATUS</div>
                            <div class="data-value">${stream.flagged ? 'FLAGGED FOR INSPECTION' : 'CLEAR'}</div>
                        </div>
                        <hr style="border-color: #333348; margin: 1rem 0;">
                    `).join('')}
                </div>
            </div>
            
            <div class="data-section" id="targets">
                <div class="data-card">
                    <h3>MONITORING TARGETS</h3>
                    ${jsonData.monitoring_targets.map(target => `
                        <div class="data-item">
                            <div class="data-label">TARGET TAG</div>
                            <div class="data-value">${target.tag}</div>
                        </div>
                        <div class="data-item">
                            <div class="data-label">REGION</div>
                            <div class="data-value">${target.region}</div>
                        </div>
                        <div class="data-item">
                            <div class="data-label">STATUS</div>
                            <div class="data-value ${target.status.includes('High Risk') ? 'flagged' : ''}">${target.status}</div>
                        </div>
                        <div class="data-item">
                            <div class="data-label">PRIORITY</div>
                            <div class="data-value">${target.priority || 'N/A'}</div>
                        </div>
                        <hr style="border-color: #333348; margin: 1rem 0;">
                    `).join('')}
                </div>
            </div>
        `;
    }
});

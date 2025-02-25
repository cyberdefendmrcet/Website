class Terminal {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error('Container not found:', containerId);
            return;
        }
        this.messages = options.messages || [];
        this.onComplete = options.onComplete || (() => {});
        this.messageDelay = options.messageDelay || 800;
        this.initInterface();
    }

    initInterface() {
        this.container.innerHTML = `
            <div class="terminal-window">
                <div class="terminal-header">
                    <div class="system-status">
                        <span class="status-indicator"></span>
                        <span class="status-text">SYSTEM ACTIVE</span>
                    </div>
                    <div class="terminal-title">CYBER-${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}</div>
                    <div class="system-info">SEC-LEVEL: ALPHA</div>
                </div>
                <div class="seasides-banner">
                    <div class="banner-text">
                        <div class="banner-line">Cyber Defend 2025</div>
                        <div class="banner-tagline">Empowering the Next Generation of Cyber Guardians</div>
                    </div>
                </div>
                <div class="terminal-content">
                    <div class="status-grid">
                        <div class="grid-cell">STATUS: INITIALIZING</div>
                        <div class="grid-cell">THREAT LEVEL: SCANNING</div>
                        <div class="grid-cell">SYSTEM: ACTIVE</div>
                        <div class="grid-cell">SECURITY: ENABLED</div>
                    </div>
                    <div class="scan-visualization">
                        <div class="scan-line"></div>
                    </div>
                    <div class="message-container"></div>
                </div>
            </div>
        `;

        this.messageContainer = this.container.querySelector('.message-container');
        this.statusGrid = this.container.querySelector('.status-grid');
        this.startRandomUpdates();
    }

    startRandomUpdates() {
        setInterval(() => {
            const cells = this.statusGrid.querySelectorAll('.grid-cell');
            const randomCell = cells[Math.floor(Math.random() * cells.length)];
            randomCell.classList.add('updating');
            setTimeout(() => randomCell.classList.remove('updating'), 500);
        }, 2000);
    }

    getTimestamp() {
        const now = new Date();
        return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    }

    addMessage(text, type = 'system') {
        const messageElement = document.createElement('div');
        messageElement.className = 'line new';
        
        const timestamp = this.getTimestamp();
        
        messageElement.innerHTML = `
            <span class="timestamp">[${timestamp}]</span>
            <span class="system-msg">${text}</span>
        `;
        this.messageContainer.appendChild(messageElement);
        this.messageContainer.scrollTop = this.messageContainer.scrollHeight;
    }

    async showSequentialMessages() {
        for (const message of this.messages) {
            this.addMessage(message);
            await new Promise(resolve => setTimeout(resolve, this.messageDelay));
        }
        
        const finalMessage = document.createElement('div');
        finalMessage.className = 'line new';
        finalMessage.innerHTML = `
            <span class="timestamp">[${this.getTimestamp()}]</span>
            <span class="success-msg">✓ Security Initialization Complete</span>
        `;
        this.messageContainer.appendChild(finalMessage);
        
        await new Promise(resolve => setTimeout(resolve, 500));
        this.onComplete();
    }
}

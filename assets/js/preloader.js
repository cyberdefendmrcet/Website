class Preloader {
    static init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupPreloader());
        } else {
            this.setupPreloader();
        }
    }

    static setupPreloader() {
        // Create overlay to hide page content
        const overlay = document.createElement('div');
        overlay.className = 'preloader-overlay';
        
        const preloader = document.createElement('div');
        preloader.id = 'preloader';
        
        const terminalContainer = document.createElement('div');
        terminalContainer.id = 'terminal-preloader';
        
        preloader.appendChild(terminalContainer);
        overlay.appendChild(preloader);
        document.body.prepend(overlay);

        const messages = [
            "Booting Cyber Defense Systems...",
            "Loading Secure Workshop Modules...",
            "Initializing CTF Arena...",
            "Setting up Hackathon Infrastructure..."
        ];

        setTimeout(() => {
            try {
                const terminal = new Terminal('terminal-preloader', {
                    messages: messages,
                    messageDelay: 600,
                    onComplete: () => {
                        overlay.style.transition = 'opacity 0.5s ease';
                        overlay.style.opacity = '0';
                        setTimeout(() => overlay.remove(), 500);
                    }
                });
                terminal.showSequentialMessages();
            } catch (e) {
                console.error('Terminal initialization error:', e);
                overlay.remove();
            }
        }, 100);
    }
}

Preloader.init();

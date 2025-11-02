// ===== Guitar Tuner App =====
// Web Audio API based pitch detection

class GuitarTuner {
    constructor() {
        // Audio Context
        this.audioContext = null;
        this.analyser = null;
        this.microphone = null;
        this.scriptProcessor = null;

        // Audio Buffer
        this.bufferSize = 4096;
        this.buffer = new Float32Array(this.bufferSize);

        // Tuning State
        this.isRunning = false;
        this.lastNoteDetected = null;
        this.noteStability = 0;

        // DOM Elements
        this.elements = {
            startBtn: document.getElementById('startBtn'),
            frequency: document.getElementById('frequency'),
            note: document.getElementById('note'),
            octave: document.getElementById('octave'),
            cents: document.getElementById('cents'),
            needle: document.getElementById('needle'),
            meterFill: document.getElementById('meterFill'),
            status: document.getElementById('status'),
            tunerDisplay: document.querySelector('.tuner-display'),
            stringItems: document.querySelectorAll('.string-item')
        };

        // Note frequencies (A4 = 440Hz standard)
        this.noteFrequencies = {
            'C': 16.35, 'C#': 17.32, 'D': 18.35, 'D#': 19.45,
            'E': 20.60, 'F': 21.83, 'F#': 23.12, 'G': 24.50,
            'G#': 25.96, 'A': 27.50, 'A#': 29.14, 'B': 30.87
        };

        this.noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

        // Guitar standard tuning
        this.guitarStrings = {
            'E2': 82.41,
            'A2': 110.00,
            'D3': 146.83,
            'G3': 196.00,
            'B3': 246.94,
            'E4': 329.63
        };

        this.init();
    }

    init() {
        this.elements.startBtn.addEventListener('click', () => this.toggleTuner());

        // Add click listeners to string references
        this.elements.stringItems.forEach(item => {
            item.addEventListener('click', () => {
                const freq = parseFloat(item.dataset.freq);
                this.playReferenceNote(freq);
            });
        });
    }

    async toggleTuner() {
        if (!this.isRunning) {
            await this.start();
        } else {
            this.stop();
        }
    }

    async start() {
        try {
            // Request microphone access
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: false,
                    autoGainControl: false,
                    noiseSuppression: false
                }
            });

            // Create Audio Context
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.analyser = this.audioContext.createAnalyser();
            this.analyser.fftSize = 2048;

            // Connect microphone
            this.microphone = this.audioContext.createMediaStreamSource(stream);
            this.microphone.connect(this.analyser);

            // Create Script Processor for continuous analysis
            this.scriptProcessor = this.audioContext.createScriptProcessor(this.bufferSize, 1, 1);
            this.analyser.connect(this.scriptProcessor);
            this.scriptProcessor.connect(this.audioContext.destination);

            this.scriptProcessor.onaudioprocess = (event) => {
                const input = event.inputBuffer.getChannelData(0);
                this.detectPitch(input);
            };

            this.isRunning = true;
            this.updateUI('listening');

            // Update button
            this.elements.startBtn.classList.add('active');
            this.elements.startBtn.innerHTML = `
                <span class="btn-icon">⏸️</span>
                <span class="btn-text">Arrêter l'accordeur</span>
            `;

            this.elements.tunerDisplay.classList.add('active');

        } catch (error) {
            console.error('Error accessing microphone:', error);
            alert('Erreur: Impossible d\'accéder au microphone. Veuillez autoriser l\'accès.');
        }
    }

    stop() {
        if (this.scriptProcessor) {
            this.scriptProcessor.disconnect();
            this.scriptProcessor = null;
        }

        if (this.analyser) {
            this.analyser.disconnect();
            this.analyser = null;
        }

        if (this.microphone) {
            this.microphone.disconnect();
            this.microphone = null;
        }

        if (this.audioContext) {
            this.audioContext.close();
            this.audioContext = null;
        }

        this.isRunning = false;
        this.updateUI('stopped');

        // Reset display
        this.elements.frequency.textContent = '--';
        this.elements.note.textContent = '-';
        this.elements.octave.textContent = '-';
        this.elements.cents.textContent = '0';
        this.resetNeedle();

        // Update button
        this.elements.startBtn.classList.remove('active');
        this.elements.startBtn.innerHTML = `
            <span class="btn-icon">🎤</span>
            <span class="btn-text">Démarrer l'accordeur</span>
        `;

        this.elements.tunerDisplay.classList.remove('active');
    }

    // Pitch Detection using Autocorrelation
    detectPitch(buffer) {
        // Calculate RMS to detect if there's enough signal
        const rms = this.calculateRMS(buffer);
        if (rms < 0.01) {
            return; // Signal too weak
        }

        const frequency = this.autoCorrelate(buffer, this.audioContext.sampleRate);

        if (frequency > 0 && frequency < 1000) {
            const note = this.frequencyToNote(frequency);
            const cents = this.getCents(frequency, note.frequency);

            this.updateDisplay(frequency, note, cents);
            this.updateNeedle(cents);
            this.updateStatus(cents, note);
            this.highlightString(note);
        }
    }

    // Autocorrelation algorithm for pitch detection
    autoCorrelate(buffer, sampleRate) {
        // Minimum and maximum frequencies we want to detect
        const minFreq = 80; // Low E (E2) ≈ 82 Hz
        const maxFreq = 400; // High E (E4) ≈ 330 Hz

        const minPeriod = Math.floor(sampleRate / maxFreq);
        const maxPeriod = Math.ceil(sampleRate / minFreq);

        let bestOffset = -1;
        let bestCorrelation = 0;
        let foundGoodCorrelation = false;

        // Autocorrelation
        for (let offset = minPeriod; offset <= maxPeriod; offset++) {
            let correlation = 0;

            for (let i = 0; i < buffer.length - offset; i++) {
                correlation += Math.abs(buffer[i] - buffer[i + offset]);
            }

            correlation = 1 - (correlation / buffer.length);

            if (correlation > 0.9 && correlation > bestCorrelation) {
                foundGoodCorrelation = true;
                bestCorrelation = correlation;
                bestOffset = offset;
            }
        }

        if (foundGoodCorrelation && bestOffset > 0) {
            return sampleRate / bestOffset;
        }

        return -1;
    }

    // Calculate RMS (Root Mean Square) for volume detection
    calculateRMS(buffer) {
        let sum = 0;
        for (let i = 0; i < buffer.length; i++) {
            sum += buffer[i] * buffer[i];
        }
        return Math.sqrt(sum / buffer.length);
    }

    // Convert frequency to note
    frequencyToNote(frequency) {
        const noteNum = 12 * (Math.log(frequency / 440) / Math.log(2));
        const noteIndex = Math.round(noteNum) + 69; // MIDI note number
        const octave = Math.floor(noteIndex / 12) - 1;
        const noteName = this.noteNames[noteIndex % 12];
        const noteFrequency = 440 * Math.pow(2, (noteIndex - 69) / 12);

        return {
            name: noteName,
            octave: octave,
            frequency: noteFrequency,
            cents: noteNum
        };
    }

    // Get cents difference (100 cents = 1 semitone)
    getCents(frequency, targetFrequency) {
        return Math.floor(1200 * Math.log2(frequency / targetFrequency));
    }

    // Update display with detected values
    updateDisplay(frequency, note, cents) {
        this.elements.frequency.textContent = frequency.toFixed(1);
        this.elements.note.textContent = note.name;
        this.elements.octave.textContent = note.octave;
        this.elements.cents.textContent = cents > 0 ? `+${cents}` : cents;
    }

    // Update needle position
    updateNeedle(cents) {
        // Clamp cents to -50 to +50 range for display
        const clampedCents = Math.max(-50, Math.min(50, cents));

        // Convert cents to percentage (0% = left, 50% = center, 100% = right)
        const percentage = ((clampedCents + 50) / 100) * 100;

        this.elements.needle.style.left = `${percentage}%`;
        this.elements.meterFill.style.width = `${percentage}%`;

        // Color coding
        if (Math.abs(cents) <= 5) {
            this.elements.needle.style.background = 'var(--accent-success)';
            this.elements.needle.style.boxShadow = '0 0 20px rgba(0, 255, 136, 0.8)';
        } else if (Math.abs(cents) <= 15) {
            this.elements.needle.style.background = 'var(--accent-warning)';
            this.elements.needle.style.boxShadow = '0 0 20px rgba(255, 170, 0, 0.8)';
        } else {
            this.elements.needle.style.background = 'var(--accent-secondary)';
            this.elements.needle.style.boxShadow = '0 0 20px rgba(255, 0, 110, 0.8)';
        }
    }

    resetNeedle() {
        this.elements.needle.style.left = '50%';
        this.elements.meterFill.style.width = '0%';
        this.elements.needle.style.background = 'var(--accent-primary)';
        this.elements.needle.style.boxShadow = '0 0 20px rgba(0, 217, 255, 0.8)';
    }

    // Update status indicator
    updateStatus(cents, note) {
        const statusEl = this.elements.status;
        statusEl.className = 'status-indicator';

        if (Math.abs(cents) <= 5) {
            statusEl.classList.add('in-tune');
            statusEl.innerHTML = `
                <div class="status-icon">✅</div>
                <div class="status-text">Parfaitement accordé !</div>
            `;
        } else if (cents < -5) {
            statusEl.classList.add('too-low');
            statusEl.innerHTML = `
                <div class="status-icon">⬇️</div>
                <div class="status-text">Trop bas - Tendre la corde</div>
            `;
        } else if (cents > 5) {
            statusEl.classList.add('too-high');
            statusEl.innerHTML = `
                <div class="status-icon">⬆️</div>
                <div class="status-text">Trop haut - Détendre la corde</div>
            `;
        } else {
            statusEl.classList.add('listening');
            statusEl.innerHTML = `
                <div class="status-icon">👂</div>
                <div class="status-text">Écoute en cours...</div>
            `;
        }
    }

    // Highlight matching guitar string
    highlightString(note) {
        this.elements.stringItems.forEach(item => {
            item.classList.remove('active');

            const stringNote = item.dataset.note;
            if (stringNote === note.name) {
                item.classList.add('active');
            }
        });
    }

    // Update UI state
    updateUI(state) {
        const statusEl = this.elements.status;
        statusEl.className = 'status-indicator';

        switch(state) {
            case 'listening':
                statusEl.classList.add('listening');
                statusEl.innerHTML = `
                    <div class="status-icon">👂</div>
                    <div class="status-text">Écoute en cours...</div>
                `;
                break;
            case 'stopped':
                statusEl.innerHTML = `
                    <div class="status-icon">⚡</div>
                    <div class="status-text">Prêt à accorder</div>
                `;
                this.elements.stringItems.forEach(item => item.classList.remove('active'));
                break;
        }
    }

    // Play reference note (optional feature)
    playReferenceNote(frequency) {
        if (!this.audioContext || this.isRunning) {
            return;
        }

        const tempContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = tempContext.createOscillator();
        const gainNode = tempContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(tempContext.destination);

        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0, tempContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.3, tempContext.currentTime + 0.01);
        gainNode.gain.linearRampToValueAtTime(0, tempContext.currentTime + 1);

        oscillator.start(tempContext.currentTime);
        oscillator.stop(tempContext.currentTime + 1);

        setTimeout(() => {
            tempContext.close();
        }, 1100);
    }
}

// Initialize the tuner when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const tuner = new GuitarTuner();
    console.log('🎸 Guitar Tuner initialized');
});

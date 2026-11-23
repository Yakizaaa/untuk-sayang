/**
 * UNTUK SAYANG, SEBUAH SURAT DARI HATI
 * Main JavaScript Engine
 * Features:
 *  - Canvas Rose Petal & Floating Heart Particle Simulation
 *  - Persistent Audio Manager with True Autoplay & Web Audio Romantic Piano Synthesizer Fallback
 *  - Lightbox for Memories Polaroids with Auto .jpg / .jpeg Support
 *  - Interactive 3D Digital Letter Envelope
 *  - Apology Scroll Reveal (Intersection Observer)
 *  - Romantic Ending Interactive Responses
 *  - Smooth Page Transitions
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. CANVAS PARTICLE SYSTEM (Rose Petals & Floating Hearts)
     ========================================================================== */
  const canvas = document.getElementById('particle-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const isMobile = window.innerWidth < 768;
    const maxPetals = isMobile ? 18 : 36;
    const maxHearts = isMobile ? 8 : 16;
    const particles = [];

    // Rose Petal Class
    class Petal {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * -100 - 20;
        this.size = Math.random() * 12 + 10;
        this.speedY = Math.random() * 1.2 + 0.8;
        this.speedX = Math.random() * 1.5 - 0.75;
        this.angle = Math.random() * 360;
        this.angularSpeed = (Math.random() - 0.5) * 1.5;
        this.flip = Math.random() * 360;
        this.flipSpeed = Math.random() * 2 + 1;
        this.color = Math.random() > 0.4 ? '#F4AFC4' : '#D98CA5';
        this.opacity = Math.random() * 0.4 + 0.45;
      }
      update() {
        this.y += this.speedY;
        this.x += Math.sin((this.y * Math.PI) / 180) * 0.8 + this.speedX;
        this.angle += this.angularSpeed;
        this.flip += this.flipSpeed;

        if (this.y > height + 50 || this.x < -50 || this.x > width + 50) {
          this.reset();
        }
      }
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.angle * Math.PI) / 180);
        ctx.scale(1, Math.sin((this.flip * Math.PI) / 180));
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(this.size / 2, -this.size / 2, this.size, 0, 0, this.size);
        ctx.bezierCurveTo(-this.size, 0, -this.size / 2, -this.size / 2, 0, 0);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
        ctx.restore();
      }
    }

    // Floating Translucent Heart Class
    class HeartParticle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 50;
        this.size = Math.random() * 10 + 8;
        this.speedY = -(Math.random() * 0.7 + 0.4);
        this.swaySpeed = Math.random() * 0.02 + 0.01;
        this.swayDist = Math.random() * 25 + 10;
        this.baseX = this.x;
        this.step = Math.random() * 100;
        this.opacity = Math.random() * 0.35 + 0.2;
        this.color = Math.random() > 0.5 ? '#F8C8DC' : '#F4AFC4';
      }
      update() {
        this.step += this.swaySpeed;
        this.y += this.speedY;
        this.x = this.baseX + Math.sin(this.step) * this.swayDist;

        if (this.y < -30) {
          this.reset();
        }
      }
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.beginPath();
        const topCurveHeight = this.size * 0.3;
        ctx.moveTo(0, topCurveHeight);
        ctx.bezierCurveTo(0, 0, -this.size / 2, 0, -this.size / 2, topCurveHeight);
        ctx.bezierCurveTo(-this.size / 2, (this.size + topCurveHeight) / 2, 0, (this.size + topCurveHeight) / 1.4, 0, this.size);
        ctx.bezierCurveTo(0, (this.size + topCurveHeight) / 1.4, this.size / 2, (this.size + topCurveHeight) / 2, this.size / 2, topCurveHeight);
        ctx.bezierCurveTo(this.size / 2, 0, 0, 0, 0, topCurveHeight);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
        ctx.restore();
      }
    }

    for (let i = 0; i < maxPetals; i++) {
      const p = new Petal();
      p.y = Math.random() * height;
      particles.push(p);
    }
    for (let i = 0; i < maxHearts; i++) {
      const h = new HeartParticle();
      h.y = Math.random() * height;
      particles.push(h);
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      requestAnimationFrame(animate);
    }
    animate();
  }

  /* ==========================================================================
     2. AUDIO MANAGER (Persistent Playback, True Autoplay, Web Audio Fallback)
     ========================================================================== */
  class AudioManager {
    constructor() {
      const existingAudio = document.getElementById('bgm-audio');
      if (existingAudio) {
        this.audio = existingAudio;
      } else {
        this.audio = new Audio('./assets/music/background.mp3');
        this.audio.loop = true;
        this.audio.preload = 'auto';
      }

      // Default is TRUE (Music plays automatically when entering website!)
      this.isPlaying = localStorage.getItem('bgm_playing') !== 'false';
      this.isMuted = localStorage.getItem('bgm_muted') === 'true';
      this.useSynth = false;
      this.audioCtx = null;
      this.synthInterval = null;
      this.hasAttachedListeners = false;

      this.playBtn = document.getElementById('audio-play-btn');
      this.muteBtn = document.getElementById('audio-mute-btn');
      this.container = document.querySelector('.audio-controller');

      this.audio.volume = 0.85;
      this.audio.muted = this.isMuted;

      // Restore time position from previous page for seamless continuation
      const savedTime = parseFloat(sessionStorage.getItem('bgm_time') || '0');
      if (savedTime && !isNaN(savedTime) && isFinite(savedTime)) {
        try {
          this.audio.currentTime = savedTime;
        } catch (e) {}
      }

      this.initListeners();
      this.updateUI();

      // Trigger automatic music playback on enter!
      if (this.isPlaying) {
        this.tryAutoplay();
      }
    }

    initListeners() {
      if (this.playBtn) {
        this.playBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.togglePlay();
        });
      }
      if (this.muteBtn) {
        this.muteBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.toggleMute();
        });
      }

      // Periodically store current playback time for page-to-page continuity
      setInterval(() => {
        if (this.audio && !this.audio.paused && this.audio.currentTime > 0) {
          sessionStorage.setItem('bgm_time', this.audio.currentTime);
        }
      }, 750);

      window.addEventListener('beforeunload', () => {
        if (this.audio && this.audio.currentTime > 0) {
          sessionStorage.setItem('bgm_time', this.audio.currentTime);
        }
      });

      // Handle audio errors gracefully (switch to Web Audio Synthesizer)
      this.audio.addEventListener('error', () => {
        console.warn('Audio element error, falling back to Web Audio Synthesizer.');
        this.useSynth = true;
        if (this.isPlaying) {
          this.startSynth();
        }
      });

      // Synchronize play/pause UI with actual audio state
      this.audio.addEventListener('play', () => {
        this.isPlaying = true;
        localStorage.setItem('bgm_playing', 'true');
        this.updateUI();
      });

      this.audio.addEventListener('pause', () => {
        if (!this.isPlaying) {
          this.updateUI();
        }
      });
    }

    tryAutoplay() {
      const playPromise = this.audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.isPlaying = true;
            this.removeGlobalListeners();
            this.updateUI();
          })
          .catch((err) => {
            // Autoplay restricted by browser before first gesture
            // Attach instant interaction listeners so ANY touch/click immediately starts audio
            this.attachGlobalListeners();
          });
      }
    }

    attachGlobalListeners() {
      if (this.hasAttachedListeners) return;
      this.hasAttachedListeners = true;

      const triggerPlay = () => {
        if (this.isPlaying && this.audio) {
          this.audio.play().then(() => {
            this.removeGlobalListeners();
            this.updateUI();
          }).catch(() => {});
        }
      };

      this.globalTrigger = triggerPlay;
      const events = ['click', 'touchstart', 'touchend', 'pointerdown', 'mousedown', 'keydown', 'scroll'];
      events.forEach((evt) => {
        window.addEventListener(evt, triggerPlay, { once: true, passive: true });
        document.addEventListener(evt, triggerPlay, { once: true, passive: true });
      });
    }

    removeGlobalListeners() {
      if (!this.hasAttachedListeners || !this.globalTrigger) return;
      const events = ['click', 'touchstart', 'touchend', 'pointerdown', 'mousedown', 'keydown', 'scroll'];
      events.forEach((evt) => {
        window.removeEventListener(evt, this.globalTrigger);
        document.removeEventListener(evt, this.globalTrigger);
      });
      this.hasAttachedListeners = false;
    }

    togglePlay() {
      if (this.isPlaying) {
        this.pause();
      } else {
        this.play();
      }
    }

    toggleMute() {
      this.isMuted = !this.isMuted;
      localStorage.setItem('bgm_muted', this.isMuted);
      this.audio.muted = this.isMuted;
      if (this.synthGain && this.audioCtx) {
        this.synthGain.gain.setValueAtTime(this.isMuted ? 0 : 0.15, this.audioCtx.currentTime);
      }
      this.updateUI();
    }

    play() {
      this.isPlaying = true;
      localStorage.setItem('bgm_playing', 'true');
      this.updateUI();

      if (!this.useSynth) {
        const p = this.audio.play();
        if (p !== undefined) {
          p.then(() => {
            this.removeGlobalListeners();
            this.updateUI();
          }).catch((err) => {
            console.log('Play prevented, activating Web Audio Synthesizer fallback:', err);
            this.useSynth = true;
            this.startSynth();
          });
        }
      } else {
        this.startSynth();
      }
    }

    pause() {
      this.isPlaying = false;
      localStorage.setItem('bgm_playing', 'false');
      this.updateUI();
      if (!this.useSynth) {
        this.audio.pause();
      }
      this.stopSynth();
    }

    updateUI() {
      if (this.container) {
        if (this.isPlaying && (!this.audio.paused || this.useSynth)) {
          this.container.classList.add('audio-playing');
        } else {
          this.container.classList.remove('audio-playing');
        }
      }

      if (this.playBtn) {
        if (this.isPlaying) {
          this.playBtn.innerHTML = `
            <svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
          `;
          this.playBtn.setAttribute('title', 'Jeda Musik');
          this.playBtn.setAttribute('aria-label', 'Jeda Musik');
        } else {
          this.playBtn.innerHTML = `
            <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          `;
          this.playBtn.setAttribute('title', 'Putar Musik Romantis');
          this.playBtn.setAttribute('aria-label', 'Putar Musik Romantis');
        }
      }

      if (this.muteBtn) {
        if (this.isMuted) {
          this.muteBtn.innerHTML = `
            <svg viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73 4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>
          `;
          this.muteBtn.setAttribute('title', 'Bunyikan');
        } else {
          this.muteBtn.innerHTML = `
            <svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
          `;
          this.muteBtn.setAttribute('title', 'Bisukan');
        }
      }
    }

    /* Web Audio API Romantic Piano Chord Engine (Fallback) */
    initWebAudio() {
      if (!this.audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audioCtx = new AudioContext();
        this.synthGain = this.audioCtx.createGain();
        this.synthGain.gain.setValueAtTime(this.isMuted ? 0 : 0.15, this.audioCtx.currentTime);
        this.synthGain.connect(this.audioCtx.destination);
      }
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
    }

    playPianoNote(freq, time, duration = 1.6) {
      if (!this.audioCtx) return;
      const osc = this.audioCtx.createOscillator();
      const osc2 = this.audioCtx.createOscillator();
      const noteGain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq, time);

      noteGain.gain.setValueAtTime(0.0001, time);
      noteGain.gain.exponentialRampToValueAtTime(0.2, time + 0.06);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

      osc.connect(noteGain);
      osc2.connect(noteGain);
      noteGain.connect(this.synthGain);

      osc.start(time);
      osc2.start(time);
      osc.stop(time + duration);
      osc2.stop(time + duration);
    }

    startSynth() {
      this.initWebAudio();
      if (this.synthInterval) return;

      const chords = [
        [329.63, 392.0, 493.88, 587.33],
        [415.3, 493.88, 622.25, 739.99],
        [440.0, 554.37, 659.25, 880.0],
        [493.88, 659.25, 739.99, 987.77]
      ];

      let chordIdx = 0;
      const playNextChord = () => {
        if (!this.isPlaying || !this.audioCtx) return;
        const now = this.audioCtx.currentTime;
        const chord = chords[chordIdx];
        chord.forEach((freq, idx) => {
          this.playPianoNote(freq, now + idx * 0.45, 2.2);
        });
        chordIdx = (chordIdx + 1) % chords.length;
      };

      playNextChord();
      this.synthInterval = setInterval(playNextChord, 2600);
    }

    stopSynth() {
      if (this.synthInterval) {
        clearInterval(this.synthInterval);
        this.synthInterval = null;
      }
    }
  }

  // Initialize Audio Manager globally
  window.bgmManager = new AudioManager();

  // Welcome page triggers to ensure immediate play
  const welcomeBtn = document.getElementById('btn-open-welcome');
  if (welcomeBtn) {
    welcomeBtn.addEventListener('click', () => {
      if (window.bgmManager) window.bgmManager.play();
    });
  }
  const welcomeIllus = document.querySelector('.envelope-wrapper-illus');
  if (welcomeIllus) {
    welcomeIllus.addEventListener('click', () => {
      if (window.bgmManager) window.bgmManager.play();
    });
  }

  /* ==========================================================================
     3. LIGHTBOX SYSTEM (Memories Page with .jpg / .jpeg Auto-Recovery)
     ========================================================================== */
  const polaroids = document.querySelectorAll('.polaroid-card');
  const lightbox = document.getElementById('lightbox-modal');

  if (lightbox && polaroids.length > 0) {
    const lightboxImg = lightbox.querySelector('#lightbox-img');
    const lightboxCaption = lightbox.querySelector('#lightbox-caption');
    const lightboxTag = lightbox.querySelector('#lightbox-tag');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');

    let currentIndex = 0;
    const items = [];

    polaroids.forEach((card, idx) => {
      const img = card.querySelector('.polaroid-img');
      const tag = card.querySelector('.polaroid-tag');
      const caption = card.querySelector('.polaroid-caption');

      items.push({
        getSrc: () => (img ? (img.currentSrc || img.src || img.getAttribute('src')) : ''),
        alt: img ? img.getAttribute('alt') : '',
        tag: tag ? tag.textContent : `Kenangan #${idx + 1}`,
        caption: caption ? caption.textContent.trim() : ''
      });

      card.addEventListener('click', () => {
        openLightbox(idx);
      });
    });

    if (lightboxImg) {
      lightboxImg.addEventListener('error', function () {
        if (!this.dataset.retry) {
          this.dataset.retry = '1';
          if (this.src.endsWith('.jpg')) {
            this.src = this.src.replace('.jpg', '.jpeg');
          } else if (this.src.endsWith('.jpeg')) {
            this.src = this.src.replace('.jpeg', '.jpg');
          }
        }
      });
    }

    function openLightbox(index) {
      currentIndex = index;
      updateLightboxContent();
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }

    function updateLightboxContent() {
      const item = items[currentIndex];
      if (!item) return;
      if (lightboxImg) {
        lightboxImg.dataset.retry = '';
        lightboxImg.src = typeof item.getSrc === 'function' ? item.getSrc() : item.src;
        lightboxImg.alt = item.alt;
      }
      if (lightboxTag) lightboxTag.textContent = item.tag;
      if (lightboxCaption) lightboxCaption.textContent = item.caption;
    }

    function showPrev() {
      currentIndex = (currentIndex - 1 + items.length) % items.length;
      updateLightboxContent();
    }

    function showNext() {
      currentIndex = (currentIndex + 1) % items.length;
      updateLightboxContent();
    }

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', showPrev);
    if (nextBtn) nextBtn.addEventListener('click', showNext);

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    });
  }

  /* ==========================================================================
     4. INTERACTIVE ENVELOPE (Digital Letter Page)
     ========================================================================== */
  const envelopeCard = document.getElementById('interactive-envelope');
  const openLetterBtn = document.getElementById('open-letter-btn');
  const letterStationery = document.getElementById('letter-stationery');

  function openEnvelope() {
    if (envelopeCard) {
      envelopeCard.classList.add('opened');
    }
    if (openLetterBtn) {
      openLetterBtn.style.display = 'none';
    }
    if (letterStationery) {
      setTimeout(() => {
        letterStationery.classList.add('visible');
        letterStationery.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 600);
    }
    if (window.bgmManager && !window.bgmManager.isPlaying) {
      window.bgmManager.play();
    }
  }

  if (envelopeCard) {
    envelopeCard.addEventListener('click', openEnvelope);
  }
  if (openLetterBtn) {
    openLetterBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openEnvelope();
    });
  }

  /* ==========================================================================
     5. APOLOGY SCROLL REVEAL (apology.html)
     ========================================================================== */
  const apologyParas = document.querySelectorAll('.apology-paragraph');
  if (apologyParas.length > 0) {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 }
      );

      apologyParas.forEach((p, idx) => {
        p.style.transitionDelay = `${idx * 0.12}s`;
        observer.observe(p);
      });
    } else {
      apologyParas.forEach((p) => p.classList.add('revealed'));
    }
  }

  /* ==========================================================================
     6. ENDING INTERACTION (ending.html)
     ========================================================================== */
  const btnTalk = document.getElementById('btn-choice-talk');
  const btnTime = document.getElementById('btn-choice-time');
  const responseBox = document.getElementById('ending-response');

  if (responseBox) {
    const resIcon = responseBox.querySelector('.response-icon');
    const resTitle = responseBox.querySelector('.response-title');
    const resText = responseBox.querySelector('.response-text');
    const resActions = responseBox.querySelector('.response-actions');

    if (btnTalk) {
      btnTalk.addEventListener('click', () => {
        resIcon.innerHTML = '❤️';
        resTitle.textContent = 'Terima Kasih, Sayang...';
        resText.textContent =
          'Terima kasih, Sayang. Aku tidak akan menganggap kesempatan ini sebagai sesuatu yang biasa. Mari kita bicara baik-baik, tanpa ego, tanpa saling menyakiti.';
        
        resActions.innerHTML = `
          <a href="https://api.whatsapp.com/send?text=${encodeURIComponent('Sayang, aku sudah membaca website surat permintaan maafmu. Mari kita bicara baik-baik ya ❤️')}" target="_blank" rel="noopener noreferrer" class="btn-romantic">
            Kirim Pesan ke WhatsApp ❤️
          </a>
          <a href="index.html" class="btn-romantic-outline">
            Mulai dari Awal ↺
          </a>
        `;

        responseBox.classList.add('visible');
        responseBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    }

    if (btnTime) {
      btnTime.addEventListener('click', () => {
        resIcon.innerHTML = '🕊️';
        resTitle.textContent = 'Aku Mengerti, Sayang...';
        resText.textContent =
          'Tidak apa-apa, Sayang. Ambil waktu yang kamu butuhkan. Aku tidak ingin memaksamu untuk baik-baik saja sebelum kamu benar-benar siap. Perasaanmu tetap penting.';
        
        resActions.innerHTML = `
          <a href="index.html" class="btn-romantic-outline">
            Mulai dari Awal ↺
          </a>
        `;

        responseBox.classList.add('visible');
        responseBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    }
  }

  /* ==========================================================================
     7. SMOOTH PAGE TRANSITIONS
     ========================================================================== */
  const navLinks = document.querySelectorAll('a[href$=".html"]');
  const overlay = document.querySelector('.page-transition-overlay');

  if (overlay && navLinks.length > 0) {
    navLinks.forEach((link) => {
      link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href.startsWith('http') || href.startsWith('#') || this.target === '_blank') {
          return;
        }

        e.preventDefault();
        overlay.classList.add('active');

        setTimeout(() => {
          window.location.href = href;
        }, 320);
      });
    });
  }

  window.addEventListener('pageshow', () => {
    if (overlay) {
      overlay.classList.remove('active');
    }
  });

})();

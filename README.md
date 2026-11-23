# Untuk Sayang, Sebuah Surat dari Hati 💌

Sebuah website romantis, elegan, dan menyentuh hati yang dirancang khusus sebagai bentuk permintaan maaf seorang laki-laki kepada kekasih tercintanya yang biasa dipanggil **"Sayang"**.

---

## ✨ Fitur & Keunggulan Desain

1. **Konsep & Desain Romantic Pink Premium:**
   - Palet warna lembut: *Soft Pink (`#F8C8DC`)*, *Blush Pink (`#F4AFC4`)*, *Light Pink (`#FCE4EC`)*, *Cream (`#FFF8F5`)*, *Rose Pink (`#D98CA5`)*, dan *Dark Brown (`#59434F`)*.
   - Tipografi berkelas: **Playfair Display** (judul & ungkapan romantis), **Poppins** (teks isi yang nyaman dibaca), dan **Great Vibes** (aksen tulisan tangan cinta).
   - Efek visual ambient glowing orbs dan kelopak mawar serta hati yang berjatuhan secara lembut (*60 FPS Canvas Particle System*).

2. **Perjalanan Halaman yang Menyentuh (6 Langkah):**
   - **Halaman 1 (Welcome - `index.html`):** Kesan pertama yang manis dengan animasi amplop surat pink berpita hati dan tombol ajakan *"Buka Suratku ❤️"*.
   - **Halaman 2 (Memories - `memories.html`):** Tiga polaroid scrapbook romantis dengan sajak pendek, efek hover elegan, dan *Lightbox viewer* layar penuh.
   - **Halaman 3 (Apology - `apology.html`):** Ungkapan maaf yang mendalam dari lubuk hati dengan ilustrasi bunga mawar mekar dan teks yang muncul perlahan (*Scroll Reveal*).
   - **Halaman 4 (Letter - `letter.html`):** Surat cinta digital interaktif. Sentuh segel hati amplop untuk melihat animasi tutup amplop terbuka dan lembaran surat meluncur keluar.
   - **Halaman 5 (Poetry - `poetry.html`):** Sajak *"Jika Kata-Kata Bisa Memelukmu"* dalam nuansa buku puisi klasik berhiaskan pita bookmark dan ornamen bunga.
   - **Halaman 6 (Ending - `ending.html`):** Penutup yang penuh pengertian dengan dua pilihan interaktif bebas tekanan:
     - *"Aku Mau Kita Bicara ❤️"* (respon penuh syukur + opsi langsung kirim pesan WhatsApp)
     - *"Aku Butuh Waktu 🕊️"* (respon penuh empati dan penghargaan atas ruang yang dibutuhkan).

3. **Pemutar Musik Romantis (Audio Controller):**
   - Tombol **Play / Pause** & **Mute / Unmute** yang tersimpan otomatis di *localStorage* (musik tetap sinkron saat berpindah halaman).
   - Dilengkapi **Web Audio API Synthesizer Fallback**: jika file audio belum dimasukkan atau dibatasi oleh browser, website otomatis memainkan melodi piano romantis yang lembut tanpa error.

4. **Fully Responsive & Mobile-First:**
   - Dioptimalkan untuk semua resolusi (iPhone, Android, Tablet, Laptop, hingga Monitor Besar).
   - Area sentuh ramah jari (min. 44px) dan aman dari *horizontal scrolling*.

5. **GitHub Pages Ready:**
   - Murni menggunakan HTML5, CSS3, dan Vanilla JavaScript.
   - 100% path relatif, tanpa dependensi server (bebas dari error localhost/XAMPP).

---

## 📁 Struktur Berkas

```
WEB WILDAN/
├── index.html           # Halaman Pembuka (Welcome)
├── memories.html        # Halaman Galeri Kenangan (3 Foto Polaroid)
├── apology.html         # Halaman Ungkapan Maaf Mendalam
├── letter.html          # Halaman Surat Digital Interaktif
├── poetry.html          # Halaman Sajak Buku Romantis
├── ending.html          # Halaman Penutup & Keputusan
│
├── css/
│   └── style.css        # Seluruh styling, animasi, layout & responsivitas
│
├── js/
│   └── script.js        # Logika interaktif, partikel, audio & animasi
│
├── assets/
│   ├── images/
│   │   ├── foto1.jpg / foto1.jpeg # Foto kenangan 1
│   │   ├── foto2.jpg / foto2.jpeg # Foto kenangan 2
│   │   └── foto3.jpg / foto3.jpeg # Foto kenangan 3
│   └── music/
│       ├── background.mp3         # Musik romantis otomatis
│       └── background.mp4         # Sumber video/audio cadangan
└── README.md
```

---

## 📷 Cara Mengganti Foto dengan Foto Asli Kalian

1. Siapkan 3 foto kenangan terbaik bersama kekasihmu.
2. Namai ketiga foto tersebut:
   - `foto1.jpg`
   - `foto2.jpg`
   - `foto3.jpg`
3. Masukkan dan timpa foto tersebut ke dalam folder:
   `assets/images/`
4. Muat ulang (*refresh*) halaman `memories.html`. Foto akan otomatis berganti ke foto asli kalian!

---

## 🎵 Cara Mengganti Lagu Latar

1. Siapkan lagu romantis favorit kalian (misalnya lagu kenangan kalian berdua) dalam format `.mp3`.
2. Beri nama file tersebut `background.mp3`.
3. Masukkan ke dalam folder:
   `assets/music/`
4. Muat ulang website dan tekan tombol putar musik di pojok kanan atas.

---

## 🚀 Panduan Upload ke GitHub Pages

1. Buat repository baru di [GitHub](https://github.com/) (contoh nama repo: `untuk-sayang`).
2. Buka terminal di folder ini (`d:\WEB WILDAN`) dan jalankan:
   ```bash
   git init
   git add .
   git commit -m "Initial commit website Untuk Sayang"
   git branch -M main
   git remote add origin https://github.com/USERNAME/untuk-sayang.git
   git push -u origin main
   ```
3. Di halaman repository GitHub:
   - Masuk ke tab **Settings** > menu **Pages** di sebelah kiri.
   - Pada bagian **Build and deployment** > **Source**, pilih **Deploy from a branch**.
   - Pada bagian **Branch**, pilih branch `main` dan folder `/(root)`, lalu klik **Save**.
4. Tunggu sekitar 1–2 menit, website kamu akan aktif di URL:
   `https://USERNAME.github.io/untuk-sayang/`
5. Kirim tautan tersebut kepada Sayang dengan penuh ketulusan. ❤️

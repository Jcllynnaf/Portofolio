        // --- LOGIKA HEADER STICKY & NAV TOGGLE ---
        const siteHeader = document.querySelector('.site-header');
        const navToggle = document.querySelector('.nav-toggle');
        const mainNav = document.querySelector('.main-navigation');
        if (siteHeader && navToggle && mainNav) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) { siteHeader.classList.add('scrolled'); } 
                else { siteHeader.classList.remove('scrolled'); }
            });
            navToggle.addEventListener('click', () => {
                mainNav.classList.toggle('active');
                navToggle.classList.toggle('active');
            });
        }


        // --- LOGIKA ANIMASI SCROLL ---
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) { entry.target.classList.add('visible'); }
            });
        }, { threshold: 0.1 });
        const elementsToReveal = document.querySelectorAll('.reveal');
        elementsToReveal.forEach(el => observer.observe(el));
        
        // --- LOGIKA MODAL PRODUK (BARU) ---
        const productDetailButtons = document.querySelectorAll('.product-detail-btn');
        const modalOverlay = document.getElementById('product-modal-overlay');
        const closeModalBtn = document.getElementById('close-modal-btn');
        const modalImageContainer = document.getElementById('modal-image-container');
        const modalTitle = document.getElementById('modal-title');
        const modalPrice = document.getElementById('modal-price');
        const modalDescription = document.getElementById('modal-description');
        const modalBuyBtn = document.getElementById('modal-buy-btn');
        let modalSwiper = null;

const openModal = (data) => {
            modalTitle.textContent = data.title;
            modalPrice.textContent = data.price;
            modalDescription.innerHTML = data.description;
            modalBuyBtn.href = data.waLink;
            
            modalImageContainer.innerHTML = '';
            modalImageContainer.classList.remove('osint-image-square');

            if (data.title === 'VIP OSINT V2.14') {
                modalImageContainer.classList.add('osint-image-square');
            }

            if (data.images && data.images.length > 0) {
                // HAPUS onclick dari sini, gambar akan ditangani oleh event listener terpisah
                const sliderHTML = `
                    <div class="swiper modal-slider">
                        <div class="swiper-wrapper">
                            ${data.images.map(img => `
                                <div class="swiper-slide">
                                    <img src="${img}" alt="${data.title}" title="Perbesar gambar">
                                </div>
                            `).join('')}
                        </div>
                        <div class="swiper-pagination"></div>
                        <div class="swiper-button-prev"></div>
                        <div class="swiper-button-next"></div>
                    </div>
                `;
                modalImageContainer.innerHTML = sliderHTML;
                modalSwiper = new Swiper('.modal-slider', {
                    loop: true,
                    pagination: { el: '.swiper-pagination', clickable: true },
                    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
                });
            } else if (data.image) {
                modalImageContainer.innerHTML = `<img src="${data.image}" alt="${data.title}" title="Perbesar gambar">`;
            }
            modalOverlay.classList.add('active');
        };

        const closeModal = () => {
            modalOverlay.classList.remove('active');
            if (modalSwiper) {
                modalSwiper.destroy(true, true);
                modalSwiper = null;
            }
        };

        productDetailButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const card = button.closest('.item-card');
                const imagesAttr = card.dataset.images;
                const productData = {
                    title: card.dataset.title,
                    price: card.dataset.price,
                    image: card.dataset.image,
                    images: imagesAttr ? JSON.parse(imagesAttr) : null,
                    description: card.dataset.description,
                    waLink: card.dataset.waLink
                };
                openModal(productData);
            });
        });

        if(closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
        if(modalOverlay) modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });

// --- LOGIKA SLIDER KEAHLIAN ---
const skillsSwiper = new Swiper('.skills-slider', {
    slidesPerView: 'auto', // Menampilkan slide sebanyak mungkin tanpa merusak layout
    spaceBetween: 15,      // Jarak antar kartu keahlian
    freeMode: true,        // Memungkinkan slider digeser bebas tanpa terkunci per slide
    grabCursor: true,      // Menampilkan ikon tangan saat cursor di atas slider
});
// ... (Kode JavaScript yang sudah ada untuk header sticky, nav toggle, modal produk, dan skills slider) ...

        // --- LOGIKA TERMINAL BARU ---
        const terminalToggleBtn = document.querySelector('.terminal-toggle');
        const terminalOverlay = document.getElementById('terminal-overlay');
        const closeTerminalBtn = document.querySelector('.close-terminal-btn');
        const terminalOutput = document.getElementById('terminal-output');
        const terminalAsciiArt = document.getElementById('ascii-art');
        const terminalLinesContainer = document.getElementById('terminal-lines');
        const terminalInputLine = document.querySelector('.terminal-input-line');
        const terminalInput = document.getElementById('terminal-input'); // Ambil elemen input
        const terminalInputCursor = document.querySelector('.input-cursor');

        // Konten ASCII art Anda
        const asciiArtContent = `
⠀⠀⠀⠀⠀⠀⣰⣶⣶⣶⣶⡆⢠⣴⣾⣷⣶⡄⠀⢀⣴⣾⣿⣶⣄⠀⠀⠀⣠⣶⣾⣷⡆⢰⣶⣶⡆⣴⣶⣶⣶⣶⣆⣶⣶⣶⣶⣶⣶⣶⣶⣆⢀⣶⣶⡶⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣿⣿⡿⠿⠿⢁⣿⣿⡿⠻⣿⠁⣰⣿⣿⣿⣿⣿⣿⣆⠀⣼⣿⣿⣿⣿⡇⢸⣿⣿⠀⣿⣿⡿⠿⠿⢸⣿⣿⣿⣿⣿⡇⢿⣿⣿⣾⣿⡿⠁⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣿⣿⣧⣤⡄⠘⣿⣿⣷⣤⡀⢠⣿⣿⡟⠀⠈⣿⣿⣿⢸⣿⣿⠏⠀⠀⠁⣾⣿⣿⢀⣿⣿⣷⣶⡆⠀⠀⣿⣿⡏⠀⠀⠘⣿⣿⣿⡿⠁⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⠇⠀⠈⠛⣿⣿⣿⢸⣿⣿⡇⠀⢠⣿⣿⡏⢸⣿⣿⡀⠀⢀⠀⣿⣿⡇⢸⣿⣿⠿⠿⠇⠀⢰⣿⣿⡇⠀⠀⠀⣿⣿⣿⠁⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⣸⣿⣿⠀⠀⠀⣼⣷⣴⣿⣿⡿⠘⣿⣿⣿⣿⣿⣿⡟⠀⢸⣿⣿⣿⣿⡿⢸⣿⣿⡇⣼⣿⣿⣤⣤⡄⠀⢸⣿⣿⠁⠀⠀⠀⣿⣿⡏⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⣿⣿⡿⠀⠀⠘⠿⢿⣿⡿⠟⠁⠀⠘⠿⣿⣿⠿⠋⠀⠀⠀⠹⢿⣿⡿⠇⢸⣿⣿⠃⣿⣿⣿⣿⣿⠀⠀⣾⣿⣿⠀⠀⠀⢠⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀
        `;
        // Baris teks yang akan ditampilkan di terminal
        const terminalLines = [
            { text: '> Booting system kernel...' },
            { text: '> Initializing modules...' },
            { text: '> Bypassing firewalls...', isAction: true },
            { text: '> Access granted. Type "help" for commands.', isAction: true, final: true },
        ];
        const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

        async function typeWriterTerminal(element, text) {
            terminalInputCursor.style.display = 'none'; // Sembunyikan kursor input saat mengetik
            element.classList.add('cursor');
            for (let i = 0; i < text.length; i++) {
                element.textContent += text.charAt(i);
                terminalOutput.scrollTop = terminalOutput.scrollHeight; // Scroll ke bawah
                await sleep(30); // Kecepatan ketik
            }
            element.classList.remove('cursor');
            terminalInputCursor.style.display = 'inline-block'; // Tampilkan kembali kursor input setelah ketik selesai
        }

        async function runActionTerminal(element, text) {
            terminalInputCursor.style.display = 'none';
            element.classList.add('cursor');
            element.textContent = text + ' ';
            for (let i = 0; i < 3; i++) {
                await sleep(350); // Kecepatan titik-titik
                element.textContent += '.';
                terminalOutput.scrollTop = terminalOutput.scrollHeight;
            }
            await sleep(200); // Waktu tunggu setelah [DONE]
            element.textContent = text + ' [DONE]';
            element.classList.remove('cursor');
            terminalInputCursor.style.display = 'inline-block';
        }

        let terminalAnimationStarted = false; // Flag untuk memastikan animasi hanya berjalan sekali per pembukaan

        async function startTerminalAnimation() {
            if (terminalAnimationStarted) return; // Jangan jalankan lagi jika sudah jalan
            terminalAnimationStarted = true;

            terminalAsciiArt.textContent = asciiArtContent;
            terminalAsciiArt.classList.remove('hidden'); // Pastikan ASCII art terlihat
            await sleep(1000); // Waktu tunggu sebelum mulai mengetik baris

            for (const line of terminalLines) {
                const p = document.createElement('p');
                terminalLinesContainer.appendChild(p);
                if (line.isAction) {
                    await runActionTerminal(p, line.text);
                } else {
                    await typeWriterTerminal(p, line.text);
                }
                terminalOutput.scrollTop = terminalOutput.scrollHeight; // Pastikan selalu scroll ke bawah
                if (!line.final) { await sleep(200); }
            }
            terminalInputLine.style.display = 'flex'; // Tampilkan baris input setelah animasi selesai
            terminalInput.focus(); // Fokuskan input field setelah animasi selesai
        }

        if (terminalToggleBtn && terminalOverlay && closeTerminalBtn) {
            terminalToggleBtn.addEventListener('click', () => {
                terminalOverlay.classList.add('active'); // Tampilkan overlay terminal
                document.body.style.overflow = 'hidden'; // Mencegah scroll body saat terminal aktif
                startTerminalAnimation(); // Mulai animasi saat terminal dibuka
            });

            closeTerminalBtn.addEventListener('click', () => {
                terminalOverlay.classList.remove('active'); // Sembunyikan overlay terminal
                document.body.style.overflow = ''; // Mengembalikan scroll body

                // Reset terminal content
                terminalLinesContainer.innerHTML = ''; // Hapus baris teks
                terminalInputLine.style.display = 'none'; // Sembunyikan input
                terminalAsciiArt.textContent = ''; // Hapus ASCII art
                terminalAnimationStarted = false; // Reset flag
                terminalInput.value = ''; // Kosongkan input field
            });

            // Tutup terminal jika mengklik di luar jendela terminal itu sendiri
            terminalOverlay.addEventListener('click', (e) => {
                if (e.target === terminalOverlay) {
                    closeTerminalBtn.click(); // Panggil event listener tombol tutup
                }
            });
        }

        // --- LOGIKA PERINTAH TERMINAL ---
        const commands = {
            'help': 'Available commands: help, whoami, skills, projects, contact, clear',
            'whoami': 'Hello, I am Jcllynnaf. A Full Stuck Developer and Ethical Hacking Enthusiast. I build tools and explore digital security.',
            'skills': `My skills include:
            - Python
            - SQL, Pawn
            - Linux, Terminal, OSINT, Security
            - Git, GitHub, OCR, VPS, DigitalOcean and Others`,
            'projects': `Some of my projects:
            - HeRecon: OSINT tool for domain reconnaissance. (Source: github.com/Jcllynnaf/HeRecon)
            - WIFI-Attack: Cyber security tool for wireless networks. (Source: github.com/Jcllynnaf/WIFI-Attack)
            - HerOSINT: OSINT IP scanner. (Source: github.com/Jcllynnaf/HerOSINT)`,
            'contact': 'You can reach me at: heroinfatherfsociety@gmail.com or WhatsApp: +6282172115963',
            'clear': '' // Perintah clear akan ditangani secara terpisah
        };

        terminalInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const command = terminalInput.value.trim().toLowerCase();
                terminalInput.value = ''; // Clear input field

                // Tampilkan perintah yang diketik pengguna
                const inputEcho = document.createElement('p');
                inputEcho.innerHTML = `<span class="prompt">heroinfather@fsociety:~$</span> ${command}`;
                terminalLinesContainer.appendChild(inputEcho);

                let outputText = '';
                if (command === 'clear') {
                    terminalLinesContainer.innerHTML = ''; // Clear all previous output
                    terminalAsciiArt.textContent = ''; // Clear ASCII art
                } else if (commands[command]) {
                    outputText = commands[command];
                } else {
                    outputText = `Command not found: ${command}. Type "help" for available commands.`;
                }

                if (outputText) {
                    const outputP = document.createElement('p');
                    // Ganti newline dengan <br> untuk tampilan multiline di HTML <p>
                    outputP.innerHTML = outputText.replace(/\n/g, '<br>');
                    terminalLinesContainer.appendChild(outputP);
                }

                terminalOutput.scrollTop = terminalOutput.scrollHeight; // Auto scroll to bottom
            }
        });

        
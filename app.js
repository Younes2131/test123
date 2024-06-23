document.addEventListener('DOMContentLoaded', function() {
    // Felhantering
    window.onerror = function(meddelande, källa, rad, kolumn, fel) {
        console.error('Ett fel inträffade:', meddelande, 'i', källa, 'på rad', rad);
        document.getElementById('loader').innerHTML = 'Ett fel inträffade. Vänligen försök ladda om sidan.';
    };

    // Funktion för att ta bort laddaren
    function taBortLaddare() {
        const laddare = document.getElementById('loader');
        if (laddare) {
            laddare.style.display = 'none';
        }
    }

    // Simulera laddningstid och textanimation
    setTimeout(() => {
        const textElement = document.querySelector('.neon-text');
        textElement.textContent = 'Hitta mig om du kan!';
        textElement.classList.add('run-away');
        
        setTimeout(() => {
            taBortLaddare();
        }, 2000);
    }, 2000);

    // Temakonfigurator
    class TemaKonfigurator {
        constructor() {
            this.temaKontroller = document.getElementById('theme-toggle');
            if (this.temaKontroller) {
                this.initieraTemaVäxlare();
            }
        }

        initieraTemaVäxlare() {
            const ljustLäge = document.getElementById('light-mode');
            const mörktLäge = document.getElementById('dark-mode');
            
            ljustLäge.addEventListener('click', () => this.bytTema('ljust'));
            mörktLäge.addEventListener('click', () => this.bytTema('mörkt'));

            // Ladda sparat tema
            const sparatTema = localStorage.getItem('tema') || 'mörkt';
            this.bytTema(sparatTema);
        }

        bytTema(tema) {
            document.body.className = tema;
            localStorage.setItem('tema', tema);
            this.uppdateraAktivKnapp(tema);
        }

        uppdateraAktivKnapp(tema) {
            const ljustLäge = document.getElementById('light-mode');
            const mörktLäge = document.getElementById('dark-mode');
            ljustLäge.classList.toggle('active', tema === 'ljust');
            mörktLäge.classList.toggle('active', tema === 'mörkt');
        }
    }

    new TemaKonfigurator();

    // Mjuk scrollning
    document.querySelectorAll('a[href^="#"]').forEach(länk => {
        länk.addEventListener('click', function (e) {
            e.preventDefault();
            const mål = document.querySelector(this.getAttribute('href'));
            if (mål) {
                mål.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer för sektionsanimeringar
    const sektioner = document.querySelectorAll('section');
    const observatörInställningar = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const sektionObservatör = new IntersectionObserver((entries, observatör) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observatör.unobserve(entry.target);
            }
        });
    }, observatörInställningar);

    sektioner.forEach(sektion => {
        sektionObservatör.observe(sektion);
    });

    // Animera tjänstekort
    const tjänsteKort = document.querySelectorAll('.service-card');
    tjänsteKort.forEach(kort => {
        kort.addEventListener('mouseenter', () => {
            kort.style.transform = 'translateY(-10px)';
        });
        kort.addEventListener('mouseleave', () => {
            kort.style.transform = 'translateY(0)';
        });
    });

    // Animera portfolioöverlägg
    const portfolioObjekt = document.querySelectorAll('.portfolio-item');
    portfolioObjekt.forEach(objekt => {
        const överlägg = objekt.querySelector('.portfolio-overlay');
        objekt.addEventListener('mouseenter', () => {
            överlägg.style.opacity = '1';
        });
        objekt.addEventListener('mouseleave', () => {
            överlägg.style.opacity = '0';
        });
    });

    // Hantera kontaktformulär
    const kontaktFormulär = document.getElementById('contact-form');
    if (kontaktFormulär) {
        kontaktFormulär.addEventListener('submit', function(e) {
            e.preventDefault();
            // Implementera formulärhantering och validering här
            console.log('Formulär skickat');
        });
    }

    // Anpassad markör
    const markör = document.getElementById('cursor');
    if (markör) {
        document.addEventListener('mousemove', (e) => {
            markör.style.left = e.clientX + 'px';
            markör.style.top = e.clientY + 'px';
        });
    }

    // Skriv-animation för hemskärmen
    const skrivText = document.querySelector('.typewriter');
    if (skrivText) {
        const text = skrivText.textContent;
        skrivText.textContent = '';
        let i = 0;
        function skriv() {
            if (i < text.length) {
                skrivText.textContent += text.charAt(i);
                i++;
                setTimeout(skriv, 50);
            }
        }
        skriv();
    }

    // Glitch-effekt för rubrik
    const glitchText = document.querySelector('.glitch-text');
    if (glitchText) {
        setInterval(() => {
            glitchText.classList.add('glitch');
            setTimeout(() => {
                glitchText.classList.remove('glitch');
            }, 200);
        }, 3000);
    }
});




// Google sheets

const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());
        
        // Send data to Google Apps Script
        fetch('https://script.google.com/macros/s/AKfycbw0PuGpYsguJm1GvBV-UrOsso7K9nWngJQsc0Idug-x8a_HIK7Bo4BUjzh34OKC2oztCg/exec', {
            method: 'POST',
            mode: 'no-cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(() => {
            alert('Tack för ditt meddelande! Vi återkommer så snart som möjligt.');
            contactForm.reset();
        }).catch(error => {
            console.error('Error:', error);
            alert('Ett fel uppstod. Vänligen försök igen senare.');
        });
    });
}





//Hamburgaren toggle

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger-menu');
    const nav = document.getElementById('main-nav');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = nav.contains(event.target);
        const isClickInsideHamburger = hamburger.contains(event.target);

        if (!isClickInsideNav && !isClickInsideHamburger && nav.classList.contains('active')) {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
        }
    });
});

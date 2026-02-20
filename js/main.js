// ==========================================
// NAVIGATION
// ==========================================

const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ==========================================
// SMOOTH SCROLL
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // Navbar height
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// BACK TO TOP BUTTON
// ==========================================

const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

// ==========================================
// SCROLL ANIMATIONS
// ==========================================

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate skill bars
            if (entry.target.classList.contains('skill-progress')) {
                const width = entry.target.style.width;
                entry.target.style.width = '0';
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 100);
            }
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.fade-in, .timeline-item, .skill-item, .project-card').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Observe skill bars specifically
document.querySelectorAll('.skill-progress').forEach(el => {
    observer.observe(el);
});

// ==========================================
// TYPING EFFECT (Optional enhancement)
// ==========================================

class TypeWriter {
    constructor(element, words, wait = 3000) {
        this.element = element;
        this.words = words;
        this.text = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        if (this.isDeleting) {
            this.text = fullTxt.substring(0, this.text.length - 1);
        } else {
            this.text = fullTxt.substring(0, this.text.length + 1);
        }

        this.element.innerHTML = `<span class="txt">${this.text}</span><span class="cursor">|</span>`;

        let typeSpeed = 100;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.text === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.text === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Initialize typing effect if element exists
const typingElement = document.querySelector('.typing-text');
if (typingElement) {
    const words = JSON.parse(typingElement.getAttribute('data-words'));
    new TypeWriter(typingElement, words);
}

// ==========================================
// PARALLAX EFFECT
// ==========================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.image-bg, .floating-card');
    
    parallaxElements.forEach(el => {
        const speed = el.classList.contains('image-bg') ? 0.5 : 0.2;
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ==========================================
// ACTIVE NAV LINK
// ==========================================

const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ==========================================
// FORM HANDLING (if you add a contact form later)
// ==========================================

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        console.log('Form data:', data);
        
        // Show success message
        alert('¡Mensaje enviado con éxito! Te contactaré pronto.');
        contactForm.reset();
    });
}

// ==========================================
// PERFORMANCE: Lazy load images
// ==========================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==========================================
// CONSOLE EASTER EGG
// ==========================================

console.log('%c👋 ¡Hola! ', 'font-size: 24px; font-weight: bold; color: #00d4ff;');
console.log('%c¿Buscando un Ingeniero en Informática? ', 'font-size: 16px; color: #7c3aed;');
console.log('%cContáctame: luisguile495@gmail.com', 'font-size: 14px; color: #a0a0b0;');
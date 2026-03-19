/* =====================================================
   script.js – Portfolio Interactions
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ----- Mobile Hamburger Toggle ----- */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            const icon = hamburger.querySelector('.material-symbols-outlined');
            if (icon) {
                icon.textContent = navLinks.classList.contains('open') ? 'close' : 'menu';
            }
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                const icon = hamburger.querySelector('.material-symbols-outlined');
                if (icon) icon.textContent = 'menu';
            });
        });
    }

    /* ----- Scroll-Triggered Animations ----- */
    const fadeElements = document.querySelectorAll('.fade-up');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        fadeElements.forEach((el, index) => {
            el.style.transitionDelay = `${index * 80}ms`;
            observer.observe(el);
        });
    } else {
        // Fallback: just show them
        fadeElements.forEach(el => el.classList.add('visible'));
    }

    /* ----- Active Nav Link on Scroll ----- */
    const sections = document.querySelectorAll('section[id]');
    const topNavLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    const bottomNavLinks = document.querySelectorAll('.bottom-nav a[href^="#"]');

    function updateActiveNav() {
        const scrollPos = window.scrollY + 120;

        let currentSection = '';
        sections.forEach(section => {
            if (section.offsetTop <= scrollPos) {
                currentSection = section.getAttribute('id');
            }
        });

        topNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });

        bottomNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    if (sections.length > 0) {
        window.addEventListener('scroll', updateActiveNav, { passive: true });
        updateActiveNav();
    }

    /* ----- Navbar Background on Scroll ----- */
    const topNav = document.querySelector('.top-nav');
    if (topNav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                topNav.style.background = 'rgba(19, 19, 19, 0.9)';
            } else {
                topNav.style.background = 'rgba(19, 19, 19, 0.7)';
            }
        }, { passive: true });
    }
});

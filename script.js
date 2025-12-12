document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. SMOOTH SCROLLING FOR NAVIGATION ---
    const navLinks = document.querySelectorAll('.hero-nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all
            navLinks.forEach(nav => nav.classList.remove('active'));
            // Add active class to clicked
            this.classList.add('active');
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- 2. "BOOK NOW" BUTTONS ACTION ---
    // Make all "Book" buttons scroll to the contact footer
    // Note: We deliberately exclude .btn-whatsapp so it opens the link naturally
    const bookButtons = document.querySelectorAll('.btn-book, .btn-big-book');
    const contactSection = document.querySelector('#contact');

    bookButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            if (contactSection) {
                contactSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 3. ACTIVE LINK HIGHLIGHTER ON SCROLL ---
    // Updates the pill menu as you scroll through sections
    const sections = document.querySelectorAll('section, header, footer');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            
            // Offset logic to trigger highlight slightly before section hits top
            // 250px buffer makes the UI feel more responsive
            if (scrollY >= (sectionTop - 250)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // --- 4. PREMIUM FADE-IN ANIMATIONS ON SCROLL ---
    // This watches for elements to enter the screen and adds the 'visible' class
    // This creates that high-end "site loading as you move" feel
    const observerOptions = {
        threshold: 0.15, // Trigger when 15% of the item is visible
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Force inline styles via JS to ensure animation plays cleanly
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                
                // Stop observing once visible to save performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // --- 5. TARGET ELEMENTS FOR ANIMATION ---
    // We explicitly target all key visual elements, including the new film reel
    const animatedElements = document.querySelectorAll(`
        .pricing-card, 
        .service-card, 
        .about-text-content, 
        .about-image-wrapper, 
        .film-reel-container,
        .collage-grid-1, 
        .collage-grid-2-refined, 
        .collage-grid-3,
        .collage-grid-5,
        .review-card,
        .section-title
    `);
    
    animatedElements.forEach((el, index) => {
        // Set initial state via JS immediately
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        
        // Add smooth transition
        el.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out";
        
        observer.observe(el);
    });
});
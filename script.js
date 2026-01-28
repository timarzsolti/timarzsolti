// Initialize Lenis smooth scroll
const lenis = new Lenis({
    lerp: 0.05,  // Lower value = smoother scroll
    wheelMultiplier: 1,
    smoothWheel: true,
    autoRaf: true
});

// Optional: Log scroll events
lenis.on('scroll', (e) => {
    console.log('Scrolling:', e.progress);
});

// Integrate with GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// GSAP Scroll Animations
gsap.registerPlugin(ScrollTrigger);

// Fade in sections on scroll
gsap.utils.toArray('section').forEach((section, index) => {
    if (index === 0) return; // Skip hero section
    
    gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1,
        }
    });
});

// Parallax effect for specific sections
gsap.utils.toArray('.parallax-section').forEach((section) => {
    gsap.to(section, {
        y: -100,
        ease: 'none',
        scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
        }
    });
});

// Animate skill cards
gsap.utils.toArray('.skill-card').forEach((card, index) => {
    gsap.from(card, {
        opacity: 0,
        y: 60,
        rotation: 5,
        duration: 0.8,
        scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
        },
        delay: index * 0.15
    });
});

// Animate experience items
gsap.utils.toArray('.experience-item').forEach((item, index) => {
    gsap.from(item, {
        opacity: 0,
        x: index % 2 === 0 ? -100 : 100,
        duration: 1,
        scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
        }
    });
});

// Smooth scroll to anchors (if you add navigation)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            lenis.scrollTo(target, {
                offset: 0,
                duration: 1.5
            });
        }
    });
});

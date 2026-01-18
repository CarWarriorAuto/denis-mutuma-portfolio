document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. STATS COUNTER LOGIC ---
    const counters = document.querySelectorAll('.counter');
    
    const startCounting = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                let current = 0;
                
                // Speed calculation
                const duration = 2000; // 2 seconds
                const stepTime = 20; 
                const totalSteps = duration / stepTime;
                const increment = target / totalSteps;

                const updateCount = () => {
                    if (current < target) {
                        current += increment;
                        counter.innerText = Math.ceil(current);
                        setTimeout(updateCount, stepTime);
                    } else {
                        counter.innerText = target + "+";
                    }
                };

                updateCount();
                observer.unobserve(counter);
            }
        });
    };

    const observer = new IntersectionObserver(startCounting, {
        threshold: 0.5 // Starts when half the counter is visible
    });

    counters.forEach(counter => observer.observe(counter));

    // --- 2. SMOOTH SCROLL REVEAL ---
    const revealSections = () => {
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < window.innerHeight - 100) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    };

    window.addEventListener('scroll', revealSections);
    revealSections(); // Run once on load
});
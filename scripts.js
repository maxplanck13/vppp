document.addEventListener('DOMContentLoaded', () => {
    // Navigation Scroll Effect
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });

    // Intersection Observer for Scroll Animations
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Live Impact Board Logic (Algorithm driven by 10,000 boxes/day capacity)
    const startDate = new Date('2025-08-01T00:00:00Z').getTime();
    const boxesPerMs = 1000000 / 86400000; // 10k boxes divided by MS in a day
    const formatNumber = (num) => Math.floor(num).toLocaleString();

    function updateCounters() {
        const now = Date.now();
        const msElapsed = now - startDate;

        // Mathematical projections
        const totalMade = msElapsed * boxesPerMs;
        const totalDelivered = totalMade * 0.96; // Estimate 96% fulfillment rate
        const plasticSaved = totalMade * 0.045;  // 45g of plastic saved per box

        document.getElementById('stat-made').innerText = formatNumber(totalMade);
        document.getElementById('stat-delivered').innerText = formatNumber(totalDelivered);
        document.getElementById('stat-plastic').innerText = formatNumber(plasticSaved) + ' KG';

        requestAnimationFrame(updateCounters); // Trigger loop safely
    }

    // Rapid spin-up animation for initial load
    const speedMs = 2500;
    const startTime = Date.now();

    function initialSpinUp() {
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / speedMs, 1);

        // Cubic Ease-Out to make the counter slow down as it finishes
        const ease = 1 - Math.pow(1 - progress, 4);

        const liveMsElapsed = now - startDate;
        const targetMade = liveMsElapsed * boxesPerMs;
        const targetDelivered = targetMade * 0.96;
        const targetPlastic = targetMade * 0.045;

        document.getElementById('stat-made').innerText = formatNumber(targetMade * ease);
        document.getElementById('stat-delivered').innerText = formatNumber(targetDelivered * ease);
        document.getElementById('stat-plastic').innerText = formatNumber(targetPlastic * ease) + ' KG';

        if (progress < 1) {
            requestAnimationFrame(initialSpinUp);
        } else {
            // Animation finished! Switch to real-time sync.
            requestAnimationFrame(updateCounters);
        }
    }

    // Start counters if stats exist on page
    if (document.getElementById('stat-made')) {
        initialSpinUp();
    }
});

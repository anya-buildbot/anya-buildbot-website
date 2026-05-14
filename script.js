(function() {
    const topBar = document.getElementById('top-bar');
    const mainNav = document.getElementById('main-nav');
    const hero = document.getElementById('hero');
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    function updatePositions() {
        if (!topBar || !mainNav || !hero) return;

        const topBarHeight = topBar.offsetHeight;
        mainNav.style.top = topBarHeight + 'px';

        const navHeight = mainNav.offsetHeight;
        const totalFixedHeight = topBarHeight + navHeight;

        hero.style.paddingTop = (totalFixedHeight + 16) + 'px';
        hero.style.paddingBottom = '5rem';
    }

    updatePositions();
    window.addEventListener('resize', updatePositions);
    window.addEventListener('load', updatePositions);

    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            const icon = menuButton.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        });

        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                const icon = menuButton.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }

    function animateOnScroll() {
        const elements = document.querySelectorAll('.animate-on-scroll, .animate-left, .animate-right, .animate-scale, .stagger-children');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;
            if (elementTop < windowHeight - 100 && elementBottom > 0) {
                element.classList.add('animated');
            }
        });
    }

    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        animateOnScroll();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollSpeed = Math.abs(scrollTop - lastScrollTop);
        let style = document.getElementById('dynamic-scroll-style');
        if (!style) {
            style = document.createElement('style');
            style.id = 'dynamic-scroll-style';
            document.head.appendChild(style);
        }
        const scrollPercent = (scrollTop / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        const intensity = Math.min(scrollSpeed / 10, 1);
        style.textContent = `
            ::-webkit-scrollbar-thumb {
                background: linear-gradient(180deg, 
                    #2563eb ${scrollPercent}%, 
                    #dc2626 ${scrollPercent + 20}%, 
                    #eab308 ${scrollPercent + 40}%
                );
                border-radius: 6px;
                border: 2px solid #0f172a;
                transition: all 0.3s ease;
                opacity: ${0.8 + intensity * 0.2};
            }
            ::-webkit-scrollbar-thumb:hover {
                background: linear-gradient(180deg, 
                    #3b82f6 ${scrollPercent}%, 
                    #ef4444 ${scrollPercent + 20}%, 
                    #f59e0b ${scrollPercent + 40}%
                );
            }
        `;
        lastScrollTop = scrollTop;
    });

    document.addEventListener('DOMContentLoaded', animateOnScroll);
    setTimeout(animateOnScroll, 300);
})();

// Enhance service & portfolio hover for touch devices and add simple text cycling effect
(function(){
    // Add class to service cards for consistent styling
    const serviceCards = Array.from(document.querySelectorAll('#services > .max-w-7xl > .grid .bg-white'));
    serviceCards.forEach(card => card.classList.add('service-item'));

    // Portfolio items already have class portfolio-item; ensure NodeList is converted
    const portfolioItems = Array.from(document.querySelectorAll('.portfolio-item'));

    function enableTouchToggle(list) {
        list.forEach(item => {
            let touchTimer = null;
            item.addEventListener('touchstart', function(e){
                // Toggle active class on first tap, let second tap follow link if any
                if (!item.classList.contains('is-active')) {
                    e.preventDefault();
                    // remove active from others
                    list.forEach(i => i.classList.remove('is-active'));
                    item.classList.add('is-active');
                    // remove after 3s
                    touchTimer = setTimeout(()=> item.classList.remove('is-active'), 3000);
                }
            }, {passive: false});
            item.addEventListener('touchend', function(){
                if (touchTimer) clearTimeout(touchTimer);
            });
        });
    }

    if ('ontouchstart' in window) {
        enableTouchToggle(serviceCards.concat(portfolioItems));
    }

    // Simple rotating text effect for hero title (if contains <span> items separated by | )
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const span = heroTitle.querySelector('span');
        if (span) {
            const words = span.textContent.split(/[|,;\/Â·â€¢]/).map(s=>s.trim()).filter(Boolean);
            if (words.length > 1) {
                let idx = 0;
                span.textContent = words[idx];
                setInterval(() => {
                    idx = (idx + 1) % words.length;
                    span.style.opacity = '0';
                    setTimeout(()=>{
                        span.textContent = words[idx];
                        span.style.opacity = '1';
                    }, 300);
                }, 2500);
            }
        }
    }
})();

// Contact form: build a mailto: link on submit (more reliable than form action="mailto:" in many browsers).
(function(){
    function setupContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;
        if (form.dataset.bound === '1') return;
        form.dataset.bound = '1';

        form.addEventListener('submit', function(e) {
            // Let the browser show built-in validation UI if invalid.
            if (!form.checkValidity()) return;

            e.preventDefault();

            const nameEl = document.getElementById('name');
            const emailEl = document.getElementById('email');
            const serviceEl = document.getElementById('service');
            const messageEl = document.getElementById('message');

            const name = nameEl ? nameEl.value.trim() : '';
            const email = emailEl ? emailEl.value.trim() : '';
            const service = serviceEl ? serviceEl.value.trim() : '';
            const message = messageEl ? messageEl.value.trim() : '';

            const to = 'imolketk@gmail.com';
            const subject = 'Anya BuildBot Contact Form';
            const body =
                `Name: ${name}\n` +
                `Email: ${email}\n\n` +
                `Service: ${service}\n\n` +
                `Message:\n${message}\n`;

            const mailto =
                `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            // This will open the user's default email app (it won't auto-send).
            window.location.href = mailto;
        });
    }

    document.addEventListener('DOMContentLoaded', setupContactForm);
    setupContactForm();
})();

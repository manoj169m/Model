const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});


// Before & After Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Swiper
    const swiper = new Swiper('.swiper-container', {
        // Optional parameters
        loop: false,
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        }
    });
    
    // Before & After Slider Functionality
    const sliders = document.querySelectorAll('.slider-before-after');
    
    sliders.forEach(slider => {
        const handle = slider.querySelector('.slider-handle');
        const divider = slider.querySelector('.slider-divider');
        let isDown = false;
        
        // Set initial position to 50%
        slider.style.setProperty('--position', '50%');
        
        // Mouse events
        handle.addEventListener('mousedown', () => {
            isDown = true;
        });
        
        window.addEventListener('mouseup', () => {
            isDown = false;
        });
        
        window.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            handleMove(e.clientX, slider);
        });
        
        // Touch events
        handle.addEventListener('touchstart', (e) => {
            isDown = true;
            e.preventDefault(); // Prevent default touch behavior
        });
        
        window.addEventListener('touchend', () => {
            isDown = false;
        });
        
        window.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            handleMove(e.touches[0].clientX, slider);
            e.preventDefault(); // Prevent scrolling when using the slider
        });
    });
    
    function handleMove(clientX, slider) {
        const rect = slider.getBoundingClientRect();
        const position = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
        slider.style.setProperty('--position', `${position}%`);
    }
});
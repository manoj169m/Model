// Main navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    // Toggle navigation menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when menu item is clicked
    document.querySelectorAll('.nav-menu a').forEach(item => {
        item.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Before & After Slider Functionality
    const sliderContainer = document.querySelector('.slider-before-after');
    if (sliderContainer) {
        const handle = sliderContainer.querySelector('.slider-handle');
        const divider = sliderContainer.querySelector('.slider-divider');
        const beforeSection = sliderContainer.querySelector('.before');
        
        // Set initial position (50%)
        let position = 50;
        updateSliderPosition(position);
        
        // Handle drag events
        let isDragging = false;
        
        handle.addEventListener('mousedown', startDrag);
        handle.addEventListener('touchstart', startDrag, { passive: true });
        
        document.addEventListener('mousemove', drag);
        document.addEventListener('touchmove', drag, { passive: false });
        
        document.addEventListener('mouseup', endDrag);
        document.addEventListener('touchend', endDrag);
        
        // Drag functions
        function startDrag(e) {
            isDragging = true;
            e.preventDefault();
        }
        
        function drag(e) {
            if (!isDragging) return;
            
            let clientX;
            if (e.type === 'touchmove') {
                e.preventDefault(); // Prevent scrolling while dragging
                clientX = e.touches[0].clientX;
            } else {
                clientX = e.clientX;
            }
            
            const rect = sliderContainer.getBoundingClientRect();
            let newPosition = ((clientX - rect.left) / rect.width) * 100;
            
            // Constrain position between 0 and 100
            newPosition = Math.min(Math.max(newPosition, 0), 100);
            
            updateSliderPosition(newPosition);
        }
        
        function endDrag() {
            isDragging = false;
        }
        
        function updateSliderPosition(pos) {
            position = pos;
            
            // Update CSS variable for the divider and handle position
            sliderContainer.style.setProperty('--position', `${position}%`);
            
            // Update clip-path for the before section
            beforeSection.style.clipPath = `polygon(0 0, ${position}% 0, ${position}% 100%, 0 100%)`;
            
            // Position the divider and handle
            divider.style.left = `${position}%`;
            handle.style.left = `${position}%`;
        }
    }
});
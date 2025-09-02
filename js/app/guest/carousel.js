export const carousel = (() => {
    const loadCarouselImages = async (carouselId, directory) => {
        const carousel = document.querySelector(`#${carouselId} .carousel-inner`);
        const indicators = document.querySelector(`#${carouselId} .carousel-indicators`);
        
        try {
            const response = await fetch('./assets/images/carousel.json');
            const data = await response.json();
            const files = data[directory];
            
            // Clear existing content
            carousel.innerHTML = '';
            indicators.innerHTML = '';
            
            files.forEach((file, index) => {
                // Create carousel item
                const item = document.createElement('div');
                item.className = `carousel-item ${index === 0 ? 'active' : ''}`;
                
                // Create image with lazy loading
                const img = document.createElement('img');
                img.src = './assets/images/placeholder.webp';
                img.setAttribute('data-src', `./assets/images/${directory}/${file}`); // Changed to setAttribute
                img.alt = `image ${index + 1}`;
                img.className = 'd-block w-100 h-100 img-fluid cursor-pointer';
                img.onclick = () => undangan.guest.modal(img);
                
                // Add loading attribute for native lazy loading
                img.loading = 'lazy';
                
                item.appendChild(img);
                carousel.appendChild(item);

                // Create indicator
                const button = document.createElement('button');
                button.type = 'button';
                button.dataset.bsTarget = `#${carouselId}`;
                button.dataset.bsSlideTo = index;
                button.className = index === 0 ? 'active' : '';
                button.setAttribute('aria-current', index === 0 ? 'true' : 'false');
                button.setAttribute('aria-label', `Slide ${index + 1}`);
                
                indicators.appendChild(button);
            });

            // Trigger image loading after carousel is built
            const lazyImages = carousel.querySelectorAll('img[data-src]');
            lazyImages.forEach(img => {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            img.src = img.dataset.src;
                            observer.unobserve(img);
                        }
                    });
                });
                observer.observe(img);
            });

        } catch (error) {
            console.error('Error loading carousel images:', error);
        }
    };

    return {
        loadCarouselImages
    };
})();
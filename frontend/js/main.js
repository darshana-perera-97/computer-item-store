// Main JavaScript for TechZone - CodeBlast Style
document.addEventListener('DOMContentLoaded', function() {
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(5, 5, 5, 0.98)';
            navbar.style.backdropFilter = 'blur(25px)';
        } else {
            navbar.style.background = 'rgba(5, 5, 5, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.feature-card, .product-card, .about-content, .about-image').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // Floating elements animation
    const floatingElements = document.querySelectorAll('.float-element');
    floatingElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'scale(0) rotate(180deg)';
        element.style.transition = 'all 0.8s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'scale(1) rotate(0deg)';
        }, 1000 + (index * 300));
    });

    // Main logo animation
    const mainLogo = document.querySelector('.main-logo');
    if (mainLogo) {
        mainLogo.style.opacity = '0';
        mainLogo.style.transform = 'scale(0.5) translateY(50px)';
        mainLogo.style.transition = 'all 1s ease';
        
        setTimeout(() => {
            mainLogo.style.opacity = '1';
            mainLogo.style.transform = 'scale(1) translateY(0)';
        }, 500);
    }

    // Hero stats counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach((stat, index) => {
        const finalNumber = parseInt(stat.textContent.replace(/\D/g, ''));
        let currentNumber = 0;
        const increment = finalNumber / 50;
        
        setTimeout(() => {
            const counter = setInterval(() => {
                currentNumber += increment;
                if (currentNumber >= finalNumber) {
                    currentNumber = finalNumber;
                    clearInterval(counter);
                }
                if (stat.textContent.includes('K+')) {
                    stat.textContent = Math.floor(currentNumber) + 'K+';
                } else if (stat.textContent.includes('+')) {
                    stat.textContent = Math.floor(currentNumber) + '+';
                } else {
                    stat.textContent = Math.floor(currentNumber);
                }
            }, 50);
        }, 2000 + (index * 500));
    });

    // Product cards hover effect
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px)';
            this.style.boxShadow = 'var(--shadow-heavy)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // Feature cards hover effect
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = 'var(--shadow-heavy)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // Tech grid items hover effect
    document.querySelectorAll('.grid-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.05)';
            this.style.boxShadow = 'var(--shadow-medium)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });

    // Contact form
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const subject = this.querySelectorAll('input[type="text"]')[1].value;
            const message = this.querySelector('textarea').value;
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
                this.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // Shop Now button
    const shopNowBtn = document.querySelector('.register-btn');
    if (shopNowBtn) {
        shopNowBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Redirecting to shop...', 'success');
        });
    }

    // Explore Products button
    const exploreBtn = document.querySelector('.hero-buttons .btn-primary');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const productsSection = document.querySelector('#products');
            if (productsSection) {
                productsSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Learn More button
    const learnMoreBtn = document.querySelector('.hero-buttons .btn-outline-primary');
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                aboutSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // View All Products button
    const viewAllBtn = document.querySelector('.btn-outline-primary.btn-lg');
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('All products page coming soon!', 'info');
        });
    }

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });

    // Utility functions
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'} me-2"></i>
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-left: 4px solid ${type === 'success' ? 'var(--primary-color)' : type === 'error' ? 'var(--secondary-color)' : 'var(--accent-color)'};
            color: var(--text-primary);
            padding: 1rem;
            border-radius: 8px;
            box-shadow: var(--shadow-medium);
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 350px;
            display: flex;
            align-items: center;
        `;
        
        // Add to body
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        document.body.removeChild(notification);
                    }
                }, 300);
            }
        }, 5000);
    }

    // Add some interactive hover effects
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.1)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Smooth reveal animation for sections
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-revealed');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Add CSS for section reveal animation
    const style = document.createElement('style');
    style.textContent = `
        section {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s ease;
        }
        section.section-revealed {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

    console.log('TechZone - CodeBlast Style initialized successfully! 🚀');
}); 

// Order Form Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize order form functionality
    initOrderForm();
});

function initOrderForm() {
    // Get all buy now buttons
    const buyNowButtons = document.querySelectorAll('.buy-now-btn');
    
    // Add click event listeners to buy now buttons
    buyNowButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Get product details from button data attributes
            const productName = this.getAttribute('data-product');
            const productPrice = this.getAttribute('data-price');
            const productCategory = this.getAttribute('data-category');
            
            // Populate order form with product details
            populateOrderForm(productName, productPrice, productCategory);
            
            // Show the order modal
            const orderModal = new bootstrap.Modal(document.getElementById('orderModal'));
            orderModal.show();
        });
    });
    
    // Handle order form submission
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', handleOrderSubmission);
    }
}

function populateOrderForm(productName, productPrice, productCategory) {
    // Update order summary in the form
    const itemNameElement = document.querySelector('.item-name');
    const itemPriceElement = document.querySelector('.item-price');
    const orderTotalElement = document.querySelector('.order-total strong');
    
    if (itemNameElement) itemNameElement.textContent = productName;
    if (itemPriceElement) itemPriceElement.textContent = `$${productPrice}`;
    if (orderTotalElement) orderTotalElement.textContent = `Total: $${productPrice}`;
    
    // Store product details for form submission
    document.getElementById('orderForm').setAttribute('data-product-name', productName);
    document.getElementById('orderForm').setAttribute('data-product-price', productPrice);
    document.getElementById('orderForm').setAttribute('data-product-category', productCategory);
}

function handleOrderSubmission(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.target);
    const orderData = {
        product: {
            name: e.target.getAttribute('data-product-name'),
            price: e.target.getAttribute('data-product-price'),
            category: e.target.getAttribute('data-product-category')
        },
        customer: {
            firstName: formData.get('firstName') || document.getElementById('firstName').value,
            lastName: formData.get('lastName') || document.getElementById('lastName').value,
            email: formData.get('email') || document.getElementById('email').value,
            phone: formData.get('phone') || document.getElementById('phone').value
        },
        delivery: {
            address: formData.get('address') || document.getElementById('address').value,
            city: formData.get('city') || document.getElementById('city').value,
            state: formData.get('state') || document.getElementById('state').value,
            zipCode: formData.get('zipCode') || document.getElementById('zipCode').value,
            country: formData.get('country') || document.getElementById('country').value
        },
        notes: formData.get('notes') || document.getElementById('notes').value,
        termsAccepted: document.getElementById('termsAccepted').checked
    };
    
    // Validate required fields
    if (!validateOrderForm(orderData)) {
        showNotification('Please fill in all required fields and accept terms & conditions.', 'error');
        return;
    }
    
    // Show order preview
    showOrderPreview(orderData);
}

function showOrderPreview(orderData) {
    // Create preview modal content
    const previewContent = `
        <div class="modal-header">
            <h5 class="modal-title">
                <i class="fas fa-eye me-2"></i>Order Preview
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="order-preview">
                <!-- Product Details -->
                <div class="preview-section mb-4">
                    <h6 class="preview-section-title">
                        <i class="fas fa-box me-2 text-primary"></i>Product Details
                    </h6>
                    <div class="preview-content">
                        <p><strong>Product:</strong> ${orderData.product.name}</p>
                        <p><strong>Price:</strong> $${orderData.product.price}</p>
                        <p><strong>Category:</strong> ${orderData.product.category}</p>
                    </div>
                </div>
                
                <!-- Customer Information -->
                <div class="preview-section mb-4">
                    <h6 class="preview-section-title">
                        <i class="fas fa-user me-2 text-success"></i>Customer Information
                    </h6>
                    <div class="preview-content">
                        <p><strong>Name:</strong> ${orderData.customer.firstName} ${orderData.customer.lastName}</p>
                        <p><strong>Email:</strong> ${orderData.customer.email}</p>
                        <p><strong>Phone:</strong> ${orderData.customer.phone}</p>
                    </div>
                </div>
                
                <!-- Delivery Address -->
                <div class="preview-section mb-4">
                    <h6 class="preview-section-title">
                        <i class="fas fa-map-marker-alt me-2 text-warning"></i>Delivery Address
                    </h6>
                    <div class="preview-content">
                        <p><strong>Address:</strong> ${orderData.delivery.address}</p>
                        <p><strong>City:</strong> ${orderData.delivery.city}</p>
                        <p><strong>State:</strong> ${orderData.delivery.state}</p>
                        <p><strong>ZIP:</strong> ${orderData.delivery.zipCode}</p>
                        <p><strong>Country:</strong> ${orderData.delivery.country}</p>
                    </div>
                </div>
                
                ${orderData.notes ? `
                <!-- Additional Notes -->
                <div class="preview-section mb-4">
                    <h6 class="preview-section-title">
                        <i class="fas fa-sticky-note me-2 text-info"></i>Additional Notes
                    </h6>
                    <div class="preview-content">
                        <p>${orderData.notes}</p>
                    </div>
                </div>
                ` : ''}
                
                <!-- Order Summary -->
                <div class="preview-section mb-4">
                    <h6 class="preview-section-title">
                        <i class="fas fa-calculator me-2 text-danger"></i>Order Summary
                    </h6>
                    <div class="preview-content">
                        <div class="order-total-preview">
                            <h5 class="text-primary">Total: $${orderData.product.price}</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" onclick="goBackToForm()">
                <i class="fas fa-arrow-left me-2"></i>Back to Form
            </button>
            <button type="button" class="btn btn-success" onclick="placeOrder(${JSON.stringify(orderData).replace(/"/g, '&quot;')})">
                <i class="fas fa-check me-2"></i>Place Order
            </button>
        </div>
    `;
    
    // Update modal content
    const orderModal = document.getElementById('orderModal');
    orderModal.querySelector('.modal-content').innerHTML = previewContent;
    
    // Show the preview
    const modal = new bootstrap.Modal(orderModal);
    modal.show();
}

function goBackToForm() {
    // Reload the page to show the original form
    location.reload();
}

function placeOrder(orderData) {
    // Show loading state
    const placeOrderBtn = document.querySelector('.btn-success');
    const originalText = placeOrderBtn.innerHTML;
    placeOrderBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Placing Order...';
    placeOrderBtn.disabled = true;
    
    // Send order to backend
    fetch('http://localhost:3060/api/orders/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Show success message
            showOrderSuccess(orderData);
        } else {
            // Show error message
            showNotification('Failed to place order: ' + (data.error || 'Unknown error'), 'error');
            placeOrderBtn.innerHTML = originalText;
            placeOrderBtn.disabled = false;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showNotification('Failed to place order. Please try again.', 'error');
        placeOrderBtn.innerHTML = originalText;
        placeOrderBtn.disabled = false;
    });
}

function showOrderSuccess(orderData) {
    // Create success modal content
    const successContent = `
        <div class="modal-header bg-success text-white">
            <h5 class="modal-title">
                <i class="fas fa-check-circle me-2"></i>Order Placed Successfully!
            </h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body text-center">
            <div class="order-success">
                <i class="fas fa-check-circle text-success" style="font-size: 4rem; margin-bottom: 1rem;"></i>
                <h4 class="text-success mb-3">Thank You!</h4>
                <p class="mb-3">Your order for <strong>${orderData.product.name}</strong> has been placed successfully.</p>
                <p class="mb-3">We have sent a WhatsApp message to our team and they will contact you soon with delivery details.</p>
                
                <div class="order-details-summary mt-4">
                    <h6 class="text-muted">Order Summary:</h6>
                    <p><strong>Product:</strong> ${orderData.product.name}</p>
                    <p><strong>Total:</strong> $${orderData.product.price}</p>
                    <p><strong>Order ID:</strong> ${generateOrderId()}</p>
                </div>
                
                <div class="alert alert-info mt-4">
                    <i class="fas fa-info-circle me-2"></i>
                    <strong>Next Steps:</strong><br>
                    1. Our team will review your order<br>
                    2. You'll receive a confirmation call<br>
                    3. Delivery will be scheduled<br>
                    4. You'll get tracking information
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">
                <i class="fas fa-home me-2"></i>Continue Shopping
            </button>
        </div>
    `;
    
    // Update modal content
    const orderModal = document.getElementById('orderModal');
    orderModal.querySelector('.modal-content').innerHTML = successContent;
    
    // Show the success message
    const modal = new bootstrap.Modal(orderModal);
    modal.show();
}

function generateOrderId() {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    return `ORD-${timestamp}-${random}`.toUpperCase();
}

function validateOrderForm(orderData) {
    // Check if all required fields are filled
    const requiredFields = [
        orderData.customer.firstName,
        orderData.customer.lastName,
        orderData.customer.email,
        orderData.customer.phone,
        orderData.delivery.address,
        orderData.delivery.city,
        orderData.delivery.state,
        orderData.delivery.zipCode,
        orderData.delivery.country
    ];
    
    return requiredFields.every(field => field && field.trim() !== '') && orderData.termsAccepted;
}

function processOrder(orderData) {
    // Show loading state
    const submitButton = document.querySelector('#orderForm button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Processing...';
    submitButton.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        // Show success message
        showNotification('Order placed successfully! We will contact you soon with delivery details.', 'success');
        
        // Close modal
        const orderModal = bootstrap.Modal.getInstance(document.getElementById('orderModal'));
        orderModal.hide();
        
        // Reset form
        document.getElementById('orderForm').reset();
        
        // Log order data (in real app, this would be sent to backend)
        console.log('Order placed:', orderData);
        
    }, 2000);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'success' ? 'success' : type === 'error' ? 'danger' : 'info'} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
} 

// Product Image Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
    initProductCarousel();
});

function initProductCarousel() {
    // Get all product carousels on the page
    const carousels = document.querySelectorAll('#productCarousel');
    
    carousels.forEach(carousel => {
        // Get thumbnail images for this carousel
        const thumbnails = carousel.parentElement.querySelectorAll('.thumbnail-img');
        
        // Wait for DOM to be fully ready
        setTimeout(() => {
            // Initialize Bootstrap carousel with infinite loop
            const carouselInstance = new bootstrap.Carousel(carousel, {
                interval: 4000, // 4 seconds between slides
                wrap: true,      // Enable infinite loop
                ride: 'carousel', // Auto-play
                pause: 'hover'   // Pause on hover
            });
            
            // Ensure the carousel is properly configured for infinite loop
            carousel.setAttribute('data-bs-wrap', 'true');
            carousel.setAttribute('data-bs-interval', '4000');
            
            // Add click event listeners to thumbnails
            thumbnails.forEach((thumbnail, index) => {
                thumbnail.addEventListener('click', function() {
                    // Remove active class from all thumbnails
                    thumbnails.forEach(thumb => thumb.classList.remove('active'));
                    
                    // Add active class to clicked thumbnail
                    this.classList.add('active');
                    
                    // Go to specific slide
                    carouselInstance.to(index);
                });
            });
            
            // Update thumbnail active state when carousel slides
            carousel.addEventListener('slid.bs.carousel', function(event) {
                const slideIndex = event.to;
                
                // Remove active class from all thumbnails
                thumbnails.forEach(thumb => thumb.classList.remove('active'));
                
                // Add active class to corresponding thumbnail
                if (thumbnails[slideIndex]) {
                    thumbnails[slideIndex].classList.add('active');
                }
            });
            
            // Pause carousel on hover for better user experience
            carousel.addEventListener('mouseenter', function() {
                carouselInstance.pause();
            });
            
            carousel.addEventListener('mouseleave', function() {
                carouselInstance.cycle();
            });
            
            // Add hover effects to thumbnails
            thumbnails.forEach(thumbnail => {
                thumbnail.addEventListener('mouseenter', function() {
                    this.style.transform = 'scale(1.05)';
                    this.style.boxShadow = '0 4px 15px rgba(0, 255, 136, 0.3)';
                });
                
                thumbnail.addEventListener('mouseleave', function() {
                    this.style.transform = 'scale(1)';
                    this.style.boxShadow = 'none';
                });
            });
            
            // Add keyboard navigation support
            carousel.addEventListener('keydown', function(event) {
                if (event.key === 'ArrowLeft') {
                    carouselInstance.prev();
                } else if (event.key === 'ArrowRight') {
                    carouselInstance.next();
                }
            });
            
            // Make carousel focusable for keyboard navigation
            carousel.setAttribute('tabindex', '0');
            
            // Force start the carousel to ensure it's running
            setTimeout(() => {
                carouselInstance.cycle();
            }, 500);
            
            // Add event listener for when carousel reaches the end
            carousel.addEventListener('slide.bs.carousel', function(event) {
                // This ensures the wrap functionality works
                if (event.direction === 'left' && event.from === carousel.querySelectorAll('.carousel-item').length - 1) {
                    // We're going from last to first, ensure smooth transition
                    setTimeout(() => {
                        carouselInstance.cycle();
                    }, 100);
                }
            });
            
            // Fallback: Monitor carousel and restart if it stops
            let carouselCheckInterval = setInterval(() => {
                if (!carousel.classList.contains('carousel-fade')) {
                    // Check if carousel is still running
                    const isRunning = carouselInstance._interval !== null;
                    if (!isRunning) {
                        console.log('Carousel stopped, restarting...');
                        carouselInstance.cycle();
                    }
                }
            }, 5000); // Check every 5 seconds
            
            // Clean up interval when page unloads
            window.addEventListener('beforeunload', () => {
                clearInterval(carouselCheckInterval);
            });
            
        }, 100);
    });
} 
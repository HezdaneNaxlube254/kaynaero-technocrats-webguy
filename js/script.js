// ===== ENHANCED WEBSITE FUNCTIONALITY =====

// Mobile Navigation Toggle
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        menuToggle.innerHTML = mainNav.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });

    // Close menu when clicking a link
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

// Set current year in footer
const currentYear = new Date().getFullYear();
const yearElements = document.querySelectorAll('#currentYear');
yearElements.forEach(element => {
    element.textContent = currentYear;
});

// ===== INQUIRY FORM HANDLING =====
const quickInquiryForm = document.getElementById('quickInquiryForm');
const serviceQuoteForm = document.getElementById('serviceQuoteForm');

function handleInquiryForm(form, formType) {
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Validate phone number (Kenyan format)
        const phone = data.phone || '';
        const cleanPhone = phone.replace(/\D/g, '');
        
        if (!cleanPhone.match(/^(254|0)[17]\d{8}$/)) {
            showMessage('Please enter a valid Kenyan phone number', 'error');
            return;
        }
        
        // Prepare WhatsApp message
        let whatsappMessage = `Hello KaynAero Technocrats,%0A%0A`;
        whatsappMessage += `I'm interested in a ${formType === 'quick' ? 'website' : 'service'}.%0A%0A`;
        
        // Add form data to message
        whatsappMessage += `*Name:* ${data.name || 'Not provided'}%0A`;
        whatsappMessage += `*Phone:* ${data.phone || 'Not provided'}%0A`;
        
        if (data.email) {
            whatsappMessage += `*Email:* ${data.email}%0A`;
        }
        
        if (data.type || data.service_type) {
            whatsappMessage += `*Type:* ${data.type || data.service_type}%0A`;
        }
        
        if (data.budget) {
            const budgetMap = {
                '15-25': 'Ksh 15,000 - 25,000',
                '25-40': 'Ksh 25,000 - 40,000',
                '40+': 'Ksh 40,000+',
                'not-sure': 'Not sure yet'
            };
            whatsappMessage += `*Budget:* ${budgetMap[data.budget] || data.budget}%0A`;
        }
        
        if (data.pages) {
            whatsappMessage += `*Pages:* ${data.pages}%0A`;
        }
        
        if (data.timeline) {
            const timelineMap = {
                'urgent': 'Urgent (7 days)',
                '2-weeks': '2 weeks',
                '1-month': '1 month',
                'flexible': 'Flexible'
            };
            whatsappMessage += `*Timeline:* ${timelineMap[data.timeline] || data.timeline}%0A`;
        }
        
        if (data.message || data.description) {
            whatsappMessage += `*Details:* ${data.message || data.description || 'No details provided'}%0A`;
        }
        
        whatsappMessage += `%0A---%0A_Sent via website inquiry form_`;
        
        // Open WhatsApp with pre-filled message
        const whatsappUrl = `https://wa.me/254712345678?text=${whatsappMessage}`;
        
        // Show success message
        const successHtml = `
            <div class="success-overlay">
                <div class="success-modal">
                    <div class="success-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h3>Message Ready!</h3>
                    <p>We've prepared your inquiry. Click below to open WhatsApp and send it to us.</p>
                    <div class="success-actions">
                        <a href="${whatsappUrl}" class="btn btn-primary" target="_blank">
                            <i class="fab fa-whatsapp"></i> Open WhatsApp & Send
                        </a>
                        <button class="btn btn-secondary close-success">Cancel</button>
                    </div>
                    <p class="success-note"><i class="fas fa-bolt"></i> We'll respond within 2 hours</p>
                </div>
            </div>
        `;
        
        // Add success modal to page
        document.body.insertAdjacentHTML('beforeend', successHtml);
        
        // Add styles for success modal
        const style = document.createElement('style');
        style.textContent = `
            .success-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                animation: fadeIn 0.3s ease;
            }
            .success-modal {
                background: white;
                padding: 40px;
                border-radius: 10px;
                max-width: 500px;
                width: 90%;
                text-align: center;
                animation: slideUp 0.3s ease;
            }
            .success-icon {
                font-size: 4rem;
                color: #28a745;
                margin-bottom: 20px;
            }
            .success-actions {
                margin: 25px 0;
                display: flex;
                gap: 15px;
                justify-content: center;
                flex-wrap: wrap;
            }
            .success-note {
                margin-top: 15px;
                color: #666;
                font-size: 0.9rem;
            }
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slideUp {
                from { transform: translateY(20px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
        
        // Close modal functionality
        document.querySelector('.close-success').addEventListener('click', function() {
            document.querySelector('.success-overlay').remove();
        });
        
        // Also close when clicking outside modal
        document.querySelector('.success-overlay').addEventListener('click', function(e) {
            if (e.target === this) {
                this.remove();
            }
        });
        
        // Clear form after successful submission
        form.reset();
    });
}

// Initialize form handlers
if (quickInquiryForm) {
    handleInquiryForm(quickInquiryForm, 'quick');
}

if (serviceQuoteForm) {
    handleInquiryForm(serviceQuoteForm, 'service');
}

// ===== ENHANCED CARD ANIMATIONS =====
document.addEventListener('DOMContentLoaded', function() {
    // 1. Card hover effects with color change
    const cards = document.querySelectorAll('.problem-card, .audience-card, .feature, .service-card, .portfolio-item, .about-card, .contact-card, .expectation, .pricing-card');
    
    cards.forEach(card => {
        // Add hover class on mouseenter
        card.addEventListener('mouseenter', function() {
            this.classList.add('card-hover');
            
            // Add subtle scale effect
            this.style.transform = 'translateY(-5px) scale(1.01)';
            
            // Add a glow effect based on card type
            if (this.classList.contains('problem-card')) {
                this.style.boxShadow = '0 10px 25px rgba(26, 95, 122, 0.15)';
            } else if (this.classList.contains('audience-card')) {
                this.style.boxShadow = '0 10px 25px rgba(45, 138, 122, 0.15)';
            } else if (this.classList.contains('service-card')) {
                this.style.boxShadow = '0 10px 25px rgba(255, 126, 48, 0.15)';
            } else if (this.classList.contains('pricing-card')) {
                this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
            }
        });
        
        // Remove effects on mouseleave
        card.addEventListener('mouseleave', function() {
            this.classList.remove('card-hover');
            this.style.transform = '';
            this.style.boxShadow = '';
        });
        
        // Add click feedback for pricing cards
        if (card.classList.contains('pricing-card')) {
            card.addEventListener('click', function(e) {
                // Only trigger if not clicking a button
                if (!e.target.closest('a, button')) {
                    const btn = this.querySelector('.btn');
                    if (btn) {
                        btn.style.transform = 'scale(0.95)';
                        setTimeout(() => {
                            btn.style.transform = '';
                        }, 150);
                    }
                }
            });
        }
    });
    
    // 2. Staggered card animations on page load
    function animateCardsOnLoad() {
        const cardsToAnimate = document.querySelectorAll('.problem-card, .audience-card, .feature, .pricing-card');
        
        cardsToAnimate.forEach((card, index) => {
            // Initial state
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            // Animate in with delay
            setTimeout(() => {
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100 + (index * 100)); // Stagger the animations
        });
    }
    
    // Run animation when page loads
    setTimeout(animateCardsOnLoad, 300);
    
    // 3. Interactive service cards with more details on click
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        const content = card.querySelector('.service-content');
        const list = card.querySelector('.service-list');
        
        if (list) {
            // Initially hide some list items
            const listItems = list.querySelectorAll('li');
            if (listItems.length > 3) {
                for (let i = 3; i < listItems.length; i++) {
                    listItems[i].style.display = 'none';
                    listItems[i].style.opacity = '0';
                    listItems[i].style.height = '0';
                    listItems[i].style.overflow = 'hidden';
                }
                
                // Add "Show more" button
                const showMoreBtn = document.createElement('button');
                showMoreBtn.className = 'show-more-btn';
                showMoreBtn.innerHTML = '<i class="fas fa-chevron-down"></i> Show More Features';
                showMoreBtn.style.cssText = `
                    background: transparent;
                    border: none;
                    color: var(--primary-color);
                    cursor: pointer;
                    font-size: 0.9rem;
                    margin-top: 10px;
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    font-weight: 500;
                `;
                
                content.appendChild(showMoreBtn);
                
                let isExpanded = false;
                showMoreBtn.addEventListener('click', function() {
                    isExpanded = !isExpanded;
                    
                    for (let i = 3; i < listItems.length; i++) {
                        if (isExpanded) {
                            listItems[i].style.display = 'flex';
                            setTimeout(() => {
                                listItems[i].style.opacity = '1';
                                listItems[i].style.height = 'auto';
                            }, 10);
                        } else {
                            listItems[i].style.opacity = '0';
                            listItems[i].style.height = '0';
                            setTimeout(() => {
                                listItems[i].style.display = 'none';
                            }, 300);
                        }
                    }
                    
                    showMoreBtn.innerHTML = isExpanded 
                        ? '<i class="fas fa-chevron-up"></i> Show Less' 
                        : '<i class="fas fa-chevron-down"></i> Show More Features';
                });
            }
        }
    });
    
    // 4. Process step counter animation
    const stepNumbers = document.querySelectorAll('.step-number');
    
    stepNumbers.forEach(number => {
        // Animate the numbers on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.transform = 'scale(1.1)';
                    entry.target.style.backgroundColor = '#ff7e30'; // Orange on view
                    
                    setTimeout(() => {
                        entry.target.style.transform = 'scale(1)';
                        setTimeout(() => {
                            entry.target.style.backgroundColor = ''; // Back to original
                        }, 500);
                    }, 300);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(number);
    });
    
    // 5. Add ripple effect to buttons in cards
    const cardButtons = document.querySelectorAll('.audience-card .btn, .problem-card .btn, .service-card .btn, .pricing-card .btn');
    
    cardButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple element
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.7);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                top: ${y}px;
                left: ${x}px;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // 6. Animate stats counter
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const originalText = stat.textContent;
        if (originalText.match(/^\d+$/)) {
            // It's a number, animate it
            const target = parseInt(originalText);
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.round(current);
            }, 30);
        }
    });
});

// Add ripple animation to CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    /* Enhanced hover states for different card types */
    .problem-card:hover { border-top-color: #ff7e30; }
    .audience-card:hover { border-left-color: #ff7e30; }
    .service-card:hover .service-icon { background-color: #ff7e30 !important; }
    
    /* Color transitions for icons */
    .problem-card:hover .problem-icon,
    .audience-card:hover .fa-check-circle,
    .feature:hover i {
        color: #ff7e30 !important;
        transform: scale(1.1);
        transition: all 0.3s ease;
    }
    
    /* Fast delivery emphasis */
    .fast-delivery {
        animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
        0% { opacity: 1; }
        50% { opacity: 0.8; }
        100% { opacity: 1; }
    }
`;
document.head.appendChild(rippleStyle);

// Helper function to show messages
function showMessage(message, type = 'success') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'error' ? '#dc3545' : '#28a745'};
        color: white;
        border-radius: 4px;
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 300);
    }, 3000);
    
    // Add animation styles
    const messageStyle = document.createElement('style');
    messageStyle.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(messageStyle);
}

// Add floating WhatsApp button to all pages
function addFloatingWhatsAppButton() {
    const floatingBtn = document.createElement('a');
    floatingBtn.href = 'https://wa.me/254712345678?text=Hello%20KaynAero%20Technocrats,%20I%27m%20interested%20in%20your%20website%20services';
    floatingBtn.target = '_blank';
    floatingBtn.className = 'floating-whatsapp';
    floatingBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
    floatingBtn.title = 'Chat with us on WhatsApp - Fast Response';
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .floating-whatsapp {
            position: fixed;
            bottom: 25px;
            right: 25px;
            background-color: #25D366;
            color: white;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 30px;
            box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);
            z-index: 999;
            transition: all 0.3s;
            animation: float 3s ease-in-out infinite;
        }
        .floating-whatsapp:hover {
            background-color: #128C7E;
            transform: scale(1.1);
            box-shadow: 0 6px 16px rgba(37, 211, 102, 0.4);
            color: white;
            animation: none;
        }
        @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
        }
        @media (max-width: 768px) {
            .floating-whatsapp {
                bottom: 20px;
                right: 20px;
                width: 50px;
                height: 50px;
                font-size: 24px;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(floatingBtn);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add floating WhatsApp button
    addFloatingWhatsAppButton();
    
    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (linkPage === 'index.html' && currentPage === '')) {
            link.classList.add('active');
        }
    });
});

// Phone number validation
function validatePhone(phone) {
    // Simple validation for Kenyan phone numbers
    const re = /^(\+?254|0)[17]\d{8}$/;
    return re.test(phone.replace(/\D/g, ''));
}

// Email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
// ===== PORTFOLIO FORM HANDLER =====
const portfolioInquiryForm = document.getElementById('portfolioInquiryForm');
if (portfolioInquiryForm) {
    handleInquiryForm(portfolioInquiryForm, 'portfolio');
}

// ===== CONTACT FORM HANDLER (Netlify) =====
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm && formSuccess) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show success message
        contactForm.style.display = 'none';
        formSuccess.style.display = 'block';
        
        // In real implementation with Netlify, remove e.preventDefault()
        // and let Netlify handle the form submission
    });
}
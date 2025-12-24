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

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm && formSuccess) {
    // Netlify Forms handles the submission, we just show success message
    contactForm.addEventListener('submit', function(e) {
        // In a real deployment, Netlify would handle this
        // This is just for demo purposes
        e.preventDefault();
        
        // Hide form, show success message
        contactForm.style.display = 'none';
        formSuccess.style.display = 'block';
        
        // Scroll to success message
        formSuccess.scrollIntoView({ behavior: 'smooth' });
        
        // In real implementation with Netlify, remove e.preventDefault()
        // and let Netlify handle the form submission
    });
}

// Simple smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Only process internal anchor links
        if (href === '#' || href.startsWith('#!')) return;
        
        const targetElement = document.querySelector(href);
        
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Update URL without jumping
            if (history.pushState) {
                history.pushState(null, null, href);
            } else {
                location.hash = href;
            }
        }
    });
});

// Add WhatsApp button to all pages (floating)
function addFloatingWhatsAppButton() {
    const floatingBtn = document.createElement('a');
    floatingBtn.href = 'https://wa.me/254712345678?text=Hello%20KaynAero%20Technocrats,%20I%27m%20interested%20in%20your%20website%20services';
    floatingBtn.target = '_blank';
    floatingBtn.className = 'floating-whatsapp';
    floatingBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
    floatingBtn.title = 'Chat with us on WhatsApp';
    
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
        }
        .floating-whatsapp:hover {
            background-color: #128C7E;
            transform: scale(1.1);
            box-shadow: 0 6px 16px rgba(37, 211, 102, 0.4);
            color: white;
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

// Simple form validation helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    // Simple validation for Kenyan phone numbers
    const re = /^(\+?254|0)[17]\d{8}$/;
    return re.test(phone.replace(/\s/g, ''));
}

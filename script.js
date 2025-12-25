// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');
const counters = document.querySelectorAll('.stat-number, .metric-value');
const progressBars = document.querySelectorAll('.progress-bar');
const form = document.getElementById('consultationForm');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.innerHTML = navMenu.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Smooth Scroll for Navigation Links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // Close mobile menu if open
            navMenu.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            
            // Smooth scroll to section
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Update active nav link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        }
    });
});

// Tab Switching Functionality
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab');
        
        // Update active tab button
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Show corresponding tab pane
        tabPanes.forEach(pane => {
            pane.classList.remove('active');
            if (pane.id === tabId) {
                pane.classList.add('active');
            }
        });
    });
});

// FIXED & IMPROVED COUNTER ANIMATION
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const suffix = element.getAttribute('data-suffix') || '';
    const duration = 2000; // ms
    const steps = 60;
    const step = target / steps;
    const stepTime = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            // Format number with commas if large
            element.textContent = Math.floor(current).toLocaleString() + suffix;
        }
    }, stepTime);
}

// RELIABLE INTERSECTION OBSERVER SETUP
let hasAnimated = false;

function initCounters() {
    const counterElements = document.querySelectorAll('[data-count]:not(.animated)');
    
    if (counterElements.length > 0 && !hasAnimated) {
        counterElements.forEach(el => {
            // Mark as animated immediately to prevent double triggers
            el.classList.add('animated');
            animateCounter(el);
        });
        hasAnimated = true;
    }
}

// Trigger on load and scroll
window.addEventListener('load', initCounters);
window.addEventListener('scroll', initCounters);

// Fallback: If still not working, trigger after a delay
setTimeout(initCounters, 1000);

// Form Submission
if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Simulate form submission
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // In a real application, you would send this data to a server
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success message
        alert('Thank you for your request! Our team will contact you within 24 hours.');
        
        // Reset form
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
}

// Sticky Navigation
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Initialize dashboard metrics
function updateDashboardMetrics() {
    const uptime = document.querySelector('.dashboard-preview .metric-value[data-count="99.9"]');
    const servers = document.querySelector('.dashboard-preview .metric-value[data-count="150"]');
    
    // Simulate real-time updates
    setInterval(() => {
        // Add slight variations to simulate real data
        const newUptime = (99.9 + Math.random() * 0.1).toFixed(1);
        const newServers = 150 + Math.floor(Math.random() * 5);
        
        uptime.textContent = newUptime;
        servers.textContent = newServers;
    }, 5000);
}

// Start dashboard updates when page loads
window.addEventListener('load', () => {
    updateDashboardMetrics();
    
    // Animate progress bars
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 300);
    });
});

// Add active class to nav links based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Update active link
            navLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNavLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink?.classList.add('active');
            } else {
                navLink?.classList.remove('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Animated Counters
    const counters = document.querySelectorAll('.counter');
    const progressBars = document.querySelectorAll('.progress-fill');
    
    function animateCounter(counter) {
        const target = +counter.getAttribute('data-target');
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            
            if (current >= target) {
                counter.textContent = target + (counter.nextElementSibling?.classList.contains('stat-label') ? '+' : '');
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 20);
    }
    
    function animateProgressBar(bar) {
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
    }
    
    // Intersection Observer for counters and progress bars
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('counter')) {
                    if (!entry.target.hasAttribute('data-animated')) {
                        entry.target.setAttribute('data-animated', 'true');
                        animateCounter(entry.target);
                    }
                }
                
                if (entry.target.classList.contains('progress-fill')) {
                    if (!entry.target.hasAttribute('data-animated')) {
                        entry.target.setAttribute('data-animated', 'true');
                        animateProgressBar(entry.target);
                    }
                }
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
    progressBars.forEach(bar => observer.observe(bar));
    
    // Animate metric values in client accounts section
    const metricValues = document.querySelectorAll('.metric-value[data-target]');
    
    function animateMetricValue(element) {
        const target = +element.getAttribute('data-target');
        const increment = target / 50;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            
            if (current >= target) {
                element.textContent = target + (element.querySelector('small') ? element.querySelector('small').outerHTML : '');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + (element.querySelector('small') ? element.querySelector('small').outerHTML : '');
            }
        }, 30);
    }
    
    const metricObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!entry.target.hasAttribute('data-animated')) {
                    entry.target.setAttribute('data-animated', 'true');
                    animateMetricValue(entry.target);
                }
            }
        });
    }, observerOptions);
    
    metricValues.forEach(value => metricObserver.observe(value));
    
    // Tab Switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update active button
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Show active tab pane
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.id === tabId) {
                    pane.classList.add('active');
                }
            });
        });
    });
    
    // Interactive Dashboard Metrics
    function updateDashboardMetrics() {
        // Simulate changing metrics
        const uptimeMetric = document.getElementById('uptime-metric');
        const serversMetric = document.getElementById('servers-metric');
        
        if (uptimeMetric && serversMetric) {
            // Small random fluctuations for realism
            const uptimeChange = (Math.random() * 0.04 - 0.02);
            const currentUptime = parseFloat(uptimeMetric.textContent);
            const newUptime = Math.min(99.99, Math.max(99.8, currentUptime + uptimeChange));
            
            const serverChange = Math.floor(Math.random() * 10) - 3;
            const currentServers = parseInt(serversMetric.textContent.replace(/,/g, ''));
            const newServers = Math.max(5200, Math.min(5300, currentServers + serverChange));
            
            // Update with animation
            uptimeMetric.textContent = newUptime.toFixed(2) + '%';
            serversMetric.textContent = newServers.toLocaleString();
            
            // Update trend indicators
            const uptimeTrend = uptimeMetric.parentElement.querySelector('.metric-trend');
            const serversTrend = serversMetric.parentElement.querySelector('.metric-trend');
            
            if (uptimeTrend) {
                const trendValue = uptimeChange >= 0 ? `+${uptimeChange.toFixed(2)}%` : `${uptimeChange.toFixed(2)}%`;
                uptimeTrend.querySelector('span').textContent = trendValue;
                uptimeTrend.classList.toggle('up', uptimeChange >= 0);
                uptimeTrend.classList.toggle('down', uptimeChange < 0);
            }
            
            if (serversTrend) {
                const trendValue = serverChange >= 0 ? `+${serverChange}` : `${serverChange}`;
                serversTrend.querySelector('span').textContent = trendValue;
                serversTrend.classList.toggle('up', serverChange >= 0);
                serversTrend.classList.toggle('down', serverChange < 0);
            }
        }
        
        // Update last update time
        const lastUpdate = document.querySelector('.last-update');
        if (lastUpdate) {
            const now = new Date();
            const timeString = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            lastUpdate.textContent = `Last updated: ${timeString}`;
        }
    }
    
    // Update metrics every 30 seconds
    setInterval(updateDashboardMetrics, 30000);
    
    // Form Validation and Submission
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('form-message');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset previous error states
            const errorElements = document.querySelectorAll('.error-message');
            errorElements.forEach(el => el.textContent = '');
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const company = document.getElementById('company').value.trim();
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value.trim();
            
            let isValid = true;
            
            // Validate name
            if (!name) {
                document.getElementById('name-error').textContent = 'Name is required';
                isValid = false;
            }
            
            // Validate email
            if (!email) {
                document.getElementById('email-error').textContent = 'Email is required';
                isValid = false;
            } else if (!isValidEmail(email)) {
                document.getElementById('email-error').textContent = 'Please enter a valid email address';
                isValid = false;
            }
            
            // Validate company
            if (!company) {
                document.getElementById('company-error').textContent = 'Company name is required';
                isValid = false;
            }
            
            // Validate service
            if (!service) {
                document.getElementById('service-error').textContent = 'Please select a service interest';
                isValid = false;
            }
            
            // Validate message
            if (!message) {
                document.getElementById('message-error').textContent = 'Message is required';
                isValid = false;
            } else if (message.length < 10) {
                document.getElementById('message-error').textContent = 'Message must be at least 10 characters';
                isValid = false;
            }
            
            if (isValid) {
                // Show loading state
                const submitBtn = contactForm.querySelector('.submit-btn');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                // In a real implementation, you would send this to Formspree or your backend
                // For demo purposes, we'll simulate a successful submission
                setTimeout(() => {
                    // Show success message
                    formMessage.textContent = 'Thank you for your message! Our team will contact you within 24 hours.';
                    formMessage.classList.remove('error');
                    formMessage.classList.add('success');
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Reset button
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    
                    // Scroll to form message
                    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    
                    // Hide message after 5 seconds
                    setTimeout(() => {
                        formMessage.textContent = '';
                        formMessage.classList.remove('success');
                    }, 5000);
                }, 1500);
            } else {
                // Show error message
                formMessage.textContent = 'Please correct the errors above and try again.';
                formMessage.classList.remove('success');
                formMessage.classList.add('error');
                
                // Scroll to first error
                const firstError = document.querySelector('.error-message:not(:empty)');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    }
    
    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Add hover effect to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px)';
        });
    });
    
    // Add animation to case study cards
    const caseStudyCards = document.querySelectorAll('.case-study-card');
    caseStudyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px)';
        });
    });
    
    // Initialize dashboard with random metrics
    setTimeout(updateDashboardMetrics, 1000);
});

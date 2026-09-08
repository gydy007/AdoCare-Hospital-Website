// ============================================
//    MOBILE MENU TOGGLE
// ============================================
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

if (menuToggle) {
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });
}

// Close mobile menu when a link is clicked
const mobileLinks = document.querySelectorAll('.mobile-links a, .mobile-actions a');
mobileLinks.forEach(link => {
    link.addEventListener('click', function() {
        if (menuToggle) {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const nav = document.querySelector('.nav');
    if (nav && !nav.contains(event.target) && mobileMenu.classList.contains('active')) {
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
    }
});

// ============================================
//    NAVIGATION ACTIVE STATE & SMOOTH SCROLL
// ============================================
const navLinks = document.querySelectorAll('.nav .links a, .mobile-links a');

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Only prevent default for anchor links
        if (href && href.startsWith('#')) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Smooth scroll to target
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

// ============================================
//    HIGHLIGHT NAV LINK ON SCROLL
// ============================================
window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section, #book-appointment');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Scroll-triggered animations using Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add the visible class to trigger animations
            entry.target.classList.add('animate-on-scroll');
            // Stop observing after animation is triggered
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// ============================================
//    BLOG ARTICLE READER
// ============================================
const articles = {
    1: {
        category: 'Longevity',
        title: 'The Science of Longevity: 5 Daily Habits That Add Quality Years to Life',
        author: 'Dr. Marcus Thorne',
        readTime: '5 min read',
        image: 'assets/healthy_lifestyle.png',
        body: [
            'Living longer is only part of the goal. The better measure of longevity is how many healthy, active years we can enjoy. Research consistently points to a handful of practical habits that support the heart, brain, and immune system.',
            'Start with regular movement. A brisk walk, cycling, swimming, or strength training can improve circulation and preserve muscle. Aim for activity most days, and break up long periods of sitting whenever possible.',
            'Build meals around vegetables, fruit, whole grains, beans, and lean sources of protein. Sleep, hydration, meaningful relationships, and routine health checks complete the foundation. Small actions repeated consistently create the strongest results.'
        ]
    },
    2: {
        category: 'Heart Health',
        title: 'A Practical Guide to Protecting Your Heart Every Day',
        author: 'Dr. M. Rivera',
        readTime: '6 min read',
        image: 'assets/heart (1).jpg',
        body: [
            'Heart health is shaped by everyday choices as much as by medical treatment. Understanding your blood pressure, cholesterol, blood sugar, and family history gives you a clear starting point.',
            'Choose more meals prepared at home, keep salt and highly processed foods occasional, and make movement part of your routine. Even a 30-minute walk can support circulation and improve energy.',
            'Do not ignore warning signs such as chest pressure, unusual shortness of breath, or sudden weakness. Seek urgent care when symptoms are severe or appear suddenly.'
        ]
    },
    3: {
        category: 'Mental Wellbeing',
        title: 'Simple Ways to Create More Mental Space',
        author: 'Dr. S. Chen',
        readTime: '4 min read',
        image: 'assets/mindBody.jpg',
        body: [
            'Mental wellbeing is not about feeling positive every minute. It is about having practical ways to notice stress, recover, and ask for support when you need it.',
            'Protect a regular sleep schedule, step away from screens during breaks, and try a short breathing exercise when your thoughts feel crowded. Sharing concerns with someone you trust can also reduce the weight of a difficult day.',
            'If low mood, anxiety, or exhaustion persists, a healthcare professional can help you find the right support. Reaching out early is a sign of care, not failure.'
        ]
    },
    4: {
        category: 'Family Health',
        title: 'Helping Children Build Healthy Routines',
        author: 'Dr. A. Kapoor',
        readTime: '4 min read',
        image: 'assets/child 1.jpg',
        body: [
            'Children learn healthy routines through repetition and example. Regular meals, active play, good sleep, and open conversations about feelings create a strong base for growth.',
            'Offer variety without turning food into a battle. Invite children to help choose or prepare simple meals, and keep water available throughout the day.',
            'Routine checkups help track development and provide a comfortable place to ask questions about nutrition, sleep, learning, and vaccines.'
        ]
    },
    5: {
        category: 'Recovery',
        title: 'How to Support a Stronger Recovery After Treatment',
        author: 'Dr. N. Adeyemi',
        readTime: '5 min read',
        image: 'assets/moving.jpg',
        body: [
            'Recovery is a process, and progress can look different from one person to the next. Following your care plan and communicating changes early can make the journey smoother.',
            'Rest when your body asks for it, but follow the movement guidance provided by your clinical team. Gentle, consistent activity often supports strength and confidence more effectively than doing too much at once.',
            'Keep follow-up appointments and ask for help with pain, nutrition, mobility, or mood. Your support network is part of your recovery team.'
        ]
    },
    6: {
        category: 'Prevention',
        title: 'Why Preventive Checkups Belong on Your Calendar',
        author: 'Ado Care Clinical Team',
        readTime: '3 min read',
        image: 'assets/answers.jpg',
        body: [
            'Preventive care helps identify health risks before they become disruptive symptoms. The right schedule depends on your age, history, lifestyle, and family needs.',
            'Bring a list of medicines, questions, and any changes you have noticed to your appointment. Honest information helps your care team make better decisions with you.',
            'A checkup is not a test you pass or fail. It is a useful conversation about staying well and making a plan for the years ahead.'
        ]
    }
};

function openArticle(articleId) {
    const article = articles[articleId];
    const reader = document.getElementById('articleReader');
    if (!article || !reader) return;

    reader.querySelector('.reader-image').src = article.image;
    reader.querySelector('.reader-image').alt = article.title;
    reader.querySelector('.reader-category').textContent = article.category;
    reader.querySelector('.reader-title').textContent = article.title;
    reader.querySelector('.reader-meta').textContent = `${article.readTime} • By ${article.author}`;
    reader.querySelector('.reader-content').innerHTML = article.body.map(paragraph => `<p>${paragraph}</p>`).join('');
    reader.classList.add('is-open');
    reader.setAttribute('aria-hidden', 'false');
    document.body.classList.add('reader-open');
}

function closeArticle() {
    const reader = document.getElementById('articleReader');
    if (!reader) return;
    reader.classList.remove('is-open');
    reader.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('reader-open');
}

function calculateReadTime() {
    document.querySelectorAll('.article-excerpt').forEach(excerpt => {
        const card = excerpt.closest('.article-card');
        const articleId = card?.querySelector('.read-article-btn')?.dataset.article;
        const article = articles[articleId];
        const meta = card?.querySelector('.article-meta');
        if (article && meta) meta.textContent = `${article.readTime} • By ${article.author}`;
    });
}

// Observe all elements that should animate on scroll
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.dashboard-shell') && !localStorage.getItem('adoCareUser')) {
        window.location.replace('appointment.html#auth-panel');
        return;
    }

    // About section elements
    const aboutImage = document.querySelector('.about-image img');
    const aboutH2 = document.querySelector('.about-text h2');
    const aboutH1 = document.querySelector('.about-text h1');
    const aboutParagraphs = document.querySelectorAll('.about-text p');
    const specializationDivs = document.querySelectorAll('.specializations > div');
    
    if (aboutImage) observer.observe(aboutImage);
    if (aboutH2) observer.observe(aboutH2);
    if (aboutH1) observer.observe(aboutH1);
    aboutParagraphs.forEach(p => observer.observe(p));
    specializationDivs.forEach(div => observer.observe(div));

    // Handle appointment form submission
    const appointmentForm = document.getElementById('appointmentForm');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const fullName = this.querySelector('input[placeholder="e.g. Jane Cooper"]').value;
            const email = this.querySelector('input[type="email"]')?.value;
            const phone = this.querySelector('input[type="tel"]')?.value;
            const date = this.querySelector('input[type="date"]').value;
            
            // Validate form
            if (fullName && date) {
                // Show success message
                const messageDiv = document.getElementById('appointmentMessage');
                messageDiv.classList.add('is-visible');
                
                // Reset form
                this.reset();
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    messageDiv.classList.remove('is-visible');
                }, 5000);
            } else {
                alert('Please fill in all required fields');
            }
        });
    }

    // Handle sign-in form submission
    const signinForm = document.getElementById('signinForm');
    if (signinForm) {
        signinForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const email = this.querySelector('input[type="email"]').value;
            const password = this.querySelector('input[type="password"]').value;
            
            // Validate form
            if (email && password) {
                if (password !== 'admin') {
                    alert('Use password "admin" for this demo sign in');
                    return;
                }

                // Validate email format
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    alert('Please enter a valid email address');
                    return;
                }
                
                localStorage.setItem('adoCareUser', email);
                window.location.href = 'dashboard.html';

                // Show success message
                const messageDiv = document.getElementById('signinMessage');
                messageDiv.classList.add('is-visible');
                
                // Reset form
                this.reset();
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    messageDiv.classList.remove('is-visible');
                }, 5000);
            } else {
                alert('Please fill in all fields');
            }
        });
    }
});

// ============================================
//    FORM INPUT STYLING & VALIDATION
// ============================================
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    // Add focus effects
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('is-focused');
    });
    
    // Add blur effects
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.classList.add('is-empty');
        } else {
            this.classList.remove('is-empty');
        }
    });
    
    // Real-time validation feedback
    input.addEventListener('change', function() {
        if (this.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (this.value && !emailRegex.test(this.value)) {
                this.classList.add('is-invalid');
            } else {
                this.classList.remove('is-invalid');
            }
        }
        
        if (this.type === 'tel') {
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (this.value && !phoneRegex.test(this.value)) {
                this.classList.add('is-invalid');
            } else {
                this.classList.remove('is-invalid');
            }
        }
    });
});



// ============================================
//    ANIMATE COUNTER NUMBERS
// ============================================
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ============================================
//    INITIALIZE ALL FEATURES
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Create back to top button
    // createBackToTopButton();
    
    // Calculate blog read times
    // calculateReadTime();

    const authLinks = document.querySelectorAll('.nav-auth-link');
    function refreshAuthNavigation() {
        const userEmail = localStorage.getItem('adoCareUser');
        const signinCard = document.getElementById('signinCard');
        const signedInHome = document.getElementById('signedInHome');
        authLinks.forEach(link => {
            link.textContent = userEmail ? 'Dashboard' : 'Sign In';
            link.href = userEmail ? 'dashboard.html' : 'appointment.html#auth-panel';
        });
        if (signinCard) signinCard.hidden = Boolean(userEmail);
        if (signedInHome) signedInHome.hidden = !userEmail;
    }

    refreshAuthNavigation();

    document.querySelectorAll('[data-auth-tab]').forEach(tab => {
        tab.addEventListener('click', () => {
            const selectedAuth = tab.dataset.authTab;
            document.querySelectorAll('[data-auth-tab]').forEach(item => {
                const selected = item === tab;
                item.classList.toggle('is-active', selected);
                item.setAttribute('aria-selected', selected ? 'true' : 'false');
            });
            document.querySelectorAll('[data-auth-form]').forEach(form => {
                form.classList.toggle('is-hidden', form.dataset.authForm !== selectedAuth);
            });
        });
    });

    const pageSigninForm = document.getElementById('pageSigninForm');
    if (pageSigninForm) {
        pageSigninForm.addEventListener('submit', event => {
            event.preventDefault();
            const email = pageSigninForm.elements.email.value.trim();
            const password = pageSigninForm.elements.password.value;
            const message = document.getElementById('signinPageMessage');
            if (password !== 'admin') {
                message.textContent = 'Use password "admin" for this demo sign in.';
                message.className = 'form-message is-error';
                return;
            }
            localStorage.setItem('adoCareUser', email);
            message.textContent = 'Signed in successfully. Dashboard is now available in the navigation.';
            message.className = 'form-message is-success';
            refreshAuthNavigation();
            window.location.href = 'dashboard.html';
        });
    }

    const pageSignupForm = document.getElementById('pageSignupForm');
    if (pageSignupForm) {
        pageSignupForm.addEventListener('submit', event => {
            event.preventDefault();
            const email = pageSignupForm.elements.email.value.trim();
            localStorage.setItem('adoCareUser', email);
            const message = document.getElementById('signupPageMessage');
            message.textContent = 'Account created. Dashboard is now available in the navigation.';
            message.className = 'form-message is-success';
            refreshAuthNavigation();
        });
    }

    const pageAppointmentForm = document.getElementById('pageAppointmentForm');
    if (pageAppointmentForm) {
        pageAppointmentForm.addEventListener('submit', event => {
            event.preventDefault();
            const message = document.getElementById('appointmentPageMessage');
            message.textContent = 'Request received. Our care coordinator will call you shortly.';
            message.className = 'form-message is-success';
            pageAppointmentForm.reset();
        });
    }

    const feedbackForm = document.getElementById('feedbackForm');
    const feedbackRating = document.getElementById('feedbackRating');
    if (feedbackForm && feedbackRating) {
        document.querySelectorAll('.rating-star').forEach(star => {
            star.addEventListener('click', () => {
                const rating = star.dataset.rating;
                feedbackRating.value = rating;
                document.querySelectorAll('.rating-star').forEach(item => {
                    item.classList.toggle('is-selected', Number(item.dataset.rating) <= Number(rating));
                });
            });
        });

        feedbackForm.addEventListener('submit', event => {
            event.preventDefault();
            const message = document.getElementById('feedbackMessage');
            if (!feedbackRating.value) {
                message.textContent = 'Please select a rating before sending your feedback.';
                message.className = 'form-message is-error';
                return;
            }
            message.textContent = 'Thank you. Your feedback has been received.';
            message.className = 'form-message is-success';
            feedbackForm.reset();
            feedbackRating.value = '';
            document.querySelectorAll('.rating-star').forEach(star => star.classList.remove('is-selected'));
        });
    }

    document.querySelectorAll('.dashboard-signout').forEach(button => {
        button.addEventListener('click', () => {
            localStorage.removeItem('adoCareUser');
            window.location.href = 'index.html';
        });
    });

    document.querySelectorAll('.read-article-btn').forEach(button => {
        button.addEventListener('click', () => openArticle(button.dataset.article));
    });

    document.querySelectorAll('[data-close-reader]').forEach(control => {
        control.addEventListener('click', closeArticle);
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') closeArticle();
    });

    document.querySelectorAll('.blog-reveal').forEach(element => observer.observe(element));
    document.querySelectorAll('.mission-reveal').forEach(element => observer.observe(element));
    document.querySelectorAll('.value-reveal').forEach(element => observer.observe(element));
    
    // Add smooth scroll behavior for internal links
})

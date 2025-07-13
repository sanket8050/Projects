// Enhanced project data with more details
const projects = [
    {
        title: "Cohart",
        description: "A comprehensive web application showcasing modern design principles with interactive user experience, responsive layouts, and smooth animations.",
        icon: "fas fa-chart-line",
        tech: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Animations"],
        liveUrl: "https://cohart-git-main-sanketadsare5-gmailcoms-projects.vercel.app",
        category: "Web Application",
        filter: "web-app",
        color: "#6366f1",
        featured: true
    },
    {
        title: "Rectangle Calculator",
        description: "An elegant mathematical tool for calculating area and perimeter with real-time validation, beautiful animations, and intuitive user interface.",
        icon: "fas fa-calculator",
        tech: ["JavaScript", "Math.js", "CSS Grid", "Form Validation", "Animations"],
        liveUrl: "https://area-perimeter.vercel.app",
        category: "Calculator Tool",
        filter: "tool",
        color: "#8b5cf6",
        featured: true
    },
    {
        title: "Weather App",
        description: "Real-time weather application with geolocation support, beautiful UI, comprehensive weather data visualization, and responsive design.",
        icon: "fas fa-cloud-sun",
        tech: ["Weather API", "Geolocation", "Chart.js", "PWA", "Local Storage"],
        liveUrl: "https://weather-app-beta-cyan-83.vercel.app",
        category: "API Integration",
        filter: "web-app",
        color: "#06b6d4",
        featured: true
    },
    {
        title: "Todo Application",
        description: "A feature-rich productivity app with drag & drop functionality, categories, deadlines, local storage persistence, and beautiful animations.",
        icon: "fas fa-tasks",
        tech: ["LocalStorage", "Drag & Drop", "Date.js", "Notifications", "CRUD Operations"],
        liveUrl: "https://todo-js-ht-css.vercel.app",
        category: "Productivity Tool",
        filter: "tool",
        color: "#10b981",
        featured: false
    },
    {
        title: "Currency Converter",
        description: "Real-time currency conversion tool supporting multiple currencies with live exchange rates, historical charts, and offline functionality.",
        icon: "fas fa-exchange-alt",
        tech: ["Exchange API", "Chart.js", "Real-time Data", "Multi-currency", "Offline Support"],
        liveUrl: "https://currency-converter-peach-two.vercel.app",
        category: "Finance Tool",
        filter: "tool",
        color: "#f59e0b",
        featured: false
    },
    {
        title: "Tic Tac Toe",
        description: "Classic game implementation with AI opponent, score tracking, beautiful animations, multiple difficulty levels, and game statistics.",
        icon: "fas fa-gamepad",
        tech: ["Game Logic", "AI Algorithm", "Animations", "Score System", "Local Storage"],
        liveUrl: "https://tic-tac-toe-gamma-teal.vercel.app",
        category: "Interactive Game",
        filter: "game",
        color: "#ef4444",
        featured: false
    }
];

// Typing animation texts
const typingTexts = [
    "Frontend Developer",
    "Computer Science Student", 
    "Problem Solver",
    "Creative Thinker",
    "Web Enthusiast"
];

// DOM elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const projectsGrid = document.getElementById('projectsGrid');
const themeToggle = document.getElementById('themeToggle');
const typingText = document.getElementById('typingText');
const contactForm = document.getElementById('contactForm');
const filterBtns = document.querySelectorAll('.filter-btn');

// Current filter state
let currentFilter = 'all';

// Theme management
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.className = savedTheme === 'dark' ? 'dark-mode' : '';
    document.body.setAttribute('data-theme', savedTheme);
}

function toggleTheme() {
    const isDark = document.body.classList.contains('dark-mode');
    const newTheme = isDark ? 'light' : 'dark';
    
    document.body.className = newTheme === 'dark' ? 'dark-mode' : '';
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Add transition effect
    document.body.style.transition = 'all 0.3s ease';
    setTimeout(() => {
        document.body.style.transition = '';
    }, 300);
}

// Mobile menu toggle
hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Theme toggle
themeToggle?.addEventListener('click', toggleTheme);

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
    });
});

// Typing animation
function startTypingAnimation() {
    if (!typingText) return;
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentText = typingTexts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % typingTexts.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    type();
}

// Counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target === 100 ? '100%' : target;
            }
        };
        
        updateCounter();
    });
}

// Skill level animation
function animateSkillLevels() {
    const skillLevels = document.querySelectorAll('.skill-level');
    
    skillLevels.forEach(skill => {
        const level = skill.getAttribute('data-level');
        setTimeout(() => {
            skill.style.width = level + '%';
        }, 500);
    });
}

// Project filtering
function filterProjects(filter) {
    currentFilter = filter;
    
    // Update filter buttons
    filterBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-filter') === filter) {
            btn.classList.add('active');
        }
    });
    
    // Filter project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        const projectFilter = card.getAttribute('data-filter');
        
        if (filter === 'all' || projectFilter === filter) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

// Render projects with enhanced styling
function renderProjects() {
    if (!projectsGrid) return;
    
    projectsGrid.innerHTML = projects.map((project, index) => `
        <div class="project-card fade-in" 
             data-filter="${project.filter}"
             style="animation-delay: ${index * 0.1}s">
            <div class="project-header">
                <div class="project-icon" style="background: linear-gradient(135deg, ${project.color}, ${adjustColor(project.color, -20)})">
                    <i class="${project.icon}"></i>
                </div>
                <div class="project-meta">
                    <h3 class="project-title">${project.title}</h3>
                    <span class="project-category">${project.category}</span>
                </div>
                ${project.featured ? '<div class="featured-badge"><i class="fas fa-star"></i></div>' : ''}
            </div>
            <p class="project-description">${project.description}</p>
            <div class="project-tech">
                ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            <div class="project-links">
                <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="project-link primary">
                    <i class="fas fa-external-link-alt"></i>
                    <span>Live Demo</span>
                </a>
                <a href="#" class="project-link secondary" onclick="showProjectDetails('${project.title}')">
                    <i class="fas fa-info-circle"></i>
                    <span>Details</span>
                </a>
            </div>
        </div>
    `).join('');
    
    // Add featured badge styles
    const style = document.createElement('style');
    style.textContent = `
        .featured-badge {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: linear-gradient(45deg, #f59e0b, #f97316);
            color: white;
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 0.8rem;
            font-weight: 500;
        }
        
        .project-card {
            position: relative;
        }
    `;
    document.head.appendChild(style);
    
    // Trigger fade-in animation
    setTimeout(() => {
        document.querySelectorAll('.project-card').forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('visible');
            }, index * 100);
        });
    }, 100);
}

// Helper function to adjust color brightness
function adjustColor(color, amount) {
    const usePound = color[0] === '#';
    const col = usePound ? color.slice(1) : color;
    const num = parseInt(col, 16);
    let r = (num >> 16) + amount;
    let g = (num >> 8 & 0x00FF) + amount;
    let b = (num & 0x0000FF) + amount;
    r = r > 255 ? 255 : r < 0 ? 0 : r;
    g = g > 255 ? 255 : g < 0 ? 0 : g;
    b = b > 255 ? 255 : b < 0 ? 0 : b;
    return (usePound ? '#' : '') + (r << 16 | g << 8 | b).toString(16).padStart(6, '0');
}

// Enhanced project details modal
function showProjectDetails(projectTitle) {
    const project = projects.find(p => p.title === projectTitle);
    if (!project) return;
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'project-modal';
    modal.innerHTML = `
        <div class="modal-backdrop" onclick="closeModal()"></div>
        <div class="modal-content">
            <div class="modal-header">
                <div class="project-icon" style="background: linear-gradient(135deg, ${project.color}, ${adjustColor(project.color, -20)})">
                    <i class="${project.icon}"></i>
                </div>
                <div class="modal-title-section">
                    <h2>${project.title}</h2>
                    <span class="project-category">${project.category}</span>
                </div>
                <button class="modal-close" onclick="closeModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <p class="modal-description">${project.description}</p>
                <div class="modal-tech">
                    <h4>Technologies Used:</h4>
                    <div class="project-tech">
                        ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                </div>
                <div class="modal-features">
                    <h4>Key Features:</h4>
                    <ul>
                        <li>Responsive design for all devices</li>
                        <li>Modern and intuitive user interface</li>
                        <li>Optimized performance and loading times</li>
                        <li>Cross-browser compatibility</li>
                        ${project.featured ? '<li>Featured project with advanced functionality</li>' : ''}
                    </ul>
                </div>
                <div class="modal-actions">
                    <a href="${project.liveUrl}" target="_blank" class="btn btn-primary">
                        <i class="fas fa-external-link-alt"></i>
                        <span>View Live Demo</span>
                    </a>
                    <button onclick="closeModal()" class="btn btn-secondary">
                        <i class="fas fa-times"></i>
                        <span>Close</span>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Add enhanced modal styles
    const modalStyles = `
        .project-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: modalFadeIn 0.3s ease;
        }
        
        .modal-backdrop {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
        }
        
        .modal-content {
            background: var(--glass-bg);
            border: 1px solid var(--glass-border);
            border-radius: 20px;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            backdrop-filter: blur(20px);
            position: relative;
            animation: modalSlideIn 0.3s ease;
        }
        
        .modal-header {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 2rem;
            border-bottom: 1px solid var(--glass-border);
        }
        
        .modal-title-section {
            flex: 1;
        }
        
        .modal-header h2 {
            margin: 0 0 0.5rem 0;
            color: var(--text-primary);
            font-size: 1.5rem;
        }
        
        .modal-close {
            background: var(--glass-bg);
            border: 1px solid var(--glass-border);
            color: var(--text-secondary);
            font-size: 1.2rem;
            cursor: pointer;
            padding: 8px;
            border-radius: 8px;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
        }
        
        .modal-close:hover {
            background: var(--error);
            color: white;
            border-color: var(--error);
        }
        
        .modal-body {
            padding: 2rem;
        }
        
        .modal-description {
            color: var(--text-secondary);
            line-height: 1.6;
            margin-bottom: 2rem;
        }
        
        .modal-tech, .modal-features {
            margin-bottom: 2rem;
        }
        
        .modal-tech h4, .modal-features h4 {
            color: var(--text-primary);
            margin-bottom: 1rem;
            font-size: 1.1rem;
        }
        
        .modal-features ul {
            color: var(--text-secondary);
            padding-left: 1.5rem;
        }
        
        .modal-features li {
            margin-bottom: 0.5rem;
            line-height: 1.5;
        }
        
        .modal-actions {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
        }
        
        @keyframes modalFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes modalSlideIn {
            from { transform: translateY(-50px) scale(0.9); opacity: 0; }
            to { transform: translateY(0) scale(1); opacity: 1; }
        }
        
        @media (max-width: 768px) {
            .modal-content {
                width: 95%;
                max-height: 90vh;
            }
            
            .modal-header {
                padding: 1.5rem;
            }
            
            .modal-body {
                padding: 1.5rem;
            }
            
            .modal-actions {
                flex-direction: column;
            }
        }
    `;
    
    // Add styles to head if not already added
    if (!document.querySelector('#modal-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'modal-styles';
        styleSheet.textContent = modalStyles;
        document.head.appendChild(styleSheet);
    }
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
}

// Close modal function
function closeModal() {
    const modal = document.querySelector('.project-modal');
    if (modal) {
        modal.style.animation = 'modalFadeIn 0.3s ease reverse';
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
        }, 300);
    }
}

// Advanced particle system
function initParticles() {
    const canvas = document.getElementById('particles');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 80;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.8;
            this.vy = (Math.random() - 0.5) * 0.8;
            this.size = Math.random() * 3 + 1;
            this.opacity = Math.random() * 0.6 + 0.2;
            this.hue = Math.random() * 60 + 200; // Blue to purple range
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            
            // Add slight random movement
            this.vx += (Math.random() - 0.5) * 0.02;
            this.vy += (Math.random() - 0.5) * 0.02;
            
            // Limit velocity
            this.vx = Math.max(-1, Math.min(1, this.vx));
            this.vy = Math.max(-1, Math.min(1, this.vy));
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${this.hue}, 70%, 60%, ${this.opacity})`;
            ctx.fill();
        }
    }
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw connections
        particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    const opacity = 0.15 * (1 - distance / 120);
                    ctx.strokeStyle = `hsla(220, 70%, 60%, ${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Resize handler
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Cursor follower
function initCursorFollower() {
    const cursor = document.querySelector('.cursor-follower');
    if (!cursor) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
    
    function updateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        cursor.style.left = cursorX - 10 + 'px';
        cursor.style.top = cursorY - 10 + 'px';
        
        requestAnimationFrame(updateCursor);
    }
    
    updateCursor();
}

// Contact form handling
function initContactForm() {
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> <span>Message Sent!</span>';
            submitBtn.style.background = 'var(--success)';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                contactForm.reset();
            }, 2000);
        }, 1500);
    });
}

// Filter button event listeners
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        filterProjects(filter);
    });
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

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Trigger specific animations
            if (entry.target.classList.contains('hero-stats')) {
                animateCounters();
            }
            
            if (entry.target.classList.contains('skills-section')) {
                animateSkillLevels();
            }
        }
    });
}, observerOptions);

// Header scroll effect
window.addEventListener('scroll', debounce(() => {
    const header = document.querySelector('.header');
    const scrolled = window.scrollY > 50;
    
    if (scrolled) {
        header.style.background = 'rgba(10, 10, 15, 0.95)';
        header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
        header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.03)';
        header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.08)';
        header.style.boxShadow = 'none';
    }
}, 10));

// Performance optimization: Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    renderProjects();
    initParticles();
    initCursorFollower();
    initContactForm();
    startTypingAnimation();
    
    // Observe elements for animations
    document.querySelectorAll('.fade-in, .hero-stats, .skills-section').forEach(el => {
        observer.observe(el);
    });
    
    // Add loading animation
    document.body.classList.add('loaded');
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
    }
});

// Add mouse parallax effect
document.addEventListener('mousemove', debounce((e) => {
    const shapes = document.querySelectorAll('.gradient-orb');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.5;
        const xOffset = (x - 0.5) * speed * 30;
        const yOffset = (y - 0.5) * speed * 30;
        
        shape.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    });
}, 16));

// Add scroll progress indicator
function addScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--primary), var(--secondary));
        z-index: 10001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Initialize scroll progress
addScrollProgress();

// Add loading state
const style = document.createElement('style');
style.textContent = `
    body:not(.loaded) {
        overflow: hidden;
    }
    
    body:not(.loaded) .hero-content {
        opacity: 0;
        transform: translateY(30px);
    }
    
    body.loaded .hero-content {
        opacity: 1;
        transform: translateY(0);
        transition: all 0.8s ease 0.3s;
    }
`;
document.head.appendChild(style);
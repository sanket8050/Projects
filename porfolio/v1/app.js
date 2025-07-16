const projects = [
    {
        title: "Cohart",
        description: "A modern web app with interactive UX and responsive design.",
        icon: "fas fa-chart-line",
        tech: ["HTML5", "CSS3", "JavaScript"],
        liveUrl: "https://cohart-git-main-sanketadsare5-gmailcoms-projects.vercel.app",
        category: "Web App",
        filter: "web-app",
        color: "#7C3AED"
    },
    {
        title: "Rectangle Calculator",
        description: "A sleek tool for calculating area and perimeter.",
        icon: "fas fa-calculator",
        tech: ["JavaScript", "CSS Grid"],
        liveUrl: "https://area-perimeter.vercel.app",
        category: "Tool",
        filter: "tool",
        color: "#10B981"
    },
    {
        title: "Weather App",
        description: "Real-time weather app with geolocation.",
        icon: "fas fa-cloud-sun",
        tech: ["Weather API", "JavaScript"],
        liveUrl: "https://weather-app-beta-cyan-83.vercel.app",
        category: "Web App",
        filter: "web-app",
        color: "#06B6D4"
    },
    {
        title: "Todo Application",
        description: "Productivity app with local storage.",
        icon: "fas fa-tasks",
        tech: ["JavaScript", "LocalStorage"],
        liveUrl: "https://todo-js-ht-css.vercel.app",
        category: "Tool",
        filter: "tool",
        color: "#F59E0B"
    },
    {
        title: "Tic Tac Toe",
        description: "Classic game with AI opponent.",
        icon: "fas fa-gamepad",
        tech: ["JavaScript", "Game Logic"],
        liveUrl: "https://tic-tac-toe-gamma-teal.vercel.app",
        category: "Game",
        filter: "game",
        color: "#EF4444"
    }
];

const typingTexts = ["Web Developer", "Problem Solver", "Creative Coder"];

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const projectsGrid = document.getElementById('projectsGrid');
const themeToggle = document.getElementById('themeToggle');
const typingText = document.getElementById('typingText');
const contactForm = document.getElementById('contactForm');

function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.toggle('dark-mode', savedTheme === 'dark');
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
}

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

themeToggle.addEventListener('click', toggleTheme);

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

function startTypingAnimation() {
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = typingTexts[textIndex];
        typingText.textContent = currentText.substring(0, charIndex);
        charIndex = isDeleting ? charIndex - 1 : charIndex + 1;
        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 1500;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % typingTexts.length;
            typeSpeed = 300;
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

function animateCounters() {
    document.querySelectorAll('.stat-number').forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        let current = 0;
        const increment = target / 50;

        const update = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(update);
            } else {
                counter.textContent = target === 100 ? '100%' : target;
            }
        };
        update();
    });
}

function animateSkills() {
    document.querySelectorAll('.skill-level').forEach(skill => {
        skill.style.width = skill.getAttribute('data-level') + '%';
    });
}

function renderProjects() {
    projectsGrid.innerHTML = projects.map(project => `
        <div class="project-card" data-filter="${project.filter}">
            <div class="project-icon" style="background: ${project.color}">
                <i class="${project.icon}"></i>
            </div>
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-tech">
                ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            <a href="${project.liveUrl}" target="_blank" class="btn btn-primary">View Project</a>
        </div>
    `).join('');

    document.querySelectorAll('.project-card').forEach(card => {
        card.classList.add('visible');
    });
}

function filterProjects(filter) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-filter') === filter);
    });

    document.querySelectorAll('.project-card').forEach(card => {
        const cardFilter = card.getAttribute('data-filter');
        card.classList.toggle('hidden', !(filter === 'all' || cardFilter === filter));
    });
}

function initParticles() {
    const canvas = document.getElementById('particles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    for (let i = 0; i < 40; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.3 + 0.2
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(124, 58, 237, ${p.opacity})`;
            ctx.fill();
        });
        requestAnimationFrame(animate);
    }

    animate();
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

function initContactForm() {
    if (!contactForm) return;
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button');
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        btn.disabled = true;

        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-check"></i> Sent!';
            setTimeout(() => {
                btn.innerHTML = 'Send Message';
                btn.disabled = false;
                contactForm.reset();
            }, 1500);
        }, 1000);
    });
}

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => filterProjects(btn.getAttribute('data-filter')));
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector(anchor.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
});

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.classList.contains('hero-stats')) animateCounters();
            if (entry.target.classList.contains('skills-section')) animateSkills();
        }
    });
}, { threshold: 0.2 });

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    renderProjects();
    initParticles();
    initContactForm();
    startTypingAnimation();
    document.querySelectorAll('.hero-stats, .skills-section, .project-card').forEach(el => observer.observe(el));
});
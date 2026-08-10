// Network Canvas Background
const canvas = document.getElementById('canvas-network');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

let mouse = {
    x: null,
    y: null,
    radius: (canvas.height / 80) * (canvas.width / 80)
};

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    update() {
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }

        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius + this.size) {
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                this.x += 6;
            }
            if (mouse.x > this.x && this.x > this.size * 10) {
                this.x -= 6;
            }
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                this.y += 6;
            }
            if (mouse.y > this.y && this.y > this.size * 10) {
                this.y -= 6;
            }
        }
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

function initCanvas() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 16000;
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 1.5) - 0.75;
        let directionY = (Math.random() * 1.5) - 0.75;
        let color = '#00f2fe';

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

function connectParticles() {
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
                ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));

            if (distance < (canvas.width / 8) * (canvas.height / 8)) {
                let opacityValue = 1 - (distance / 18000);
                ctx.strokeStyle = 'rgba(0, 242, 254,' + (opacityValue * 0.15) + ')';
                ctx.lineWidth = 0.6;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

function animateCanvas() {
    requestAnimationFrame(animateCanvas);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connectParticles();
}

window.addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    mouse.radius = ((canvas.height / 80) * (canvas.height / 80));
    initCanvas();
});

initCanvas();
animateCanvas();

// Interactive Terminal CLI Interpreter
const terminalCommands = {
    help: "Available commands:\n • metrics      Show quantifiable cost & reliability metrics\n • skills       List core cloud & DevOps technical stack\n • projects     Display featured GitHub infrastructure projects\n • certs        List verified AWS & Cisco certifications\n • experience   Show work history (Techloyce & Metex Labz)\n • security     View Fiverr & VestaCP bug bounty honors\n • contact      Get email, phone, and social handles\n • clear        Clear terminal screen",
    metrics: "📊 QUANTIFIABLE DEVOPS IMPACT:\n 💰 Cloud Cost Cut:        25–30% (AWS RI planning & rightsizing)\n ⚡ System Reliability:     +40% boost via monitoring & IAM\n 🖥️ Production Servers:   50+ Linux/Windows & VMware/Proxmox\n ⏱️ Downtime MTTR:        < 5 mins (Automated self-healing Bash)",
    skills: "🛠️ TECHNICAL TOOLBOX:\n • Cloud: AWS (EC2, S3, IAM, CloudWatch, Lambda, Route53, ECS, EKS), Azure, GCP\n • Containers: Docker, Kubernetes, Docker Swarm, Traefik, Portainer\n • CI/CD & MLOps: GitHub Actions, Jenkins, GitLab CI, Python MLOps\n • Monitoring: Prometheus, Grafana, Grafana Alloy, cAdvisor, Loki, CloudWatch\n • OS & Kernel: Linux (Ubuntu, CentOS, Flatcar), cgroups v2, Bash Scripting",
    projects: "🚀 FEATURED INFRASTRUCTURE WORK:\n 1. Grafana Alloy + cAdvisor Monitoring Guide (Prometheus, Grafana, Loki)\n 2. Docker Swarm + Traefik + Portainer (HA Orchestration & Auto TLS)\n 3. GPU Workloads on AWS Elastic Beanstalk (Containerized Scaling)\n 4. GPU Container on GKE Autopilot (GCP K8s AI Serving)\n 5. Linux User Management & RBAC Guide\n 6. Ultimate Guide to Linux cgroups v2",
    certs: "📜 VERIFIED CREDENTIALS & CERTIFICATIONS:\n • AWS re/Start Graduate (AWS Training & Certification)\n • AWS Cloud Quest: Cloud Practitioner (AWS Training)\n • Linux Unhatched (Cisco Networking Academy)\n • BS in Computer Science (Arid Agriculture University)",
    experience: "💼 WORK HISTORY:\n • Sole DevOps Engineer @ Techloyce (July 2024 – July 2026)\n • MLOps Engineer @ Metex Labz (May 2023 – July 2024)\n • Security Bug Bounty Contributor (Fiverr 2022, VestaCP 2018)",
    security: "🛡️ BUG BOUNTY DISCLOSURES:\n • Fiverr (2022): Disclosed critical vulnerability in earning clearance system\n • VestaCP (2018): Disclosed file manager & SFTP CHROOT licensing bypass",
    contact: "📬 CONTACT DETAILS:\n • Email: ranareehan@gmail.com\n • Phone / WhatsApp: +92 301 2963333\n • LinkedIn: linkedin.com/in/ranareehanaslam\n • GitHub: github.com/ranareehanaslam",
    whoami: "Muhammad Rehan Aslam — Results-Driven Linux Cloud & DevOps Engineer",
};

function runCliCmd(cmd) {
    const inputField = document.getElementById('terminal-input');
    inputField.value = cmd;
    handleTerminalCommand(cmd);
}

function handleTerminalCommand(rawCmd) {
    const outputContainer = document.getElementById('terminal-output');
    const cmd = rawCmd.trim().toLowerCase();

    if (!cmd) return;

    // Create command prompt line
    const cmdLine = document.createElement('div');
    cmdLine.className = 'term-line';
    cmdLine.innerHTML = `<span class="term-prompt">rehan@devops-node:~$</span> <span class="term-cmd">${escapeHtml(cmd)}</span>`;
    outputContainer.appendChild(cmdLine);

    if (cmd === 'clear') {
        outputContainer.innerHTML = '';
        document.getElementById('terminal-input').value = '';
        return;
    }

    const resLine = document.createElement('div');
    resLine.className = 'term-res';

    if (terminalCommands[cmd]) {
        resLine.innerText = terminalCommands[cmd];
    } else {
        resLine.innerHTML = `Command not recognized: '${escapeHtml(cmd)}'. Type <span class="cmd-chip" onclick="runCliCmd('help')">help</span> for available options.`;
    }

    outputContainer.appendChild(resLine);
    outputContainer.scrollTop = outputContainer.scrollHeight;
    document.getElementById('terminal-input').value = '';
}

function escapeHtml(text) {
    return text.replace(/[&<>"']/g, function (m) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m];
    });
}

// DOM Loaded Initializations
document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 400, fill: "forwards" });
    });

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('toggle');
        });
    }

    // Terminal Input Event Listener
    const terminalInput = document.getElementById('terminal-input');
    if (terminalInput) {
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                handleTerminalCommand(terminalInput.value);
            }
        });
    }

    // Typing Text Effect
    const TxtRotate = function (el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtRotate.prototype.tick = function () {
        let i = this.loopNum % this.toRotate.length;
        let fullTxt = this.toRotate[i];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

        let that = this;
        let delta = 200 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 400;
        }

        setTimeout(function () {
            that.tick();
        }, delta);
    };

    let elements = document.getElementsByClassName('txt-rotate');
    for (let i = 0; i < elements.length; i++) {
        let toRotate = elements[i].getAttribute('data-rotate');
        let period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtRotate(elements[i], JSON.parse(toRotate), period);
        }
    }

    // Project Filtering Logic
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category.includes(filterValue)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Smooth Scroll for Navigation Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });
});

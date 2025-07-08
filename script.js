document.addEventListener('DOMContentLoaded', () => {

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status'); // Get the status element

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const data = new FormData(contactForm);
        
        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                formStatus.textContent = "Thank you for your message! It has been sent successfully.";
                formStatus.className = 'success';
                contactForm.reset();
            } else {
                // Handle server-side errors from Formspree
                const responseData = await response.json();
                if (Object.hasOwn(responseData, 'errors')) {
                    formStatus.textContent = responseData["errors"].map(error => error["message"]).join(", ");
                } else {
                    formStatus.textContent = "Oops! There was a problem submitting your form.";
                }
                formStatus.className = 'error';
            }
        } catch (error) {
            // Handle network errors
            formStatus.textContent = "Oops! There was a network error. Please try again later.";
            formStatus.className = 'error';
        }
        
        // Make the status message visible
        formStatus.style.display = 'block';

        // Hide the status message after a few seconds
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 6000);
    });

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll(".reveal");

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        for (let i = 0; i < revealElements.length; i++) {
            const elementTop = revealElements[i].getBoundingClientRect().top;
            const elementVisible = 150; // Distance from bottom of viewport to trigger animation

            if (elementTop < windowHeight - elementVisible) {
                revealElements[i].classList.add("visible");
            } else {
                revealElements[i].classList.remove("visible"); // Optional: remove to re-trigger animation
            }
        }
    };

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // Initial check

    // Timeline Animation on scroll
    const timelineItems = document.querySelectorAll(".timeline-item");
    const revealTimeline = () => {
        const windowHeight = window.innerHeight;
        timelineItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            if (itemTop < windowHeight - 100) {
                item.classList.add("visible");
            }
        });
    };
    window.addEventListener("scroll", revealTimeline);
    revealTimeline();

    // Custom Cursor Logic
    const cursorDot = document.querySelector(".cursor-dot");
    const cursorOutline = document.querySelector(".cursor-outline");

    window.addEventListener("mousemove", function (e) {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Active Nav Link on Scroll
    const sections = document.querySelectorAll("section");
    const navLi = document.querySelectorAll("nav ul li a");
    window.addEventListener("scroll", ()=> {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if(pageYOffset >= (sectionTop - sectionHeight / 3)){
                current = section.getAttribute("id");
            }
        })

        navLi.forEach( a => {
            a.classList.remove("active");
            if(a.getAttribute("href").includes(current)){
                a.classList.add("active");
            }
        })
    })

    // Typing Text Animation for Name
    const nameElement = document.querySelector("#hero-name");
    const nameToType = "Muhammad Fikri Haikal Ariadma";
    let nameCharIndex = 0;

    function typeName() {
        if (nameCharIndex < nameToType.length) {
            nameElement.textContent += nameToType.charAt(nameCharIndex);
            nameCharIndex++;
            setTimeout(typeName, 100); // Adjust typing speed here
        }
    }

    // Start the name typing animation after a delay (e.g., after the pan-in animation)
    setTimeout(typeName, 1000); // 1 second delay

    // Typing Text Animation for Profession
    const typingText = document.querySelector("#typing-text");
    const words = ["Web Developer", "Network Engineer"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];
        const currentChar = isDeleting ? currentWord.substring(0, charIndex - 1) : currentWord.substring(0, charIndex + 1);

        typingText.textContent = currentChar;
        typingText.classList.add('stop-blinking');


        if (!isDeleting && charIndex < currentWord.length) {
            charIndex++;
            setTimeout(type, 150);
        } else if (isDeleting && charIndex > 0) {
            charIndex--;
            setTimeout(type, 100);
        } else {
            isDeleting = !isDeleting;
            typingText.classList.remove('stop-blinking');
            if (!isDeleting) {
                wordIndex = (wordIndex + 1) % words.length;
            }
            setTimeout(type, 1200);
        }
    }

    type();

    // Hamburger Menu Toggle
    const hamburger = document.getElementById('hamburger-menu');
    const navUl = document.querySelector('nav ul');

    hamburger.addEventListener('click', () => {
        navUl.classList.toggle('nav-active');
        // Hamburger Icon Animation
        hamburger.classList.toggle('toggle');
    });

    // Click outside to close menu
    document.addEventListener('click', function (e) {
        // Check if the menu is active and the click is outside the menu and the hamburger icon
        if (navUl.classList.contains('nav-active') && !navUl.contains(e.target) && !hamburger.contains(e.target)) {
            navUl.classList.remove('nav-active');
            hamburger.classList.remove('toggle');
        }
    });

    // Modal Logic
    const projectInfoIcons = document.querySelectorAll('.project-info-icon');
    const modal = document.getElementById('project-modal');
    const closeModal = document.querySelector('.close-button');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalTools = document.getElementById('modal-tools');

    const toolIconMap = {
        html: '<i class="fab fa-html5 icon-html"></i>',
        css: '<i class="fab fa-css3-alt icon-css"></i>',
        javascript: '<i class="fab fa-js-square icon-js"></i>',
        react: '<i class="fab fa-react icon-react"></i>',
        bootstrap: '<i class="fab fa-bootstrap icon-bootstrap"></i>',
        php: '<i class="fab fa-php icon-php"></i>',
        mysql: '<i class="devicon-mysql-plain-wordmark"></i>',
        laravel: '<i class="fab fa-laravel icon-laravel"></i>',
        networking: '<i class="fas fa-network-wired"></i>',
        hardware: '<i class="fas fa-cogs"></i>',
        troubleshooting: '<i class="fas fa-wrench"></i>',
        tailwind: '<i class="devicon-tailwindcss-plain icon-tailwind"></i>',
        postgresql: '<i class="devicon-postgresql-plain icon-postgresql"></i>',
        express: '<i class="devicon-express-original icon-express"></i>',
        canva: '<i class="fas fa-palette icon-canva" style="color: #0052CC;"></i>'
    };

    projectInfoIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const card = icon.closest('.project-card');
            const title = card.dataset.title;
            const description = card.dataset.description;
            const tools = card.dataset.tools.split(',');

            modalTitle.textContent = title;
            modalDescription.textContent = description;
            modalTools.innerHTML = ''; // Clear previous tools

            tools.forEach(tool => {
                const toolItem = document.createElement('div');
                toolItem.className = 'tool-item';
                const iconHtml = toolIconMap[tool.trim()] || `<span>${tool.trim()}</span>`;
                toolItem.innerHTML = `${iconHtml} <span>${tool.trim().charAt(0).toUpperCase() + tool.trim().slice(1)}</span>`;
                modalTools.appendChild(toolItem);
            });

            modal.classList.add('show');
        });
    });

    closeModal.addEventListener('click', () => {
        modal.classList.remove('show');
    });

    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.classList.remove('show');
        }
    });
});
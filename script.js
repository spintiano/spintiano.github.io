const menuBtn = document.querySelector(".menu-btn");
const navbar = document.querySelector(".navbar");

if (menuBtn && navbar) {
    menuBtn.addEventListener("click", () => {
        navbar.classList.toggle("active");
    });
}

/* SCROLL ANIMATIONS */

const sections = document.querySelectorAll(".hidden");
const leftElements = document.querySelectorAll(".left");
const rightElements = document.querySelectorAll(".right");
const zoomElements = document.querySelectorAll(".zoom");

function showElements() {
    const trigger = window.innerHeight * 0.85;

    sections.forEach((section) => {
        const top = section.getBoundingClientRect().top;

        if (top < trigger) {
            section.classList.add("show");
        }
    });

    leftElements.forEach((element) => {
        const top = element.getBoundingClientRect().top;

        if (top < trigger) {
            element.classList.add("show");
        }
    });

    rightElements.forEach((element) => {
        const top = element.getBoundingClientRect().top;

        if (top < trigger) {
            element.classList.add("show");
        }
    });

    zoomElements.forEach((element) => {
        const top = element.getBoundingClientRect().top;

        if (top < trigger) {
            element.classList.add("show");
        }
    });
}

window.addEventListener("scroll", showElements);
window.addEventListener("load", showElements);

/*TYPING EFFECT*/

const typingText = document.querySelector(".typing");

const words = ["Student", "Web Developer", "Freelancer"];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
    if (!typingText) {
        return;
    }

    const currentWord = words[wordIndex];

    if (!deleting) {
        typingText.textContent = currentWord.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex === currentWord.length) {
            deleting = true;

            setTimeout(typeEffect, 1500);

            return;
        }
    } else {
        typingText.textContent = currentWord.substring(0, charIndex - 1);

        charIndex--;

        if (charIndex === 0) {
            deleting = false;

            wordIndex++;

            if (wordIndex === words.length) {
                wordIndex = 0;
            }
        }
    }

    setTimeout(typeEffect, deleting ? 60 : 100);
}

typeEffect();

/*NAVIGATION*/

const navLinks = document.querySelectorAll(".navbar a");

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        if (navbar) {
            navbar.classList.remove("active");
        }

        navLinks.forEach((item) => {
            item.classList.remove("active");
        });

        link.classList.add("active");
    });
});

/*LOAD PROJECTS FROM JSON*/

const projectsContainer = document.getElementById("projects-container");

async function loadProjects() {
    try {
        const response = await fetch("data/projects.json");

        if (!response.ok) {
            throw new Error("Projects could not be loaded.");
        }

        const projects = await response.json();

        projectsContainer.innerHTML = "";

        if (projects.length === 0) {
            projectsContainer.innerHTML =
                "<p id='projects-message'>No projects available.</p>";

            return;
        }

        projects.forEach((project) => {
            const card = document.createElement("div");

            card.classList.add("project-card");

            const technologies = project.technologies.join(", ");

            card.innerHTML = `

                <img
                    src="${project.screenshot}"
                    alt="${project.title} screenshot"
                    class="project-image"
                >

                <h3>${project.title}</h3>

                <p>
                    ${project.description}
                </p>

                <p>
                    <strong>Technologies:</strong>
                    ${technologies}
                </p>

                <p>
                    <strong>Role:</strong>
                    ${project.role}
                </p>

                <a
                    href="${project.link}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="project-link"
                >
                    <i class="fab fa-github"></i>
                    GitHub / Demo
                </a>

            `;

            projectsContainer.appendChild(card);
        });
    } catch (error) {
        console.error(error);

        projectsContainer.innerHTML = `
            <p id="projects-message">
                Unable to load projects. Please try again later.
            </p>
        `;
    }
}

loadProjects();

/*GITHUB API*/

const githubContainer = document.getElementById("github-container");

async function loadGitHubRepositories() {
    try {
        const response = await fetch(
            "https://api.github.com/users/spintiano/repos?sort=updated&per_page=5",
        );

        if (!response.ok) {
            throw new Error("GitHub data could not be loaded.");
        }

        const repositories = await response.json();

        githubContainer.innerHTML = "";

        if (repositories.length === 0) {
            githubContainer.innerHTML = `
                <p id="github-message">
                    No public repositories found.
                </p>
            `;

            return;
        }

        const list = document.createElement("div");

        list.classList.add("github-list");

        repositories.forEach((repo) => {
            const item = document.createElement("div");

            item.classList.add("github-repository");

            const language = repo.language || "Not specified";

            item.innerHTML = `

                <a
                    href="${repo.html_url}"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    ${repo.name}
                </a>

                <span>
                    ${language}
                </span>

            `;

            list.appendChild(item);
        });

        githubContainer.appendChild(list);
    } catch (error) {
        console.error(error);

        githubContainer.innerHTML = `
            <p id="github-message">
                Unable to load GitHub repositories.
            </p>
        `;
    }
}

loadGitHubRepositories();

/*CONTACT FORM*/

const contactForm = document.getElementById("contact-form");

const formMessage = document.getElementById("form-message");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = contactForm.querySelector('[name="name"]').value.trim();

        const email = contactForm.querySelector('[name="email"]').value.trim();

        const message = contactForm.querySelector('[name="message"]').value.trim();

        if (name === "" || email === "" || message === "") {
            formMessage.textContent = "Please fill in all fields.";

            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            formMessage.textContent = "Please enter a valid email address.";

            return;
        }

        formMessage.textContent = "Thank you! Your message has been submitted.";

        contactForm.reset();
    });
}

/*BACK TO TOP*/

const backToTop = document.createElement("button");

backToTop.classList.add("back-to-top");

backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';

backToTop.setAttribute("aria-label", "Back to top");

document.body.appendChild(backToTop);

window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }
});

backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
});


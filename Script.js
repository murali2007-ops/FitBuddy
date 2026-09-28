// =====================================================
// FitBuddy - Main JavaScript
// =====================================================

document.addEventListener("DOMContentLoaded", () => {
    initializeFormValidation();
    initializeFeedbackForm();
    initializeAnimations();
    initializeButtons();
});


// =====================================================
// Form Validation
// =====================================================

function initializeFormValidation() {
    const workoutForm = document.getElementById("workout-form");

    if (!workoutForm) {
        return;
    }

    workoutForm.addEventListener("submit", (event) => {
        const age = Number(document.getElementById("age")?.value);
        const weight = Number(document.getElementById("weight")?.value);

        if (age < 13 || age > 100) {
            event.preventDefault();
            showMessage("Please enter an age between 13 and 100.", "error");
            return;
        }

        if (weight < 20 || weight > 500) {
            event.preventDefault();
            showMessage("Please enter a valid weight.", "error");
            return;
        }

        showLoading();
    });
}


// =====================================================
// Feedback Form
// =====================================================

function initializeFeedbackForm() {
    const feedbackForm = document.getElementById("feedback-form");

    if (!feedbackForm) {
        return;
    }

    feedbackForm.addEventListener("submit", () => {
        const feedback = document.getElementById("feedback")?.value.trim();

        if (!feedback || feedback.length < 3) {
            showMessage(
                "Please enter some feedback before submitting.",
                "error"
            );
            return;
        }

        showLoading("Updating your workout plan...");
    });
}


// =====================================================
// Loading Indicator
// =====================================================

function showLoading(message = "Generating your personalized plan...") {
    const loadingElement = document.getElementById("loading");

    if (loadingElement) {
        loadingElement.textContent = message;
        loadingElement.style.display = "block";
    }

    const buttons = document.querySelectorAll(
        "button[type='submit'], input[type='submit']"
    );

    buttons.forEach((button) => {
        button.disabled = true;

        if (button.tagName === "BUTTON") {
            button.dataset.originalText = button.textContent;
            button.textContent = "Please wait...";
        }
    });
}


// =====================================================
// Messages
// =====================================================

function showMessage(message, type = "info") {
    let messageElement = document.getElementById("js-message");

    if (!messageElement) {
        messageElement = document.createElement("div");
        messageElement.id = "js-message";

        document.body.prepend(messageElement);
    }

    messageElement.textContent = message;
    messageElement.className = `message ${type}`;

    messageElement.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}


// =====================================================
// Animations
// =====================================================

function initializeAnimations() {
    const cards = document.querySelectorAll(
        ".card, .plan-card, .day-card, .tip-card"
    );

    cards.forEach((card, index) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(15px)";

        setTimeout(() => {
            card.style.transition =
                "opacity 0.5s ease, transform 0.5s ease";

            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }, index * 80);
    });
}


// =====================================================
// Buttons
// =====================================================

function initializeButtons() {
    const printButton = document.getElementById("print-plan");

    if (printButton) {
        printButton.addEventListener("click", () => {
            window.print();
        });
    }

    const backButton = document.getElementById("back-home");

    if (backButton) {
        backButton.addEventListener("click", () => {
            window.location.href = "/";
        });
    }
});


// =====================================================
// Copy Plan to Clipboard
// =====================================================

function copyPlan() {
    const planElement = document.getElementById("workout-plan");

    if (!planElement) {
        showMessage("Workout plan could not be found.", "error");
        return;
    }

    const planText = planElement.innerText;

    navigator.clipboard.writeText(planText)
        .then(() => {
            showMessage(
                "Workout plan copied to clipboard!",
                "success"
            );
        })
        .catch(() => {
            showMessage(
                "Could not copy the workout plan.",
                "error"
            );
        });
}


// =====================================================
// Toggle Sections
// =====================================================

function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);

    if (!section) {
        return;
    }

    if (section.style.display === "none") {
        section.style.display = "block";
    } else {
        section.style.display = "none";
    }
}

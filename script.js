let step = 1;

let confettiInterval = null;

function createConfetti() {
    const colors = ['#ff6b8b', '#8a4fff', '#00d2ff', '#4ade80', '#facc15'];

    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');

            const size = Math.random() * 8 + 15;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const left = Math.random() * 100;
            const duration = Math.random() * 3 + 2;

            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            confetti.style.backgroundColor = color;
            confetti.style.left = `${left}%`;
            confetti.style.animationDuration = `${duration}s`;

            document.body.appendChild(confetti);

            setTimeout(() => {
                confetti.remove();
            }, duration * 1000);
        }, i * 15);
    }
}

function showStep() {
    const steps = document.querySelectorAll('.step');
    steps.forEach((el, index) => {
        el.classList.toggle('active', index === step - 1);
    });

    const video = document.getElementById('video');
    if (video) {
        if (step === 13) {
            video.play();
        } else {
            video.pause();
            video.currentTime = 0;
        }
    }
}

function nextStep() {
    if (step < 13) {
        step++;
        showStep();
    }
}

function prevStep() {
    if (step > 1) {
        step--;
        showStep();
    }
}

function styleChange() {
    document.getElementById('step1').classList.remove('active');
    document.body.classList.add('reject');
    document.body.innerText = "Thank you for your response! If you have any further questions, feel free to reach out.";
}

function notInterested() {
    alert("Thanks for your response! If you have any further questions, feel free to reach out.");
    styleChange();
}

function confirmIdentity() {
    const isConfirmed = confirm("Are you ready to confirm your identity?");
    if (isConfirmed) {
        nextStep();
    } else {
        styleChange();
    }
}

function noConfirm() {
    alert("This is not you! Thanks for your time.")
    styleChange();
}

function finalStep() {
    nextStep();
    clearInterval(confettiInterval);
}

function surpriseStep() {
    createConfetti();
    confettiInterval = setInterval(createConfetti, 1500);
    nextStep();
}
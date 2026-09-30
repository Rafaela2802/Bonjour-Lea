const chickenButton = document.getElementById("chickenButton");
const chicken = document.getElementById("chicken");
const speech = document.getElementById("speech");
const dialogue = document.getElementById("dialogue");
const effects = document.getElementById("effects");
const background = document.getElementById("background");

const dialogues = [
    {
        text: "Ah ! T’es réveillée 👀 J’allais repartir sans toi.",
        animation: "jump",
        effects: ["👀"]
    },
    {
        text: "Question existentielle… qui vient en premier ?la poule ou l’œuf ? 🤔",
        animation: "thinking",
        effects: ["🥚", "🤔"]
    },
    {
        text: "Aucune idée ? Bon… je te fais un café ? Ah non, j’ai pas de mains. 😭☕",
        animation: "laugh",
        effects: ["☕", "😭"]
    },
    {
        text: "Désolée, je t’embête mdddrr 😂 Bon courage pour aujourd’hui, t’es forte et tu le sais ! Et si quelqu’un t’embête… bah… appelle Tyson. Moi, je suis une poule mouillée. 😭",
        animation: "laugh",
        effects: ["❤️", "😂"]
    },
    {
        text: "Bon… j’ai suffisamment travaillé pour aujourd’hui. Je retourne au lit. 😴",
        animation: "sleep",
        effects: ["💤"]
    }
];

let currentStep = 0;
let locked = false;

function showDialogue(text) {
    speech.classList.remove("show");

    setTimeout(() => {
        dialogue.textContent = text;
        speech.classList.add("show");
    }, 120);
}

function animateChicken(animation) {
    chickenButton.classList.remove("jump", "thinking", "laugh");
    void chickenButton.offsetWidth;

    if (animation !== "sleep") {
        chickenButton.classList.add(animation);
    }
}

function createEffects(list) {
    list.forEach((emoji, index) => {
        const element = document.createElement("div");
        element.className = "effect";
        element.textContent = emoji;
        element.style.left = `${40 + Math.random() * 20}%`;
        element.style.top = `${42 + Math.random() * 12}%`;
        element.style.animationDelay = `${index * 0.12}s`;

        effects.appendChild(element);

        setTimeout(() => {
            element.remove();
        }, 1400);
    });
}

function goToSleep() {
    locked = true;
    chickenButton.style.pointerEvents = "none";
    speech.classList.remove("show");

    setTimeout(() => {
        chickenButton.classList.add("sleeping");

        setTimeout(() => {
            background.style.opacity = "0";

            setTimeout(() => {
                background.src = "images/sleep.png";

                background.onload = () => {
                    background.style.opacity = "1";
                };

                if (background.complete) {
                    background.style.opacity = "1";
                }
            }, 700);
        }, 300);
    }, 400);

    setTimeout(() => {
        createEffects(["💤", "💤"]);
    }, 1800);
}

chickenButton.addEventListener("click", () => {
    if (locked) return;

    const data = dialogues[currentStep];

    if (currentStep === dialogues.length - 1) {
        showDialogue(data.text);
        createEffects(data.effects);

        setTimeout(() => {
            goToSleep();
        }, 1700);

        return;
    }

    animateChicken(data.animation);
    showDialogue(data.text);
    createEffects(data.effects);

    currentStep++;

    locked = true;

    setTimeout(() => {
        locked = false;
    }, 850);
});

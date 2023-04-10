"use strict";

// console.log(document.querySelector(".message").textContent); // select an element, class or id
// DOM Manipulation is making javascript interact with a webpage

// DOM stands for Document Object Model: Structured rep of HTML documents and allow js
// to access element and CSS styles in manipulate them and DOM get created by browser
// that is stored in a tree structure
// document is a special object that is the entry point to the DOM hence document.query.selector()
// DOM also has nodes for text element because it IS a rep of the html
// DOM IS NOT part of JS code but from Web APIs like google that can interact with JS

// document.querySelector(".message").textContent = "Correct Number!";
// document.querySelector(".number").textContent = 13;
// document.querySelector(".score").textContent = 10;

// document.querySelector(".guess").value = 23;
// console.log(document.querySelector(".guess").value); // value is used for input field

// event listener wait for a mouse click, keypress that happens on the page

const blinkSpeed = 600;
const blinkDuration = blinkSpeed * 6;
const maxScore = 20;
let secretNum = Math.trunc(Math.random() * 20) + 1;
let score = maxScore;
document.querySelector(".score").textContent = score;

function setBlinkMessage(text) {
    document.querySelector(".message").textContent = text;
    document.querySelector(".check").disabled = true; // prevent user checking too quick, messing up blinking
    let blinkCount = 0;
    // make message textContent blink every blinkDuration
    const blinkMessage = setInterval(() => {
        const message = document.querySelector(".message");
        // prettier-ignore
        message.style.visibility = message.style.visibility == "hidden" ? "" : "hidden";

        blinkCount++;
        // stop blinking after 3 blinks no matter what
        if (blinkCount === 6) {
            clearInterval(blinkMessage);
            document.querySelector(".check").disabled = false;
            message.style.visibility = "";
        }
    }, blinkSpeed);
}
function blinkBackground() {
    document.querySelector(".check").disabled = true; // prevent user checking too quick, messing up blinking
    let blinkCount = 0;
    const blinkBackground = setInterval(() => {
        console.log(typeof document.body.style.backgroundColor);
        document.body.style.backgroundColor =
            document.body.style.backgroundColor === "rgb(33, 33, 33)"
                ? "#ff0000"
                : "rgb(33, 33, 33)";

        blinkCount++;
        if (blinkCount === 6) {
            clearInterval(blinkBackground);
            document.querySelector(".check").disabled = false;
            document.body.style.backgroundColor = "rgb(33, 33, 33)";
        }
    }, blinkSpeed);
}

document.querySelector(".check").addEventListener("click", () => {
    let guess = Number(document.querySelector(".guess").value); // input will be a string
    // console.log(document.querySelector(".guess").value);

    if (!Boolean(guess)) {
        setBlinkMessage("No guess found...");
    } else if (guess > secretNum) {
        score--;
        document.querySelector(".score").textContent = score;
        setBlinkMessage("Too high...");
        if (score <= 0) {
            document.querySelector(".message").textContent = "You lost...";
            document.body.style.backgroundColor = "red";
            document.querySelector(".check").disabled = true;
        }
        // blinkBackground();
    } else if (guess < secretNum) {
        score--;
        document.querySelector(".score").textContent = score;
        setBlinkMessage("Too small");
        if (score <= 0) {
            document.querySelector(".message").textContent = "You lost...";
            document.body.style.backgroundColor = "red";
            document.querySelector(".check").disabled = true;
        }
        // blinkBackground();
    } else {
        console.log("Correct");
        document.body.style.backgroundColor = "#60b347";
        document.querySelector(".message").textContent = "Correct Guess!";
        document.querySelector(".check").disabled = true;
        document.querySelector(".number").style.width = "30rem";
        document.querySelector(".number").textContent = secretNum;
        if (score > Number(document.querySelector(".highscore").textContent)) {
            document.querySelector(".highscore").textContent = score;
        }
    }
});

document.querySelector(".again").addEventListener("click", () => {
    document.body.style.backgroundColor = "rgb(33, 33, 33)";
    secretNum = Math.trunc(Math.random() * 20) + 1;
    score = 20;
    document.querySelector(".score").textContent = maxScore;
    document.querySelector(".check").disabled = false;
    document.querySelector(".message").textContent = "Start guessing...";
    document.querySelector(".number").style.width = "15rem";
    document.querySelector(".number").textContent = "?";
    document.querySelector(".guess").value = "";
});

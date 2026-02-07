import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  doc,
  setDoc,
  updateDoc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyB6PXoo7c9zxa5wun3wOhFErw3ngkVnRUY",
  authDomain: "rock-paper-scissors-d4cdc.firebaseapp.com",
  projectId: "rock-paper-scissors-d4cdc",
  storageBucket: "rock-paper-scissors-d4cdc.firebasestorage.app",
  messagingSenderId: "1060541856918",
  appId: "1:1060541856918:web:1bee3fd3d4e73c37c656b7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const gameRef = doc(db, "game-state", "Ekd4K3XtgjXDVQCZ0ill");

await setDoc(gameRef, {
    player1: "babayka",
    player2: "b9ka",
    ready1: false,
    ready2: false,
    choice1: "",
    choice2: "",
});


const gameBody = document.getElementById("game");
gameBody.style.display = "none";
let currPlayer = "";

document.querySelectorAll(".choose").forEach(btn => {
    btn.addEventListener("click", () => {
        currPlayer = btn.innerText;
        console.log(currPlayer)
    
        document.querySelectorAll(".choose").forEach(button=>{
            button.disabled = true;
        });

        
    });
});

const waitingText = document.getElementById("waiting");
onSnapshot(gameRef, (docSnap) => {
    const game = docSnap.data();
    if (!game) return;

    if (game.ready1 && game.ready2) {
        waitingText.style.display = "none";
        gameBody.style.display = "flex";
    }

    if ((currPlayer === "babayka" && game.choice1) || (currPlayer === "b9ka" && game.choice2)) {
        choiceButtons.forEach(b=>b.disabled = true);
    }

    if (game.choice1 && game.choice2) {
        const winner = getWinner(game.choice1, game.choice2);
        alert(`And the winner is... ${winner}!`);
    }
});

function getWinner(a, b) {
    if (a === b) return "Tie";

    const winCombs = {
        "rock": "scissors",
        "paper": "rock",
        "scissors": "paper"
    };

    return winCombs[a] === b ? "babayka" : "b9ka";
}

document.getElementById("start").addEventListener("click", ()=>{

    if (!currPlayer) {
        alert("Chooose player first!");
        return;
    }
    waitingText.innerText = "Waiting for another player...";
});

const readyBtn = document.getElementById("ready");
readyBtn.addEventListener("click", async () => {
    const readyField = currPlayer === "babayka" ? "ready1" : "ready2";

    await updateDoc( gameRef, {
        [readyField]: true
     });
     
    readyBtn.disabled = true;
    readyBtn.classList.add("active");
});

const choiceButtons = document.querySelectorAll(".choice");
choiceButtons.forEach(btn => {
    btn.addEventListener("click", async () => {
        const choice = btn.id;

        const choiceField = currPlayer === "babayka" ? "choice1" : "choice2";

        await updateDoc(gameRef, {
            [choiceField]: choice
        });

        choiceButtons.forEach(b => b.disabled = true);
    })
})

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
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

const snap = await getDoc(gameRef);
if (!snap.exists()) {
    await setDoc(gameRef, {
        player1: "babayka",
        player2: "b9ka",
        ready1: false,
        ready2: false,
        choice1: "",
        choice2: "",
        roundResolved: false,
    });
}


const gameBody = document.getElementById("game");
gameBody.style.display = "none";
let currPlayer = "";
let playerChoice = "";

// Choose player
document.querySelectorAll(".choose").forEach(btn => {
    btn.addEventListener("click", () => {
        currPlayer = btn.innerText;
        console.log(currPlayer)
    
        document.querySelectorAll(".choose").forEach(button=>{
            button.disabled = true;
        });

        gameBody.style.display = "flex";
    });
});

const waitingText = document.getElementById("waiting");

// Game real-time update
onSnapshot(gameRef, async (docSnap) => {
    const game = docSnap.data();
    if (!game) return;


    if ((currPlayer === "babayka" && game.choice1) || (currPlayer === "b9ka" && game.choice2)) {
        choiceButtons.forEach(b=>b.disabled = true);
    }

    if (game.choice1 && game.choice2 && !game.roundResolved) {
        const winner = getWinner(game);

        await updateDoc(gameRef, {
            roundResolved: true
        })

        alert(`And the winner is... ${winner}!`);
    }
});

function getWinner(game) {
    const { choice1, choice2, player1, player2 } = game;

    const winCombs = {
        rock: "scissors",
        paper: "rock",
        scissors: "paper"
    };

    return winCombs[choice1] === choice2 ? player1 : player2;
}

// Ready button confirm logic
const readyBtn = document.getElementById("ready");
readyBtn.addEventListener("click", async () => {
    if (!playerChoice) {
        alert("Make your move first!!")
        return;
    }
    const readyField = currPlayer === "babayka" ? "ready1" : "ready2";
    const choiceField = currPlayer === "babayka" ? "choice1" : "choice2";

    await updateDoc( gameRef, {
        [readyField]: true,
        [choiceField]: playerChoice
    });
    
    choiceButtons.forEach(b => b.disabled = true);
    readyBtn.disabled = true;
    readyBtn.classList.add("active");
    
    waitingText.innerText = "Waiting for another kitten..."
});

const choiceButtons = document.querySelectorAll(".choice");
choiceButtons.forEach(btn => {
    btn.addEventListener("click", async () => {
        const choice = btn.id;


        playerChoice = choice;

    })
})

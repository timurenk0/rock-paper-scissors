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

document.getElementById("start").addEventListener("click", ()=>{

    if (!currPlayer) {
        console.error("Chooose player first!");
        return;
    }

    onSnapshot(gameRef, (docSnap) => {
        const game = docSnap.data();
    
        if (currPlayer === "babayka") {
            gameBody.style.display = "flex";
        } else if (currPlayer === "b9ka") {
            gameBody.style.display = "flex";
        }  
    })
})

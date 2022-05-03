import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCC59vIEM4llcuDMid8vJT3R1sC6hNhe1A",
  authDomain: "gestione-fir.firebaseapp.com",
  projectId: "gestione-fir",
  storageBucket: "gestione-fir.appspot.com",
  messagingSenderId: "660017697450",
  appId: "1:660017697450:web:d3f6b04dd37bda576876d3",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged }
  from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyCHWSIJuNJDottoLgucWeqvNmLbzJYNgrk",
  authDomain: "analize-de-date.firebaseapp.com",
  projectId: "analize-de-date",
  storageBucket: "analize-de-date.firebasestorage.app",
  messagingSenderId: "442568826418",
  appId: "1:442568826418:web:6ab01b8a3aa654b94fe62b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const email = document.getElementById("email");
const password = document.getElementById("password");
const signup = document.getElementById("signup");
const login = document.getElementById("login");
const logout = document.getElementById("logout");
const course = document.getElementById("course");

signup.onclick = async () => {
  try {
    const userCred = await createUserWithEmailAndPassword(auth, email.value, password.value);
    await setDoc(doc(db, "progress", userCred.user.uid), { lesson: 1 });
    alert("Signed up!");
  } catch (e) {
    alert(e.message);
  }
};

login.onclick = async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    alert("Logged in!");
  } catch (e) {
    alert(e.message);
  }
};

logout.onclick = () => signOut(auth);

onAuthStateChanged(auth, (user) => {
  if (user) {
    course.style.display = "block";
    logout.style.display = "inline";
  } else {
    course.style.display = "none";
    logout.style.display = "none";
  }
});
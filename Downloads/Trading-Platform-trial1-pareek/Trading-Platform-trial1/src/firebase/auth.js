import { auth,db } from './firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";


export function onAuthStateChanged(callback) {
    return auth.onAuthStateChanged(callback);
}

export async function signOut() {
    try {
            return auth.signOut();
    } catch (error) {
            console.error("Error signing out with Google", error);
    }
}

export async function login(email, password){
    try {
        await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            const user = userCredential.user;
            console.log("User: ",user.uid);
            window.location.reload();
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Error: ",errorCode,errorMessage);
        });
    } catch (e){
        return e;
    }
}

export async function register(name,email,password){
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        if(userCredential && userCredential.user){
            console.log("start");
            const docRef = doc(db, "user", userCredential.user.uid);
           await setDoc(docRef, {
                email:email,
                name:name,
            });
        }
    } catch (error) {
        console.log(error);
    }
    return true;
}
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import {
    getFirestore,
    doc,
    getDoc,
    setDoc
}  from "firebase/firestore"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhpPl70guAkQx0agSRaZSUUem6epO6zaY",
  authDomain: "e-clothing-store-db.firebaseapp.com",
  projectId: "e-clothing-store-db",
  storageBucket: "e-clothing-store-db.appspot.com",
  messagingSenderId: "295544417319",
  appId: "1:295544417319:web:7c5f9daa24c5289b58b202",
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () =>signInWithPopup(auth, provider);

export const db = getFirestore();


export const createUserDocumentFromAuth = async (userAuth) =>{
    const userDocRef = doc(db, "users", userAuth.uid);

    console.log(userDocRef);

    const userSnapShot = await getDoc(userDocRef);
    console.log(userSnapShot);
    console.log(userSnapShot.exists());


    if(!userSnapShot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef,{
             displayName,
             email,
             createdAt,   
            });
        } catch(error){
            console.log("error creating the user", error.messase);
        }
    }

    return userDocRef;
   
};

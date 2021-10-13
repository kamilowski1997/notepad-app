import React, { useState, useEffect, useContext } from 'react'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, reauthenticateWithCredential,  EmailAuthProvider, updatePassword, sendPasswordResetEmail} from "firebase/auth"

const AuthContext = React.createContext()

export function useAuth(){
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {

  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  async function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        //const user = userCredential.user;
        //console.log(user)
      })
      .catch((error) => {
        //const errorCode = error.code;
        //const errorMessage = error.message;
        //console.log(errorMessage)
      });
  }

  async function signin(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        //const user = userCredential.user;
        //console.log(user)
      })
      .catch((error) => {
        //const errorCode = error.code;
        //const errorMessage = error.message;
        //console.log(errorMessage)
      });
  }
  function logout(){
    signOut(auth);
  }

  function changePassword(password, newPassword){
    var credential = EmailAuthProvider.credential(currentUser.email, password);

    reauthenticateWithCredential(currentUser, credential).then(function() {
      // User re-authenticated.
      updatePassword(currentUser, newPassword).then(() => {
        // Update successful.
      }).catch((error) => {
        console.log(error)
        // An error ocurred
        // ...
      });
    }).catch(function(error) {
      console.log(error)
      // An error happened.
    });
  }

  function resetPassword(email){
    sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      // ..
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
  }


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    signup,
    signin,
    logout,
    changePassword,
    resetPassword
  }
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

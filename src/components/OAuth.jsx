import {useLocation,useNavigate} from 'react-router-dom'
import {getAuth,signInWithPopup,GoogleAuthProvider} from 'firebase/auth'
import {doc,setDoc,getDoc,serverTimestamp} from 'firebase/firestore'
import {db} from '../config/firebase.config'
import {toast} from 'react-toastify'
import googleIcon from '../assets/svg/googleIcon.svg'

import React from 'react'

/**
 * OAuth component for handling Google OAuth sign-in and sign-up.
 * @returns {JSX.Element} - The JSX component for OAuth.
 */

export const OAuth = () => {
  
  // Use the useNavigate hook to navigate between routes.
  const navigate = useNavigate()
  // Use the useLocation hook to get the current location.
  const location = useLocation()

  /**
   * Handles the Google OAuth sign-in/sign-up process.
   */

  const onGoogleClick = async () => {
    try {
      // Get the Firebase authentication instance.
      const auth = getAuth()
       // Create a new GoogleAuthProvider instance.
      const provider = new GoogleAuthProvider()
      // Sign in with a popup window using the GoogleAuthProvider.
      const result = await signInWithPopup(auth,provider) 
      // Get the user from the sign-in result.
      const user = result.user

      // Get a reference to the user's document in Firestore.

      const docRef = doc(db,'users',user.uid)

      // Get the document snapshot.

      const docSnap = await getDoc(docRef)

      // If the document does not exist, create a new one with user data.

      if(!docSnap.exists()){
        await setDoc(doc(db, 'users',user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp()
        })
      }
      // Navigate to the home page.
      navigate('/')
       // Show a success toast message.
      toast.success('Log In Successful!')
    } catch (error) {
      // Show an error toast message if unsuccessful.
      toast.error('Could not authorize with Google')
    }
  }

  // Render the OAuth component.
  return (
    <div className="socialLogin">
      <p>Sign {location.pathname === '/sign-up' ? 'up' : 'in'} with </p>
      <button className='socialIconDiv' onClick={onGoogleClick}>
        <img className='socialIconImg' src={googleIcon} alt="google" />
      </button>
    </div>

  )
}

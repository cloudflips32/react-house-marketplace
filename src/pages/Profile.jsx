import { useState } from 'react'
import { getAuth, updateProfile } from 'firebase/auth'
import { updateDoc, doc } from 'firebase/firestore'
import { db } from '../config/firebase.config'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import ArrowRight from '../assets/svg/keyboardArrowRightIcon.svg'
import HomeIcon from '../assets/svg/homeIcon.svg'
import chalk from 'chalk'

const Profile = () => {
  const auth = getAuth()
  const [changeDetails,setChangeDetails] = useState(false)
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })

  const {name, email} = formData

  const navigate = useNavigate()

  const onLogOut = () => {
    auth.signOut()
    navigate('/')
  }

  const onSubmit = async () => {
    try {
      if(auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        })
        const userRef = doc(db, 'users', auth.currentUser.uid)
        await updateDoc(userRef, {
          name,
        })
      }
    } catch (error) {
      console.log(chalk.red(error))
      toast.error('Could not update profile details')
    }
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  return (
    <div className='profile'>
      <header className="profileHeader">
        <p className="pageHeader">
          My Profile
        </p>
        <button 
          type='button' onClick={onLogOut} className="logOut">
          Log Out
        </button>
      </header>

      <main>
        <div className="profileDetailsHeader">
          <p className="profileDetailsText">
            Personal Details
          </p>
          <p className="changePersonalDetails" onClick={() => {
            changeDetails && onSubmit()
            setChangeDetails((prevState) => !prevState)
          }}>
            {changeDetails ? 'done' : 'change'}
          </p>
        </div>
        <div className="profileCard">
          <form>
            <input 
              type="text" 
              id="name" 
              className={!changeDetails ? 'profileName' : 'profileNameActive'} 
              disabled={!changeDetails} 
              value={name}
              onChange={onChange}
            />
            <input 
              type="text" 
              id="email" 
              className={!changeDetails ? 'profileEmail' : 'profileEmailActive'} 
              disabled={!changeDetails} 
              value={email}
              onChange={onChange}
            />
          </form>
        </div>

        <Link to='/create-listing' className='createListing'>
          <img src={HomeIcon} alt="house-icon" />
          <p>Sell or Rent your home</p>
          <img src={ArrowRight} alt="right-arrow" />
        </Link>

      </main>
    </div>
  )
}

export default Profile
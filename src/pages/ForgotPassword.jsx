import {useState} from 'react'
import {Link} from 'react-router-dom'
import {getAuth, sendPasswordResetEmail} from 'firebase/auth'
import {toast} from 'react-toastify'
import ArrowRightIcon from '../assets/svg/keyboardArrowRightIcon.svg?react'

/**
 * ForgotPassword component for handling password reset functionality.
 * @returns {JSX.Element} - The JSX for the ForgotPassword component.
 */

const ForgotPassword = () => {
  /**
   * State variable for storing the email input.
   * @type {string}
   */
  const [email,setEmail] = useState('')
  /**
   * Event handler for email input change.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The event object.
   */
  const onChange = (e) => setEmail(e.target.value)

   /**
   * Event handler for form submission, sends a password reset email.
   * @param {React.FormEvent<HTMLFormElement>} e - The event object.
   */

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth,email)
      toast.success('Reset Email Sent!')
    } catch (error) {
      toast.error('Could not send reset email')
    }
  }

  return (
    <div className='pageContainer'>
      <header>
        <p className="pageHeader">Forgot Password</p>
      </header>

      <main>
        <form onSubmit={onSubmit}>
          <input 
            className="emailInput"
            type='email'
            placeholder='Email'
            id='email'
            value={email}
            onChange={onChange}
          />
          <Link className='forgotPasswordLink' to='/sign-in'>
            Sign In
          </Link>

          <div className="signInBar">
            <div className="signInText">Send Reset Link</div>
            <button className="signInButton">
              <ArrowRightIcon   
                fill='#ffffff' width='34px'
                height='34px' 
              />
            </button>
          </div>

        </form>
      </main>
    </div>
  )
}

export default ForgotPassword
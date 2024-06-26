import {Navigate,Outlet} from 'react-router-dom'
import { useAuthStatus } from '../hooks/useAuthStatus'
import Spinner from './Spinner'

/**
 * A React component that acts as a private route.
 * It checks the authentication status and renders the appropriate component based on the user's login status.
 * If the user is logged in, it renders the child components.
 * If the user is not logged in, it redirects to the sign-in page.
 * It also displays a loading spinner while checking the authentication status.
 *
 * @returns {JSX.Element} - The rendered component based on the user's login status.
 */

const PrivateRoute = () => {

  /**
   * The result of the useAuthStatus hook, which contains the loggedIn and checkingStatus properties.
   * @type {{loggedIn: boolean, checkingStatus: boolean}}
   */

  const { loggedIn,checkingStatus } = useAuthStatus()

  // If the authentication status is still being checked, display a loading spinner
  if(checkingStatus) {
    return <Spinner />
  }

   // If the user is logged in, render the child components
   // If the user is not logged in, redirect to the sign-in page

  return (
    loggedIn ? <Outlet /> : <Navigate to='/sign-in' />
  )
}

export default PrivateRoute
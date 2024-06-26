import { useNavigate,useLocation } from 'react-router-dom'
import OfferIcon from '../assets/svg/localOfferIcon.svg?react'
import ExploreIcon from '../assets/svg/exploreIcon.svg?react'
import PersonOutlineIcon from '../assets/svg/personOutlineIcon.svg?react'

/**
 * A functional component that renders a navigation bar.
 * @returns {JSX.Element} - The JSX for the navigation bar.
 */

const Navbar = () => {
  // useNavigate hook from react-router-dom to navigate between routes
  const navigate = useNavigate()
   // useLocation hook from react-router-dom to get the current location
  const location = useLocation()

   /**
   * A function to check if the current location matches a given route.
   * @param {string} route - The route to check.
   * @returns {boolean} - True if the current location matches the route, false otherwise.
   */

  const pathMatchRoute = (route) => {
    if(route == location.pathname) {
      return true;
    }
  }

  return (
    <footer className="navbar">
      <nav className="navbarNav">
        <ul className="navbarListItems">
          <li className="navbarListItem" onClick={() => navigate('/')}>
            <ExploreIcon fill={pathMatchRoute('/' ? '#2c2c2c' : '#8f8f8f')} width='36px' height='36px' />
            <p className={
              pathMatchRoute('/') ? 'navbarListItemNameActive' : 'navbarListItemName'
              }
            >
              Explore
            </p>
          </li>
          <li className="navbarListItem" onClick={() => navigate('/offer')}>
            <OfferIcon fill={pathMatchRoute('/offers' ? '#2c2c2c' : '#8f8f8f')} width='36px' height='36px' />
            <p className={
              pathMatchRoute('/offer') ? 'navbarListItemNameActive' : 'navbarListItemName'
              }>Offers</p>
          </li>
          <li className="navbarListItem" onClick={() => navigate('/profile')}>
            <PersonOutlineIcon fill={pathMatchRoute('/profile' ? '#2c2c2c' : '#8f8f8f')} width='36px' height='36px' />
            <p className={
              pathMatchRoute('/profile') ? 'navbarListItemNameActive' : 'navbarListItemName'
              }>Profile</p>
          </li>
        </ul>
      </nav>
    </footer>
  )
}

export default Navbar
import { Link } from "react-router-dom"
import rentCategoryImage from '../assets/jpg/rentCategoryImage.jpg'
import sellCategoryImage from '../assets/jpg/sellCategoryImage.jpg'

/**
 * Explore component is responsible for displaying the categories of properties available for rent and sale.
 * It uses React Router to navigate to the respective category pages.
 * 
 * @returns {JSX.Element} - The JSX element to be rendered.
 */

const Explore = () => {
  return (
    <div className="explore">
      <header>
        <p className="pageHeader">
          Explore
        </p>
      </header>

      <main>
        <p className="exploreCategoryHeading">
          Categories
        </p>

        <div className="exploreCategories">
          <Link to='/category/rent'>
            <img className="exploreCategoryImg" src={rentCategoryImage} alt="rent pic" />
            <p className="exploreCategoryName">
              Places For Rent
            </p>
          </Link>
          <Link to='/category/sale'>
            <img className="exploreCategoryImg" src={sellCategoryImage} alt="for-sale pic" />
            <p className="exploreCategoryName">
              Homes For Sale
            </p>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default Explore
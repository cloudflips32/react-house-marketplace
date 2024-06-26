/**
 * A functional component that renders a loading spinner.
 * 
 * @returns {JSX.Element} - A JSX element representing the loading spinner.
 */

const Spinner = () => {
  return (

    /**
     * The container for the loading spinner.
     */

    <div className="loadingSpinnerContainer">

      /**
       * The actual loading spinner.
       */

      <div className="loadingSpinner"></div>
    </div>
  )
}

export default Spinner
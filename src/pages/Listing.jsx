import { useState,useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getDoc, doc} from 'firebase/firestore'
import { getAuth } from "firebase/auth"
import { db } from '../config/firebase.config'
import Spinner from  '../components/Spinner'
import shareIcon from '../assets/svg/shareIcon.svg'
import { MapContainer,Marker,Popup,TileLayer } from "react-leaflet"


const Listing = () => {
    const [listing,setListing] = useState(null)
    const [loading,setLoading] = useState(true)
    const [shareLinkCopied,setShareLinkCopied] = useState(false)

    const params = useParams()
    const navigate = useNavigate()
    const auth = getAuth()

    useEffect(() => {
        const fetchListing = async () => {
            const docRef = doc(db, 'listings', params.listingId)
            const docSnap = await getDoc(docRef)
            
            if(docSnap.exists()){
                console.log(docSnap.data());
                setListing(docSnap.data())
                setLoading(false)
            }
        }
        fetchListing()
    },[navigate, params.listingId])

    if(loading) {
      return <Spinner />
    }
  return (
    <main>
      { /* SLIDER */}

      <div className="shareIconDiv" onClick={() => {
        navigator.clipboard.writeText(window.location.href)
        setShareLinkCopied(true)
        setTimeout(() => {
          setShareLinkCopied(false)
        }, 2000)
      }}>
        <img src={shareIcon} alt="share icon" />
      </div>

      {shareLinkCopied && <p className="linkCopied">Link has been copied!</p>}

      <div className="listingDetails">
        <p className="listingName">
          {listing.name} - ${listing.offer 
          ? listing.discountedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') 
          : listing.regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </p>
        <p className="listingLocation">{listing.location}</p>
        <p className="listingType">For {listing.type === 'rent' 
        ? 'Rent' 
        : 'Sale'}</p>
        {listing.offer && (
          <p className="dicountPrice">
            ${listing.regularPrice - listing.discountedPrice}
            discount
          </p>
        )}

        <ul className="listingDetailsList">
          <li>
            {listing.bedrooms > 1
            ? `${listing.bedrooms} Bedrooms`
            : '1 Bedroom' }
          </li>
          <li>{listing.parking && 'Parking Spot'}</li>
          <li>{listing.furnished && 'Furnished'}</li>
        </ul>

        <p className="listingLocationTitle">Location</p>

        <div className="leafletContainer">
          <MapContainer style={{height: '100%', width: '100%'}} center={[listing.geolocation.lat,listing.geolocation.lng]} zoom={13} scrollWheelZoom={false}>
              <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url='https://{s}.tile.opsenstreetmap.de/tiles/osmde/{z}/{x}/{y}.png' 
              />
              <Marker position={[listing.geolocation.lat,listing.geolocation.lng]}>
                <Popup>{listing.location}</Popup>
              </Marker>
          </MapContainer>
        </div>

        {auth.currentUser?.uid !== listing.userRef && (
          <Link to={`/contact/${listing.userRef}?listingName=${listing.name}`}className="primaryButton" 
          >{location.type === 'sale' 
          ?  'Contact Realtor' 
          : 'Contact Landlord'}
          </Link>
        )}

      </div>
    </main>
  )
}

export default Listing

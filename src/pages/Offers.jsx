import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {collection,getDocs,query,where,orderBy,limit} from 'firebase/firestore'
import {db} from '../config/firebase.config'
import {toast} from 'react-toastify'
import Spinner from '../components/Spinner'
import ListingItem from '../components/ListingItem'

const Offers = () => {
  const [listings,setListings] = useState(null)
  const [loading,setLoading] = useState(true)

  const params = useParams()

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingsRef = collection(db, 'listings')

        const q = query(
          listingsRef,
          where('offer', '==', true),
          orderBy('timestamp', 'desc'),
          limit(10)
        )
        const querySnap = await getDocs(q)

        const listings = []

        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          })
        })

        setListings(listings)
        setLoading(false)
      } catch (error) {
        toast.error('fetch for listings failed')
      }
    }
    fetchListings()
  }, [])
  return (
    <div className='category'>
      <header>
        <p className="pageHeader">
          Offers
        </p>
      </header>
      { 
        loading ? ( <Spinner /> ) : 
        listings && listings.length > 0 ? ( 
        <>
          <main>
            <ul>
              {listings.map((listing) => (
                <ListingItem 
                  listing={listing.data} 
                  id={listing.id} 
                  key={listing.id}
                />
              ))}
            </ul>
          </main>
        </> 
        ) : (
        <p>No Offers Present. Check Again Later!</p> 
      )}
    </div>
  )
}

export default Offers
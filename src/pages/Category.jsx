import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {collection,getDocs,query,where,orderBy,limit} from 'firebase/firestore'
import {db} from '../config/firebase.config'
import {toast} from 'react-toastify'
import Spinner from '../components/Spinner'
import ListingItem from '../components/ListingItem'

const Category = () => {
  const [listings,setListings] = useState(null)
  const [loading,setLoading] = useState(true)

  const params = useParams()

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingsRef = collection(db, 'listings')

        const q = query(
          listingsRef,
          where('type', '==', params.categoryName),
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
  }, [params.categoryName])
  return (
    <div className='category'>
      <header>
        <p className="pageHeader">
          { 
            params.categoryName === 'rent' ? 
            'Places for Rent' : 'Places for Sale' 
          }
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
        <p>No Listings for {params.categoryName}</p> 
      )}
    </div>
  )
}

export default Category
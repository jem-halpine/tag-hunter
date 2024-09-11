import { useQuery } from '@tanstack/react-query'
import { getArtworkById } from '../apis/artworks'
import { GoogleMap, useLoadScript } from '@react-google-maps/api'

export default function GamePage() {
  const artworkID = 2

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAniaK3l1jH7gSgpiNd-PyBMB0ygsy8QXA',
  })

  const artwork = useQuery({
    queryKey: ['artwork', artworkID],
    queryFn: () => getArtworkById(artworkID),
  })

  if (!isLoaded) return <div>Loading...</div>

  if (artwork.isPending) {
    return <>Loading</>
  }

  if (artwork.isError) {
    return <>Error</>
  }

  return (
    <>
      <div>
        <img
          className="size-80 rounded-md shadow-md"
          src={`images/${artwork.data.image_url}`}
          alt=""
        />

        <div className="p-10">
          <GoogleMap
            center={{ lat: -41.29244, lng: 174.77876 }}
            zoom={14}
            mapContainerStyle={{ height: '50vh', width: '50%' }}
          ></GoogleMap>
        </div>
      </div>
    </>
  )
}

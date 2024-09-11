import { useQuery } from '@tanstack/react-query'
import { getArtworkById } from '../apis/artworks'
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'
import { useState } from 'react'
import { LatLng } from '../../models/models'
import * as game from '../game'

export default function GamePage() {
  // TODO: randomly pick artwork on page load
  const artworkID = 2

  // TODO: hide api key
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAniaK3l1jH7gSgpiNd-PyBMB0ygsy8QXA',
  })

  const [userLocation, setUserLocation] = useState<LatLng | null>(null)
  const [gameState, setGameState ] = useState('Three guesses remaining')

  const { data:artwork, isPending, isError } = useQuery({
    queryKey: ['artwork', artworkID],
    queryFn: () => getArtworkById(artworkID),
  })

  
  if (isPending || !isLoaded) {
    return <>Loading</>
  }
  
  if (isError) {
    return <>Error</>
  }

  return (
    <>
      <div id="container" className="flex w-full flex-col items-center p-10">
        <div className="flex w-full flex-wrap justify-evenly">
          <div>
            <img
              className="w-[30vw] min-w-[200px]  rounded-md shadow-md"
              src={`images/${artwork.imageUrl}`}
              alt=""
            />
          </div>

          <div className='flex flex-col items-center'>
            <div className="size-[40vw] max-h-[60vh] border-2 border-thGray shadow-md">
              <GoogleMap
                center={{ lat: -41.29244, lng: 174.77876 }}
                zoom={13}
                mapContainerStyle={{ height: '100%', width: '100%' }}
                onClick={handleMapClick}
              >
                {/* TODO: hide artwork location */}
                <Marker position={{lat: artwork.latitude, lng: artwork.longitude}}/>
                {userLocation && <Marker draggable={true} position={userLocation}/>}


              </GoogleMap>
            </div>
            {/* TODO: Replace with styled button */}
            <button onClick={handleSubmitGuess} className='p-4 m-10 bg-gradient-to-br hover:ring-2 ring-thGray/50 from-thGold to-thUmber text-white font-bold rounded-md shadow-md'>Submit Guess</button>
            <div>
              {gameState}
            </div>
          </div>
        </div>
      </div>
    </>
  )

  function handleMapClick(e: google.maps.MapMouseEvent) {
    if (e.latLng) {
      const location: LatLng = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      }
      setUserLocation(location)
    }
  }

  function handleSubmitGuess(){
    if(userLocation && artwork){
      const dist = game.calculateDistance({lat: artwork.latitude, lng: artwork.longitude}, userLocation)
      setGameState(`You are ${Math.round(dist)}m away`)
      console.log(dist)
    }
  }
}

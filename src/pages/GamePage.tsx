import { useQuery } from '@tanstack/react-query'
import { getArtworkById } from '../apis/artworks'
import {
  AdvancedMarker,
  APIProvider,
  Map,
  Pin,
} from '@vis.gl/react-google-maps'
import { useState } from 'react'
import { LatLng } from 'models/models'
import * as game from '../game'

export default function GamePage() {
  // TODO: randomly pick artwork on page load
  const artworkID = 3
  const showMarker = true
  const wellington = { lat: -41.29244, lng: 174.77876 }
 
  const [userLocation, setUserLocation] = useState<LatLng | null>(wellington)
  const [gameState, setGameState] = useState('Three guesses remaining')

  const {
    data: artwork,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['artwork', artworkID],
    queryFn: () => getArtworkById(artworkID),
  })

  if (isPending) {
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

          <div className="flex flex-col items-center">
            <div className="size-[40vw] max-h-[60vh] border-2 border-thGray shadow-md">
              <APIProvider apiKey={'AIzaSyAniaK3l1jH7gSgpiNd-PyBMB0ygsy8QXA'}>
                <Map
                  defaultCenter={wellington}
                  defaultZoom={13}
                  mapId="gameMap"
                  minZoom={14}
                  fullscreenControl={null}
                >
                  <AdvancedMarker
                    position={userLocation}
                    draggable={true}
                    onDrag={handleDragEnd}
                  />

                  {showMarker && (
                    <AdvancedMarker
                      position={{
                        lat: artwork.latitude,
                        lng: artwork.longitude,
                      }}
                    >
                      <Pin background={'gold'} borderColor={'black'} />
                    </AdvancedMarker>
                  )}
                </Map>
              </APIProvider>
            </div>
            <div>{`Latitude: ${userLocation?.lat.toFixed(6)}`}</div>
            <div>{`Longitude: ${userLocation?.lng.toFixed(6)}`}</div>
            <button
              onClick={handleSubmitGuess}
              className="m-10 rounded-md bg-gradient-to-br from-thGold to-thUmber p-4 font-bold text-white shadow-md ring-thGray/50 hover:ring-2"
            >
              Submit Guess
            </button>
            <div>{gameState}</div>
          </div>
        </div>
      </div>
    </>
  )

  function handleDragEnd(e: google.maps.MapMouseEvent) {
    if (e.latLng) {
      const location: LatLng = { lat: e.latLng.lat(), lng: e.latLng.lng() }
      setUserLocation(location)
    }
  }

  function handleSubmitGuess() {
    if (userLocation && artwork) {
      const dist = game.calculateDistance(
        { lat: artwork.latitude, lng: artwork.longitude },
        userLocation,
      )
      setGameState(`You are ${Math.round(dist)}m away`)
      console.log(dist)
    }
  }
}

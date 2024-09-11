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
import SprayCan from '@/icons/SprayCan'

export default function GamePage() {
  // TODO: randomly pick artwork on page load
  const artworkID = 1
  const wellington = { lat: -41.29244, lng: 174.77876 }
  
  const [showMarker, setShowMarker] = useState(false)
  const [guessCount, setGuessCount] = useState(3)
  const [userLocation, setUserLocation] = useState<LatLng | null>(wellington)
  const [gameMessage, setGameMessage] = useState<string>('')
  const [hasFound, setHasFound] = useState(false)

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
                      <div className="flex w-full justify-evenly p-4">
                        <div>Current Position:</div>
                        <div>{`Latitude: ${userLocation?.lat.toFixed(6)}`}</div>
                        <div>{`Longitude: ${userLocation?.lng.toFixed(6)}`}</div>
                      </div>
            
            {guessCount > 0 && !hasFound && (
              <>
                {/* <div className={guessCount>0 ? "" : "invisible"}>{`Guesses Remaining: ${guessCount}`}</div> */}
                <div className='flex gap-5'>
                  <div> Mistakes Remaining:</div>
                  <div className={guessCount > 0 ? "" : "invisible"}><SprayCan/></div>
                  <div className={guessCount > 1 ? "" : "invisible"}><SprayCan/></div>
                  <div className={guessCount > 2 ? "" : "invisible"}><SprayCan/></div>
                </div>
                               
                <button
                  onClick={handleSubmitGuess}
                  className="m-10 rounded-md bg-gradient-to-br from-thGold to-thUmber p-4 font-bold text-white shadow-md ring-thGray/50 hover:ring-2"
                >
                  Submit Guess
                </button>
                {gameMessage && <div>{gameMessage}</div>}
             </>
            )}

            {
              hasFound && <div>{gameMessage}</div>
            }

            {
              guessCount < 1 && <div>Not this time. Try again tomorrow!</div> 
            }
            
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
    // Calculate distance to artwork
    if (userLocation && artwork) {
      const dist = game.calculateDistance(
        { lat: artwork.latitude, lng: artwork.longitude },
        userLocation,
      )
      
      if(game.hasFoundArt(dist)){
        setHasFound(true)
        setShowMarker(true)
        setGameMessage(`You found it! (${dist.toFixed(1)}m away)`)
        return
      }

      setGameMessage(game.failureMessage(dist))
      setGuessCount(guessCount - 1)

    }
  }
}

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getRandomArtwork } from '../apis/artworks'
import {
  AdvancedMarker,
  APIProvider,
  Map,
  Pin,
} from '@vis.gl/react-google-maps'
import { useEffect, useRef, useState } from 'react'
import { LatLng } from 'models/models'
import * as game from '../game'
import SprayCan from '@/icons/SprayCan'

export default function GamePage() {
  // TODO: randomly pick artwork on page load
  // const artworkID = 1
  const wellington = { lat: -41.29244, lng: 174.77876 }

  const [showMarker, setShowMarker] = useState(false)
  const [guessCount, setGuessCount] = useState(5)
  const [userLocation, setUserLocation] = useState<LatLng | null>(wellington)
  const [gameMessage, setGameMessage] = useState<string>(
    'Use the mouse to drag the pin around the map then hit submit to see if you have found it!',
  )
  const [hasFound, setHasFound] = useState(false)

  const queryClient = useQueryClient()
  const streetViewRef = useRef<HTMLDivElement | null>(null)

  const {
    data: artwork,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['artwork'],
    queryFn: () => getRandomArtwork(),
  })

  useEffect(() => {
    if (streetViewRef.current && userLocation) {
      const panorama = new google.maps.StreetViewPanorama(
        streetViewRef.current,
        {
          position: userLocation,
          pov: {
            heading: 34,
            pitch: 10,
          },
          zoomControl: false,
          addressControl: false,
          fullscreenControl: false,
          linksControl: false,
          panControl: false,
          enableCloseButton: false,
        },
      )

      panorama.setPosition(userLocation)
    }
  }, [userLocation])

  if (isPending) {
    return <>Loading</>
  }

  if (isError) {
    return <>Error</>
  }

  return (
    <>
      <div id="container" className="flex flex-wrap justify-center">
        <div
          id="game-display"
          className="flex w-1/2 flex-col items-center bg-red-400 grow"
        >
          <div
            id="art-container"
            className="flex flex-col items-center bg-green-500 p-10"
          >
            <div id="game-message" className="p-6">
              {gameMessage}
            </div>
            <div id="art-image" className='flex flex-col items-center'>
              <img
                className="w-3/4 rounded-md shadow-md"
                src={`images/${artwork.imageUrl}`}
                alt=""
              />
            </div>
          </div>
          <div id="streetview" className="size-[200px]">
            <div
              ref={streetViewRef}
              className="h-full w-full rounded-xl border-2 border-gray-300"
            />
          </div>
        </div>
        <div
          id="game-interface"
          className="flex flex-col items-center bg-red-600 w-[700px]"
        >
          <div id="submission" className="flex w-full px-10">
            <button
              onClick={handleSubmitGuess}
              className="m-5 rounded-md bg-gradient-to-br from-thGold to-thUmber p-4 px-10 font-bold text-white shadow-md ring-thGray/50 hover:ring-2"
            >
              Submit
            </button>
            <div
              id="mistakes-container"
              className="flex w-2/3 justify-between p-10"
            >
              {guessCount > 0 && !hasFound && (
                <>
                  <div className={guessCount > 0 ? '' : 'invisible'}>
                    <SprayCan />
                  </div>
                  <div className={guessCount > 1 ? '' : 'invisible'}>
                    <SprayCan />
                  </div>
                  <div className={guessCount > 2 ? '' : 'invisible'}>
                    <SprayCan />
                  </div>
                  <div className={guessCount > 3 ? '' : 'invisible'}>
                    <SprayCan />
                  </div>
                  <div className={guessCount > 4 ? '' : 'invisible'}>
                    <SprayCan />
                  </div>
                </>
              )}
            </div>
          </div>
          <div id="map-container" className="h- w-full">
            <div id="map" className="h-[600px] w-full px-10 py-5">
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
            <div id="coordinates">
              <div className="flex w-full justify-evenly px-10 ">
                <div>{`Latitude: ${userLocation?.lat.toFixed(6)}`}</div>
                <div>{`Longitude: ${userLocation?.lng.toFixed(6)}`}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*}
      <div id="container" className="flex w-full flex-col items-center p-10">
        <div className="grid grid-cols-2 ">

        <div className="flex flex-col items-center">
          <p className="text-center p-5">
            Use the mouse to drag the pin around
            the map then hit submit to see if you have found it!
          </p>


          {guessCount > 0 && !hasFound && (
              <>
                <div className="flex gap-5">
                  <div> Mistakes Remaining:</div>
                  <div className={guessCount > 0 ? '' : 'invisible'}>
                    <SprayCan />
                  </div>
                  <div className={guessCount > 1 ? '' : 'invisible'}>
                    <SprayCan />
                  </div>
                  <div className={guessCount > 2 ? '' : 'invisible'}>
                    <SprayCan />
                  </div>
                  <div className={guessCount > 3 ? '' : 'invisible'}>
                    <SprayCan />
                  </div>
                  <div className={guessCount > 4 ? '' : 'invisible'}>
                    <SprayCan />
                  </div>
                </div>

                <button
                  onClick={handleSubmitGuess}
                  className="m-5 rounded-md bg-gradient-to-br from-thGold to-thUmber p-4 px-10 font-bold text-white shadow-md ring-thGray/50 hover:ring-2"
                >
                  Submit
                </button>
                {gameMessage && <div>{gameMessage}</div>}
              </>
            )}

            {hasFound && <div>{gameMessage}</div>}

            {guessCount < 1 && (
              <div>Not this time... Get out on the street and get hunting!</div>
            )}


          <div className="flex w-full justify-evenly p-4">
              <div>{`Latitude: ${userLocation?.lat.toFixed(6)}`}</div>
              <div>{`Longitude: ${userLocation?.lng.toFixed(6)}`}</div>
            </div>


          </div>

          <div className="flex flex-col items-center">
            <img
              className="w-[30vw] min-w-[200px]  rounded-md shadow-md"
              src={`images/${artwork.imageUrl}`}
              alt=""
            />
          </div>

        </div>



        <div className="flex w-full flex-wrap justify-evenly">

            {(hasFound || guessCount < 1) && (
              <button className="m-10" onClick={playAgain}>
                Play again!
              </button>
            )}
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


            <div
              ref={streetViewRef}
              className="h-80 w-1/4 border-2 border-gray-300 shadow-lg"
              />




          </div>
        </div>
      </div>
      {*/}
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

      if (game.hasFoundArt(dist)) {
        setHasFound(true)
        setShowMarker(true)
        setGameMessage(`You found it! (${dist.toFixed(1)}m away)`)
        return
      }

      setGameMessage(game.failureMessage(dist))
      setGuessCount(guessCount - 1)
    }
  }

  function playAgain() {
    if (hasFound || guessCount < 1) {
      queryClient.invalidateQueries()
      setShowMarker(false)
      setGuessCount(5)
      setUserLocation(wellington)
      setGameMessage('')
      setHasFound(false)
    }
  }
}

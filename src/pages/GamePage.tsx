import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getRandomArtwork } from '../apis/artworks'
import { Button } from '@/components/ui/button'
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
import { IsAuthenticated } from '@/components/IsAuthenticated'
import { NotAuthenticated } from '@/components/NotAuthenticated'

export default function GamePage() {
  const wellington = { lat: -41.29244, lng: 174.77876 }
  const welcome =
    'Use the mouse to drag the pin around the map then hit submit to see if you have found it!'

  const [showMarker, setShowMarker] = useState(true)
  const [guessCount, setGuessCount] = useState(5)
  const [userLocation, setUserLocation] = useState<LatLng | null>(wellington)
  const [gameMessage, setGameMessage] = useState<string>(welcome)
  const [gameOver, setGameOver] = useState(false)

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
        <div id="container" className="flex flex-wrap justify-center max-w-[1440px] m-auto">
          <div id="game-display" className="w-1/2 min-w-[540px]">
            <div className="m-2 flex h-full flex-col items-center bg-white/80 shadow-md shadow-black/50">
              <div
                id="art-container"
                className=" flex h-[500px] w-full flex-col items-center p-10 mt-auto"
              >
                <img
                  className="h-full w-full max-w-[540px] rounded-md object-cover shadow-md shadow-black/50"
                  src={`images/${artwork.imageUrl}`}
                  alt=""
                />
              </div>

              <IsAuthenticated>
                <div className="flex h-[350px] w-full max-w-[540px] flex-col items-center px-10 pb-10 mb-auto">
                  <div
                    id="streetview"
                    ref={streetViewRef}
                    className="h-full w-full rounded-3xl shadow-lg shadow-black/50"
                  />
                </div>
              </IsAuthenticated>
              <NotAuthenticated>
                <div className="p-10 font-title text-3xl mb-auto">
                  Log in or Sign up to unlock the Streetview portal!
                </div>
              </NotAuthenticated>
            </div>
          </div>

          <div id="game-interface" className="w-1/2 min-w-[540px]">
            <div className="m-2 flex h-full flex-col items-center bg-white/80 shadow-md shadow-black/50">
              <div
                id="game-message"
                className="w-1/2 pt-10 text-center font-title text-3xl"
              >
                <p>{gameMessage}</p>
              </div>

              {gameOver && (
                <div className="p-5">
                  <Button className="px-10 text-lg" onClick={playAgain}>
                    Play again!
                  </Button>
                </div>
              )}

              {!gameOver && (
                <div
                  id="submission"
                  className="flex w-full max-w-[600px] px-10"
                >
                  <div className="p-10">
                    <Button className="text-lg" onClick={handleSubmitGuess}>
                      Submit
                    </Button>
                  </div>

                  <div
                    id="mistakes-container"
                    className="flex w-3/4 justify-between p-10"
                  >
                    <>
                      <div className={`${guessCount > 0 ? '' : 'invisible'} `}>
                        <img
                          src="images/favicon/spray-paint.png"
                          alt=""
                          className="size-12"
                        />
                      </div>
                      <div className={guessCount > 1 ? '' : 'invisible'}>
                        <img
                          src="images/favicon/spray-paint.png"
                          alt=""
                          className="size-12"
                        />
                      </div>
                      <div className={guessCount > 2 ? '' : 'invisible'}>
                        <img
                          src="images/favicon/spray-paint.png"
                          alt=""
                          className="size-12"
                        />
                      </div>
                      <div className={guessCount > 3 ? '' : 'invisible'}>
                        <img
                          src="images/favicon/spray-paint.png"
                          alt=""
                          className="size-12"
                        />
                      </div>
                      <div className={guessCount > 4 ? '' : 'invisible'}>
                        <img
                          src="images/favicon/spray-paint.png"
                          alt=""
                          className="size-12"
                        />
                      </div>
                    </>
                  </div>
                </div>
              )}
              <div
                id="map-container"
                className="flex w-full flex-col items-center p-10"
              >
                <div
                  id="map"
                  className="h-[50vh] w-full border-2 border-thGray drop-shadow-lg"
                >
                  <APIProvider
                    apiKey={'AIzaSyAniaK3l1jH7gSgpiNd-PyBMB0ygsy8QXA'}
                  >
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
                <div id="coordinates" className="flex flex-col items-center">
                  <div className="flex gap-5 p-2">
                    <div>{`Latitude: ${userLocation?.lat.toFixed(6)}`}</div>
                    <div>{`Longitude: ${userLocation?.lng.toFixed(6)}`}</div>
                  </div>
                </div>
              </div>
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

  function playAgain() {
    if (gameOver) {
      queryClient.invalidateQueries()
      setShowMarker(false)
      setGuessCount(5)
      setUserLocation(wellington)
      setGameMessage(welcome)
      setGameOver(false)
    }
  }

  function handleSubmitGuess() {
    // Calculate distance to artwork
    if (userLocation && artwork) {
      setGuessCount(guessCount - 1)
      const guesses = guessCount - 1

      const dist = game.calculateDistance(
        { lat: artwork.latitude, lng: artwork.longitude },
        userLocation,
      )

      if (game.hasFoundArt(dist)) {
        setShowMarker(true)
        setGameMessage(`You found it! (${dist.toFixed(1)}m away)`)
        setGameOver(true)
        return
      } else if (guesses > 0) {
        setGameMessage(game.failureMessage(dist))
        return
      } else {
        setGameMessage('Game Over')
        setGameOver(true)
      }
    }
  }
}

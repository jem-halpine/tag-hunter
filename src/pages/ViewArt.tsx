import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getArtworkById } from '../apis/artworks'
import {
  AdvancedMarker,
  APIProvider,
  Map,
  Pin,
} from '@vis.gl/react-google-maps'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import Loading from '@/components/Loading'
import Error from '@/components/Error'

export default function ViewArt() {
  const { id: artworkID } = useParams()

  const {
    data: artwork,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['artwork', artworkID],
    queryFn: () => getArtworkById(Number(artworkID)),
  })

  if (isPending) {
    return <Loading />
  }

  if (isError) {
    return <Error />
  }
  console.log(artwork)
  const artPos = { lat: artwork.latitude, lng: artwork.longitude }
  return (
    <div
      id="container"
      className="mx-auto mb-20 mt-10 flex w-4/5 items-center justify-between gap-6 border-2 border-thGray bg-white/50 p-10"
    >
      <div>
        <img
          className="max-w- rounded-md shadow-md"
          src={`/images/${artwork.imageUrl}`}
          alt=""
        />
      </div>

      <div className="mx-auto flex flex-col items-center justify-center gap-6">
        <div className="size-[30vw] max-h-[45vh] items-center border-2 border-thGray shadow-md">
          <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <Map
              defaultCenter={artPos}
              defaultZoom={13}
              mapId="gameMap"
              minZoom={14}
              fullscreenControl={null}
            >
              <AdvancedMarker
                position={{
                  lat: artwork.latitude,
                  lng: artwork.longitude,
                }}
              >
                <Pin background={'red'} borderColor={'black'} />
              </AdvancedMarker>
            </Map>
          </APIProvider>
        </div>

        <div className="flex flex-col items-center">
          <p className="text-lg">
            <span className="font-bold">Artist:</span>{' '}
            {artwork.artist ? artwork.artist : 'Unknown Artist'}
          </p>
          {artwork.location && (
            <p className="text-lg">
              <span className="font-bold">Street Address:</span>{' '}
              {artwork.location}
            </p>
          )}
          <Link to="/gallery" className="mt-3">
            <Button>Back</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

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
      className="flex w-4/5 flex-col items-center border-2 border-thGray bg-white/50 p-10"
    >
      <div className="flex w-full flex-wrap justify-evenly">
        <img
          className="w-[30vw] min-w-[200px]  rounded-md shadow-md"
          src={`/images/${artwork.imageUrl}`}
          alt=""
        />
        <div className="size-[30vw] max-h-[45vh] border-2 border-thGray shadow-md">
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
      </div>
      <p className="text-lg">
        <span className="font-bold">Artist:</span>{' '}
        {artwork.artist ? artwork.artist : 'Unknown Artist'}
      </p>
      {artwork.location && (
        <p className="text-lg">
          <span className="font-bold">Street Address:</span> {artwork.location}
        </p>
      )}
      <Link to="/gallery" className="mt-3">
        <Button>Back</Button>
      </Link>
    </div>
  )
}

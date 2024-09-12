import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getArtworkById } from '../apis/artworks'
import {
  AdvancedMarker,
  APIProvider,
  Map,
  Pin,
} from '@vis.gl/react-google-maps'
import { LatLng } from 'models/models'

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
    return <>Loading</>
  }

  if (isError) {
    return <>Error</>
  }
  console.log(artwork)
  const artPos = { lat: artwork.latitude, lng: artwork.longitude }
  return (
    <div className="">
      <img
        className="w-[30vw] min-w-[200px]  rounded-md shadow-md"
        src={`/images/${artwork.imageUrl}`}
        alt=""
      />
      <p>Artist: {artwork.artist ? artwork.artist : 'Unknown Artist'}</p>
      <p>Street Address: {artwork.location}</p>
      <div className="size-[30vw] max-h-[45vh] border-2 border-thGray shadow-md">
        <APIProvider apiKey={'AIzaSyAniaK3l1jH7gSgpiNd-PyBMB0ygsy8QXA'}>
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
  )
}

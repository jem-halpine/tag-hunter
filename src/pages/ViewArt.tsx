import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getArtworkById } from '../apis/artworks'

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
  return (
    <div className="">
      <img
        className="w-[30vw] min-w-[200px]  rounded-md shadow-md"
        src={`/images/${artwork.imageUrl}`}
        alt=""
      />
      <p>Artist: {artwork.artist ? artwork.artist : 'Unknown Artist'}</p>
      <p>Street Address: {artwork.location}</p>
    </div>
  )
}

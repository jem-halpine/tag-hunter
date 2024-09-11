import { useArtworks } from '../hooks/useArtworks'

export default function Gallery() {
  const { data, isError, isPending } = useArtworks()
  if (isPending) {
    return <p>Loading</p>
  }

  if (isError) {
    return <p>Error</p>
  }

  return (
    <>
      {data.map((artworks) => (
        <div key={artworks.id}>
          <p>{artworks.id}</p>
          <img src={`public/images/${artworks.imageUrl}`} />
        </div>
      ))}
    </>
  )
}
// <>
//   {data.map((artworks) => (
//     <p key={artworks.id}>{artworks.artist}</p>
//   ))}
// </>
// <>

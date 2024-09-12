import { useQuery } from '@tanstack/react-query'
import { getAllArtwork } from '@/apis/artworks'
export default function Gallery() {
  const {
    data: artwork,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['artwork'],
    queryFn: () => getAllArtwork(),
  })

  if (isPending) {
    return <>Loading</>
  }

  if (isError) {
    return <>Error</>
  }

  return (
    // Image from tailwind

    <div>
      {artwork.map((item) => (
        <div key={item.id}>
          <img src={`/images/${item.imageUrl}`} alt={item.description} />
        </div>
      ))}
    </div>
  )
}

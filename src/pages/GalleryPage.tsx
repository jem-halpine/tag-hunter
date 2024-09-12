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
  
//   return (
//     <div>
//       {artwork?.map((item) => (
//         <div key={item.id}>
//           <img src={item.imageUrl} alt={item.title} />
//           <p>{item.title}</p>
//         </div>
//       ))}
//     </div>
//   )
// }
  return ( // Image from tailwind
      
      <div>
        {artwork.map((item) => {
          <div key={item.id}>
          <img src={item.} alt="" />
        })}
      </div>
    )
  }
  
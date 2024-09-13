import { useQuery } from '@tanstack/react-query'
import { getAllArtwork } from '../apis/artworks'

export function useGalleryData() {
  const galleryQuery = useQuery({
    queryKey: ['gallery'],
    queryFn: () => getAllArtwork,
  })
  return galleryQuery
}

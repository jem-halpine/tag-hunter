import { useQuery } from '@tanstack/react-query'
import * as API from '../apis/artworksApi'

export function useArtworks() {
  return useQuery({
    queryKey: ['artworks'],
    queryFn: () => API.getAllArtwork(),
  })
}

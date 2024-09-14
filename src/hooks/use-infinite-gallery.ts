import { getPaginateGallery } from '@/apis/artworks'
import { useInfiniteQuery } from '@tanstack/react-query'
import { type ArtworkPaginate } from 'models/models'

const getNextPageParam = ({ pagination }: ArtworkPaginate) => {
  if (
    pagination &&
    typeof pagination.currentPage === 'number' &&
    typeof pagination.lastPage === 'number'
  ) {
    return pagination.currentPage < pagination.lastPage
      ? pagination.currentPage + 1
      : undefined
  }
  return undefined
}

export const useInfiniteGallery = () =>
  useInfiniteQuery({
    queryKey: ['infiniteGallery'],
    queryFn: ({ pageParam }) => getPaginateGallery(pageParam),
    initialPageParam: 1,
    getNextPageParam,
  })

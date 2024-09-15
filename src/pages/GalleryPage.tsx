import InfiniteScroll from 'react-infinite-scroll-component'
import { Title } from '@/components/Title'
import { useInfiniteGallery } from '@/hooks/use-infinite-gallery'

export default function Gallery() {
  const { data, fetchNextPage, hasNextPage, status } = useInfiniteGallery()

  if (status === 'pending') return <div>Loading...</div>
  if (status === 'error') return <div>Error loading gallery</div>

  const artworks = data?.pages.flatMap((page) => page.data) || []

  return (
    <div className="ml-12 mr-12">
      <Title title="Gallery" />
      <InfiniteScroll
        dataLength={artworks.length}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="grid grid-cols-3 gap-2">
          {artworks.map((item) => (
            <div key={item.id}>
              <img src={`/images/${item.imageUrl}`} alt={item.description} />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  )
}

import InfiniteScroll from 'react-infinite-scroll-component'
import { Title } from '@/components/Title'
import { useInfiniteGallery } from '@/hooks/use-infinite-gallery'
import Masonry from 'react-masonry-css'
import { Link } from 'react-router-dom'
export default function Gallery() {
  const { data, fetchNextPage, hasNextPage, status } = useInfiniteGallery()

  if (status === 'pending') return <div>Loading...</div>
  if (status === 'error') return <div>Error loading gallery</div>

  const artworks = data?.pages.flatMap((page) => page.data) || []

  const breakpointColumnsObj = { //? Masonry column settings measured in pixels
    default: 4, 
    1100: 3, //? px: columnNumber
    700: 2,
    500: 1
  }

  return (
    <div className="ml-12 mr-12">
      <Title title="Gallery" />
      <InfiniteScroll //? Infinite Scroll settings
        dataLength={artworks.length}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<h4>Loading more...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        > 
          {artworks.map((item) => (
            <div key={item.id}>
              {/* <Route path="/gallery/:id" element={<ViewArt />} /> */}
              <Link to={`/gallery/${item.id}`}>
                <img src={`/images/compressed/${item.imageUrl}`} alt={item.description} />
              </Link>
            </div>
          ))}
        </Masonry>
      </InfiniteScroll>
    </div>
  )
}

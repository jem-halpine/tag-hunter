  import InfiniteScroll from 'react-infinite-scroll-component'
  import { Title } from '@/components/Title'
  import { useInfiniteGallery } from '@/hooks/use-infinite-gallery'
  import Masonry from 'react-masonry-css'
  import { Link } from 'react-router-dom'
  import Loading from '@/components/Loading'
  import Error from '@/components/Error'
  import { Button } from '@/components/ui/button'

  export default function Gallery() {
    const { data, fetchNextPage, hasNextPage, status } = useInfiniteGallery()

    if (status === 'pending') return <Loading />
    if (status === 'error') return <Error />

    const artworks = data?.pages.flatMap((page) => page.data) || []

    const breakpointColumnsObj = {
      //? Masonry column settings measured in pixels
      default: 4,
      2080: 3, //? px: columnNumber
      1080: 2,
      640: 1,
    }

    return (
      <div className="m-auto max-w-[1440px] p-10">
        <div>
          <Title title="Gallery" />
          <Link to="/submit">
            <Button variant="default" size="lg">
              Submit Art
            </Button>
          </Link>
        </div>
        <InfiniteScroll
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
                <Link to={`/gallery/${item.id}`}>
                  <img src={`/images/${item.imageUrl}`} alt={item.description} />
                </Link>
              </div>
            ))}
          </Masonry>
        </InfiniteScroll>
      </div>
    )
  }

import { useQueryClient, useQuery } from '@tanstack/react-query'
import { getAllArtwork, getArtworksLength } from '@/apis/artworks'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useState } from 'react'
import { Title } from '@/components/Title'

export default function Gallery() {
  const [pageNumber, setPageNumber] = useState(1)
  const queryClient = useQueryClient()

  const {
    data: artwork,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['artwork', pageNumber],
    queryFn: () => getAllArtwork(pageNumber),
  })

  const artworkLength = useQuery({
    queryKey: ['dbLength'],
    queryFn: () => getArtworksLength(),
  })

  if (isPending) {
    return <>Loading</>
  }

  if (isError) {
    return <>Error</>
  }
  // database.length / 2 = maximumLoad
  return (
    //! DAVID IS THE HERO WITH INFINITE LOADING
    <div className="ml-12 mr-12 ">
      <Title title="Gallery"></Title>
      <InfiniteScroll
        dataLength={artwork.length} //This is important field to render the next data
        next={() => {
          setPageNumber((oldPageNumber) => {
            queryClient.refetchQueries({ queryKey: ['artwork'] })
            return oldPageNumber + 1
          })
        }}
        hasMore={artwork.length !== artworkLength.data}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        } //TODO: Get infinite loading to work more smoothly
        //TODO:  Shoots us up when new content loads from database
      >
        <div className="grid grid-cols-3 gap-2">
          {artwork.map((item) => (
            <div key={item.id}>
              <img src={`/images/${item.imageUrl}`} alt={item.description} />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  )
}

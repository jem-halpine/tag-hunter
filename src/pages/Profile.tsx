import Error from '@/components/Error'
import Loading from '@/components/Loading'
import { useProfile } from '@/hooks/useProfile'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Link } from 'react-router-dom'

export default function Profile() {
  const { data, isPending, isError } = useProfile()

  if (isPending) {
    return <Loading />
  }
  if (isError) {
    return <Error />
  }

  console.log(data)

  return (
    <div className="m-auto max-w-[2000px]">
      <div className=" flex flex-col items-center mt-20">
        <h1 className="font-title text-3xl">Player Profile</h1>
        <div className="border-2 border-thGray bg-white/50 px-20 py-5 font-title text-3xl shadow-md shadow-black/50">
          {/* <hr className="border-1 border-thGray/80"></hr> */}
          <p className="">Name: <span className="font-mono text-2xl px-10">{data.name ? data.name : '-'}</span></p>
          <p className="pt-2">Email: <span className="font-mono text-2xl px-10">{data.email ? data.email : '-'}</span></p>
        </div>
      </div>

      <div id="stats-art" className="mx-10 flex flex-wrap">
        <div className="w-1/2">
          <div className=" flex flex-col items-center p-10 ">
            <h1 className="pb-10 font-title text-3xl">Player Stats</h1>
            <div className="w-full border-2 border-thGray bg-white/50 p-10 shadow-md shadow-black/50">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-black text-center font-title text-3xl">
                      Games Played
                    </TableHead>
                    <TableHead className="text-black text-center font-title text-3xl">
                      Tags Found
                    </TableHead>
                    <TableHead className="text-black text-center font-title text-3xl">
                      Total Guesses
                    </TableHead>
                    <TableHead className="text-black text-center font-title text-3xl">
                      Guess Efficiency
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="text-center text-2xl font-mono">
                      {data.games ? data.games : 0}
                    </TableCell>
                    <TableCell className="text-center text-2xl font-mono">
                      {data.wins ? data.wins : 0}
                    </TableCell>
                    <TableCell className="text-center text-2xl font-mono">
                      {data.guesses ? data.guesses : 0}
                    </TableCell>
                    <TableCell className="text-center text-2xl font-mono">
                      {data.guesses ? (100 * data.wins) / data.guesses : 0}%
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

        <div className="flex w-1/2 flex-col items-center p-10 ">
          <h1 className="pb-10 font-title text-3xl">Tags Found</h1>
          <div
            id="unlocked-artwork"
            className="justify-even flex flex-wrap justify-center gap-2"
          >
            {data.unlockedArt.map((artwork: UnlockedArt) => (
              <div key={artwork.id}>
                <Link to={`/gallery/${artwork.id}`}>
                  <img
                    src={`/images/${artwork.imageUrl}`}
                    alt="test"
                    className="h-[185px] w-[240px] rounded-lg object-cover shadow-md shadow-black/50"
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  interface UnlockedArt {
    id: number
    imageUrl: string
  }
}

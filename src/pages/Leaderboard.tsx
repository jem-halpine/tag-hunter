import { useQuery } from '@tanstack/react-query'
import { getLeaderBoard } from '@/apis/games'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import Loading from '@/components/Loading'
import Error from '@/components/Error'

export default function Leaderboard() {
  const {
    data: leaderboard,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['leaderboard'],
    queryFn: getLeaderBoard,
  })

  if (isPending) {
    return <Loading />
  }

  if (isError) {
    return <Error />
  }

  return (
      <div className="flex flex-col items-center">
        <div className="min-h-[80vh] w-[640px] bg-white/80 p-10 shadow-md shadow-black/50">
          <Table>
            <TableCaption>Global Taghunter Member Rankings </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="font-title text-3xl">Player</TableHead>
                <TableHead className="font-title text-3xl">
                  Games Played
                </TableHead>
                <TableHead className="text-right font-title text-3xl">
                  Games Won
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboard.map((row) => (
                <TableRow key={row.name}>
                  <TableCell className="text-lg font-medium">
                    {row.name}
                  </TableCell>
                  <TableCell className="text-center text-lg">
                    {row.games}
                  </TableCell>
                  <TableCell className="text-center text-lg">
                    {row.wins}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
  )
}

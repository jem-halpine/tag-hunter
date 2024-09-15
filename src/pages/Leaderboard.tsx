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
    return <>Loading</>
  }

  if (isError) {
    return <>Error</>
  }

  return (
    <div className="flex flex-col items-center">
      <div className='w-[540px] min-h-[80vh] bg-white/80 shadow-md shadow-black/50 p-10'>
        <Table>
          <TableCaption>Global Taghunter Member Rankings </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="">Player</TableHead>
              <TableHead>Games Played</TableHead>
              <TableHead className="text-right">Games Won</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderboard.map((row) => (
              <TableRow key={row.name}>
                <TableCell className="font-medium">{row.name}</TableCell>
                <TableCell>{row.games}</TableCell>
                <TableCell className="text-right">{row.wins}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

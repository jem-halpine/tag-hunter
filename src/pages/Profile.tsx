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
    <div className='max-w-[2000px] m-auto'>
      <div className="m-10 w-1/2 border-2 border-thGray bg-white/50 p-10 font-title text-3xl shadow-md shadow-black/50">
        <h1>Profile</h1>
        <hr className="border-1 border-thGray/80"></hr>
        <p className="pt-4">Name: {data.name ? data.name : '-'}</p>
        <p className="pt-2">Email: {data.email ? data.email : '-'}</p>
      </div>

      <div className="m-10 border-2 border-thGray bg-white/50 p-10 shadow-md shadow-black/50" >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-3xl text-center font-title">Games Played</TableHead>
              <TableHead className="text-3xl text-center font-title">Tags Found</TableHead>
              <TableHead className="text-3xl text-center font-title">Total Guesses</TableHead>
              <TableHead className="text-3xl text-center font-title">Guess Efficiency</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="text-2xl text-center">{data.games ? data.games : 0}</TableCell>
              <TableCell className="text-2xl text-center">{data.wins ? data.wins : 0}</TableCell>
              <TableCell className="text-2xl text-center">
                {data.guesses ? data.guesses : 0}
              </TableCell>
              <TableCell className="text-2xl text-center">
                {data.guesses ? (100 * data.wins) / data.guesses : 0}%
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

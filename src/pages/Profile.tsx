import Error from '@/components/Error'
import Loading from '@/components/Loading'
import { useProfile } from '@/hooks/useProfile'

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
    <div>
      <h1>Profile</h1>
      <p>Name: {data.name ? data.name : "-"}</p>
      <p>Email: {data.email ? data.email : "-"}</p>
      <h1>Stats:</h1>
      <p>Games played: {data.games ? data.games : 0}</p>
      <p>Tags Found: {data.wins ? data.wins : 0}</p>
      <p>Total Guesses: {data.guesses ? data.guesses : 0}</p>
      <p>Guess Efficiency: {data.guesses ? 100* data.wins / data.guesses : 0}%</p>
    </div>
  )
}


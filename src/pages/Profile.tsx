import Error from "@/components/Error"
import Loading from "@/components/Loading"
import { useUser } from "@/hooks/useUsers"

export default function Profile() {

  const { data, isPending, isError } = useUser()

  if(isPending){return (<Loading />)}
  if(isError){return (<Error />)}

  return (<div>
    <h1>Profile</h1>
      Name: {data.name}
    </div>)
}

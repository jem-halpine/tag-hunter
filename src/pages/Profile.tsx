import { useUser } from "@/hooks/useUsers"

export default function Profile() {

  const { data, isPending, isError } = useUser()

  if(isPending){return (<div>Loading</div>)}
  if(isError){return (<div>Error</div>)}

  return (<div>
    <h1>Profile</h1>
      Name: {data.name}
    </div>)
}

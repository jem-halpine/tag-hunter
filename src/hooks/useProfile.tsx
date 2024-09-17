import { getUserProfile } from "@/apis/users"
import { useAuth0 } from "@auth0/auth0-react"
import { useQuery } from "@tanstack/react-query"


export function useProfile(){
  const { getAccessTokenSilently } = useAuth0()
  const query = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const token = await getAccessTokenSilently()
      return getUserProfile(token)
    }
  })

  return {
    ...query
  }
}



import { useAuth0 } from "@auth0/auth0-react"
// import { useNavigate } from "react-router-dom"
import { useUser } from "./useUsers"
import { useEffect } from "react"

export function useRegister(){

  const { user, getAccessTokenSilently } = useAuth0()
  // const navigate = useNavigate()
  const usersTable = useUser()
  
  useEffect(() => {
    async function getUserData() {
      // if (usersTable.data) navigate('/')
      // else {
        const token = await getAccessTokenSilently()
        usersTable.add.mutate({
          newUser: { name: "jeremy", email: user?.email, auth0id: user?.sub },
          token,
        })
        // navigate('/')
      // }
    }
    
    getUserData()

    return 


  }, [])
}
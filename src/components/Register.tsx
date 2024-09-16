import { useUser } from "@/hooks/useUsers"
import { useAuth0 } from "@auth0/auth0-react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "./ui/button"

function Register() {
  
  const navigate = useNavigate()
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0()
  const userTable = useUser()

  useEffect(()=> {

    async function checkauth(){
      if(isAuthenticated){
        console.log('User is authenticated')
        handleAdd()
      }
    }
    
    checkauth()

  }, [isAuthenticated])

  const handleAdd = async () => {

    const token  = await getAccessTokenSilently()
    userTable.add.mutate({newUser: {
      auth0Id: String(user?.sub),
      name: user?.name,
      email: user?.email
    }, token})

    navigate('/')

  }

  if(!isAuthenticated && !userTable.data){
    return <div>Not Authenticated</div>
  }


  return (
    <div>
      Please wait while we log you in
    </div>
  )
}

export default Register

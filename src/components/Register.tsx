import { useUser } from "@/hooks/useUsers"
import { useAuth0 } from "@auth0/auth0-react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function Register() {
  
  const navigate = useNavigate()
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0()
  const userTable = useUser()

  useEffect(()=> {

    if(userTable.data) {navigate('/')}
    
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
  }

  if(!isAuthenticated){
    return <div>Not Authenticated</div>
  }

  // console.log(newUser)

  return (
    <div>
      {/* {newUser.name}  */}
      Thanks for logging in 
    </div>
  )
}

export default Register

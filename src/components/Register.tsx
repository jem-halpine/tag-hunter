import { useUser } from "@/hooks/useUsers"
import { useAuth0 } from "@auth0/auth0-react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

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

  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  if(!isAuthenticated){
    return <div className="py-20 w-full text-center">Not Authenticated</div>
  }


  return (
    <div  className="py-20 w-full text-center">
      Please wait while we redirect you to our homepage...
    </div>
  )
}

export default Register

import { useUser } from '@/hooks/useUsers'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { IsAuthenticated } from './IsAuthenticated'
import { NotAuthenticated } from './NotAuthenticated'
// import { Users } from 'models/users'
import { useAuth0 } from '@auth0/auth0-react'

function Register() {
  const { user, getAccessTokenSilently } = useAuth0()

  const navigate = useNavigate()
  const users = useUser()

  useEffect(() => {
    async function getUserData() {
      if (users.data) navigate('/')
      else {
        const token = await getAccessTokenSilently()
        await users.add.mutate({
          newUser: { name: user?.name, email: user?.email, auth0id: user?.sub },
          token,
        })
        navigate('/')
      }
    }
    getUserData()
  }, [users.data, navigate])
  // console.log('Jemjemjem', users.data)

  return (
    <div>
      <IsAuthenticated>
        <p>Logged in</p>
      </IsAuthenticated>
      <NotAuthenticated>
        <p>Please log in</p>
      </NotAuthenticated>
    </div>
  )
}

export default Register

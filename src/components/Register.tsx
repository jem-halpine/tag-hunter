import { useUser } from '@/hooks/useUsers'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { IsAuthenticated } from './IsAuthenticated'
import { NotAuthenticated } from './NotAuthenticated'
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
        users.add.mutate({
          newUser: { name: "jeremy", email: user?.email, auth0id: "Jeremy" },
          token,
        })
        // navigate('/')
      }
    }
    getUserData()
  }, [])
  // console.log('Jemjemjem', users.data)

  return (
    <div>
      <IsAuthenticated>
        <p>Boo</p>
      </IsAuthenticated>
      <NotAuthenticated>
        <p>Please log in</p>
      </NotAuthenticated>
    </div>
  )
}

export default Register

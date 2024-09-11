import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { IsAuthenticated } from './IsAuthenticated'
import { NotAuthenticated } from './NotAuthenticated'
import { Title } from './Title'

export default function Nav() {
  const { logout, loginWithRedirect } = useAuth0()

  const handleSignIn = () => {
    loginWithRedirect()
  }

  const handleSignOut = () => {
    logout()
  }

  return (
    <div className='flex justify-between mt-12 ml-12 mr-12'>
      <Link to="/"> 
        <Title title="Tag Hunter"></Title>
      </Link>
      <NotAuthenticated>
        <Button variant="default" onClick={handleSignIn}>
          Sign In
        </Button>
      </NotAuthenticated>
      <IsAuthenticated>
        <Button variant="outline" onClick={handleSignOut}>
          Sign Out
        </Button>
      </IsAuthenticated>
    </div>
  )
}

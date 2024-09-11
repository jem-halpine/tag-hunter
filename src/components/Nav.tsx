import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@/components/ui/button'

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
    <div>
      <Title title="Tag Hunter"></Title>
      <NotAuthenticated>
        <Button variant="outline" onClick={handleSignIn}>
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

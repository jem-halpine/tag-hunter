import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'react-router-dom'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

import { IsAuthenticated } from './IsAuthenticated'
import { NotAuthenticated } from './NotAuthenticated'
import { Title } from './Title'

//  TODO: add link for Profile Page

export default function Nav() {
  const { logout, loginWithRedirect, user } = useAuth0()

  const handleSignIn = () => {
    loginWithRedirect()
  }

  const handleSignOut = () => {
    logout()
  }

  return (
    <div className="ml-12 mr-12 mt-12 flex justify-between">
      <Link to="/">
        <Title title="Tag Hunter"></Title>
      </Link>
      <NotAuthenticated>
        <Button variant="default" onClick={handleSignIn}>
          Sign In
        </Button>
      </NotAuthenticated>

      <IsAuthenticated>
        <img src={user?.picture} alt="user profile"></img>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="default">{user?.nickname}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Link to="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSignOut}>
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </IsAuthenticated>
    </div>
  )
}

import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'react-router-dom'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

import { IsAuthenticated } from './IsAuthenticated'
import { NotAuthenticated } from './NotAuthenticated'

export default function Nav() {
  const { logout, loginWithRedirect, user } = useAuth0()

  const handleSignIn = () => {
    loginWithRedirect({
      authorizationParams: {
        redirectUri: `${window.location.origin}/register`,
      },
    })
  }

  const handleSignOut = () => {
    logout()
  }

  return (
    <div className="px-20 py-8 flex items-center justify-between bg-gradient-to-b from-white/70">
      <Link to="/">
        <h1 className="font-pageName text-7xl">Tag Hunter</h1>
      </Link>
      <div>
        <NotAuthenticated>
          <Button variant="default" onClick={handleSignIn}>
            Sign In
          </Button>
        </NotAuthenticated>

        <div className="flex items-center">
          <IsAuthenticated>
            <Avatar className="mr-2">
              <AvatarImage src={user?.picture} alt="user profile"></AvatarImage>
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="default">
                  {user?.nickname}{' '}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </Button>
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
      </div>
    </div>
  )
}

import { useAddUser, useUser } from '@/hooks/useUsers'
import { IsAuthenticated } from './IsAuthenticated'
import LoginButton from './LoginButon'
import LogoutButton from './LogoutButton'
import { NotAuthenticated } from './NotAuthenticated'

export default function Nav() {
  useUser()
  return (
 
    <div>
      <NotAuthenticated>
        <LoginButton />
      </NotAuthenticated>
      <IsAuthenticated>
        <LogoutButton />
      </IsAuthenticated>
    </div>
  )
}

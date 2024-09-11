import { IsAuthenticated } from './IsAuthenticated'
import LoginButton from './LoginButon'
import LogoutButton from './LogoutButton'
import { NotAuthenticated } from './NotAuthenticated'
import { Title } from './Title'

export default function Nav() {
  return (
    <div>
      <Title title="Tag Hunter"></Title>
      <NotAuthenticated>
        <LoginButton />
      </NotAuthenticated>
      <IsAuthenticated>
        <LogoutButton />
      </IsAuthenticated>
    </div>
  )
}

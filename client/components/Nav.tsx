import { IsAuthenticated } from './IsAuthenticated'
import LoginButton from './LoginButon'
import { NotAuthenticated } from './NotAuthenticated'

export default function Nav() {
  return (
    <div>
      <NotAuthenticated>
        <LoginButton />
      </NotAuthenticated>
      <IsAuthenticated>
        <div>You are logged in!</div>
      </IsAuthenticated>
    </div>
  )
}

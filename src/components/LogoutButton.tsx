import { useAuth0 } from '@auth0/auth0-react'
// import React from 'react'

const LogoutButton = () => {
  const { user, logout } = useAuth0()

  return (
    <button
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
    >
      Log Out {user?.nickname}
    </button>
  )
}

export default LogoutButton

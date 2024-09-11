import { useAuth0 } from '@auth0/auth0-react'

const useIsAuthenticated = () => {
  const { isAuthenticated } = useAuth0()
  return isAuthenticated
}

export default useIsAuthenticated

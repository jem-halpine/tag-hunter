import useIsAuthenticated from '../hooks/useIsAuthenticated'

interface Props {
  children: React.ReactNode
}

export function NotAuthenticated(props: Props) {
  const { children } = props
  return !useIsAuthenticated() ? <>{children}</> : null
}

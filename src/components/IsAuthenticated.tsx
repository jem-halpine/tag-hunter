import useIsAuthenticated from '../hooks/useIsAuthenticated'

interface Props {
  children: React.ReactNode
}

export function IsAuthenticated(props: Props) {
  const { children } = props
  return useIsAuthenticated() ? <>{children}</> : null
}

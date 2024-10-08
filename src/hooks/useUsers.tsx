import {
  useQuery,
  MutationFunction,
  useQueryClient,
  useMutation,
} from '@tanstack/react-query'

import * as API from '../apis/users.js'
import { useAuth0 } from '@auth0/auth0-react'

export function useUser() {
  const { user, getAccessTokenSilently } = useAuth0()
  const query = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const token = await getAccessTokenSilently()
      return API.getUserById(token)
    },
    enabled: !!user,
  })

  return {
    ...query,
    add: useUserMutation(API.addUser),
  }
}

export function useUserMutation<TData = unknown, TVaribles = unknown>(
  mutationFn: MutationFunction<TData, TVaribles>,
) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
  })
  return mutation
}


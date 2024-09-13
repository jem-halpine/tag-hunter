import {
  useQuery,
  MutationFunction,
  useQueryClient,
  useMutation,
} from '@tanstack/react-query'

import * as API from '../apis/usersApi.js'
import { useAuth0 } from '@auth0/auth0-react'

export function useUser() {
  const { user, getAccessTokenSilently } = useAuth0()
  const query = useQuery({
    queryKey: ['data'],
    queryFn: async () => {
      const token = await getAccessTokenSilently()
      return API.getUserById({ token })
    },
    enabled: !!user,
  })
  return {
    ...query,
    add: useAddUser(),
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

export function useAddUser() {
  return useUserMutation(API.addUser)
}

import { useQuery } from '@tanstack/react-query'
import { userService } from '@/services/studio/user.service'
import { useTypedSelector } from '@/store'

export function useProfile() {
	const { isLoggedIn, authReady } = useTypedSelector(state => state.auth)

	const query = useQuery({
		queryKey: ['profile'],
		queryFn: () => userService.getProfile(),
		enabled: isLoggedIn && authReady,
		refetchInterval: 1800000 //30min
	})

	return {
		profile: isLoggedIn ? query.data : undefined, // <<< reset on logout
		isLoading: query.isLoading,
		isSuccess: query.isSuccess,
		refetch: query.refetch
	}
}

import { useQuery } from '@tanstack/react-query'
import { userService } from '@/services/user.service'
import { useTypedSelector } from '@/store'

export function useProfile() {
	const { isLoggedIn, authReady } = useTypedSelector(state => state.auth)

	const { data, isLoading, isSuccess, refetch } = useQuery({
		queryKey: ['profile'],
		queryFn: () => userService.getProfile(),
		enabled: isLoggedIn && authReady,
		refetchInterval: 1800000 //30min
	})

	return {
		profile: data,
		isLoading,
		isSuccess,
		refetch
	}
}

import { useQuery } from '@tanstack/react-query'
import { userService } from '@/services/user.service'

export function useProfile() {
	const { data, isLoading } = useQuery({
		queryKey: ['profile'],
		queryFn: () => userService.getProfile(),
		refetchInterval: 1800000 //30min
	})

	return {
		profile: data,
		isLoading
	}
}

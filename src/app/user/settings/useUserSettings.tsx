import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { useProfile } from '@/hooks/useProfile'
import { userService } from '@/services/studio/user.service'
import type { IUserSettingsData } from '@/types/settings.types'

export function useUserSettings() {
	const form = useForm<IUserSettingsData>({
		mode: 'onChange'
	})

	const { profile, isSuccess, isLoading, refetch } = useProfile()
	const name = profile?.name ? profile.name : profile?.email.split('@')[0].trim()

	useEffect(() => {
		if (!isSuccess) return

		form.reset({
			email: profile?.email,
			name: name,
			avatarUrl: profile?.avatarUrl
		})
	}, [form, isSuccess, profile, name])

	const { mutate, isPending } = useMutation({
		mutationKey: ['update-settings'],
		mutationFn: (data: IUserSettingsData) => userService.updateProfile(data),
		onSuccess: async () => {
			refetch()
			const { toast } = await import('react-hot-toast')
			toast.success('Settings successfully edited!')
		}
	})

	const onSubmit: SubmitHandler<IUserSettingsData> = data => {
		mutate(data)
	}

	return { onSubmit, formObject: form, isLoading: isPending, isProfileLoading: isLoading }
}

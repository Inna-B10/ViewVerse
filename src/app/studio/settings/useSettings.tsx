import { useMutation } from '@tanstack/react-query'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { userService } from '@/services/user.service'
import type { ISettingsData } from '@/types/settings.types'

export function useSettings() {
	const form = useForm<ISettingsData>({
		mode: 'onChange'
	})

	const { mutate, isPending } = useMutation({
		mutationKey: ['update-settings'],
		mutationFn: (data: ISettingsData) => userService.updateProfile(data)
	})

	const onSubmit: SubmitHandler<ISettingsData> = data => {
		mutate(data)
	}

	return { onSubmit, form, isLoading: isPending }
}

import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { useProfile } from '@/hooks/useProfile'
import { channelService } from '@/services/channel.service'
import type { IChannelSettingsData } from '@/types/settings.types'

export function useChannelSettings() {
	const form = useForm<IChannelSettingsData>({
		mode: 'onChange'
	})

	const { profile, isSuccess, isLoading, refetch } = useProfile()
	// const slug = profile?.channel?.slug ? profile?.channel?.slug : profile?.email.split('@')[0].trim()

	useEffect(() => {
		if (!isSuccess) return

		// const channel = profile?.channel
		// 	? {
		// 			bannerUrl: profile?.channel?.bannerUrl,
		// 			description: profile?.channel?.description
		// 		}
		// 	: {}

		form.reset({
			slug: profile?.channel?.slug || profile?.email.split('@')[0].trim(),
			description: profile?.channel?.description || '',
			bannerUrl: profile?.channel?.bannerUrl || ''
		})
	}, [form, isSuccess, profile])

	const { mutate, isPending } = useMutation({
		mutationKey: ['update-settings'],
		mutationFn: (data: IChannelSettingsData) => channelService.updateChannel(data),
		onSuccess: async () => {
			refetch()
			const { toast } = await import('react-hot-toast')
			toast.success('Settings successfully edited!')
		}
	})

	const onSubmit: SubmitHandler<IChannelSettingsData> = data => {
		mutate(data)
	}

	return { onSubmit, formObject: form, isLoading: isPending, isProfileLoading: isLoading }
}

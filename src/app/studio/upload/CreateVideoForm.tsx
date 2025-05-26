import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import type { SubmitHandler } from 'react-hook-form'
import { type UseFormReturn } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Button } from '@/ui/button/Button'
import { STUDIO_PAGE } from '@/config/studio-page.config'
import { VideoForm } from './VideoForm'
import { studioVideoService } from '@/services/studio/studio-video.service'
import type { IVideoFormData } from '@/types/studio-videos.types'

interface Props {
	form: UseFormReturn<IVideoFormData, any, IVideoFormData>
	isReadyToPublish: boolean
}

export function CreateVideoForm({ form, isReadyToPublish }: Props) {
	const router = useRouter()

	const { mutate, isPending } = useMutation({
		mutationKey: ['create a video'],
		mutationFn: (data: IVideoFormData) => studioVideoService.create(data),
		onSuccess: () => {
			form.reset()
			toast.success('Video successfully published!')
			router.push(STUDIO_PAGE.STUDIO_HOME)
		},
		onError() {
			toast.error('Publishing video failed!')
		}
	})

	const onSubmit: SubmitHandler<IVideoFormData> = data => {
		mutate({
			...data,
			title: data.title.trim(),
			description: data.description.trim()
		})
	}

	return (
		<form
			onSubmit={form.handleSubmit(onSubmit)}
			name='videoUpload'
		>
			{/* ---------------------------------- Form */}
			<VideoForm form={form} />

			{/* ----------------------------- Publish Button */}
			<div className='text-center mt-[1.1rem]'>
				<Button
					type='submit'
					disabled={!isReadyToPublish}
					isLoading={isPending}
					title='Publish video'
					aria-label='Publish video'
				>
					{isReadyToPublish ? 'Publish' : 'Processing video...'}
				</Button>
			</div>
		</form>
	)
}

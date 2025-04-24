import { useMutation } from '@tanstack/react-query'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { Textarea } from '@/ui/field/Textarea'
import { useAuth } from '@/hooks/useAuth'
import { commentService } from '@/services/comment.service'
import type { ICommentData } from '@/types/comment.types'

interface IAddComments {
	refetch: () => void
	videoId: string
}

export function AddCommentsForm({ refetch, videoId }: IAddComments) {
	const { isLoggedIn } = useAuth()

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<ICommentData>({
		mode: 'onChange'
	})

	const { mutate, isPending } = useMutation({
		mutationKey: ['create comment'],
		mutationFn: (data: ICommentData) => commentService.create(data),
		onSuccess: () => {
			refetch()
			reset()
		}
	})

	const onSubmit: SubmitHandler<ICommentData> = ({ text }) => {
		mutate({
			text,
			videoId
		})
	}

	if (!isLoggedIn) return null

	return (
		<div className='mt-6 mb-6'>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='grid grid-cols-[7fr_1fr] gap-4'
			>
				<Textarea
					placeholder='Enter comment'
					rows={1}
					registration={register('text', { required: true })}
					error={errors.text?.message}
				/>
				<button
					className='bg-field border border-border rounded font-medium h-fit py-[0.25rem] text-gray-500 transition-color duration-300 hover:text-gray-400 '
					disabled={isPending}
				>
					{isPending ? 'Saving...' : 'Comment'}
				</button>
			</form>
		</div>
	)
}

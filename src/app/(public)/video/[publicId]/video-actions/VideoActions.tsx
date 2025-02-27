'use client'

import { useMutation } from '@tanstack/react-query'
import cn from 'clsx'
import { Heart, ListPlus } from 'lucide-react'
import { startTransition, useEffect, useState } from 'react'
import { useProfile } from '@/hooks/useProfile'
import { transformCount } from '@/utils/transform-count'
import { userService } from '@/services/user.service'
import type { ISingleVideoResponse } from '@/types/video.types'

export function VideoActions({ video }: { video: ISingleVideoResponse }) {
	const { profile, refetch } = useProfile()
	const isLiked = profile?.likes.some(like => like.videoId === video.id) || false

	const [isLikedLocal, setIsLikedLocal] = useState(isLiked)

	const [optimisticLike, setOptimisticLike] = useState<number>(video.likes.length)

	useEffect(() => {
		setIsLikedLocal(isLiked)
	}, [isLiked])

	const { mutate } = useMutation({
		mutationKey: ['like', video.id],
		mutationFn: () => userService.toggleLike(video.id),
		onMutate() {
			startTransition(() => {
				const newIsLiked = !isLikedLocal
				setIsLikedLocal(newIsLiked)
				setOptimisticLike(prev => (newIsLiked ? prev + 1 : prev - 1))
			})
		},
		onError() {
			startTransition(() => {
				const revertedIsLiked = !isLikedLocal
				setIsLikedLocal(revertedIsLiked)
				setOptimisticLike(prev => (revertedIsLiked ? prev + 1 : prev - 1))
			})
		},
		onSuccess() {
			refetch()
		}
	})

	return (
		<div className='flex justify-end items-center gap-5'>
			<button
				className='flex items-center gap-1 transition-opacity opacity-80 hover:opacity-100'
				title='Save'
			>
				<ListPlus size={20} />
				Save
			</button>
			<button
				className='text-primary text-lg flex items-center gap-1.5 transition-opacity opacity-80 hover:opacity-100'
				title='Likes'
				onClick={() => mutate()}
			>
				<Heart
					size={19}
					className={cn('text-primary', { 'fill-primaryDark': isLiked })}
				/>
				{transformCount(optimisticLike)}
			</button>
		</div>
	)
}

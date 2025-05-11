'use client'

import { useMutation } from '@tanstack/react-query'
import cn from 'clsx'
import { Heart } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { startTransition, useEffect, useState } from 'react'
import { PAGE } from '@/config/public-page.config'
import { useProfile } from '@/hooks/useProfile'
import { transformCount } from '@/utils/transform-count'
import { SaveToPlaylist } from './SaveToPlaylist'
import { userService } from '@/services/user.service'
import type { ISingleVideoResponse } from '@/types/video.types'

export function VideoActions({
	video,
	isVideoOwner
}: {
	video: ISingleVideoResponse
	isVideoOwner: boolean
}) {
	const { profile, refetch } = useProfile()
	const router = useRouter()
	const isLiked = profile?.likes.some(like => like.video.id === video.id) || false

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

	const clickHandler = () => {
		if (profile) {
			mutate()
		} else {
			router.push(PAGE.AUTH)
		}
	}

	return (
		<div className='flex justify-end items-center gap-5'>
			<SaveToPlaylist video={video} />
			<button
				className={cn(
					'text-lg flex items-center gap-1.5 transition-colors duration-300 opacity-100',
					isVideoOwner ? 'opacity-40' : 'hover:text-primary'
				)}
				title='Likes'
				onClick={clickHandler}
				disabled={isVideoOwner}
			>
				<Heart
					size={19}
					className={isLiked ? 'text-primary fill-primary' : ''}
				/>
				<span className={cn({ 'text-primary': isLiked })}>{transformCount(optimisticLike)}</span>
			</button>
		</div>
	)
}

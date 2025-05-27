'use client'

import { useMutation } from '@tanstack/react-query'
import cn from 'clsx'
import { Heart, ListPlus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { startTransition, useEffect, useState } from 'react'
import { PAGE } from '@/config/public-page.config'
import { useProfile } from '@/hooks/useProfile'
import { transformCount } from '@/utils/transform-count'
import { SaveToPlaylist } from './SaveToPlaylist'
import { userService } from '@/services/studio/user.service'
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
			{profile ? (
				<SaveToPlaylist video={video} />
			) : (
				<div className='relative z-10'>
					<button
						onClick={() => router.push(PAGE.AUTH)}
						className='flex items-center gap-1 transition-all duration-200 opacity-80 hover:opacity-100 hover:text-primary'
						title='Please log in to use this feature'
						aria-label='Please log in to use this feature'
					>
						<ListPlus size={20} /> Playlists
					</button>
				</div>
			)}
			<button
				className={cn(
					'text-lg flex items-center gap-1.5  opacity-100',
					isVideoOwner ? 'opacity-40' : 'hover:text-primary'
				)}
				title={
					profile
						? isLiked
							? 'Remove from liked'
							: 'Add to liked'
						: 'Please log in to use this feature'
				}
				aria-label={
					profile
						? isLiked
							? 'Remove from liked'
							: 'Add to liked'
						: 'Please log in to use this feature'
				}
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

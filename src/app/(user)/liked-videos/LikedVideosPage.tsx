'use client'

import { useMutation } from '@tanstack/react-query'
import { FolderHeart, Trash2 } from 'lucide-react'
import { Heading } from '@/ui/Heading'
import { SkeletonLoader } from '@/ui/SkeletonLoader'
import { VideoCardHorizontal } from '@/ui/video-card/VideoCardHorizontal'
import { useProfile } from '@/hooks/useProfile'
import { userService } from '@/services/studio/user.service'

export function LikedVideosPage() {
	const { profile, isLoading, refetch } = useProfile()

	const { mutate } = useMutation({
		mutationKey: ['like'],
		mutationFn: (videoId: string) => userService.toggleLike(videoId),
		onSuccess() {
			refetch()
		}
	})

	return (
		<section className='w-3/4'>
			<div className='flex items-center gap-[4.5rem] mb-14'>
				<Heading
					Icon={FolderHeart}
					className='mb-0'
					isPageHeading
				>
					Liked Videos
				</Heading>
				{profile?.likes && profile.likes.length > 0 && (
					<div className='pt-2 text-sm'>{profile.likes.length} videos</div>
				)}
			</div>
			<div>
				{isLoading ? (
					<SkeletonLoader
						count={3}
						className='h-36 rounded-md mb-8'
					/>
				) : profile?.likes?.length ? (
					profile.likes.map(item => (
						<div
							key={item.video.id}
							className='flex items-start gap-4 mb-8'
						>
							<VideoCardHorizontal video={item.video} />
							<button
								title='Remove from liked videos'
								onClick={() => mutate(item.video.id)}
								className='ml-4 text-gray-400 transition-colors duration-300 hover:text-gray-200'
							>
								<Trash2 size={19} />
							</button>
						</div>
					))
				) : (
					<div>
						<p>There are no liked videos.</p>
					</div>
				)}
			</div>
		</section>
	)
}

'use client'

import { FolderHeart } from 'lucide-react'
import { Heading } from '@/ui/Heading'
import { SkeletonLoader } from '@/ui/SkeletonLoader'
import { VideoCardHorizontal } from '@/ui/video-card/VideoCardHorizontal'
import { useProfile } from '@/hooks/useProfile'

export function LikedVideosPage() {
	const { profile, isLoading } = useProfile()

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
						<VideoCardHorizontal
							key={item.video.id}
							video={item.video}
						/>
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

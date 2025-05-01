'use client'

import { History } from 'lucide-react'
import { Heading } from '@/ui/Heading'
import { SkeletonLoader } from '@/ui/SkeletonLoader'
import { VideoCardHorizontal } from '@/ui/video-card/VideoCardHorizontal'
import { useProfile } from '@/hooks/useProfile'

export function HistoryPage() {
	const { profile, isLoading } = useProfile()

	return (
		<section className='w-2/3'>
			<Heading
				Icon={History}
				isPageHeading
			>
				History
			</Heading>
			<div>
				{isLoading ? (
					<SkeletonLoader
						count={4}
						className='h-36 rounded-md'
					/>
				) : profile?.subscribedVideos?.length ? (
					profile?.subscribedVideos?.map(video => (
						<VideoCardHorizontal
							key={video.id}
							video={video}
						/>
					))
				) : (
					<div>
						<p>No history found!</p>
					</div>
				)}
			</div>
		</section>
	)
}

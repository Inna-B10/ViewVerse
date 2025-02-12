'use client'

import { Bell } from 'lucide-react'
import { Heading } from '@/ui/Heading'
import { SkeletonLoader } from '@/ui/SkeletonLoader'
import { VideoCard } from '@/ui/video-card/VideoCard'
import { useProfile } from '@/hooks/useProfile'

export function SubscriptionsPage() {
	const { profile, isLoading } = useProfile()

	return (
		<section>
			<Heading
				Icon={Bell}
				isPageHeading
			>
				Subscriptions
			</Heading>
			<div className='grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
				{isLoading ? (
					<SkeletonLoader
						count={4}
						className='h-36 rounded-md'
					/>
				) : profile?.subscribedVideos?.length ? (
					profile?.subscribedVideos?.map(video => (
						<VideoCard
							key={video.id}
							video={video}
						/>
					))
				) : (
					<div>
						<p>No subscriptions found!</p>
					</div>
				)}
			</div>
		</section>
	)
}

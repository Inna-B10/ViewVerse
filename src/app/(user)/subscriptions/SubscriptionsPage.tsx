'use client'

import { Bell } from 'lucide-react'
import { Heading } from '@/ui/Heading'
import { SkeletonLoader } from '@/ui/SkeletonLoader'
import { VideoCard } from '@/ui/video-card/VideoCard'
import { useProfile } from '@/hooks/useProfile'
import type { IVideo } from '@/types/video.types'

export function SubscriptionsPage() {
	const { profile, isLoading } = useProfile()

	let groupedByChannel
	if (profile?.subscribedVideos && profile.subscribedVideos.length > 0) {
		groupedByChannel = profile.subscribedVideos.reduce<Record<string, IVideo[]>>((acc, video) => {
			const channelId = video.channel.id

			if (!acc[channelId]) {
				acc[channelId] = []
			}

			acc[channelId].push(video)
			return acc
		}, {})
	}

	return (
		<section>
			<Heading
				Icon={Bell}
				isPageHeading
			>
				Subscriptions
			</Heading>
			{isLoading ? (
				<div className='grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
					<SkeletonLoader
						count={4}
						className='h-36 rounded-md'
					/>
				</div>
			) : groupedByChannel ? (
				Object.values(groupedByChannel).map(group => (
					<div
						key={group[0].channel.id}
						className='mb-4'
					>
						<Heading hSize='text-xl'>{group[0].channel.user.name}</Heading>
						<div className='grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
							{group.map(video => (
								<VideoCard
									key={video.id}
									video={video}
								/>
							))}
						</div>
					</div>
				))
			) : (
				<div>
					<p>No subscriptions found!</p>
				</div>
			)}
		</section>
	)
}

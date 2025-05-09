'use client'

import { useQuery } from '@tanstack/react-query'
import { SkeletonLoader } from '@/ui/SkeletonLoader'
import { VideoCard } from '@/ui/video-card/VideoCard'
import { useAuth } from '@/hooks/useAuth'
import { videoService } from '@/services/video.service'

export function Explore() {
	const { user } = useAuth()

	const { data, isLoading } = useQuery({
		queryKey: ['explore'],
		queryFn: () => videoService.getExploreVideos(user?.id)
	})

	return (
		<div className='grid-cols'>
			{isLoading ? (
				<SkeletonLoader
					count={5}
					className='h-36 rounded-md'
				/>
			) : data?.videos?.length ? (
				data.videos.map(video => (
					<VideoCard
						key={video.id}
						video={video}
					/>
				))
			) : (
				<div>
					<p>Explore videos are temporarily unavailable.</p>
				</div>
			)}
		</div>
	)
}

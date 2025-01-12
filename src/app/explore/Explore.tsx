'use client'

import { useQuery } from '@tanstack/react-query'
import { SkeletonLoader } from '@/ui/SkeletonLoader'
import { VideoCard } from '@/ui/video-card/VideoCard'
import { GetMediaQuery } from '@/utils/get-media-query'
import { videoService } from '@/services/video.service'

export function Explore() {
	const { data, isLoading } = useQuery({
		queryKey: ['explore'],
		queryFn: () => videoService.getExploreVideos()
	})
	const count = GetMediaQuery()
	return (
		<div className='grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5'>
			{isLoading ? (
				<SkeletonLoader
					count={count}
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
				<div>Error fetching data</div>
			)}
		</div>
	)
}

'use client'

import { useQuery } from '@tanstack/react-query'
import { VideoCard } from '@/ui/video-card/VideoCard'
import { videoService } from '@/services/video.service'

export function Explore() {
	const { data, isLoading } = useQuery({
		queryKey: ['explore'],
		queryFn: () => videoService.getExploreVideos()
	})

	return (
		<section>
			<h2>Explore</h2>
			<div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5'>
				{isLoading ? (
					'Loading...'
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
		</section>
	)
}

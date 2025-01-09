'use client'

import { useQuery } from '@tanstack/react-query'
import { VideoCard } from '@/ui/video-card/VideoCard'
import { videoService } from '@/services/video.service'

export default function Home() {
	const { data, isLoading } = useQuery({
		queryKey: ['explore'],
		queryFn: () => videoService.getExploreVideos()
	})

	return (
		<div>
			{isLoading ? (
				'Loading...'
			) : data?.data.videos.length ? (
				data.data.videos.map(video => (
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

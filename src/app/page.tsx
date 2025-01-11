'use client'

import { useQuery } from '@tanstack/react-query'
import { Flame } from 'lucide-react'
import { VideoCard } from '@/ui/video-card/VideoCard'
import { videoService } from '@/services/video.service'

export default function Home() {
	const { data, isLoading } = useQuery({
		queryKey: ['explore'],
		queryFn: () => videoService.getExploreVideos()
	})

	//[FIXME] videos  interface
	return (
		<div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5'>
			{isLoading ? (
				'Loading...'
			) : data?.data.videos.length ? (
				data.data.videos.map(video => (
					<VideoCard
						key={video.id}
						video={video}
						Icon={Flame}
					/>
				))
			) : (
				<div>Error fetching data</div>
			)}
		</div>
	)
}

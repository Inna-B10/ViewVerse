import { VideoCard } from '@/ui/video-card/VideoCard'
import type { ISingleVideoResponse } from '@/types/video.types'

export function SimilarVideos({ videos }: { videos: ISingleVideoResponse['similarVideos'] }) {
	return (
		<div className=' grid grid-cols-1 gap-5'>
			{videos.map(video => (
				<VideoCard
					key={video.id}
					video={video}
				/>
			))}
		</div>
	)
}

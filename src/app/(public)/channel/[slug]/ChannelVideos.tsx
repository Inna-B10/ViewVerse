import { Film } from 'lucide-react'
import { Heading } from '@/ui/Heading'
import { VideoCard } from '@/ui/video-card/VideoCard'
import type { IChannel } from '@/types/channel.types'

export function ChannelVideos({ videos }: { videos: IChannel['videos'] }) {
	return (
		<>
			<Heading Icon={Film}>Videos</Heading>
			<div className='grid-cols'>
				{videos.map(video => (
					<VideoCard
						key={video.id}
						video={video}
					/>
				))}
			</div>
		</>
	)
}

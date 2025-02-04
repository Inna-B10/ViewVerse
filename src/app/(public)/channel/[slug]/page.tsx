import { ListVideo } from 'lucide-react'
import { Heading } from '@/ui/Heading'
import { VideoCard } from '@/ui/video-card/VideoCard'
import { channelService } from '@/services/channel.service'
import type { TPageSlugProp } from '@/types/page.types'

export const revalidate = 100
export const dynamic = 'force-static'

// [TODO] dynamic metadata

export default async function ChannelPage({ params: { slug } }: TPageSlugProp) {
	const channel = await channelService.bySlug(slug)

	return (
		<>
			{!!channel.videos.length && (
				<section className='mb-10'>
					<Heading Icon={ListVideo}>Videos</Heading>
					<div className='grid-cols'>
						{channel.videos.map(video => (
							<VideoCard
								key={video.id}
								video={video}
							/>
						))}
					</div>
				</section>
			)}
		</>
	)
}

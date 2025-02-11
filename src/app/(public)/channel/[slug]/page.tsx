import { ListVideo } from 'lucide-react'
import type { Metadata } from 'next'
import { Heading } from '@/ui/Heading'
import { VideoCard } from '@/ui/video-card/VideoCard'
import { channelService } from '@/services/channel.service'
import type { TPageSlugProp } from '@/types/page.types'

export const revalidate = 100
export const dynamic = 'force-static'

export async function generateMetadata({ params: { slug } }: TPageSlugProp): Promise<Metadata> {
	const channel = await channelService.bySlug(slug)

	return {
		title: channel.data.user.name,
		description: channel.data.description,
		openGraph: {
			type: 'profile',
			images: [channel.data.bannerUrl]
		}
	}
}

export async function generateStaticParams() {
	const { data } = await channelService.getAll()

	return data.map(channel => ({
		slug: channel.slug
	}))
}

export default async function ChannelPage({ params: { slug } }: TPageSlugProp) {
	const data = await channelService.bySlug(slug)
	const channel = data.data

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

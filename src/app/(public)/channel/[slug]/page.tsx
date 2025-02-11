import type { Metadata } from 'next'
import Image from 'next/image'
import { Heading } from '@/ui/Heading'
import { Button } from '@/ui/button/Button'
import { VerifiedBadge } from '@/ui/video-card/VerifiedBadge'
import { transformCount } from '@/utils/transform-count'
import { ChannelVideos } from './ChannelVideos'
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
		<section className='mb-10'>
			<div>
				<Image
					alt={channel.user.name || ''}
					//[TODO] default banner
					src={channel.bannerUrl || '/overlay.png'}
					width={1284}
					height={207}
					className='rounded-3xl'
				/>
			</div>
			<div className='flex gap-5 mt-7 mb-12 w-1/2'>
				<Image
					alt={channel.slug}
					src={channel.avatarUrl}
					width={185}
					height={185}
					className='rounded-xl flex-shrink-0'
				/>
				<div className='flex flex-col justify-between'>
					<Heading>
						{channel.user.name} {channel.isVerified && <VerifiedBadge size={16} />}
					</Heading>

					<div className='mb-2 text-gray-400 text-xs text-nowrap flex items-center gap-1'>
						<span>@{channel.slug}</span>
						<span>♦</span>
						<span>{transformCount(channel.subscribers.length)} subscribers</span>
						<span>♦</span>
						<span>{channel.videos.length} videos</span>
					</div>
					<article className='mb-4 text-gray-400 text-sm leading-snug'>
						{channel.description}
					</article>
					{/* //[TODO] subscribe button*/}
					<Button>Subscribe</Button>
				</div>
			</div>
			{!!channel.videos.length && <ChannelVideos videos={channel.videos} />}
		</section>
	)
}

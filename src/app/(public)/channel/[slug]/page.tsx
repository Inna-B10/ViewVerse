import type { Metadata } from 'next'
import dynamicNext from 'next/dynamic'
import Image from 'next/image'
import { Heading } from '@/ui/Heading'
import { SkeletonLoader } from '@/ui/SkeletonLoader'
import { VerifiedBadge } from '@/ui/video-card/VerifiedBadge'
import { transformCount } from '@/utils/transform-count'
import { ChannelVideos } from './ChannelVideos'
import { channelService } from '@/services/channel.service'
import type { TPageSlugProp } from '@/types/page.types'

const DynamicSubscribeButton = dynamicNext(
	() => import('@/components/SubscribeButton').then(mod => mod.SubscribeButton),
	{
		//[FIXME]?
		// ssr: false,
		loading: () => <SkeletonLoader className='w-36 h-10 rounded-md' />
	}
)

export const revalidate = 100

export async function generateMetadata(props: TPageSlugProp): Promise<Metadata> {
	const { slug } = await props.params
	const data = await channelService.bySlug(slug)
	const channel = data.data

	return {
		title: channel.user.name,
		description: channel.description,
		openGraph: {
			type: 'profile',
			images: [channel.bannerUrl]
		}
	}
}

export async function generateStaticParams() {
	const { data } = await channelService.getAll()

	return data.map(channel => ({
		slug: channel.slug
	}))
}

export default async function ChannelPage(props: TPageSlugProp) {
	const { slug } = await props.params
	const data = await channelService.bySlug(slug)
	const channel = data.data

	return (
		<section className='mb-10'>
			<div>
				<div className='relative w-full h-[249px] rounded-lg overflow-hidden shadow-md'>
					<Image
						alt={channel.user.name || ''}
						//[TODO] default banner
						src={channel.bannerUrl || '/overlay.png'}
						fill
						style={{ objectFit: 'cover' }}
						quality={90}
						priority
					/>
				</div>
			</div>
			<div className='flex gap-5 mt-7 mb-12 w-1/2'>
				<Image
					alt={channel.slug}
					src={channel.avatarUrl}
					width={100}
					height={100}
					style={{ objectFit: 'cover' }}
					quality={90}
					priority
					className='rounded-lg flex-shrink-0 shadow-md object-cover w-[150px] h-auto'
				/>
				<div className='flex flex-col justify-between'>
					<Heading>
						{channel.user.name} {channel.isVerified && <VerifiedBadge size={16} />}
					</Heading>

					<div className='mb-2 text-gray-400 text-xs whitespace-nowrap flex items-center gap-1'>
						<span>@{channel.slug}</span>
						<span>♦</span>
						<span>{transformCount(channel.subscribers.length)} subscribers</span>
						<span>♦</span>
						<span>{channel.videos.length} videos</span>
					</div>
					<article className='mb-4 text-gray-400 text-sm leading-snug'>
						{channel.description}
					</article>
					<DynamicSubscribeButton slug={slug} />
				</div>
			</div>
			{!!channel.videos.length && <ChannelVideos videos={channel.videos} />}
		</section>
	)
}

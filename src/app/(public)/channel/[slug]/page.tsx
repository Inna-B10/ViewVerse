import type { Metadata } from 'next'
import { ChannelSubPage } from './ChannelSubPage'
import { ChannelVideos } from './ChannelVideos'
import NotFoundPage from '@/app/not-found'
import { channelService } from '@/services/channel.service'
import type { TPageSlugProp } from '@/types/page.types'

export const revalidate = 100

export async function generateMetadata(props: TPageSlugProp): Promise<Metadata> {
	const { slug } = await props.params
	const channel = await channelService.bySlug(slug)

	if (!channel) {
		return {}
	}

	return {
		title: channel?.user.name,
		description: channel?.description,
		openGraph: {
			type: 'profile',
			images: channel?.bannerUrl ? [channel.bannerUrl] : []
		}
	}
}

export async function generateStaticParams() {
	const { data } = await channelService.getAll()

	if (!data || data.length === 0) return []

	return data.map((channel: { slug: string }) => ({
		slug: channel.slug
	}))
}

export default async function ChannelPage(props: TPageSlugProp) {
	const { slug } = await props.params
	const channel = await channelService.bySlug(slug)

	if (!channel) {
		return NotFoundPage(false, 'Channel')
	}

	return (
		<section className='mb-10'>
			<ChannelSubPage channel={channel} />
			{!!channel.videos.length && <ChannelVideos videos={channel.videos} />}
		</section>
	)
}

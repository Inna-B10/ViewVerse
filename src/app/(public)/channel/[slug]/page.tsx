import type { Metadata } from 'next'
import { ChannelSubPage } from './ChannelSubPage'
import { ChannelVideos } from './ChannelVideos'
import { channelService } from '@/services/channel.service'
import type { TPageSlugProp } from '@/types/page.types'

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
			<ChannelSubPage channel={channel} />
			{!!channel.videos.length && <ChannelVideos videos={channel.videos} />}
		</section>
	)
}

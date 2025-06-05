import type { Metadata } from 'next'
import { stripHtml } from '@/utils/strip-html'
import { SingleVideo } from './SingleVideo'
import NotFoundPage from '@/app/not-found'
import { videoService } from '@/services/video.service'
import type { TPagePublicIdProp } from '@/types/page.types'

export const revalidate = 100

export async function generateMetadata(props: TPagePublicIdProp): Promise<Metadata> {
	const { publicId } = await props.params
	const video = await videoService.byPublicId(publicId)

	if (!video) {
		return {}
	}

	return {
		title: video.title,
		description: stripHtml(video.description).slice(0, 150),
		openGraph: {
			type: 'video.other',
			images: [video.thumbnailUrl]
		}
	}
}

export async function generateStaticParams() {
	const data = await videoService.filterVideos()

	if (!data || data.totalCount === 0) return []

	return data.videos
		.filter((video: { publicId: string }) => video.publicId && video.publicId.trim() !== '')
		.map((video: { publicId: string }) => ({
			publicId: video.publicId
		}))
}

export default async function VideoPage(props: TPagePublicIdProp) {
	const { publicId } = await props.params
	const video = await videoService.byPublicId(publicId)

	if (!video) {
		return NotFoundPage(false, 'Video')
	}

	return <SingleVideo video={video} />
}

import type { Metadata } from 'next'
import { stripHtml } from '@/utils/strip-html'
import { SingleVideo } from './SingleVideo'
import { videoService } from '@/services/video.service'
import type { TPagePublicIdProp } from '@/types/page.types'

export const revalidate = 100
export const dynamic = 'force-static'

export async function generateMetadata({
	params: { publicId }
}: TPagePublicIdProp): Promise<Metadata> {
	const data = await videoService.byPublicId(publicId)
	const video = data.data

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

	return data.videos.map(video => ({
		publicId: video.publicId
	}))
}

export default async function VideoPage({ params: { publicId } }: TPagePublicIdProp) {
	const data = await videoService.byPublicId(publicId)
	const video = data.data

	return <SingleVideo video={video} />
}

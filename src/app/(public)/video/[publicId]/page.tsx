import type { Metadata } from 'next'
import { Heading } from '@/ui/Heading'
import { VideoPlayer } from '@/ui/video-player/VideoPlayer'
import { stripHtml } from '@/utils/strip-html'
import { SimilarVideos } from './SimilarVideos'
import { VideoDescription } from './description/VideoDescription'
import { VideoActions } from './video-actions/VideoActions'
import { VideoChannel } from './video-channel/VideoChannel'
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

	return (
		<section className='grid grid-cols-[3fr_.8fr] gap-10'>
			<div>
				<VideoPlayer fileName={video.videoFileName} />

				<div className='flex justify-between items-start pb-6 mb-6 border-b border-border'>
					{/*  ------------------------------- Video Title ------------------------------  */}
					<div>
						<Heading
							classNameHeading='text-[1.4rem]'
							className='mb-2 text-white'
						>
							{video.title}
						</Heading>
						<div className='text-gray-400 text-xs text-nowrap'>
							{video.viewsCount.toLocaleString()} views
						</div>
					</div>

					{/*  --------------------------- Save / Like Buttons --------------------------  */}
					<VideoActions video={video} />
				</div>

				{/*  ----------------------------- Channel Details ----------------------------  */}
				<VideoChannel video={video} />
				{/* ---------------------------- Video Description --------------------------- */}
				<VideoDescription description={video.description} />
			</div>
			{/*//[TODO] comments */}

			{/*  ----------------------------- Similar Videos -----------------------------  */}
			{!!video.similarVideos.length && <SimilarVideos videos={video.similarVideos} />}
		</section>
	)
}

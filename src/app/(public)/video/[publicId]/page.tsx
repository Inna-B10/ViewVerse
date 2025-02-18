import parse from 'html-react-parser'
import { Heart, ListPlus } from 'lucide-react'
import type { Metadata } from 'next'
import dynamicNext from 'next/dynamic'
import Image from 'next/image'
import { Heading } from '@/ui/Heading'
import { SkeletonLoader } from '@/ui/SkeletonLoader'
import { VerifiedBadge } from '@/ui/video-card/VerifiedBadge'
import { transformCount } from '@/utils/transform-count'
import { SimilarVideos } from './SimilarVideos'
import { videoService } from '@/services/video.service'
import type { TPagePublicIdProp } from '@/types/page.types'

const DynamicSubscribeButton = dynamicNext(
	() => import('@/components/SubscribeButton').then(mod => mod.SubscribeButton),
	{
		//[FIXME]
		// ssr: false,
		loading: () => <SkeletonLoader className='w-36 h-10 rounded-md' />
	}
)

export const revalidate = 100
export const dynamic = 'force-static'

export async function generateMetadata({
	params: { publicId }
}: TPagePublicIdProp): Promise<Metadata> {
	const data = await videoService.byPublicId(publicId)
	const video = data.data

	return {
		title: video.title,
		description: parse(video.description.slice(0, 150)).toString(),
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
		<section className='grid grid-cols-[2.7fr_1fr] gap-10'>
			<div>
				<div className='relative w-full h-[249px] rounded-lg overflow-hidden shadow-md'>
					{/*//[TODO]Video player */}
				</div>

				<div className='flex justify-between items-start'>
					<div>
						<Heading>{video.title}</Heading>
						<div className='text-gray-400 text-xs text-nowrap'>
							{video.viewsCount.toLocaleString('en-UK')} views
						</div>
					</div>
					<div>
						<button
							className='text-primary'
							title='Save'
						>
							<ListPlus />
							Save
						</button>
						<button
							className='text-primary'
							title='Likes'
						>
							<Heart />
							{transformCount(video.likes.length)}
						</button>
					</div>
				</div>
				<div className='flex items-center justify-between'>
					<div className='flex gap-1.5 items-center'>
						<Image
							alt={video.channel.user.name || ''}
							src={video.channel.avatarUrl}
							width={40}
							height={40}
							priority
							className='rounded flex-shrink-0 shadow-md'
						/>
						<div>
							<Heading>
								{video.channel.user.name} {video.channel.isVerified && <VerifiedBadge size={16} />}
							</Heading>

							<div className='mb-2 text-gray-400 text-xs text-nowrap flex items-center gap-1'>
								{transformCount(video.channel.subscribers.length)} subscribers
							</div>
						</div>
					</div>
					<DynamicSubscribeButton slug={video.channel.slug} />
				</div>
				{/* //[TODO] collapse description */}
				<article className='mb-4 text-gray-400 text-sm leading-snug'>
					{parse(video.channel.description).toString()}
				</article>
			</div>
			{/*//[TODO] comments */}
			{!!video.similarVideos.length && <SimilarVideos videos={video.similarVideos} />}
		</section>
	)
}

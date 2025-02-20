import { Heart, ListPlus } from 'lucide-react'
import type { Metadata } from 'next'
import dynamicNext from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { Heading } from '@/ui/Heading'
import { SkeletonLoader } from '@/ui/SkeletonLoader'
import { VerifiedBadge } from '@/ui/video-card/VerifiedBadge'
import { PAGE } from '@/config/public-page.config'
import { stripHtml } from '@/utils/strip-html'
import { transformCount } from '@/utils/transform-count'
import { SimilarVideos } from './SimilarVideos'
import { VideoDescription } from './description/VideoDescription'
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
		<section className='grid grid-cols-[2.7fr_1fr] gap-10'>
			<div>
				<div className='relative w-full h-[249px] rounded-lg overflow-hidden shadow-md mb-6'>
					{/*//[TODO]Video player */}
				</div>

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
					<div className='flex justify-end items-center gap-5'>
						<button
							className='flex items-center gap-1 transition-opacity opacity-80 hover:opacity-100'
							title='Save'
						>
							<ListPlus size={20} />
							Save
						</button>
						<button
							className='text-primary text-lg flex items-center gap-1.5 transition-opacity opacity-80 hover:opacity-100'
							title='Likes'
						>
							<Heart size={19} />
							{transformCount(video.likes.length)}
						</button>
					</div>
				</div>

				{/*  ----------------------------- Channel Details ----------------------------  */}
				<div className='flex items-center justify-between my-4'>
					<div className='flex gap-4 items-end'>
						<Link
							href={PAGE.CHANNEL(video.channel.slug)}
							title={`${video.channel.user.name} channel`}
						>
							<Image
								alt={video.channel.user.name || ''}
								src={video.channel.avatarUrl}
								width={55}
								height={55}
								priority
								className='rounded flex-shrink-0 shadow-md'
							/>
						</Link>
						<div>
							<Link
								href={PAGE.CHANNEL(video.channel.slug)}
								title={`${video.channel.user.name} channel`}
							>
								<Heading
									hTag='h3'
									className='m-0 text-xl'
								>
									{video.channel.user.name}{' '}
									{video.channel.isVerified && (
										<sup>
											<VerifiedBadge size={12} />
										</sup>
									)}
								</Heading>
							</Link>

							<div className='text-gray-400 text-xs text-nowrap flex items-center gap-1'>
								{transformCount(video.channel.subscribers.length)} subscribers
							</div>
						</div>
					</div>
					{/*  ---------------------------- Button Subscribe ----------------------------  */}
					<DynamicSubscribeButton slug={video.channel.slug} />
				</div>
				{/* ---------------------------- Video Description --------------------------- */}
				<VideoDescription description={video.description} />
			</div>
			{/*//[TODO] comments */}

			{/*  ----------------------------- Similar Videos -----------------------------  */}
			{!!video.similarVideos.length && <SimilarVideos videos={video.similarVideos} />}
		</section>
	)
}

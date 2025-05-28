import * as m from 'framer-motion/m'
import { type LucideIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { PAGE } from '@/config/public-page.config'
import { transformCount } from '@/utils/transform-count'
import { transformDate } from '@/utils/transform-date'
import { VideoCardTitle } from './VideoCardTitle'
import { VideoChannelName } from './VideoChannelName'
import type { IVideo } from '@/types/video.types'

interface Props {
	video: IVideo
	Icon?: LucideIcon
	isImagePriority?: boolean
}

export function VideoCard({ video, Icon, isImagePriority }: Props) {
	//if channel name is too long
	let channelName = video?.channel?.user?.name || ''
	if (channelName.length >= 25) {
		channelName = channelName.slice(0, 22).concat('..')
	}

	return (
		<m.div
			className='mb-5 w-fit'
			whileHover={{ scale: 1.03, y: -5 }}
			transition={{ type: 'spring', stiffness: 500, damping: 30 }}
		>
			<div className='relative mb-1.5'>
				{/* ------------------------------- Video Img ------------------------------- */}
				<Link
					href={PAGE.VIDEO(video.publicId)}
					title={`Open video: ${video.title}`}
					aria-label={`Open video: ${video.title}`}
				>
					<Image
						src={video.thumbnailUrl || '/images/default-thumbnail.jpg'}
						width={250}
						height={140}
						quality={90}
						//? sizes='100vw, (min-width: 768px) 50vw, (min-width: 1024px) 33vw, (min-width:1440) 25vw'
						alt={`Thumbnail for video: ${video.title}`}
						className='rounded-md w-svw object-cover'
						priority={isImagePriority}
					/>
				</Link>

				{/* ------------------------------ Channel Img ------------------------------ */}
				<Link
					href={PAGE.CHANNEL(video.channel.slug)}
					title={`Open ${video.channel.slug} channel homepage`}
					aria-label={`Open ${video.channel.slug} channel homepage`}
					className='absolute left-1.5 bottom-2'
				>
					<Image
						src={video.channel.avatarUrl || '/images/default-avatar.png'}
						width={32}
						height={32}
						alt={`Thumbnail for channel: ${channelName}`}
						quality={90}
						className='rounded-full shadow-orange h-auto'
						priority={isImagePriority}
					/>
				</Link>
			</div>

			{/* ------------------------------ Views / Date ------------------------------ */}
			<div className='mb-1.5 flex items-center justify-between'>
				<div className='flex gap-1 items-end'>
					{Icon && (
						<Icon
							className='text-orange-400 h-auto'
							size={18}
						/>
					)}
					<span className='text-gray-400 text-xs whitespace-nowrap'>
						{transformCount(video.viewsCount)} views
					</span>
				</div>
				<div className='flex items-end'>
					<span className='text-gray-400 text-xs whitespace-nowrap'>
						{transformDate(video.createdAt)}
					</span>
				</div>
			</div>

			{/* ------------------------------- Video Title ------------------------------ */}
			<div className='mb-1'>
				<VideoCardTitle video={video} />
			</div>

			{/* ------------------------------ Channel Name ------------------------------ */}
			<div>
				<VideoChannelName channel={video.channel} />
			</div>
		</m.div>
	)
}

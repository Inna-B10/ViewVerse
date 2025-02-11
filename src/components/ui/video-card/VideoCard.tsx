import * as m from 'framer-motion/m'
import { type LucideIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { PAGE } from '@/config/public-page.config'
import { transformCount } from '@/utils/transform-count'
import { transformDate } from '@/utils/transform-date'
import { VerifiedBadge } from './VerifiedBadge'
import type { IVideo } from '@/types/video.types'

interface Props {
	video: IVideo
	Icon?: LucideIcon
}

export function VideoCard({ video, Icon }: Props) {
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
					title={video.title}
				>
					<Image
						src={video.thumbnailUrl}
						width={250}
						height={140}
						// sizes='100vw, (min-width: 768px) 50vw, (min-width: 1024px) 33vw, (min-width:1440) 25vw'
						alt={video.title}
						className='rounded-md w-dvw object-cover'
					/>
				</Link>

				{/* ------------------------------ Channel Img ------------------------------ */}
				<Link
					href={PAGE.CHANNEL(video.channel.slug)}
					title={video.channel.slug}
					className='absolute left-1.5 bottom-2'
				>
					<Image
						src={video.channel.avatarUrl}
						width={32}
						height={32}
						alt={channelName}
						className='rounded-full shadow-orange h-auto'
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
					<span className='text-gray-400 text-xs text-nowrap'>
						{transformCount(video.viewsCount)} views
					</span>
				</div>
				<div className='flex items-end'>
					<span className='text-gray-400 text-xs text-nowrap'>
						{transformDate(video.createdAt)}
					</span>
				</div>
			</div>

			{/* ------------------------------- Video Title ------------------------------ */}
			<div className='mb-1'>
				<Link
					href={PAGE.VIDEO(video.publicId)}
					className='line-clamp-2 leading-[1.3]'
				>
					{video.title}
				</Link>
			</div>

			{/* ------------------------------ Channel Name ------------------------------ */}
			<div>
				<Link
					href={PAGE.CHANNEL(video.channel.slug)}
					className='flex items-center gap-1'
				>
					<span className='text-gray-400 text-sm'>{channelName}</span>
					{video.channel.isVerified && <VerifiedBadge />}
				</Link>
			</div>
		</m.div>
	)
}

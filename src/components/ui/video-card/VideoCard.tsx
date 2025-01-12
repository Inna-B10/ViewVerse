import { BadgeCheck, type LucideIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { PAGE } from '@/config/public-page.config'
import { transformDate } from '@/utils/transform-date'
import { transformViews } from '@/utils/transform-views'
import type { IVideo } from '@/types/video.types'

interface Props {
	video: IVideo
	Icon?: LucideIcon
}

export function VideoCard({ video, Icon }: Props) {
	return (
		<div className='mb-5 w-fit'>
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
						sizes='100vw, (min-width: 768px) 33vw, (min-width: 1024px) 20vw'
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
						width={18}
						height={18}
						alt={video.channel.slug}
						className='rounded-full shadow-orange h-auto xl:w-[32px]'
					/>
				</Link>
			</div>

			{/* ------------------------------ Views / Date ------------------------------ */}
			<div className='mb-1.5 flex flex-col xl:flex-row xl:items-center xl:justify-between'>
				<div className='flex gap-0.5 items-end'>
					{Icon && (
						<Icon
							className='text-orange-400 h-auto lg:w-[18px]'
							size={14}
						/>
					)}
					<span className='text-gray-400 text-xs text-nowrap'>
						{transformViews(video.viewsCount)}
					</span>
				</div>
				<div className='flex items-end'>
					<span className='text-gray-400 text-xs text-nowrap  pl-[16px] xl:pl-0'>
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
					<span className='text-gray-400 text-sm'>{video.channel.slug}</span>
					<span>
						<BadgeCheck
							className='text-orange-400 h-auto lg:w-[12px]'
							size={10}
						/>
					</span>
				</Link>
			</div>
		</div>
	)
}

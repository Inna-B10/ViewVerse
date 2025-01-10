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
		<div>
			<div className='relative mb-1.5'>
				<Link
					href={PAGE.VIDEO(video.publicId)}
					title={video.title}
				>
					<Image
						src={video.thumbnailUrl}
						width={250}
						height={140}
						alt={video.title}
						className='rounded-md'
					/>
				</Link>
				<Link
					href={PAGE.CHANNEL(video.channel.slug)}
					title={video.channel.slug}
					className='absolute left-1.5 bottom-2'
				>
					<Image
						src={video.channel.avatarUrl}
						width={35}
						height={35}
						alt={video.channel.slug}
						className='rounded-full border border-orange-600'
					/>
				</Link>
			</div>
			<div className='mb-1.5 flex items-center justify-between'>
				<div className='flex items-center gap-1'>
					{Icon && <Icon />}
					<span>{transformViews(video.viewsCount)}</span>
				</div>
				<div>
					<span>{transformDate(video.createdAt)}</span>
				</div>
			</div>
			<div>
				<Link href={PAGE.VIDEO(video.publicId)}>{video.title}</Link>
			</div>
			<div>
				<Link href={PAGE.CHANNEL(video.channel.slug)}>
					<span>{video.channel.slug}</span>
					<span>
						<BadgeCheck className='text-green-500' />
					</span>
				</Link>
			</div>
		</div>
	)
}

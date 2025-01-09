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
			<div>
				<Link
					href={PAGE.VIDEO(video.slug)}
					title={video.title}
				>
					<Image
						src={video.thumbnailUrl}
						width={250}
						height={140}
						alt={video.title}
					/>
				</Link>
				<Link
					href={PAGE.CHANNEL(video.channel.slug)}
					title={video.channel.name}
				>
					<Image
						src={video.channel.avatarUrl}
						width={30}
						height={30}
						alt={video.channel.name}
					/>
				</Link>
			</div>
			<div>
				<div>
					{Icon && <Icon />}
					<span>{transformViews(video.viewsCount)}</span>
				</div>
				<div>
					<span>{transformDate(video.createdAt)}</span>
				</div>
			</div>
			<div>
				<Link href={PAGE.VIDEO(video.slug)}>{video.title}</Link>
			</div>
			<div>
				<Link href={PAGE.CHANNEL(video.channel.slug)}>
					<span>{video.channel.name}</span>
					<span>
						<BadgeCheck className='text-green-500' />
					</span>
				</Link>
			</div>
		</div>
	)
}

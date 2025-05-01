import * as m from 'framer-motion/m'
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
}

export function VideoCardHorizontal({ video }: Props) {
	return (
		<m.div
			className='mb-5 w-full p-5 rounded-md even:bg-bgSecondary'
			whileHover={{ scale: 1.03, y: -5 }}
			transition={{ type: 'spring', stiffness: 500, damping: 30 }}
		>
			<div className='mb-1.5 flex items-start gap-6'>
				{/* ------------------------------- Video Img ------------------------------- */}
				<Link
					href={PAGE.VIDEO(video.publicId)}
					title={video.title}
				>
					<Image
						src={video.thumbnailUrl}
						width={250}
						height={140}
						quality={90}
						//?sizes='100vw, (min-width: 768px) 50vw, (min-width: 1024px) 33vw, (min-width:1440) 25vw'
						alt={video.title}
						className='rounded-md object-cover'
					/>
				</Link>
				<div className='w-full'>
					{/* ------------------------------- Video Title ------------------------------ */}
					<div className='mb-1'>
						<VideoCardTitle video={video} />
					</div>

					{/* ------------------------------ Channel Name ------------------------------ */}
					<div>
						<VideoChannelName channel={video.channel} />
					</div>
					{/* ------------------------------ Views / Date ------------------------------ */}
					<div className='mb-1.5 flex items-center justify-between'>
						<span className='text-gray-400 text-xs whitespace-nowrap'>
							{transformCount(video.viewsCount)} views
						</span>

						<span className='text-gray-400 text-xs whitespace-nowrap'>
							{transformDate(video.createdAt)}
						</span>
					</div>
				</div>
			</div>
		</m.div>
	)
}

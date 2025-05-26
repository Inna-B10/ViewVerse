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
			className='rounded-md w-full mb-6'
			whileHover={{ scale: 1.01, y: -3 }}
			transition={{ type: 'spring', stiffness: 500, damping: 30 }}
		>
			<div className='flex items-stretch gap-6 '>
				{/* ------------------------------- Video Img ------------------------------- */}
				<Link
					href={PAGE.VIDEO(video.publicId)}
					title={video.title}
					aria-label={video.title}
					className='flex-shrink-0'
				>
					<Image
						src={video.thumbnailUrl || '/default-thumbnail.jpg'}
						width={250}
						height={141}
						quality={90}
						//?sizes='100vw, (min-width: 768px) 50vw, (min-width: 1024px) 33vw, (min-width:1440) 25vw'
						alt={video.title}
						className='rounded-md object-cover'
					/>
				</Link>
				<div className='flex flex-col justify-between'>
					<div>
						{/* ------------------------------- Video Title ------------------------------ */}
						<div className='mb-1 text-lg'>
							<VideoCardTitle video={video} />
						</div>

						{/* ------------------------------ Channel Name ------------------------------ */}
						<div>
							<VideoChannelName
								channel={video.channel}
								spanClassName='text-base mb-1'
							/>
						</div>
						<div>
							<span className='text-gray-400 text-sm whitespace-nowrap'>
								{transformCount(video.viewsCount)} views
							</span>
						</div>
					</div>

					{/* ---------------------------------- Views --------------------------------- */}
					<div className='flex items-center gap-2'>
						<span className='text-gray-400 text-sm whitespace-nowrap'>
							Last visited: {transformDate(video.updatedAt)}
						</span>
					</div>
				</div>
			</div>
		</m.div>
	)
}

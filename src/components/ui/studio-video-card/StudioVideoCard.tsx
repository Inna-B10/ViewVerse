import cn from 'clsx'
import dayjs from 'dayjs'
import parse from 'html-react-parser'
import Image from 'next/image'
import Link from 'next/link'
import { PAGE } from '@/config/public-page.config'
import { STUDIO_PAGE } from '@/config/studio-page.config'
import { processHtmlContent } from '@/utils/process-html-content'
import { StudioActions } from './StudioActions'
import type { IFullVideo } from '@/types/video.types'
import styles from '@/app/(public)/video/[publicId]/description/VideoDescription.module.scss'

interface Props {
	video: IFullVideo
}

export function StudioVideoCard({ video }: Props) {
	const { initialContent } = processHtmlContent(video.description, 1)

	return (
		<div className='grid grid-cols-[.49fr_1.1fr_0.3fr_0.3fr_0.3fr_0.2fr_0.5fr] gap-6 mb-6 border-b border-b-border pb-6 last:border-none'>
			<Link
				href={PAGE.VIDEO(video.publicId)}
				target='_blank'
				className='flex-shrink-0'
				title={`View video: ${video.title} `}
			>
				<Image
					src={video.thumbnailUrl || '/default-thumbnail.jpg'}
					width={206}
					height={116}
					alt={video.title}
					className='rounded-md'
				/>
			</Link>

			<div>
				<Link
					href={STUDIO_PAGE.EDIT_VIDEO(video.id)}
					className='line-clamp-1 text-xl mb-1'
					title='Open the video for editing'
				>
					{video.title}
				</Link>

				<div className={cn('opacity-70 text-sm', styles.article)}>{parse(initialContent)}</div>
			</div>

			<div>
				<div className='text-gray-400'>{dayjs(video.createdAt).format('DD MMM YYYY')}</div>
				<div className='text-gray-600 text-sm'>Published</div>
			</div>

			<div>
				<div className='text-gray-400'>{video.viewsCount.toLocaleString('no-NO')} views</div>
			</div>

			<div>
				<div className='text-gray-400'>
					{video.comments.length.toLocaleString('no-NO')} comments
				</div>
			</div>

			<div>
				<div className='text-gray-400'>{video.likes.length.toLocaleString('no-NO')} likes</div>
			</div>

			<StudioActions video={video} />
		</div>
	)
}

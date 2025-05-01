import Link from 'next/link'
import { PAGE } from '@/config/public-page.config'
import type { IVideo } from '@/types/video.types'

interface IVideoCardTitle {
	video: Pick<IVideo, 'publicId' | 'title'>
}

export function VideoCardTitle({ video }: IVideoCardTitle) {
	return (
		<Link
			href={PAGE.VIDEO(video.publicId)}
			className='line-clamp-2 leading-[1.3]'
		>
			{video.title}
		</Link>
	)
}

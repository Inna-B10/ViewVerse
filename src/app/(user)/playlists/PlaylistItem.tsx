import * as m from 'framer-motion/m'
import Image from 'next/image'
import Link from 'next/link'
import { PAGE } from '@/config/public-page.config'
import type { IPlaylist } from '@/types/playlist.types'

interface Props {
	playlist: IPlaylist
}

export function PlaylistItem({ playlist }: Props) {
	return (
		<m.div
			className='w-3/4 mb-8 rounded-md'
			whileHover={{ scale: 1.01, y: -3 }}
			transition={{ type: 'spring', stiffness: 500, damping: 30 }}
		>
			<div>
				{/* ------------------------------- Playlist Img ------------------------------- */}
				<Link
					href={PAGE.PLAYLISTS(playlist.id)}
					title={playlist.title}
					className='flex-shrink-0 rounded-md relative'
				>
					<Image
						src={playlist.videos[0].thumbnailUrl} //[TODO] add default image
						width={250}
						height={140}
						quality={90}
						//?sizes='100vw, (min-width: 768px) 50vw, (min-width: 1024px) 33vw, (min-width:1440) 25vw'
						alt={playlist.title}
						className='object-cover'
					/>
					<div className='absolute bottom-1 right-1 p-0.5 text-xs'>
						{playlist.videos.length} videos
					</div>
				</Link>
				{/* ------------------------------- Playlist Title ------------------------------ */}
				<div className='mb-1 text-lg'>
					<Link
						href={PAGE.PLAYLISTS(playlist.id)}
						className='line-clamp-2 leading-[1.3]'
						title={playlist.title}
					>
						{playlist.title}
					</Link>
				</div>
			</div>
		</m.div>
	)
}

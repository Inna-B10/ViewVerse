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
			className='mb-5 w-fit'
			whileHover='hover'
			initial='rest'
			animate='rest'
		>
			<div>
				<Link
					href={PAGE.PLAYLISTS(playlist.id)}
					title={playlist.title}
					className='relative block group'
				>
					{/* ------------------------------ Dark Overlay ------------------------------ */}
					<m.div
						variants={{
							rest: { opacity: 0 },
							hover: { opacity: 0.6 }
						}}
						transition={{ duration: 0.3 }}
						className='absolute inset-0 bg-black rounded-md z-10 pointer-events-none'
					/>

					{/* ------------------------------- Back Cards ------------------------------- */}
					<div
						className='rounded-lg shadow-lg absolute h-full left-3 right-3 -top-[7px] bg-gray-500/50'
						style={{ width: 'calc(100% - 24px)' }}
					/>
					<div
						className='rounded-md shadow-lg absolute h-full left-2 right-2 -top-[3px] bg-gray-500'
						style={{
							marginTop: '-1px',
							borderTop: '2px solid #191B28',
							width: 'calc(100% - 16px)'
						}}
					/>

					{/* ------------------------------- Main Image ------------------------------- */}
					<Image
						src={playlist.videos[0].thumbnailUrl}
						width={250}
						height={140}
						quality={100}
						alt={playlist.title}
						className='rounded-md shadow-lg object-cover w-dvw relative z-0'
						style={{ borderTop: '2px solid #191B28' }}
					/>

					{/* ------------------------------- Count Badge ------------------------------ */}
					<div className='absolute bottom-1 right-1 py-[1px] text-xs font-medium bg-amber-700/90 rounded text-white px-1 text-nowrap z-20'>
						{playlist.videos.length} videos
					</div>
				</Link>

				{/* ---------------------------------- Title --------------------------------- */}
				<div className='mt-2 pl-2 font-medium'>
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

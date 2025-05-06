import { useMutation } from '@tanstack/react-query'
import { AnimatePresence } from 'framer-motion'
import * as m from 'framer-motion/m'
import { Check, ListPlus } from 'lucide-react'
import toast from 'react-hot-toast'
import { useOutside } from '@/hooks/useOutside'
import { useUserPlaylists } from '@/hooks/useUserPlaylists'
import { CreatePlaylist } from '@/app/(user)/playlists/CreatePlaylist'
import { playlistService } from '@/services/playlist.service'
import type { ISingleVideoResponse } from '@/types/video.types'

interface ISaveToPlaylist {
	video: ISingleVideoResponse
}

export function SaveToPlaylist({ video }: ISaveToPlaylist) {
	const { data, refetch: refetchPlaylists } = useUserPlaylists()
	const { isShow: isShowLists, ref: refLists, setIsShow: setIsShowLists } = useOutside(false)
	const { isShow: isShowNewList, ref: refNewList, setIsShow: setIsShowNewList } = useOutside(false)

	const isInPlaylist = data?.some(playlist => playlist.videos.some(v => v.id === video.id))

	const { mutate: togglePlaylist, isPending } = useMutation({
		mutationKey: ['toggle video in playlist'],
		mutationFn: (playlistId: string) => playlistService.toggleVideoInPlaylist(playlistId, video.id),
		onSuccess: () => {
			if (isInPlaylist) {
				toast.success('Video removed from playlist!', { id: 'playlist' })
			} else {
				toast.success('Video added to playlist!', { id: 'playlist' })
			}
			// setIsShow(false)
			refetchPlaylists()
		}
	})
	const createNewList = () => {
		setIsShowLists(false)
		setIsShowNewList(true)
	}

	return (
		<div
			className='relative z-10'
			ref={refLists}
		>
			<button
				onClick={() => setIsShowLists(!isShowLists)}
				className='flex items-center gap-1 transition-opacity opacity-80 hover:opacity-100'
				title='Save'
			>
				<ListPlus size={20} />
				Save
			</button>
			<AnimatePresence>
				{isShowLists && (
					<m.ul
						className='bg-bg py-2 px-3 rounded absolute bottom-8 right-0 shadow w-max max-w-60'
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 10 }}
						transition={{ duration: 0.3 }}
					>
						{data?.map(playlist => (
							<li
								key={playlist.id}
								className='mb-1 text-sm leading-[1.5]'
							>
								<button
									onClick={() => {
										togglePlaylist(playlist.id)
									}}
									className='transition-colors hover:text-primary flex justify-center items-end gap-2'
									disabled={isPending}
								>
									{playlist.videos.some(v => v.id === video.id) ? (
										<Check size={16} />
									) : (
										<div className='w-4' />
									)}{' '}
									{playlist.title}
								</button>
							</li>
						))}
						<li>
							<button
								onClick={createNewList}
								className='text-nowrap'
							>
								+ create new list
							</button>
						</li>
					</m.ul>
				)}
			</AnimatePresence>
			{isShowNewList && (
				<CreatePlaylist
					refetch={refetchPlaylists}
					onClose={() => setIsShowNewList(false)}
					videoPublicId={video.publicId}
					ref={refNewList}
				/>
			)}
		</div>
	)
}

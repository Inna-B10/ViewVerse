import { useMutation } from '@tanstack/react-query'
import cn from 'clsx'
import { AnimatePresence } from 'framer-motion'
import * as m from 'framer-motion/m'
import { CheckSquare, PlusSquare, Square } from 'lucide-react'
import { playlistService } from '@/services/playlist.service'
import type { IPlaylist } from '@/types/playlist.types'

interface Props {
	data: IPlaylist[] | undefined
	createNewList: () => void
	videoId: string
	refetchPlaylistsList: () => void
	refetchSinglePlaylist: (() => void) | undefined
}

export function PlaylistsModal({
	data,
	createNewList,
	videoId,
	refetchPlaylistsList,
	refetchSinglePlaylist
}: Props) {
	const { mutate: togglePlaylist, isPending } = useMutation({
		mutationKey: ['toggle video in playlist'],
		mutationFn: (playlistId: string) => playlistService.toggleVideoInPlaylist(playlistId, videoId),
		onSuccess: async (_, playlistId) => {
			const { toast } = await import('react-hot-toast')
			const playlist = data?.find(p => p.id === playlistId)
			const wasInPlaylist = data?.find(p => p.id === playlistId)?.videos.some(v => v.id === videoId)
			if (wasInPlaylist) {
				toast.success(`Video removed from "${playlist?.title}"`, { id: 'playlist' })
			} else {
				toast.success(`Video added to "${playlist?.title}"`, { id: 'playlist' })
			}

			refetchPlaylistsList()
			refetchSinglePlaylist?.()
		}
	})
	return (
		<AnimatePresence>
			<m.ul
				className={cn(
					' py-2 px-3 rounded absolute bottom-[140%] right-0 shadow w-max max-w-80',
					data ? 'bg-field' : 'bg-bg'
				)}
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: 10 }}
				transition={{ duration: 0.3 }}
			>
				{data?.map(playlist => {
					const isInThisPlaylist = playlist.videos.some(v => v.id === videoId)
					return (
						<li
							key={playlist.id}
							className='mb-1 text-sm leading-[1.5]'
						>
							{/* ------------------------------ Toggle Video ------------------------------ */}
							<button
								onClick={() => {
									togglePlaylist(playlist.id)
								}}
								className='transition-colors hover:text-primary flex justify-center items-end gap-2'
								disabled={isPending}
								title={
									isInThisPlaylist
										? 'Remove video from this playlist'
										: 'Add video to this playlist'
								}
								aria-label={
									isInThisPlaylist
										? 'Remove video from this playlist'
										: 'Add video to this playlist'
								}
							>
								<div className='flex items-center gap-2'>
									{isInThisPlaylist ? <CheckSquare size={16} /> : <Square size={16} />}
									{playlist.title}
								</div>
							</button>
						</li>
					)
				})}
				{/* ----------------------------- Create New List ---------------------------- */}
				<li>
					<button
						onClick={createNewList}
						title='Create a new playlist'
						aria-label='Create a new playlist'
						className='text-nowrap flex items-center gap-2 transition-colors hover:text-primary'
					>
						<PlusSquare size={16} /> create new list
					</button>
				</li>
			</m.ul>
		</AnimatePresence>
	)
}

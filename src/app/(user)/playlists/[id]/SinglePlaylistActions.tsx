import { useMutation } from '@tanstack/react-query'
import * as m from 'framer-motion/m'
import { PenBox, Trash2, X } from 'lucide-react'
import toast from 'react-hot-toast'
import { Button } from '@/ui/button/Button'
import { useOutside } from '@/hooks/useOutside'
import { useUserPlaylists } from '@/hooks/useUserPlaylists'
import { playlistService } from '@/services/playlist.service'
import type { IPlaylist } from '@/types/playlist.types'

interface ISaveToPlaylist {
	playlist: IPlaylist
}

export function SinglePlaylistActions({ playlist }: ISaveToPlaylist) {
	const { data, refetch: refetchPlaylistsList } = useUserPlaylists()
	// const { isShow: isShowMenu, ref: refMenu, setIsShow: setIsShowMenu } = useOutside(false)
	const { isShow: isShowRename, ref: refRename, setIsShow: setIsShowRename } = useOutside(false)
	const { isShow: isShowDelete, ref: refDelete, setIsShow: setIsShowDelete } = useOutside(false)

	const isInPlaylist = data?.some(playlist => playlist.videos.some(v => v.id === m.video.id))

	const { mutate: togglePlaylist, isPending } = useMutation({
		mutationKey: ['toggle video in playlist'],
		mutationFn: (playlistId: string) =>
			playlistService.toggleVideoInPlaylist(playlistId, m.video.id),
		onSuccess: () => {
			if (isInPlaylist) {
				toast.success('Video removed from playlist!', { id: 'playlist' })
			} else {
				toast.success('Video added to playlist!', { id: 'playlist' })
			}
			// setIsShow(false)
			refetchPlaylistsList()
		}
	})
	// const renameMenu = () => {
	// 	setIsShowMenu(false)
	// 	setIsShowDelete(false)
	// 	setIsShowRename(true)
	// }
	// const deleteMenu = () => {
	// 	setIsShowMenu(false)
	// 	setIsShowRename(false)
	// 	setIsShowDelete(true)
	// }
	const deletePlaylist = () => {}

	return (
		<div
			className='relative z-30'
			// ref={refMenu}
		>
			<div className='flex items-center gap-3'>
				<button
					title='Rename playlist'
					onClick={() => setIsShowRename(!isShowRename)}
					className='opacity-70 hover:opacity-100 hover:text-primary transition-all duration-300'
				>
					<PenBox size={24} />
				</button>
				<button
					title='Delete playlist'
					onClick={() => setIsShowDelete(!isShowDelete)}
					className='opacity-70 hover:opacity-100 hover:text-primary transition-all duration-300'
				>
					<Trash2 size={24} />
				</button>
			</div>
			{isShowDelete && (
				<div
					className='fixed inset-0 flex items-center justify-center bg-black/70 z-10'
					ref={refDelete}
				>
					<m.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.9 }}
						transition={{ duration: 0.3 }}
						className='w-[80%] max-w-[30rem] relative'
					>
						<div className='bg-bgSecondary relative flex flex-col items-center justify-center gap-4 rounded-lg p-4'>
							<button
								title='Close the form'
								onClick={() => setIsShowDelete(false)}
								className='absolute top-2 right-4 text-gray-500 hover:text-white transition-colors'
							>
								<X size={18} /> {/* Close icon */}
							</button>
							<p className='text-nowrap font-semibold mt-3'>
								Are you sure you want to delete this playlist?
							</p>
							<p className='text-nowrap text-sm mb-3'>
								If it contains any videos, they will also be deleted.
							</p>
							<Button onClick={() => setIsShowDelete(false)}>delete</Button>
						</div>
					</m.div>
				</div>
			)}

			{isShowRename && (
				// <CreatePlaylist
				// 	refetch={refetchPlaylists}
				// 	onClose={() => setIsShowRename(false)}
				// 	videoPublicId={m.video.publicId}
				// 	ref={refRename}
				// />
				<div
					ref={refRename}
					className='bg-gray-700 py-2 px-3 rounded absolute bottom-10 right-0 shadow w-max w-max-32'
				>
					<button onClick={() => setIsShowRename(false)}>rename</button>
				</div>
			)}
		</div>
	)
}

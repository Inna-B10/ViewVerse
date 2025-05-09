import { useMutation } from '@tanstack/react-query'
import * as m from 'framer-motion/m'
import { PenBox, Trash2, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { useHotkeys } from 'react-hotkeys-hook'
import { Button } from '@/ui/button/Button'
import { PAGE } from '@/config/public-page.config'
import { useOutside } from '@/hooks/useOutside'
import { playlistService } from '@/services/playlist.service'
import type { IPlaylist } from '@/types/playlist.types'

interface Props {
	playlist: IPlaylist
	setIsEditing: (v: boolean) => void
	isEditing: boolean
}

export function SinglePlaylistActions({ playlist, setIsEditing, isEditing }: Props) {
	const { isShow: isShowDelete, ref: refDelete, setIsShow: setIsShowDelete } = useOutside(false)
	const router = useRouter()

	useHotkeys('esc', event => {
		event.preventDefault()
		setIsShowDelete(false)
	})

	/* ----------------------------- Delete Playlist ---------------------------- */
	const { mutate: deletePlaylist } = useMutation({
		mutationKey: ['delete playlist'],
		mutationFn: (playlistId: string) => playlistService.deletePlaylist(playlistId),
		onSuccess: () => {
			setIsShowDelete(false)
			router.push(PAGE.PLAYLISTS())
			toast.success('Playlist successfully deleted!')
		},
		onError() {
			toast.error('Could not delete playlist!')
		}
	})

	return (
		<div className='relative z-30'>
			<div className='flex items-center gap-3'>
				{!isEditing && (
					<button
						title='Rename playlist'
						onClick={() => setIsEditing(!isEditing)}
						className='opacity-70 hover:opacity-100 hover:text-primary transition-all duration-300'
					>
						<PenBox size={24} />
					</button>
				)}
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
						<div className='bg-bgSecondary relative flex flex-col items-center justify-center gap-4 rounded-lg p-4 pb-7 '>
							<button
								title='Close the form'
								onClick={() => setIsShowDelete(false)}
								className='absolute top-2 right-2 text-gray-500 hover:text-white transition-colors'
							>
								<X size={18} /> {/* Close icon */}
							</button>
							<p className='text-nowrap font-semibold text-lg mt-3'>
								Are you sure you want to delete this playlist?
							</p>
							<p className='text-nowrap text-sm mb-3'>
								If it contains any videos, they will also be deleted.
							</p>
							<Button onClick={() => deletePlaylist(playlist.id)}>Delete</Button>
						</div>
					</m.div>
				</div>
			)}
		</div>
	)
}

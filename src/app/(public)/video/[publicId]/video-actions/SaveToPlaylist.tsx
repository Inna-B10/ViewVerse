import { useMutation } from '@tanstack/react-query'
import cn from 'clsx'
import { AnimatePresence } from 'framer-motion'
import * as m from 'framer-motion/m'
import { Bookmark, CheckSquare, ListPlus, PlusSquare, Square } from 'lucide-react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { PAGE } from '@/config/public-page.config'
import { useOutside } from '@/hooks/useOutside'
import { useUserPlaylists } from '@/hooks/useUserPlaylists'
import { CreatePlaylist } from '@/app/user/playlists/CreatePlaylist'
import { playlistService } from '@/services/playlist.service'
import type { ISingleVideoResponse } from '@/types/video.types'

interface ISaveToPlaylist {
	video: ISingleVideoResponse
	refetchSinglePlaylist?: () => void
}

export function SaveToPlaylist({ video, refetchSinglePlaylist }: ISaveToPlaylist) {
	const { data, refetch: refetchPlaylistsList } = useUserPlaylists()
	const router = useRouter()
	const { isShow: isShowLists, ref: refLists, setIsShow: setIsShowLists } = useOutside(false)
	const { isShow: isShowNewList, ref: refNewList, setIsShow: setIsShowNewList } = useOutside(false)

	const { mutate: togglePlaylist, isPending } = useMutation({
		mutationKey: ['toggle video in playlist'],
		mutationFn: (playlistId: string) => playlistService.toggleVideoInPlaylist(playlistId, video.id),
		onSuccess: (_, playlistId) => {
			const playlist = data?.find(p => p.id === playlistId)
			const wasInPlaylist = data
				?.find(p => p.id === playlistId)
				?.videos.some(v => v.id === video.id)
			if (wasInPlaylist) {
				toast.success(`Video removed from "${playlist?.title}"`, { id: 'playlist' })
			} else {
				toast.success(`Video added to "${playlist?.title}"`, { id: 'playlist' })
			}
			// setIsShow(false)
			refetchPlaylistsList()
			refetchSinglePlaylist?.()
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
				onClick={() => (data ? setIsShowLists(!isShowLists) : router.push(PAGE.AUTH))}
				className='flex items-center gap-1 transition-all duration-200 opacity-80 hover:opacity-100 hover:text-primary'
				title={refetchSinglePlaylist ? 'Toggle or remove from playlist' : 'Add to playlist'}
			>
				{refetchSinglePlaylist ? (
					<Bookmark size={24} />
				) : (
					<>
						<ListPlus size={20} /> Playlists
					</>
				)}
			</button>
			<AnimatePresence>
				{isShowLists && (
					<m.ul
						className={cn(
							' py-2 px-3 rounded absolute bottom-[140%] right-0 shadow w-max max-w-80',
							refetchSinglePlaylist ? 'bg-field' : 'bg-bg'
						)}
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 10 }}
						transition={{ duration: 0.3 }}
					>
						{data?.map(playlist => {
							const isInThisPlaylist = playlist.videos.some(v => v.id === video.id)
							return (
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
										<div className='flex items-center gap-2'>
											{isInThisPlaylist ? <CheckSquare size={16} /> : <Square size={16} />}
											{playlist.title}
										</div>
									</button>
								</li>
							)
						})}
						<li>
							<button
								onClick={createNewList}
								className='text-nowrap flex items-center gap-2 transition-colors hover:text-primary'
							>
								<PlusSquare size={16} /> create new list
							</button>
						</li>
					</m.ul>
				)}
			</AnimatePresence>
			{isShowNewList && (
				<CreatePlaylist
					refetch={refetchPlaylistsList}
					onClose={() => setIsShowNewList(false)}
					videoPublicId={video.publicId}
					ref={refNewList}
				/>
			)}
		</div>
	)
}

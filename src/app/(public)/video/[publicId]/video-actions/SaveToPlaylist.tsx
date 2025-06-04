import { Bookmark, ListPlus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { PAGE } from '@/config/public-page.config'
import { useOutside } from '@/hooks/useOutside'
import { useUserPlaylists } from '@/hooks/useUserPlaylists'
import { PlaylistsModal } from './PlaylistsModal'
import { CreatePlaylist } from '@/app/user/playlists/CreatePlaylist'
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
				aria-label={refetchSinglePlaylist ? 'Toggle or remove from playlist' : 'Add to playlist'}
			>
				{refetchSinglePlaylist ? (
					<Bookmark size={24} />
				) : (
					<>
						<ListPlus size={20} /> Playlists
					</>
				)}
			</button>
			{isShowLists && (
				<PlaylistsModal
					data={data}
					createNewList={createNewList}
					videoId={video.id}
					refetchPlaylistsList={refetchPlaylistsList}
					refetchSinglePlaylist={refetchSinglePlaylist}
				/>
			)}
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

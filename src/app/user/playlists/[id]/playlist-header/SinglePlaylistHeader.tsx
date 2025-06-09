import { type ReactElement, useEffect, useState } from 'react'
import { DeleteConfirmModal } from './DeleteConfirmModal'
import { PlaylistHeaderActions } from './PlaylistHeaderActions'
import { usePlaylistAction } from './use-playlist-header/usePlaylistAction'
import type { IPlaylist } from '@/types/playlist.types'

interface Props {
	playlist: IPlaylist
	Icon: ReactElement
	refetch: () => void
}

export function SinglePlaylistHeader({ playlist, Icon, refetch }: Props) {
	const [isChanged, setIsChanged] = useState(false)
	const {
		title,
		setTitle,
		isEditing,
		setIsEditing,
		isShowDelete,
		setIsShowDelete,
		inputRef,
		refTitleInput,
		refDelete,
		handleChangeTitle,
		deletePlaylist
	} = usePlaylistAction(playlist, refetch)

	/* ------------------------- Check If Title Changed ------------------------- */
	useEffect(() => {
		setIsChanged(title.trim() !== playlist.title.trim())
	}, [title, playlist.title])

	return (
		<div className='flex justify-between items-center gap-2.5 mb-14 relative'>
			<div className='w-full flex items-center gap-2.5 text-primary font-philosopher text-3xl font-bold'>
				{Icon}
				{isEditing ? (
					<input
						ref={el => {
							inputRef.current = el
							refTitleInput.current = el
						}}
						value={title}
						onChange={e => setTitle(e.target.value)}
						onKeyDown={e => e.key === 'Enter' && inputRef?.current?.blur()}
						onBlur={e => handleChangeTitle(e.target.value)}
						className='w-[94%] text-white py-1 rounded bg-transparent outline-none border border-transparent focus:border-border focus:bg-field'
					/>
				) : (
					<h2 className='rounded border border-transparent py-1'>{title}</h2>
				)}
			</div>

			{/* ----------------------------- Action Buttons ----------------------------- */}

			<PlaylistHeaderActions
				isEditing={isEditing}
				setIsEditing={setIsEditing}
				setIsShowDelete={setIsShowDelete}
			/>

			{/* ------------------------ Delete Confirmation Modal ----------------------- */}
			{isShowDelete && (
				<DeleteConfirmModal
					refDelete={refDelete}
					setIsShowDelete={setIsShowDelete}
					deletePlaylist={deletePlaylist}
				/>
			)}
		</div>
	)
}

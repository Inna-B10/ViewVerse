import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { PAGE } from '@/config/public-page.config'
import { useOutside } from '@/hooks/useOutside'
import { playlistService } from '@/services/playlist.service'
import type { IPlaylist } from '@/types/playlist.types'

export function usePlaylistAction(playlist: IPlaylist, refetch: () => void) {
	const [title, setTitle] = useState(playlist.title)
	const [isEditing, setIsEditing] = useState(false)
	const [isShowDelete, setIsShowDelete] = useState(false)

	const inputRef = useRef<HTMLInputElement>(null)
	const router = useRouter()
	const { ref: refTitleInput, setIsShow: setIsEditingOutside } = useOutside(false)
	const { ref: refDelete } = useOutside(false, () => setIsShowDelete(false))

	// --------------------------------- autofocus when editing starts
	useEffect(() => {
		if (isEditing && inputRef.current) {
			inputRef.current.focus()
			inputRef.current.select()
		}
	}, [isEditing])

	// --------------------------------- external isEditing synchronization
	useEffect(() => {
		setIsEditingOutside(isEditing)
	}, [isEditing, setIsEditingOutside])

	// --------------------------------- Esc hotkey processing
	useHotkeys(
		'esc',
		e => {
			if (isEditing) {
				e.preventDefault()
				setIsEditing(false)
				setTitle(playlist.title)
			}
			setIsShowDelete(false)
		},
		{ enableOnFormTags: true },
		[isEditing, playlist.title]
	)

	/* --------------------------------- Rename --------------------------------- */
	const { mutate: updateTitle } = useMutation({
		mutationKey: ['update playlist title'],
		mutationFn: () => playlistService.renamePlaylist(playlist.id, title),
		onSuccess: async () => {
			setTimeout(() => {
				setIsEditing(false)
				refetch()
			}, 1000)
			const { toast } = await import('react-hot-toast')
			toast.success('Playlist renamed successfully!')
		}
	})

	const handleChangeTitle = async (text: string) => {
		const trimmed = text.trim()
		if (trimmed === '') {
			const { toast } = await import('react-hot-toast')
			toast.error('Title cannot be empty!')
			setTitle(playlist.title)
			setIsEditing(false)
			return
		}
		if (trimmed !== playlist.title.trim()) {
			setTitle(trimmed)
			updateTitle()
		} else {
			setTitle(trimmed)
			setIsEditing(false)
		}
	}

	/* --------------------------------- Delete --------------------------------- */
	const { mutate: deletePlaylist } = useMutation({
		mutationKey: ['delete playlist'],
		mutationFn: () => playlistService.deletePlaylist(playlist.id),
		onSuccess: async () => {
			setIsShowDelete(false)
			const { toast } = await import('react-hot-toast')
			toast.success('Playlist successfully deleted!')
			router.push(PAGE.PLAYLISTS())
		},
		onError: async () => {
			const { toast } = await import('react-hot-toast')
			toast.error('Could not delete playlist!')
		}
	})

	return {
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
	}
}

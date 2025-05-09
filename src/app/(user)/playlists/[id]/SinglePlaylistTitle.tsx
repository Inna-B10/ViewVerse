'use client'

import { useMutation } from '@tanstack/react-query'
import { type ReactElement, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useHotkeys } from 'react-hotkeys-hook'
import { useOutside } from '@/hooks/useOutside'
import { SinglePlaylistActions } from './SinglePlaylistActions'
import { playlistService } from '@/services/playlist.service'
import type { IPlaylist } from '@/types/playlist.types'

interface Props {
	playlist: IPlaylist
	Icon: ReactElement
	refetch: () => void
}

export function SinglePlaylistTitle({ playlist, Icon, refetch }: Props) {
	const { ref: refTitleInput, setIsShow: setIsEditingOutside } = useOutside(false)
	const [title, setTitle] = useState(playlist.title)
	const [isEditing, setIsEditing] = useState(false)
	const [isChanged, setIsChanged] = useState(false)
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		setIsChanged(title.trim() !== playlist.title.trim())
	}, [title, playlist.title])

	useEffect(() => {
		if (isEditing && inputRef.current) {
			inputRef.current.focus()
			inputRef.current.select()
		}
	}, [isEditing])

	useEffect(() => {
		setIsEditingOutside(isEditing)
	}, [isEditing, setIsEditingOutside])

	useHotkeys(
		'esc',
		e => {
			if (isEditing) {
				e.preventDefault()
				setIsEditing(false)
				setTitle(playlist.title) // reset to original
			}
		},
		{
			enableOnFormTags: true // necessarily if uses inside form!
		},
		[isEditing, playlist.title]
	)

	/* ----------------------------- Rename Playlist ---------------------------- */
	const { mutate: updateTitle } = useMutation({
		mutationKey: ['update playlist title'],
		mutationFn: () => playlistService.renamePlaylist(playlist.id, title),
		onSuccess: () => {
			setTimeout(() => {
				refetch()
				setIsEditing(false)
			}, 1000)
			toast.success('Playlist renamed successfully!')
		}
	})

	const handleChangeTitle = (text: string) => {
		const trimmed = text.trim()

		if (trimmed === '') {
			toast.error('Title cannot be empty!')
			setTitle(playlist.title) // reset to original
			setIsEditing(false)
			return
		}

		if (trimmed !== playlist.title.trim()) {
			setTitle(trimmed)
			updateTitle()
		} else {
			setTitle(trimmed)
			setIsEditing(false) // exit the editing mode
		}
	}

	return (
		<div className='flex justify-between items-center gap-2.5 mb-14'>
			<div className='w-full flex items-center gap-2.5 text-primary font-philosopher text-3xl font-bold'>
				{Icon}
				{isEditing ? (
					<input
						ref={el => {
							inputRef.current = el
							refTitleInput.current = el // outside-hook
						}}
						value={title}
						onChange={e => setTitle(e.target.value)}
						onKeyDown={e => e.key === 'Enter' && inputRef?.current?.blur()}
						onBlur={e => handleChangeTitle(e.target.value)}
						className='w-full text-white mr-8 py-1 rounded bg-transparent outline-none border border-transparent focus:border-border  focus:bg-field'
					/>
				) : (
					<h2 className='rounded border border-transparent py-1'>{title}</h2>
				)}
			</div>
			<SinglePlaylistActions
				playlist={playlist}
				setIsEditing={setIsEditing}
				isEditing={isEditing}
			/>
		</div>
	)
}

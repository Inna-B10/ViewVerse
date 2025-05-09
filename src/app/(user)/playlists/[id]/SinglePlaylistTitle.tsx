'use client'

import { useMutation } from '@tanstack/react-query'
import * as m from 'framer-motion/m'
import { PenBox, Trash2, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { type ReactElement, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useHotkeys } from 'react-hotkeys-hook'
import { Button } from '@/ui/button/Button'
import { PAGE } from '@/config/public-page.config'
import { useOutside } from '@/hooks/useOutside'
import { playlistService } from '@/services/playlist.service'
import type { IPlaylist } from '@/types/playlist.types'

interface Props {
	playlist: IPlaylist
	Icon: ReactElement
	refetch: () => void
}

export function SinglePlaylistTitle({ playlist, Icon, refetch }: Props) {
	const { ref: refTitleInput, setIsShow: setIsEditingOutside } = useOutside(false)
	const { ref: refDelete } = useOutside(false, () => setIsShowDelete(false))

	const [title, setTitle] = useState(playlist.title)
	const [isEditing, setIsEditing] = useState(false)
	const [isChanged, setIsChanged] = useState(false)
	const inputRef = useRef<HTMLInputElement>(null)

	const [isShowDelete, setIsShowDelete] = useState(false)
	const router = useRouter()

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
	useEffect(() => {
		setIsChanged(title.trim() !== playlist.title.trim())
	}, [title, playlist.title])

	const { mutate: updateTitle } = useMutation({
		mutationKey: ['update playlist title'],
		mutationFn: () => playlistService.renamePlaylist(playlist.id, title),
		onSuccess: () => {
			setTimeout(() => {
				setIsEditing(false)
				refetch()
			}, 1000)
			toast.success('Playlist renamed successfully!')
		}
	})

	const handleChangeTitle = (text: string) => {
		const trimmed = text.trim()
		if (trimmed === '') {
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
		onSuccess: () => {
			setIsShowDelete(false)
			toast.success('Playlist successfully deleted!')
			router.push(PAGE.PLAYLISTS())
		},
		onError: () => toast.error('Could not delete playlist!')
	})

	// ----------------------------------------

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
			<div className='flex items-center gap-3'>
				{!isEditing && (
					<button
						title='Rename playlist'
						onClick={() => setIsEditing(true)}
						className='opacity-70 hover:opacity-100 hover:text-primary transition-all duration-300'
					>
						<PenBox size={24} />
					</button>
				)}
				<button
					title='Delete playlist'
					onClick={() => setIsShowDelete(true)}
					className='opacity-70 hover:opacity-100 hover:text-primary transition-all duration-300'
				>
					<Trash2 size={24} />
				</button>
			</div>

			{/* ------------------------ Delete Confirmation Modal ----------------------- */}
			{isShowDelete && (
				<div
					className='fixed inset-0 flex items-center justify-center bg-black/70 z-50'
					ref={refDelete}
				>
					<m.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.9 }}
						transition={{ duration: 0.3 }}
						className='w-[80%] max-w-[30rem] relative'
					>
						<div className='bg-bgSecondary flex flex-col items-center justify-center gap-4 rounded-lg p-4 pb-7'>
							<button
								title='Close the form'
								onClick={() => setIsShowDelete(false)}
								className='absolute top-2 right-2 text-gray-500 hover:text-white transition-colors'
							>
								<X size={18} />
							</button>
							<p className='font-semibold text-lg mt-3'>
								Are you sure you want to delete this playlist?
							</p>
							<p className='text-sm mb-3'>If it contains any videos, they will also be deleted.</p>
							<Button onClick={() => deletePlaylist()}>Delete</Button>
						</div>
					</m.div>
				</div>
			)}
		</div>
	)
}

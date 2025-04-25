'use client'

import { useMutation } from '@tanstack/react-query'
import { useAuth } from '@/hooks/useAuth'
import { commentService } from '@/services/comment.service'
import type { IComment } from '@/types/comment.types'

interface Props {
	comment: IComment
	refetch: () => void
	newText: string
	isEditing: boolean
	resetEdited: () => void
	textareaRef: React.RefObject<HTMLTextAreaElement | null>
}

export function CommentActions({
	comment,
	refetch,
	newText,
	isEditing,
	resetEdited,
	textareaRef
}: Props) {
	const { isLoggedIn, user } = useAuth()

	/* ----------------------------- Update Comment ----------------------------- */
	const { mutate: update, isPending } = useMutation({
		mutationKey: ['update comment'],
		mutationFn: () =>
			commentService.update(comment.id, { text: newText.trim(), videoId: comment.videoId }),
		onSuccess: () => {
			setTimeout(() => {
				refetch()
				resetEdited()
			}, 2000)
		}
	})

	/* ------------------------------ Delete Comment ----------------------------- */
	const { mutate: deleteComment, isPending: isDeletePending } = useMutation({
		mutationKey: ['delete comment'],
		mutationFn: () => commentService.delete(comment.id),
		onSuccess: () => {
			refetch()
		}
	})

	if (!isLoggedIn) return
	if (user?.id !== comment.user.id) return

	return (
		<div className='flex items-center gap-3 mt-4'>
			<button
				className='relative text-gray-500 text-xs whitespace-nowrap transition-all duration-300 hover:text-gray-400 after:content-[""] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[0.7px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full'
				disabled={isDeletePending}
				onClick={() => deleteComment()}
			>
				Delete
			</button>
			<button
				className='relative text-gray-500 text-xs whitespace-nowrap  transition-all duration-300 hover:text-gray-400 after:content-[""] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[0.7px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full'
				disabled={isPending}
				onClick={() => {
					if (newText.trim() === '') {
						deleteComment()
					} else {
						if (!isEditing && textareaRef.current) {
							textareaRef.current.focus()
						} else {
							update()
						}
					}
				}}
			>
				{isEditing ? 'Save' : 'Edit'}
			</button>
		</div>
	)
}

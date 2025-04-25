'use client'

import { useMutation } from '@tanstack/react-query'
import cn from 'clsx'
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
				className='relative text-gray-500 text-xs whitespace-nowrap transition-all duration-300 hover:text-gray-300'
				disabled={isDeletePending}
				onClick={() => deleteComment()}
			>
				Delete
			</button>
			<button
				className={cn(
					'relative text-xs whitespace-nowrap  transition-all duration-300',
					isEditing ? 'text-primary' : 'text-gray-500 hover:text-gray-300'
				)}
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

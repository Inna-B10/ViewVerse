'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { AvatarBlock } from './AvatarBlock'
import { CommentBody } from './CommentBody'
import { CommentHeader } from './CommentHeader'
import type { ISingleVideoResponse } from '@/types/video.types'

const DynamicCommentActions = dynamic(
	() => import('../CommentActions').then(mod => mod.CommentActions),
	{ ssr: false }
)
interface Props {
	comment: ISingleVideoResponse['comments'][0]
	refetch: () => void
}

export function CommentItem({ comment, refetch }: Props) {
	const [text, setText] = useState(comment.text)
	const { isLoggedIn, user } = useAuth()
	const [isEdited, setIsEdited] = useState(false)

	const textareaRef = useRef<HTMLTextAreaElement | null>(null)

	useEffect(() => {
		setIsEdited(text.trim() !== comment.text.trim())
	}, [text, comment.text])

	const isOwnComment = isLoggedIn && user?.id === comment.user.id

	return (
		<div className='even:bg-bgSecondary px-4 pt-7 even:pt-5 pb-5 rounded-md'>
			<div className='flex gap-4 items-start pt-1'>
				<AvatarBlock user={comment.user} />
				<div className='w-full'>
					<CommentHeader
						user={comment.user}
						createdAt={comment.createdAt}
					/>

					<CommentBody
						text={text}
						setText={setText}
						isOwnComment={isOwnComment}
						textareaRef={textareaRef}
					/>

					{/* ---------------------------- Edit/delete Btns ---------------------------- */}
					<DynamicCommentActions
						comment={comment}
						refetch={refetch}
						newText={text}
						isEditing={isEdited}
						resetEdited={() => setIsEdited(false)}
						textareaRef={textareaRef}
					/>
				</div>
			</div>
		</div>
	)
}

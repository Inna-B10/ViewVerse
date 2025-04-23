'use client'

import { useQuery } from '@tanstack/react-query'
import { CommentItem } from './CommentItem'
import { commentService } from '@/services/comment.service'
import type { ISingleVideoResponse } from '@/types/video.types'

interface Props {
	video: ISingleVideoResponse
}

export function Comments({ video }: Props) {
	const { data, isLoading, refetch } = useQuery({
		queryKey: ['comments', video.id],
		queryFn: () => commentService.byVideoPublicId(video.publicId),
		initialData: video.comments
	})

	return (
		/* -------------------------------- Comments -------------------------------- */
		<div className='border-t border-t-border mt-7'>
			{!!data &&
				data.map(comment => (
					<CommentItem
						comment={comment}
						key={comment.id}
					/>
				))}

			{/* ---------------------------------- Form ---------------------------------- */}
			{/* //[TODO] Form for authorized users*/}
		</div>
	)
}

import { Heart, ListPlus } from 'lucide-react'
import { transformCount } from '@/utils/transform-count'
import type { ISingleVideoResponse } from '@/types/video.types'

export function VideoActions({ video }: { video: ISingleVideoResponse }) {
	return (
		<div className='flex justify-end items-center gap-5'>
			<button
				className='flex items-center gap-1 transition-opacity opacity-80 hover:opacity-100'
				title='Save'
			>
				<ListPlus size={20} />
				Save
			</button>
			<button
				className='text-primary text-lg flex items-center gap-1.5 transition-opacity opacity-80 hover:opacity-100'
				title='Likes'
			>
				<Heart size={19} />
				{transformCount(video.likes.length)}
			</button>
		</div>
	)
}

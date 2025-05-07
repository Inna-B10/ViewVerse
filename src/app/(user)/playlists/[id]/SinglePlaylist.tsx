'use client'

import { useQuery } from '@tanstack/react-query'
import { List, PenBox, Trash2 } from 'lucide-react'
import { useParams } from 'next/navigation'
import { Heading } from '@/ui/Heading'
import { SkeletonLoader } from '@/ui/SkeletonLoader'
import { VideoCardHorizontal } from '@/ui/video-card/VideoCardHorizontal'
import { SaveToPlaylist } from '@/app/(public)/video/[publicId]/video-actions/SaveToPlaylist'
import { playlistService } from '@/services/playlist.service'

export function SinglePlaylist() {
	const { id } = useParams()
	const { data, isLoading, refetch } = useQuery({
		queryKey: ['playlist', id],
		queryFn: () => playlistService.getPlaylistById(id as string),
		enabled: !!id
	})

	return (
		<section className='w-3/4'>
			<div className='flex justify-between items-center mb-14'>
				<Heading
					Icon={List}
					isPageHeading
				>
					{data?.title}
				</Heading>
				<div className='flex items-center gap-3'>
					<button
						title='Rename playlist'
						className='opacity-70 hover:opacity-100 hover:text-primary transition-all duration-300'
					>
						<PenBox size={24} />
					</button>
					<button
						title='Delete playlist'
						className='opacity-70 hover:opacity-100 hover:text-primary transition-all duration-300'
					>
						<Trash2 size={24} />
					</button>
				</div>
			</div>
			<div>
				{isLoading ? (
					<SkeletonLoader
						count={3}
						className='h-36 rounded-md mb-8'
					/>
				) : data?.videos?.length ? (
					data?.videos?.map(video => (
						<div
							key={video.id}
							className='flex items-start gap-4 mb-8 justify-between rounded-md'
						>
							<VideoCardHorizontal video={video} />
							<SaveToPlaylist
								video={video}
								refetchSinglePlaylist={refetch}
							/>
						</div>
					))
				) : (
					<p>No videos found!</p>
				)}
			</div>
		</section>
	)
}

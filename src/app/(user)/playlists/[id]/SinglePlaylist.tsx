'use client'

import { useQuery } from '@tanstack/react-query'
import { List } from 'lucide-react'
import { useParams } from 'next/navigation'
import { Heading } from '@/ui/Heading'
import { SkeletonLoader } from '@/ui/SkeletonLoader'
import { VideoCard } from '@/ui/video-card/VideoCard'
import { playlistService } from '@/services/playlist.service'

export function SinglePlaylist() {
	const { id } = useParams()
	const { data, isLoading } = useQuery({
		queryKey: ['playlist', id],
		queryFn: () => playlistService.getPlaylistById(id as string),
		enabled: !!id
	})

	return (
		<section>
			<Heading
				Icon={List}
				isPageHeading
			>
				{data?.title}
			</Heading>

			{isLoading ? (
				<div className='grid grid-cols-1  md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-14 mt-20'>
					<SkeletonLoader
						count={4}
						className='h-36 rounded-md'
					/>
				</div>
			) : data?.videos?.length ? (
				<div className='grid-cols'>
					{data?.videos?.map(video => (
						<VideoCard
							key={video.id}
							video={video}
						/>
					))}
				</div>
			) : (
				<p>No videos found!</p>
			)}
		</section>
	)
}

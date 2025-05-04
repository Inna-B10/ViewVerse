'use client'

import { useQuery } from '@tanstack/react-query'
import { ListVideo } from 'lucide-react'
import { useState } from 'react'
import { Heading } from '@/ui/Heading'
import { Button } from '@/ui/button/Button'
import { CreatePlaylist } from './CreatePlaylist'
import { playlistService } from '@/services/playlist.service'

export function PlaylistsPage() {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const { data, isLoading, refetch } = useQuery({
		queryKey: ['playlists'],
		queryFn: () => playlistService.getUserPlaylists()
	})

	return (
		<section className='w-3/4'>
			<div className='flex justify-between items-center mb-14'>
				<Heading
					Icon={ListVideo}
					className='mb-0'
					isPageHeading
				>
					Playlists
				</Heading>
				<Button
					isLoading={isLoading}
					onClick={() => setIsModalOpen(true)}
					variant='simple'
				>
					Create a new playlist
				</Button>
			</div>
			<div>
				{/* {isLoading ? (
					<SkeletonLoader
						count={3}
						className='h-36 rounded-md mb-8'
					/>
				) : data?.length ? (
					data?.map(item => (
						<div
							key={item.video.id}
							className='flex items-start gap-4 mb-8'
						>
							<VideoCardHorizontal
								key={item.video.id}
								video={item.video}
							/>
							<button
								title='Remove from history'
								onClick={() => remove(item.video.id)}
								className='ml-4 text-gray-500 transition-opacity duration-300 hover:text-gray-400'
							>
								<Trash2 size={19} />
							</button>
						</div>
					))
				) : (
					<div>
						<p>No items found in the history list.</p>
					</div>
				)} */}
			</div>
			{isModalOpen && (
				<CreatePlaylist
					refetch={refetch}
					onClose={() => setIsModalOpen(false)}
				/>
			)}
		</section>
	)
}

'use client'

import { useQuery } from '@tanstack/react-query'
import { ListVideo } from 'lucide-react'
import { Heading } from '@/ui/Heading'
import { SkeletonLoader } from '@/ui/SkeletonLoader'
import { Button } from '@/ui/button/Button'
import { useOutside } from '@/hooks/useOutside'
import { CreatePlaylist } from './CreatePlaylist'
import { PlaylistItem } from './PlaylistItem'
import { playlistService } from '@/services/playlist.service'

export function PlaylistsPage() {
	const { isShow, setIsShow, ref } = useOutside(false)
	const { data, isLoading, refetch } = useQuery({
		queryKey: ['playlists'],
		queryFn: () => playlistService.getUserPlaylists()
	})

	return (
		<section className='w-full'>
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
					onClick={() => setIsShow(true)}
					variant='simple'
				>
					Create a new playlist
				</Button>
			</div>

			<div className='grid grid-cols-1  md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-14'>
				{isLoading ? (
					<SkeletonLoader
						count={4}
						className='h-36 rounded-md'
					/>
				) : data?.length ? (
					data?.map(item => (
						<PlaylistItem
							key={item.id}
							playlist={item}
						/>
					))
				) : (
					<div>
						<p>No playlists found.</p>
					</div>
				)}
			</div>
			{isShow && (
				<CreatePlaylist
					refetch={refetch}
					onClose={() => setIsShow(false)}
					ref={ref}
				/>
			)}
		</section>
	)
}

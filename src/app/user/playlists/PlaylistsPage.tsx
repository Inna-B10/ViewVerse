'use client'

import { ListVideo } from 'lucide-react'
import { Heading } from '@/ui/Heading'
import { SkeletonLoader } from '@/ui/SkeletonLoader'
import { useUserPlaylists } from '@/hooks/useUserPlaylists'
import { PlaylistItem } from './PlaylistItem'

export function PlaylistsPage() {
	const { data, isLoading } = useUserPlaylists()

	return (
		<section className='w-full'>
			<div>
				<Heading
					Icon={ListVideo}
					className='mb-0'
					isPageHeading
				>
					Playlists
				</Heading>
			</div>

			<div className='grid grid-cols-1  md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-14 mt-14 pr-4'>
				{isLoading ? (
					<SkeletonLoader
						count={4}
						className='h-44 rounded-md'
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
		</section>
	)
}

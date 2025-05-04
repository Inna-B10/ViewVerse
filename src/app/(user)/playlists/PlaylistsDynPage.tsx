'use client'

import dynamic from 'next/dynamic'
import { SkeletonLoader } from '@/ui/SkeletonLoader'

const DynamicPlaylistsPage = dynamic(
	() => import('./PlaylistsPage').then(mod => mod.PlaylistsPage),
	{
		ssr: false,
		loading: () => (
			<div className='w-3/4 mt-24'>
				<SkeletonLoader
					className='mb-8 rounded-md h-36'
					count={3}
				/>
			</div>
		)
	}
)

export function PlaylistsDynPage() {
	return <DynamicPlaylistsPage />
}

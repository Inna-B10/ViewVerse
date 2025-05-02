'use client'

import dynamic from 'next/dynamic'
import { SkeletonLoader } from '@/ui/SkeletonLoader'

//NB next15 - `ssr: false` is not allowed with `next/dynamic` in Server Components.
const DynamicLikedVideosPage = dynamic(
	() => import('./LikedVideosPage').then(mod => mod.LikedVideosPage),
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

export function LikedVideosDynPage() {
	return <DynamicLikedVideosPage />
}

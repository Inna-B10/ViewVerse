'use client'

import dynamic from 'next/dynamic'
import { SkeletonLoader } from '@/ui/SkeletonLoader'

const DynamicSinglePlaylist = dynamic(
	() => import('./SinglePlaylist').then(mod => mod.SinglePlaylist),
	{
		ssr: false,
		loading: () => (
			<div className='grid grid-cols-1  md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-14 mt-20'>
				<SkeletonLoader
					count={4}
					className='h-36 rounded-md'
				/>
			</div>
		)
	}
)

export default function Page() {
	return <DynamicSinglePlaylist />
}

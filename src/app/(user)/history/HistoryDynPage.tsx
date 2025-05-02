'use client'

import dynamic from 'next/dynamic'
import { SkeletonLoader } from '@/ui/SkeletonLoader'

const DynamicHistoryPage = dynamic(() => import('./HistoryPage').then(mod => mod.HistoryPage), {
	ssr: false,
	loading: () => (
		<div className='w-3/4 mt-24'>
			<SkeletonLoader
				className='mb-8 rounded-md h-36'
				count={3}
			/>
		</div>
	)
})

export function HistoryDynPage() {
	return <DynamicHistoryPage />
}

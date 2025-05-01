'use client'

import dynamic from 'next/dynamic'
import { SkeletonLoader } from '@/ui/SkeletonLoader'

const DynamicHistoryPage = dynamic(() => import('./HistoryPage').then(mod => mod.HistoryPage), {
	ssr: false,
	loading: () => <SkeletonLoader className='w-10 mb-0 rounded-md' />
})

export function HistorySubPage() {
	return <DynamicHistoryPage />
}

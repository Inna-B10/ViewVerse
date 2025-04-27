'use client'

import dynamic from 'next/dynamic'
import { SkeletonLoader } from '@/ui/SkeletonLoader'

const DynamicSearchPage = dynamic(
	() => import('./SearchClientPage').then(mod => mod.SearchClientPage),
	{ ssr: false, loading: () => <SkeletonLoader className='w-10 mb-0 rounded-md' /> }
)

export function SearchSubPage() {
	return <DynamicSearchPage />
}

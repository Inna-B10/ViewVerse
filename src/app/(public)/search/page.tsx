'use client'

import dynamic from 'next/dynamic'
import { SkeletonLoader } from '@/ui/SkeletonLoader'

const DynamicSearchClientPage = dynamic(
	() => import('./SearchClientPage').then(mod => mod.SearchClientPage),
	{ ssr: false, loading: () => <SkeletonLoader className='w-10 mb-0 rounded-md' /> }
)

export default function SearchPage() {
	return <DynamicSearchClientPage />
}

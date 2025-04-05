import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { SkeletonLoader } from '@/ui/SkeletonLoader'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'

const DynamicSearchPage = dynamic(
	() => import('./SearchClientPage').then(mod => mod.SearchClientPage),
	{ ssr: false, loading: () => <SkeletonLoader className='w-10 mb-0 rounded-md' /> }
)

export const metadata: Metadata = {
	title: 'Search',
	...NO_INDEX_PAGE
}
export default function SearchPage() {
	return <DynamicSearchPage />
}

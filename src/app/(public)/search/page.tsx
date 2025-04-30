import type { Metadata } from 'next'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { SearchSubPage } from './SearchSubPage'

export const metadata: Metadata = {
	title: 'Search',
	...NO_INDEX_PAGE
}
export default function SearchPage() {
	return <SearchSubPage />
}

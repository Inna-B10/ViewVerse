import type { Metadata } from 'next'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { PlaylistsDynPage } from './PlaylistsDynPage'

export const metadata: Metadata = {
	title: 'Playlists',
	...NO_INDEX_PAGE
}

export default function Playlists() {
	return <PlaylistsDynPage />
}

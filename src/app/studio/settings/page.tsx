import type { Metadata } from 'next'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { ChannelSettingsDynPage } from './ChannelSettingsDynPage'

export const metadata: Metadata = {
	title: 'Settings',
	...NO_INDEX_PAGE
}

export default function ChannelSettingsPage() {
	return <ChannelSettingsDynPage />
}

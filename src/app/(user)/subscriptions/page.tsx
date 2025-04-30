import type { Metadata } from 'next'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { SubscriptionsSubPage } from './SubscriptionsSubPage'

export const metadata: Metadata = {
	title: 'Subscriptions',
	...NO_INDEX_PAGE
}

export default function Subscriptions() {
	return <SubscriptionsSubPage />
}

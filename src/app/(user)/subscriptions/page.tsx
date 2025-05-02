import type { Metadata } from 'next'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { SubscriptionsDynPage } from './SubscriptionsDynPage'

export const metadata: Metadata = {
	title: 'Subscriptions',
	...NO_INDEX_PAGE
}

export default function Subscriptions() {
	return <SubscriptionsDynPage />
}

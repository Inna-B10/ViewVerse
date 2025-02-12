import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { SkeletonLoader } from '@/ui/SkeletonLoader'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'

const DynamicSubscriptionsPage = dynamic(
	() => import('./SubscriptionsPage').then(mod => mod.SubscriptionsPage),
	{
		//[FIXME]
		// ssr: false,
		loading: () => <SkeletonLoader className='w-10 mb-0 rounded-md' />
	}
)

export const metadata: Metadata = {
	title: 'Subscriptions',
	...NO_INDEX_PAGE
}

export default function Subscriptions() {
	return <DynamicSubscriptionsPage />
}

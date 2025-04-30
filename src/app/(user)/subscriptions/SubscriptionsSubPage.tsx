'use client'

import dynamic from 'next/dynamic'
import { SkeletonLoader } from '@/ui/SkeletonLoader'

//NB next15 - `ssr: false` is not allowed with `next/dynamic` in Server Components.
const DynamicSubscriptionsPage = dynamic(
	() => import('./SubscriptionsPage').then(mod => mod.SubscriptionsPage),
	{
		ssr: false,
		loading: () => <SkeletonLoader className='w-10 mb-0 rounded-md' />
	}
)

export function SubscriptionsSubPage() {
	return <DynamicSubscriptionsPage />
}

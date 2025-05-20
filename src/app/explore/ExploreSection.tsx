'use client'

import { Compass } from 'lucide-react'
import dynamic from 'next/dynamic'

import { Heading } from '@/ui/Heading'
import { SkeletonLoader } from '@/ui/SkeletonLoader'

const DynamicExplore = dynamic(() => import('./Explore').then(mod => mod.Explore), {
	ssr: false,
	loading: () => (
		<div className='grid-6-cols'>
			<SkeletonLoader
				count={6}
				className='h-36 rounded-md'
			/>
		</div>
	)
})

export function ExploreSection() {
	return (
		<section className='pb-5'>
			<Heading Icon={Compass}>Explore</Heading>
			<DynamicExplore />
		</section>
	)
}

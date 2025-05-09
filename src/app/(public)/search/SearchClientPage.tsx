'use client'

import { useQuery } from '@tanstack/react-query'
import { Search } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { Heading } from '@/ui/Heading'
import { SkeletonLoader } from '@/ui/SkeletonLoader'
import { VideoCard } from '@/ui/video-card/VideoCard'
import { PAGE } from '@/config/public-page.config'
import { videoService } from '@/services/video.service'

export function SearchClientPage() {
	const searchParams = useSearchParams()
	const searchTerm = searchParams.get('term')

	const router = useRouter()

	// Redirect to homepage if searchTerm is missing
	useEffect(() => {
		if (!searchTerm) {
			router.push(PAGE.HOME)
		}
	}, [searchTerm, router])

	// Request data
	const { data, isLoading } = useQuery({
		queryKey: ['search', searchTerm],
		queryFn: () => videoService.filterVideos(searchTerm),
		enabled: !!searchTerm // Disable query if no searchTerm
	})

	// While the redirect is in progress
	if (!searchTerm) {
		return null
	}

	return (
		<section>
			<Heading Icon={Search}>Search results for &quot;{searchTerm}&quot;</Heading>
			<div className='grid-cols'>
				{isLoading ? (
					<SkeletonLoader
						count={4}
						className='h-36 rounded-md'
					/>
				) : data?.videos?.length ? (
					data.videos.map(video => (
						<VideoCard
							key={video.id}
							video={video}
						/>
					))
				) : (
					<div>
						<p>Nothing was found for your request.</p>
					</div>
				)}
			</div>
		</section>
	)
}

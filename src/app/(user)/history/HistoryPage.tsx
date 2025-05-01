'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import { History } from 'lucide-react'
import { Heading } from '@/ui/Heading'
import { SkeletonLoader } from '@/ui/SkeletonLoader'
import { Button } from '@/ui/button/Button'
import { VideoCardHorizontal } from '@/ui/video-card/VideoCardHorizontal'
import { watchHistoryService } from '@/services/watch-history.service'

export function HistoryPage() {
	const { data, isLoading, refetch } = useQuery({
		queryKey: ['watchHistory'],
		queryFn: () => watchHistoryService.getUserHistory()
	})

	const { mutate, isPending } = useMutation({
		mutationKey: ['clear-history'],
		mutationFn: () => watchHistoryService.clearHistory(),
		onSuccess() {
			refetch()
		}
	})

	return (
		<section className='w-3/4'>
			<div className='flex justify-between items-center mb-14'>
				<Heading
					Icon={History}
					className='mb-0'
					isPageHeading
				>
					History
				</Heading>
				<Button
					isLoading={isPending}
					onClick={() => mutate()}
					variant='simple'
				>
					Clear history
				</Button>
			</div>
			<div>
				{isLoading ? (
					<SkeletonLoader
						count={3}
						className='h-36 rounded-md mb-8'
					/>
				) : data?.length ? (
					data?.map(history => (
						<VideoCardHorizontal
							key={history.video.id}
							video={history.video}
						/>
					))
				) : (
					<div>
						<p>No items found in the history list.</p>
					</div>
				)}
			</div>
		</section>
	)
}

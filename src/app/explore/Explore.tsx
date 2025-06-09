import { useInfiniteQuery } from '@tanstack/react-query'
import { SkeletonLoader } from '@/ui/SkeletonLoader'
import { VideoCard } from '@/ui/video-card/VideoCard'
import { useAuth } from '@/hooks/useAuth'
import { useEffectScroll } from '@/hooks/useEffectScroll'
import { videoService } from '@/services/video.service'

export function Explore() {
	const { user } = useAuth()

	const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
		queryKey: ['explore'],
		queryFn: ({ pageParam }) =>
			videoService.getExploreVideos(
				user?.id,
				{
					page: pageParam.page,
					limit: 12
				},
				pageParam.excludeIds
			),
		initialPageParam: { page: 1, excludeIds: [] as string[] },
		getNextPageParam: (lastPage, allPages) => {
			const { page, totalPages } = lastPage
			const allVideoIds = allPages.flatMap(page => page.videos.map(video => video.id))

			return page < totalPages ? { page: page + 1, excludeIds: allVideoIds } : undefined
		}
	})

	useEffectScroll({
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage
	})

	const allVideos = data?.pages.flatMap(page => page.videos) || []

	return (
		<div className='grid-cols'>
			{isLoading && !allVideos.length ? (
				<SkeletonLoader
					count={5}
					className='h-36 rounded-md'
				/>
			) : allVideos?.length ? (
				allVideos.map(video => (
					<VideoCard
						key={video.id}
						video={video}
					/>
				))
			) : (
				<div>
					<p>Explore videos are temporarily unavailable.</p>
				</div>
			)}

			{isFetchingNextPage && (
				<SkeletonLoader
					count={5}
					className='h-36 rounded-md'
				/>
			)}
		</div>
	)
}

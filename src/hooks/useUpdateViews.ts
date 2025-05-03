import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { videoService } from '@/services/video.service'
import { watchHistoryService } from '@/services/watch-history.service'
import { useTypedSelector } from '@/store'
import type { ISingleVideoResponse } from '@/types/video.types'

export function useUpdateViews({ video }: { video: ISingleVideoResponse }) {
	const { isLoggedIn } = useTypedSelector(state => state.auth)

	const { mutate: updateViews } = useMutation({
		mutationKey: ['update-video-views'],
		mutationFn: () => videoService.updateViews(video.publicId)
	})

	const { mutate: updateWatchHistory } = useMutation({
		mutationKey: ['update-watch-history'],
		mutationFn: () => watchHistoryService.addToHistory(video.id)
	})

	useEffect(() => {
		updateViews()
		if (isLoggedIn) updateWatchHistory()
	}, [updateViews, updateWatchHistory, isLoggedIn])
}

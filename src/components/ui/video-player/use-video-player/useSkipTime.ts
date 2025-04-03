import { type RefObject } from 'react'
import type { HTMLCustomVideoElement } from '@/types/video-player.types'

const SKIP_TIME_SECONDS = 10

export function useSkipTime(playerRef: RefObject<HTMLCustomVideoElement>) {
	const skipTime = (type?: 'forward' | 'backward') => {
		if (!playerRef.current?.currentTime) return

		if (type === 'forward') {
			playerRef.current.currentTime += SKIP_TIME_SECONDS
		} else {
			playerRef.current.currentTime -= SKIP_TIME_SECONDS
		}
	}
	return { skipTime }
}

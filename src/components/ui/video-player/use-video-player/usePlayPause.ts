import { type RefObject, useState } from 'react'
import type { HTMLCustomVideoElement } from '@/types/video-player.types'

export function usePlayPause(
	playerRef: RefObject<HTMLCustomVideoElement | null>,
	bgRef: RefObject<HTMLCustomVideoElement | null>
) {
	const [isPlaying, setIsPlaying] = useState(false)

	const togglePlayPause = () => {
		if (isPlaying) {
			playerRef.current?.pause()
			bgRef.current?.pause()
		} else {
			playerRef.current?.play()
			bgRef.current?.play()
		}
		setIsPlaying(!isPlaying)
	}
	return { isPlaying, togglePlayPause, setIsPlaying }
}

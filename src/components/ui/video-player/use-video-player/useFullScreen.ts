import { type RefObject } from 'react'
import type { HTMLCustomVideoElement } from '@/types/video-player.types'

export function useFullScreen(playerRef: RefObject<HTMLCustomVideoElement | null>) {
	const toggleFullScreen = () => {
		if (!playerRef.current) return

		if (playerRef.current.requestFullscreen) {
			playerRef.current.requestFullscreen()
		} else if (playerRef.current?.mozRequestFullScreen) {
			playerRef.current.mozRequestFullScreen()
		} else if (playerRef.current.msRequestFullscreen) {
			playerRef.current.msRequestFullscreen()
		} else if (playerRef.current.webkitRequestFullscreen) {
			playerRef.current.webkitRequestFullscreen()
		}
	}
	return { toggleFullScreen }
}

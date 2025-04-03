import type { HTMLCustomVideoElement } from '@/types/video-player.types'

export const getVideoInfo = (video: HTMLCustomVideoElement) => {
	const currentTime = video.currentTime
	const originalTime = video.duration

	return {
		currentTime,
		originalTime,
		progress: (currentTime / originalTime) * 100
	}
}

export const getTime = (time: number) => {
	return Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
}

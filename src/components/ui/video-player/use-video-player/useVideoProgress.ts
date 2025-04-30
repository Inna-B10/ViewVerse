import { type RefObject, useEffect, useState } from 'react'
import { getVideoInfo } from '../video-player.utils'
import { type HTMLCustomVideoElement } from '@/types/video-player.types'

export function useVideoProgress(playerRef: RefObject<HTMLCustomVideoElement | null>) {
	const [currentTime, setCurrentTime] = useState(0)
	const [videoTime, setVideoTime] = useState(0) //total video length
	const [progress, setProgress] = useState(0)

	useEffect(() => {
		const player = playerRef?.current
		if (!player) return

		const handleLoadedMetadata = () => {
			const { currentTime, progress, originalTime } = getVideoInfo(player)

			setVideoTime(originalTime)
			setCurrentTime(currentTime)
			setProgress(progress)
		}

		player?.addEventListener('loadedmetadata', handleLoadedMetadata)

		if (player.readyState >= 1) {
			handleLoadedMetadata()
		}

		return () => {
			player?.removeEventListener('loadedmetadata', handleLoadedMetadata)
		}
	}, [playerRef, playerRef?.current?.duration])

	useEffect(() => {
		const player = playerRef?.current

		const updateProgress = () => {
			if (!player) return

			const { currentTime, progress } = getVideoInfo(player)

			setCurrentTime(currentTime)
			setProgress(progress)
		}

		player?.addEventListener('timeupdate', updateProgress)

		return () => {
			player?.removeEventListener('timeupdate', updateProgress)
		}
	}, [playerRef])

	return {
		currentTime,
		setCurrentTime,
		progress,
		videoTime
	}
}

import { useEffect, useRef, useState } from 'react'
import { getVideoInfo } from '@/ui/video-player/video-player.utils'
import { EnumVideoPlayerQuality, type HTMLCustomVideoElement } from '@/types/video-player.types'

const SKIP_TIME_SECONDS = 10

interface Props {
	fileName: string
}

export function useVideoPlayer({ fileName }: Props) {
	const playerRef = useRef<HTMLCustomVideoElement>(null)

	const [isPlaying, setIsPlaying] = useState(false)
	const [quality, setQuality] = useState(EnumVideoPlayerQuality['1080p'])

	const [currentTime, setCurrentTime] = useState(0)
	const [videoTime, setVideoTime] = useState(0) //total video length
	const [progress, setProgress] = useState(0)

	/* ------------------------------ Play / Pause ------------------------------ */
	const togglePlayPause = () => {
		if (isPlaying) {
			playerRef.current?.pause()
		} else {
			playerRef.current?.play()
		}
		setIsPlaying(!isPlaying)
	}

	/* -------------------------- Jump Forward Backward ------------------------- */
	const skipTime = (type?: 'forward' | 'backward') => {
		if (!playerRef.current?.currentTime) return

		if (type === 'forward') {
			playerRef.current.currentTime += SKIP_TIME_SECONDS
		} else {
			playerRef.current.currentTime -= SKIP_TIME_SECONDS
		}
	}

	/* ------------------------------- Full Screen ------------------------------ */
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

	/* ----------------------------- Change Quality ----------------------------- */
	const changeQuality = (quality: EnumVideoPlayerQuality) => {
		if (!playerRef.current) return
		setQuality(quality)

		playerRef.current.src = `/uploads/videos/${quality}/${fileName}`
		playerRef.current.currentTime = currentTime
		playerRef.current.play()
		setIsPlaying(true)
	}

	useEffect(() => {
		if (!playerRef?.current) return

		const { currentTime, progress, originalTime } = getVideoInfo(playerRef.current)

		setVideoTime(originalTime)
		setCurrentTime(currentTime)
		setProgress(progress)
	}, [playerRef.current?.duration])

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
	}, [])

	return {
		state: {
			isPlaying,
			progress,
			currentTime,
			videoTime,
			quality
		},
		fn: {
			togglePlayPause,
			changeQuality,
			toggleFullScreen,
			skipTime
		},
		playerRef
	}
}

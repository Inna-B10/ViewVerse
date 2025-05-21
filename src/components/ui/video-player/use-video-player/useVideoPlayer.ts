import { useRef, useState } from 'react'
import { useFullScreen } from './useFullScreen'
import { useOnSeek } from './useOnSeek'
import { usePlayPause } from './usePlayPause'
import { useSkipTime } from './useSkipTime'
import { useVideoHotkeys } from './useVideoHotkeys'
import { useVideoProgress } from './useVideoProgress'
import { useVideoQuality } from './useVideoQuality'
import { useVideoVolume } from './useVideoVolume'
import { type HTMLCustomVideoElement } from '@/types/video-player.types'

interface Props {
	fileName: string
	toggleTheaterMode: () => void
	mainQuality: string | null
}

export function useVideoPlayer({ fileName, toggleTheaterMode, mainQuality }: Props) {
	const playerRef = useRef<HTMLCustomVideoElement>(null)
	const bgRef = useRef<HTMLCustomVideoElement>(null)

	const [isBacklightMode, setIsBacklightMode] = useState(true)
	const { isPlaying, togglePlayPause, setIsPlaying } = usePlayPause(playerRef, bgRef)
	const { currentTime, progress, videoTime, setCurrentTime } = useVideoProgress(playerRef)
	const { quality, changeQuality } = useVideoQuality(playerRef, {
		fileName,
		currentTime,
		setIsPlaying,
		mainQuality
	})
	const { toggleFullScreen } = useFullScreen(playerRef)
	const { skipTime } = useSkipTime(playerRef, bgRef)

	const { changeVolume, isMuted, toggleMute, volume } = useVideoVolume(playerRef)
	const { onSeek } = useOnSeek(playerRef, bgRef, setCurrentTime)

	const fn = {
		togglePlayPause,
		setIsPlaying,
		changeQuality,
		toggleFullScreen,
		skipTime,
		changeVolume,
		toggleMute,
		onSeek,
		toggleBacklightMode: () => setIsBacklightMode(!isBacklightMode)
	}

	useVideoHotkeys({ volume, toggleTheaterMode, ...fn })

	return {
		state: {
			isPlaying,
			progress,
			currentTime,
			videoTime,
			quality,
			isMuted,
			volume,
			isBacklightMode
		},
		fn,
		playerRef,
		bgRef
	}
}

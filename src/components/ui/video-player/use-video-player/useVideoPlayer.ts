import { useRef } from 'react'
import { useFullScreen } from './useFullScreen'
import { usePlayPause } from './usePlayPause'
import { useSkipTime } from './useSkipTime'
import { useVideoProgress } from './useVideoProgress'
import { useVideoQuality } from './useVideoQuality'
import { useVideoVolume } from './useVideoVolume'
import { type HTMLCustomVideoElement } from '@/types/video-player.types'

interface Props {
	fileName: string
}

export function useVideoPlayer({ fileName }: Props) {
	const playerRef = useRef<HTMLCustomVideoElement>(null)

	const { isPlaying, togglePlayPause, setIsPlaying } = usePlayPause(playerRef)
	const { currentTime, progress, videoTime } = useVideoProgress(playerRef)
	const { changeQuality, quality } = useVideoQuality(playerRef, { fileName, currentTime })
	const { toggleFullScreen } = useFullScreen(playerRef)
	const { skipTime } = useSkipTime(playerRef)

	const { changeVolume, isMuted, toggleMute, volume } = useVideoVolume(playerRef)

	return {
		state: {
			isPlaying,
			progress,
			currentTime,
			videoTime,
			quality,
			volume,
			isMuted
		},
		fn: {
			togglePlayPause,
			changeQuality,
			toggleFullScreen,
			skipTime,
			changeVolume,
			toggleMute
		},
		playerRef
	}
}

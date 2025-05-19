import { type Dispatch, type RefObject, type SetStateAction, useEffect, useState } from 'react'
import { EnumVideoPlayerQuality, type HTMLCustomVideoElement } from '@/types/video-player.types'

interface Props {
	setIsPlaying: Dispatch<SetStateAction<boolean>>
	fileName: string
	currentTime: number
	mainQuality: string | null
}

export function useVideoQuality(
	playerRef: RefObject<HTMLCustomVideoElement | null>,
	{ currentTime, fileName, setIsPlaying, mainQuality }: Props
) {
	const [quality, setQuality] = useState(mainQuality)

	useEffect(() => {
		if (mainQuality && mainQuality !== quality) {
			setQuality(mainQuality)
		}
	}, [mainQuality, quality])

	const changeQuality = (quality: EnumVideoPlayerQuality) => {
		if (!playerRef.current) return
		setQuality(quality)

		playerRef.current.src = `/uploads/videos/${quality}/${fileName}`
		playerRef.current.currentTime = currentTime
		playerRef.current.play()
		setIsPlaying(true)
	}

	return {
		quality,
		changeQuality
	}
}

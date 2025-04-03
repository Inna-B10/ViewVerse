import { type RefObject, useState } from 'react'
import type { HTMLCustomVideoElement } from '@/types/video-player.types'

export function useVideoVolume(playerRef: RefObject<HTMLCustomVideoElement>) {
	const [volume, setVolume] = useState(1)
	const [isMuted, setIsMuted] = useState(false)

	const changeVolume = (value: number) => {
		if (!playerRef.current) return

		playerRef.current.volume = value
		setVolume(value)
		setIsMuted(value === 0)
	}

	const toggleMute = () => {
		if (!playerRef.current) return
		const muted = !playerRef.current.muted
		playerRef.current.muted = muted
		setIsMuted(muted)
	}
	return { toggleMute, changeVolume, volume, isMuted }
}

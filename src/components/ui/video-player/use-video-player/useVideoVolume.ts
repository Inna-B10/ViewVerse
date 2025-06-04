import { type RefObject, useState } from 'react'
import type { HTMLCustomVideoElement } from '@/types/video-player.types'

export function useVideoVolume(playerRef: RefObject<HTMLCustomVideoElement | null>) {
	const [volume, setVolume] = useState(1)
	const [isMuted, setIsMuted] = useState(false)
	const [previousVolume, setPreviousVolume] = useState(1)

	const changeVolume = (value: number) => {
		if (!playerRef.current) return

		playerRef.current.volume = value

		// If the volume is above 0, unmute the player and explicitly set the muted state to false
		if (value > 0) {
			playerRef.current.muted = false
			setIsMuted(false)
		} else if (value === 0) {
			playerRef.current.muted = true
			setIsMuted(true)
		}
		setVolume(value)
	}

	const toggleMute = () => {
		if (!playerRef.current) return
		const muted = !playerRef.current.muted
		playerRef.current.muted = muted
		setIsMuted(muted)

		// Preserving the previous volume level before muting and restoring it when unmuting
		if (muted) {
			setPreviousVolume(playerRef.current.volume)
			playerRef.current.volume = 0
			setVolume(0)
		} else {
			const restoredVolume = previousVolume > 0 ? previousVolume : 0.5
			playerRef.current.volume = restoredVolume
			setVolume(restoredVolume)
		}
	}
	return { toggleMute, changeVolume, volume, isMuted }
}

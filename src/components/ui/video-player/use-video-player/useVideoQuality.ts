import {
	type Dispatch,
	type RefObject,
	type SetStateAction,
	useEffect,
	useRef,
	useState
} from 'react'
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
	const didSetInitial = useRef(false)

	useEffect(() => {
		if (mainQuality && !didSetInitial.current) {
			setQuality(mainQuality)
			didSetInitial.current = true
		}
	}, [mainQuality])

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

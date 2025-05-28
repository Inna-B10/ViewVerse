import { useEffect, useState } from 'react'
import { findPrimaryAndBackgroundVideo } from '@/utils/findMainAndBackgroundVideo'

export function useVideoSources(fileName: string) {
	const [isLoading, setIsLoading] = useState(true)
	const [mainSrc, setMainSrc] = useState<string | null>(null)
	const [bgSrc, setBgSrc] = useState<string | null>(null)
	const [mainQuality, setMainQuality] = useState<string | null>(null)

	useEffect(() => {
		async function loadVideos() {
			setIsLoading(true)
			const { primaryVideo, backgroundVideo, primaryQuality } =
				await findPrimaryAndBackgroundVideo(fileName)
			setMainSrc(primaryVideo)
			setBgSrc(backgroundVideo)
			setMainQuality(primaryQuality)
			setIsLoading(false)
		}
		loadVideos()
	}, [fileName])

	return { isLoading, mainSrc, bgSrc, mainQuality }
}

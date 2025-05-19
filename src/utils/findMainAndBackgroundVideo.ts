import { EnumVideoPlayerQuality } from '@/types/video-player.types'

export async function findPrimaryAndBackgroundVideo(fileName: string): Promise<{
	primaryVideo: string | null
	backgroundVideo: string | null
	primaryQuality: string | null
}> {
	const qualities: EnumVideoPlayerQuality[] = [
		EnumVideoPlayerQuality['1080p'],
		EnumVideoPlayerQuality['720p'],
		EnumVideoPlayerQuality['480p'],
		EnumVideoPlayerQuality['360p']
	]

	let primaryVideo: string | null = null
	let backgroundVideo: string | null = null
	let primaryQuality: string | null = null

	for (let i = 0; i < qualities.length; i++) {
		const quality = qualities[i]
		const path = `/uploads/videos/${quality}/${fileName}`

		const res = await fetch(path, { method: 'HEAD' })

		if (res.ok) {
			if (!primaryVideo) {
				primaryVideo = path
				primaryQuality = quality
			} else {
				backgroundVideo = path
				break
			}
		}
	}

	return { primaryVideo, backgroundVideo, primaryQuality }
}

export async function validateVideoResolution(file: File): Promise<boolean> {
	return new Promise(resolve => {
		const video = document.createElement('video')
		video.preload = 'metadata'
		video.onloadedmetadata = () => {
			window.URL.revokeObjectURL(video.src)

			const width = video.videoWidth
			const height = video.videoHeight

			const minWidth = 640
			const minHeight = 360

			const isValid = width >= minWidth && height >= minHeight
			resolve(isValid)
		}
		video.onerror = () => {
			resolve(false)
		}
		video.src = URL.createObjectURL(file)
	})
}

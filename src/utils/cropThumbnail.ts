export function cropThumbnail(imageUrl: string, aspect: number): Promise<Blob | null> {
	return new Promise(resolve => {
		const image = new Image()
		image.onload = () => {
			const imageAspect = image.width / image.height

			let cropWidth = image.width
			let cropHeight = image.height

			if (imageAspect > aspect) {
				// image too wide
				cropWidth = image.height * aspect
			} else {
				// image too high
				cropHeight = image.width / aspect
			}

			const cropX = (image.width - cropWidth) / 2
			const cropY = (image.height - cropHeight) / 2

			const canvas = document.createElement('canvas')
			canvas.width = cropWidth
			canvas.height = cropHeight

			const ctx = canvas.getContext('2d')
			if (!ctx) return resolve(null)

			ctx.drawImage(image, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight)

			canvas.toBlob(blob => {
				resolve(blob)
			}, 'image/jpeg')
		}
		image.onerror = () => resolve(null)
		image.src = imageUrl
	})
}

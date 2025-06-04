export const validateFileSize = async (file: File, maxFileSize = 1024 * 1024 * 2) => {
	//default 2mb
	let maxSizeFormatted: string
	if (maxFileSize >= 1024 * 1024 * 1024) {
		maxSizeFormatted = (maxFileSize / (1024 * 1024 * 1024)).toFixed(0) + ' GB'
	} else {
		maxSizeFormatted = (maxFileSize / (1024 * 1024)).toFixed(0) + ' MB'
	}
	if (file.size > maxFileSize) {
		const { toast } = await import('react-hot-toast')
		toast.error(`File is too big! (max ${maxSizeFormatted})`)
		return false
	}
	return true
}

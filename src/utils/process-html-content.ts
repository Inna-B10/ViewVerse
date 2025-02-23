export function processHtmlContent(htmlContent: string, limit: number) {
	let initialContent = htmlContent
	let remainingContent = ''
	let isShouldShowToggle = false

	// Check if there are </p> tags in the content
	const hasPTags = /<\/p>/i.test(htmlContent)

	if (hasPTags) {
		// Break content into tags </p>
		const contentParts = htmlContent.split(/(<\/p>)/i)

		let count = 0
		let index = 0
		for (let i = 0; i < contentParts.length; i++) {
			if (contentParts[i].toLowerCase() === '</p>') {
				count++
			}
			if (count === limit) {
				index = i + 1 // Include the closing tag </p>
				break
			}
		}

		initialContent = contentParts.slice(0, index).join('')
		remainingContent = contentParts.slice(index).join('')
		isShouldShowToggle = remainingContent.trim().length > 0
	} else {
		// If there are no <p> tags, we limit the number of characters
		const charLimit = 200
		if (htmlContent.length <= charLimit || htmlContent.length - charLimit <= 50) {
			initialContent = htmlContent
		} else {
			const truncated = htmlContent.slice(0, charLimit + 1)

			const lastSpaceIndex = truncated.lastIndexOf(' ')

			if (lastSpaceIndex === -1) {
				initialContent = truncated.slice(0, charLimit)
				remainingContent = truncated.slice(charLimit + 1)
			} else {
				initialContent = truncated.slice(0, lastSpaceIndex + 1)
				remainingContent =
					truncated.slice(lastSpaceIndex + 1).concat(htmlContent.slice(charLimit + 1)) + ' '
			}

			isShouldShowToggle = true
		}
	}

	return { initialContent, remainingContent, isShouldShowToggle }
}

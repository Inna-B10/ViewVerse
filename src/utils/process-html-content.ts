import linkifyHtml from 'linkify-html'

export function processHtmlContent(text: string, limit: number) {
	let initialContent = text
	let remainingContent = ''
	let isShouldShowToggle = false

	// Split by double line breaks (equivalent to </p>)
	const paragraphs = text.split(/\n{2,}/)

	if (paragraphs.length > limit) {
		initialContent = paragraphs.slice(0, limit).join('\n\n')
		remainingContent = paragraphs.slice(limit).join('\n\n')
		isShouldShowToggle = true
	}
	const options = {
		target: '_blank',
		rel: 'noopener noreferrer'
	}

	// Transforming links
	initialContent = linkifyHtml(initialContent, options)
	remainingContent = linkifyHtml(remainingContent, options)

	return { initialContent: initialContent, remainingContent, isShouldShowToggle }
}

'use client'

import parse from 'html-react-parser'
import { useState } from 'react'
import { processHtmlContent } from '@/utils/process-html-content'
import styles from './VideoDescription.module.scss'

export function VideoDescription({ description }: { description: string }) {
	const [isExpanded, setIsExpanded] = useState(false)

	const { initialContent, isShouldShowToggle } = processHtmlContent(description, 3)

	return (
		<div className='relative mb-4'>
			<article className={styles.article}>
				{parse(isExpanded ? description + ' ' : initialContent)}
				{isShouldShowToggle && (
					<button
						onClick={() => setIsExpanded(prev => !prev)}
						className='text-sm text-primary transition-colors hover:text-gray-200'
					>
						{isExpanded ? '[Hide]' : '[Show more]'}
					</button>
				)}
			</article>
		</div>
	)
}

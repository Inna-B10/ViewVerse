'use client'

import { AnimatePresence, m } from 'framer-motion'
import parse from 'html-react-parser'
import { useState } from 'react'
import { processHtmlContent } from '@/utils/process-html-content'
import styles from './VideoDescription.module.scss'

export function VideoDescription({ description }: { description: string }) {
	const [isExpanded, setIsExpanded] = useState(false)

	const { initialContent, remainingContent, isShouldShowToggle } = processHtmlContent(
		description,
		3
	)

	return (
		<div className='relative mb-4 bg-gray-800 px-3  py-1.5 rounded'>
			<article className={styles.article}>
				{parse(initialContent)}
				{isShouldShowToggle && (
					<>
						<AnimatePresence initial={false}>
							<m.span
								key={isExpanded ? 'expanded' : 'collapsed'}
								initial={{ height: 0, opacity: 1 }}
								animate={{ height: 'auto' }}
								exit={{ height: 0, opacity: 1 }}
								transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
							>
								{isExpanded ? parse(remainingContent) : ''}
							</m.span>
						</AnimatePresence>

						<button
							onClick={() => setIsExpanded(prev => !prev)}
							className='text-sm text-primary  transition-colors hover:text-gray-200'
						>
							{isExpanded ? '[Hide]' : '[Show more]'}
						</button>
					</>
				)}
			</article>
		</div>
	)
}

import { AnimatePresence } from 'framer-motion'
import * as m from 'framer-motion/m'
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
		<div className='relative mb-4 bg-gray-800 px-3  py-2.5 rounded whitespace-pre-line'>
			<article className={styles.article}>
				{parse(initialContent)}
				{isShouldShowToggle && (
					<>
						{isExpanded && (
							<AnimatePresence initial={false}>
								<m.div
									key={isExpanded ? 'expanded' : 'collapsed'}
									initial={{ height: '0', opacity: 0.4 }}
									animate={{ height: '100%', opacity: 1 }}
									exit={{ height: '0', opacity: 0.4 }}
									transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
									style={{ overflow: 'hidden', display: 'inline' }}
								>
									<div>{parse(remainingContent)}</div>
								</m.div>
							</AnimatePresence>
						)}

						<button
							onClick={() => setIsExpanded(prev => !prev)}
							className='text-sm text-primary transition-opacity duration-200 opacity-85 hover:opacity-100'
							title={isExpanded ? 'Hide' : 'Show more'}
							aria-label={isExpanded ? 'Hide' : 'Show more'}
						>
							{isExpanded ? '[Hide]' : '[Show more]'}
						</button>
					</>
				)}
			</article>
		</div>
	)
}

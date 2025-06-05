import parse, {
	type DOMNode,
	Element,
	type HTMLReactParserOptions,
	domToReact
} from 'html-react-parser'
import { type RefObject, useMemo } from 'react'
import AutoResizeTextarea from '@/ui/fields/AutoResizeTextarea'
import { processHtmlContent } from '@/utils/process-html-content'
import { stripHtmlWithBreak } from '@/utils/strip-html'

interface Props {
	text: string
	setText: (text: string) => void
	isOwnComment: boolean
	textareaRef: RefObject<HTMLTextAreaElement | null>
}

export function CommentBody({ text, setText, isOwnComment, textareaRef }: Props) {
	const options: HTMLReactParserOptions = useMemo(
		() => ({
			replace: domNode => {
				if (domNode instanceof Element && domNode.name === 'a') {
					const props = domNode.attribs
					return (
						<a
							{...props}
							className='transition-colors duration-200 text-blue-400 hover:border-b-blue-400 border-b border-b-transparent break-all'
							target='_blank'
							rel='noopener noreferrer'
						>
							{domToReact(domNode.children as DOMNode[], options)}
						</a>
					)
				}
			}
		}),
		[]
	)

	if (isOwnComment) {
		/* --------------------------- If Editable Comment  */
		return (
			<AutoResizeTextarea
				ref={textareaRef}
				onChange={e => setText(e.target.value)}
				onBlur={e => setText(e.target.value.trim())}
				value={stripHtmlWithBreak(text)}
				className='w-full text-gray-300 text-sm leading-snug rounded resize-none bg-transparent outline-none border border-transparent py-1 focus:border-border  focus:bg-field'
			/>
		)
	}

	/* ------------------------- If Unchangeable Comment  */
	return (
		<div className='text-gray-200 text-[0.9rem]  leading-normal'>
			{parse(processHtmlContent(text, 10).initialContent, options)}
		</div>
	)
}

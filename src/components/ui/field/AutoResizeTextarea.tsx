'use client'

import { type TextareaHTMLAttributes, useEffect, useRef } from 'react'

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	value: string
	onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
	onFocus?: () => void
	onBlur?: () => void
}

export default function AutoResizeTextarea({
	value,
	onChange,
	className = '',
	onFocus,
	onBlur,
	...props
}: Props) {
	const textareaRef = useRef<HTMLTextAreaElement | null>(null)

	useEffect(() => {
		const textarea = textareaRef.current
		if (textarea instanceof HTMLTextAreaElement) {
			textarea.style.height = 'auto'
			textarea.style.height = `${textarea.scrollHeight}px`
		}
	}, [value]) // triggered when mounting and changing value

	return (
		<textarea
			ref={textareaRef}
			className={`overflow-hidden resize-none ${className}`}
			value={value}
			onChange={onChange}
			onFocus={onFocus}
			onBlur={onBlur}
			rows={1}
			{...props}
		/>
	)
}

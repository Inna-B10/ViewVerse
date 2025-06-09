import { type Ref, type TextareaHTMLAttributes, forwardRef, useEffect, useRef } from 'react'

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	value: string
	onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
	onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void
}

/* -------- The Height Of The Textarea Changes According To The Text -------- */

const AutoResizeTextarea = forwardRef<HTMLTextAreaElement, Props>(
	({ value, onChange, className = '', onBlur, ...props }: Props, ref: Ref<HTMLTextAreaElement>) => {
		const internalRef = useRef<HTMLTextAreaElement | null>(null)

		useEffect(() => {
			const textarea = internalRef.current

			if (textarea) {
				textarea.style.height = 'auto'
				textarea.style.height = `${textarea.scrollHeight}px`
			}
		}, [value]) // triggered when mounting and changing value

		return (
			<textarea
				ref={el => {
					internalRef.current = el
					if (typeof ref === 'function') {
						ref(el)
					} else if (ref && typeof ref === 'object')
						(ref as React.RefObject<HTMLTextAreaElement | null>).current = el
				}}
				className={`overflow-hidden resize-none ${className}`}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
				rows={1}
				{...props}
			/>
		)
	}
)

AutoResizeTextarea.displayName = 'AutoResizeTextarea'

export default AutoResizeTextarea

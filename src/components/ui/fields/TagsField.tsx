import cn from 'clsx'
import { type ChangeEvent, type KeyboardEvent, useState } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
	label: string
	placeholder?: string
	error?: string
	tags: string[]
	onTagsChange: (tags: string[]) => void
	className?: string
}

export function TagsField({
	label,
	placeholder = 'Enter tags, separated by commas.',
	error,
	tags = [],
	onTagsChange,
	className
}: Props) {
	const [inputValue, setInputValue] = useState<string>('')

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value)
	}

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === ',' || e.key === 'Enter') {
			e.preventDefault()
			addTag(inputValue.trim())
		} else if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
			removeTag(tags[tags.length - 1].trim())
		}
	}

	const addTag = (tag: string) => {
		if (tag && !tags.includes(tag)) {
			const newTags = [...tags, tag]
			setInputValue('')
			onTagsChange(newTags)
		}
	}

	const removeTag = (tag: string) => {
		const newTags = tags.filter(t => t !== tag)
		onTagsChange(newTags)
	}

	return (
		<div className={twMerge('mb-4', className)}>
			<label>
				<span className='block text-gray-200 font-medium mb-2'>{label}</span>
				<div
					className={cn(
						'w-full p-2 bg-field text-xs border rounded flex flex-wrap gap-2 transition-colors focus-within:border-primary',
						error ? 'border-red-600' : 'border-border'
					)}
				>
					{tags.map(tag => (
						<div
							key={tag}
							className='flex items-center px-2 py-1 bg-gray-700 text-white rounded shadow-md'
						>
							<span>{tag}</span>
							<button
								type='button'
								title='Remove tag'
								aria-label='Remove tag'
								onClick={e => {
									e.preventDefault()
									removeTag(tag.trim())
								}}
								className='ml-2 text-gray-400 hover:text-gray-200'
							>
								&times;
							</button>
						</div>
					))}
					<input
						type='text'
						value={inputValue}
						onChange={handleInputChange}
						onKeyDown={handleKeyDown}
						placeholder={placeholder}
						className='bg-transparent outline-none flex-grow text-white text-xs'
					/>
				</div>
			</label>
			{error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
		</div>
	)
}

import { useRouter } from 'next/navigation'
import { type KeyboardEvent, useState } from 'react'
import { PAGE } from '@/config/public-page.config'

interface Props {}

export function SearchField({}: Props) {
	const [searchTerm, setSearchTerm] = useState('')
	const router = useRouter()

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key !== 'Enter') return

		e.preventDefault()
		if (searchTerm.trim() !== '') {
			router.push(PAGE.SEARCH(searchTerm))
			setSearchTerm('')
		} else {
			router.push(PAGE.HOME)
			setSearchTerm('')
		}
	}

	return (
		<div className='w-1/2'>
			<input
				type='search'
				placeholder='Search...'
				className='py-2 px-4 w-full rounded bg-field outline-none border border-transparent transition-colors focus:outline-none focus:ring-0 focus:border-border shadow-none'
				value={searchTerm}
				onChange={e => setSearchTerm(e.target.value)}
				onKeyDown={handleKeyDown}
			/>
		</div>
	)
}

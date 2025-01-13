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
				className='py-2 px-4 w-2/3 rounded bg-slate-800/50 outline-none border-none shadow-none'
				value={searchTerm}
				onChange={e => setSearchTerm(e.target.value)}
				onKeyDown={handleKeyDown}
			/>
		</div>
	)
}

interface Props {}

export function SearchField({}: Props) {
	return (
		<div className='w-1/2'>
			<input
				type='search'
				placeholder='Search...'
				className='py-2 px-4 w-2/3 rounded bg-slate-800/50 outline-none border-none shadow-none'
			/>
		</div>
	)
}

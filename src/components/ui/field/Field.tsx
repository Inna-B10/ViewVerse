import cn from 'clsx'
import type { InputHTMLAttributes } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	label: string
	error?: string
	registration: UseFormRegisterReturn
}

export function Field({ label, error, registration, ...props }: Props) {
	return (
		<div className='mb-4'>
			<label>
				<span className='block text-grey-400 font-semibold mb-2'>{label}</span>
				<input
					className={cn(
						'w-full px-3 py-2 border rounded shadow-sm transition-colors focus:outline-none focus:ring-0 focus: border-primary',
						error ? 'border-red-600' : 'border-transparent '
					)}
					{...registration}
					{...props}
				/>
			</label>
			{error && <p className='text-red-600 text-sm mt-1'>{error}</p>}
		</div>
	)
}

import cn from 'clsx'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	isLoading?: boolean
	children: ReactNode
	variant?: 'primary' | 'secondary' | 'simple'
}

export function Button({ children, isLoading, variant = 'primary', ...props }: Props) {
	return (
		<button
			className={cn(
				'py-2 px-10 w-fit font-medium rounded transition-all duration-300 disabled:bg-gray-400 disabled:opacity-50',
				{
					'bg-primary hover:bg-primaryDark text-field': variant === 'primary',
					'bg-gray-600 hover:bg-gray-500 text-white': variant === 'secondary',
					'bg-field border border-border font-medium h-fit text-gray-300 hover:text-white hover:bg-gray-700':
						variant === 'simple'
				}
			)}
			disabled={isLoading || props.disabled}
			{...props}
		>
			{isLoading ? 'Loading...' : children}
		</button>
	)
}

import type { LinkProps } from 'next/link'
import Link from 'next/link'
import type { AnchorHTMLAttributes, ReactNode } from 'react'

type TLink = LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>

interface Props extends TLink {
	isLoading?: boolean
	children: ReactNode
}

export function LinkButton({ children, isLoading, ...props }: Props) {
	return (
		<Link
			className='py-1.5 pl-2 pr-3 bg-primaryDark text-field font-semibold rounded hover:bg-primary transition-colors disabled:bg-gray-400 flex items-center gap-2'
			{...props}
		>
			{isLoading ? 'Loading...' : children}
		</Link>
	)
}

import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

interface Props {
	children: ReactNode
	Icon?: LucideIcon
}

export function Heading({ children, Icon }: Props) {
	return (
		<div className='text-primary flex items-center gap-1.5 mb-4'>
			{Icon && <Icon />}
			<h2 className='font-philosopher font-bold text-2xl'>{children}</h2>
		</div>
	)
}

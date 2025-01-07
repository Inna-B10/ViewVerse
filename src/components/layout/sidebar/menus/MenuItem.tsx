import Link from 'next/link'
import type { ISidebarItem } from '../sidebar.types'

interface Props {
	item: ISidebarItem
}

export function MenuItem({ item }: Props) {
	return (
		<li>
			<Link
				href={item.link}
				className='group flex items-center gap-5 py-2 '
			>
				<item.icon className='group-hover:text-primary transition group-hover:rotate-6 min-w-6' />
				<span>{item.label}</span>
			</Link>
			{item.isBottomBorder && <hr className='h-[1px] my-5 w-full block sidebar' />}
		</li>
	)
}

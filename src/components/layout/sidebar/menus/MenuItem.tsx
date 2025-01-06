import Link from 'next/link'
import type { ISidebarItem } from '../sidebar.types'

interface Props {
	item: ISidebarItem
}

export function MenuItem({ item }: Props) {
	return (
		<li>
			<Link href={item.link}>
				<item.icon />
				<span>{item.label}</span>
			</Link>
		</li>
	)
}

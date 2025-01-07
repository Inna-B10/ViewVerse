import type { ISidebarItem } from '../sidebar.types'
import { MenuItem } from './MenuItem'

interface Props {
	title?: string
	menu: ISidebarItem[]
}

export function SidebarMenu({ title, menu }: Props) {
	return (
		<nav>
			{title && <div className='opacity-30 uppercase font-medium text-xs mb-3'>{title}</div>}
			<ul>
				{menu.map(menuItem => (
					<MenuItem
						key={menuItem.label}
						item={menuItem}
					/>
				))}
			</ul>
		</nav>
	)
}

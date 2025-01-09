import cn from 'clsx'
import Link from 'next/link'
import type { ISidebarItem } from '../sidebar.types'

interface Props {
	item: ISidebarItem
	isActive: boolean
	isShowedSidebar: boolean
}

export function MenuItem({ item, isActive, isShowedSidebar }: Props) {
	return (
		<li>
			<Link
				href={item.link}
				title={item.label}
				className={cn('group flex items-center gap-5 py-2 ', {
					'hover:text-primary transition-colors': !isActive,
					'hover: cursor-default': isActive
				})}
			>
				<item.icon
					className={cn('min-w-6 pb-[3px]', {
						' group-hover:rotate-6': !isActive,
						'border-b border-white': !isShowedSidebar && isActive,
						' border-b border-transparent': isShowedSidebar
					})}
				/>
				<span
					className={cn('border-b', {
						'border-white': isActive,
						'border-transparent': !isActive
					})}
				>
					{item.label}
				</span>
			</Link>
			{item.isBottomBorder && <hr className='h-[1px] my-5 w-full block sidebar' />}
		</li>
	)
}

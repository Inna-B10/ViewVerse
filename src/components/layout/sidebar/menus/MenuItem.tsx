import cn from 'clsx'
import Link from 'next/link'
import type { IMenuItemProps } from '@/types/menu.types'

export function MenuItem({ item, isActive, isShowedSidebar }: IMenuItemProps) {
	/* --------------------------------- Nav li --------------------------------- */
	return (
		<li>
			<Link
				href={item.link}
				title={item.label}
				aria-label={`Go to ${item.label} page`}
				className={cn('group flex items-center gap-5 py-2 ', {
					'hover:text-primary transition-colors duration-200': !isActive,
					'hover: cursor-default': isActive
				})}
			>
				<item.icon
					className={cn('min-w-6 pb-[3px]', {
						' group-hover:rotate-6': !isActive,
						'text-primary': !isShowedSidebar && isActive
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

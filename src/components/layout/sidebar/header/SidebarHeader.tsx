import { Menu, SquarePlay } from 'lucide-react'
import Link from 'next/link'
import { COLORS } from '@/constants/colors.constants'
import { PUBLIC_PAGE } from '@/config/public-page.config'

export function SidebarHeader() {
	return (
		<div className='flex items-center gap-6 mb-12'>
			<button className='opacity-85 hover:opacity-100 transition-opacity'>
				<Menu />
			</button>
			<Link
				href={PUBLIC_PAGE.HOME}
				className='flex items-center gap-1.5'
			>
				<SquarePlay
					color={COLORS.primary}
					size={26}
				/>
				<span className='font-semibold text-xl text-primary'>FUN Video</span>
			</Link>
		</div>
	)
}

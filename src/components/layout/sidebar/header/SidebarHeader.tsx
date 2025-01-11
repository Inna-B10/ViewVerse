import { Menu, SquarePlay } from 'lucide-react'
import Link from 'next/link'
import { COLORS } from '@/constants/colors.constants'
import { PAGE } from '@/config/public-page.config'

export function SidebarHeader({ toggleSidebar }: { toggleSidebar: () => void }) {
	return (
		<div className='flex items-center gap-5 mb-12'>
			{/* ------------------------------ Toggle Button ----------------------------- */}
			<button
				className='opacity-85 hover:opacity-100 transition-opacity'
				onClick={toggleSidebar}
			>
				<Menu />
			</button>

			{/* ---------------------------------- Logo ---------------------------------- */}
			<Link
				href={PAGE.HOME}
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

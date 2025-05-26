import { Menu } from 'lucide-react'
import { Logo } from './Logo'

export function SidebarHeader({ toggleSidebar }: { toggleSidebar: () => void }) {
	return (
		<div className='flex items-center gap-5 mb-12'>
			{/* ------------------------------ Toggle Button ----------------------------- */}
			<button
				className='hover:text-primary transition-colors duration-200'
				onClick={toggleSidebar}
				title='Toggle sidebar'
				aria-label='Toggle sidebar'
			>
				<Menu />
			</button>

			<Logo isSidebar={true} />
		</div>
	)
}

import { Menu } from 'lucide-react'
import { Logo } from './Logo'

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

			<Logo isSidebar={true} />
		</div>
	)
}

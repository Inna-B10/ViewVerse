import clsx from 'clsx'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Logo } from './Logo'

export function SidebarHeader({
	toggleSidebar,
	isShowedSidebar
}: {
	toggleSidebar: () => void
	isShowedSidebar: boolean
}) {
	const [scrolled, setScrolled] = useState(false)

	useEffect(() => {
		const onScroll = () => {
			setScrolled(window.scrollY > 0)
		}
		window.addEventListener('scroll', onScroll)
		return () => window.removeEventListener('scroll', onScroll)
	}, [])

	return (
		<div className='flex items-center gap-5 mb-12'>
			{/* ------------------------------ Toggle Button ----------------------------- */}
			<button
				className={clsx(
					'rounded hover:text-primary transition-colors duration-200',
					scrolled ? 'fixed z-10 bg-gray-500 top21 left-3 p-2' : '-ml-1'
				)}
				onClick={toggleSidebar}
				title={isShowedSidebar ? 'Collapse sidebar' : 'Open menu'}
				aria-label={isShowedSidebar ? 'Collapse sidebar' : 'Open menu'}
			>
				{isShowedSidebar ? <X size={30} /> : <Menu size={30} />}
			</button>

			<Logo isSidebar={true} />
		</div>
	)
}

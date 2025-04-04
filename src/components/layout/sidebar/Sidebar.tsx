'use client'

import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import { useSidebar } from '@/providers/SidebarContext'
import { STUDIO_PAGE } from '@/config/studio-page.config'
import { SidebarHeader } from './header/SidebarHeader'
import { SidebarMenu } from './menus/SidebarMenu'
import { SidebarSubscriptions } from './menus/subscriptions/SidebarSubscriptions'
import { MORE_SIDEBAR_DATA, SIDEBAR_DATA, STUDIO_SIDEBAR_DATA } from './sidebar.data'

const DynamicLogout = dynamic(() => import('./menus/Logout').then(mod => mod.Logout), {
	ssr: false
})

export function Sidebar() {
	const { isShowedSidebar, toggleSidebar } = useSidebar()

	const pathname = usePathname()

	return (
		<aside className=' p-layout border-r border-border whitespace-nowrap overflow-hidden'>
			<SidebarHeader toggleSidebar={toggleSidebar} />
			{/*----------------------------------- Nav ---------------------------------- */}
			<SidebarMenu
				menu={SIDEBAR_DATA}
				isShowedSidebar={isShowedSidebar}
			/>

			{/* ------------------------------ Subscriptions ----------------------------- */}
			<SidebarSubscriptions />
			{/* --------------------------------- Studio --------------------------------- */}
			{!!pathname.includes(STUDIO_PAGE.STUDIO_HOME) && (
				<SidebarMenu
					title='Studio'
					menu={STUDIO_SIDEBAR_DATA}
					isShowedSidebar={isShowedSidebar}
				/>
			)}
			{/* ---------------------------- More From Youtube --------------------------- */}
			<SidebarMenu
				title='More from ViewVerse'
				menu={MORE_SIDEBAR_DATA}
				isShowedSidebar={isShowedSidebar}
			/>
			<DynamicLogout />
		</aside>
	)
}

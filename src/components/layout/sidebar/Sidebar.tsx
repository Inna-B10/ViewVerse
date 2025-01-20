import dynamic from 'next/dynamic'
import { SidebarHeader } from './header/SidebarHeader'
import { SidebarMenu } from './menus/SidebarMenu'
import { SidebarSubscriptions } from './menus/subscriptions/SidebarSubscriptions'
import { MORE_SIDEBAR_DATA, SIDEBAR_DATA } from './sidebar.data'

const DynamicLogout = dynamic(() => import('./menus/Logout').then(mod => mod.Logout), {
	ssr: false
})

interface SidebarProps {
	toggleSidebar: () => void
	isShowedSidebar: boolean
}

export function Sidebar({ toggleSidebar, isShowedSidebar }: SidebarProps) {
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

			{/* ---------------------------- More From Youtube --------------------------- */}
			<SidebarMenu
				title='More from youtube'
				menu={MORE_SIDEBAR_DATA}
				isShowedSidebar={isShowedSidebar}
			/>
			<DynamicLogout />
		</aside>
	)
}

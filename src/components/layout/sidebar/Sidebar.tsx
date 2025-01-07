import { SidebarHeader } from './header/SidebarHeader'
import { SidebarMenu } from './menus/SidebarMenu'
import { SidebarSubscriptions } from './menus/subscriptions/SidebarSubscriptions'
import { MORE_SIDEBAR_DATA, SIDEBAR_DATA } from './sidebar.data'

export function Sidebar() {
	return (
		<aside className='w-60 p-layout border-r border-border'>
			<SidebarHeader />
			<SidebarMenu menu={SIDEBAR_DATA} />
			<SidebarSubscriptions />
			<SidebarMenu
				title='More from youtube'
				menu={MORE_SIDEBAR_DATA}
			/>
		</aside>
	)
}

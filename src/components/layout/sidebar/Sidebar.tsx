'use client'

import dynamic from 'next/dynamic'
import { useSidebar } from '@/providers/SidebarContext'
import { useVerificationStatus } from '@/hooks/useVerificationStatus'
import { SidebarHeader } from './header/SidebarHeader'
import { SidebarMenu } from './menus/SidebarMenu'
import {
	AUTH_USER_SIDEBAR_DATA,
	MORE_SIDEBAR_DATA,
	SIDEBAR_DATA,
	STUDIO_SIDEBAR_DATA
} from './sidebar.data'
import { useTypedSelector } from '@/store'

const DynamicLogout = dynamic(() => import('./menus/Logout').then(mod => mod.Logout), {
	ssr: false
})

export function Sidebar() {
	const { isShowedSidebar, toggleSidebar } = useSidebar()
	const { isLoggedIn } = useTypedSelector(state => state.auth)
	const hasVerificationToken = useVerificationStatus()
	const isUserVerified = !hasVerificationToken

	return (
		<aside className='p-layout border-r border-border whitespace-nowrap overflow-hidden'>
			<SidebarHeader
				toggleSidebar={toggleSidebar}
				isShowedSidebar={isShowedSidebar}
			/>
			{/*----------------------------------- Nav ---------------------------------- */}
			<SidebarMenu
				menu={SIDEBAR_DATA}
				isShowedSidebar={isShowedSidebar}
				isLoggedIn={isLoggedIn}
			/>
			{isLoggedIn && (
				<>
					<SidebarMenu
						menu={AUTH_USER_SIDEBAR_DATA}
						isShowedSidebar={isShowedSidebar}
						isLoggedIn={isLoggedIn}
					/>
					{/* --------------------------------- Studio --------------------------------- */}
					{isUserVerified && (
						<SidebarMenu
							title='Studio'
							menu={STUDIO_SIDEBAR_DATA}
							isShowedSidebar={isShowedSidebar}
							isLoggedIn={isLoggedIn}
						/>
					)}
				</>
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

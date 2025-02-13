'use client'

import { usePathname } from 'next/navigation'
import { match } from 'path-to-regexp'
import { PAGE } from '@/config/public-page.config'
import { useProfile } from '@/hooks/useProfile'
import { MenuItem } from './MenuItem'
import type { IMenuItemProps } from '@/types/menu.types'

export function MyChannelMenuItem({ item, isActive, isShowedSidebar }: IMenuItemProps) {
	console.log(item.label, isActive, isShowedSidebar)
	const { profile } = useProfile()
	const pathname = usePathname()
	const myChannelLink = profile?.channel?.slug ? PAGE.CHANNEL(profile?.channel?.slug) : null
	if (!myChannelLink) return null

	const isActiveChannelLink = !!match(myChannelLink)(pathname)
	//[FIXME] SUBSCRIPTIONS link does not see/remember isShowedSidebar
	return (
		<MenuItem
			item={{ ...item, link: myChannelLink }}
			isActive={isActiveChannelLink}
			isShowedSidebar={isShowedSidebar}
		/>
	)
}

import {
	Bell,
	CircleAlert,
	Cog,
	Compass,
	Flame,
	FolderHeart,
	Gamepad2,
	History,
	LayoutGrid,
	TvMinimalPlay,
	Upload
} from 'lucide-react'
import { PAGE } from '@/config/public-page.config'
import { STUDIO_PAGE } from '@/config/studio-page.config'
import type { ISidebarItem } from '@/types/sidebar.types'

export const SIDEBAR_DATA: ISidebarItem[] = [
	{
		icon: Compass,
		label: 'Explore',
		link: PAGE.HOME
	},
	{
		icon: Flame,
		label: 'Trending',
		link: PAGE.TRENDING
	},
	{
		icon: Gamepad2,
		label: 'Game videos',
		link: PAGE.GAME_VIDEOS,
		isBottomBorder: true
	}
]
export const AUTH_USER_SIDEBAR_DATA: ISidebarItem[] = [
	{
		icon: FolderHeart,
		label: 'Liked videos',
		link: PAGE.LIKED_VIDEOS
	},
	{
		icon: Bell,
		label: 'Subscription',
		link: PAGE.SUBSCRIPTIONS
	},
	{
		icon: TvMinimalPlay,
		label: 'My channel',
		link: PAGE.MY_CHANNEL
	},
	{
		icon: History,
		label: 'History',
		link: PAGE.HISTORY,
		isBottomBorder: true
	}
]

export const STUDIO_SIDEBAR_DATA: ISidebarItem[] = [
	{
		icon: LayoutGrid,
		label: 'Studio',
		link: STUDIO_PAGE.STUDIO_HOME
	},
	{
		icon: Cog,
		label: 'Settings',
		link: STUDIO_PAGE.SETTINGS
	},
	{
		icon: Upload,
		label: 'Upload a video',
		link: STUDIO_PAGE.UPLOAD_VIDEO,
		isBottomBorder: true
	}
]

export const MORE_SIDEBAR_DATA: ISidebarItem[] = [
	{
		icon: CircleAlert,
		label: 'Send feedback',
		link: PAGE.FEEDBACK
	}
]

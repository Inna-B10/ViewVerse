import {
	CircleAlert,
	CirclePlay,
	Compass,
	Flame,
	FolderHeart,
	Gamepad2,
	History,
	Settings,
	TvMinimalPlay
} from 'lucide-react'
import { PUBLIC_PAGE } from '@/config/public-page.config'
import type { ISidebarItem } from './sidebar.types'

export const SIDEBAR_DATA: ISidebarItem[] = [
	{
		icon: Compass,
		label: 'Explore',
		link: PUBLIC_PAGE.HOME
	},
	{
		icon: Flame,
		label: 'Trending',
		link: PUBLIC_PAGE.TRENDING
	},
	{
		icon: Gamepad2,
		label: 'Video games',
		link: PUBLIC_PAGE.VIDEO_GAMES,
		isBottomBorder: true
	},
	{
		icon: TvMinimalPlay,
		label: 'My channel',
		link: PUBLIC_PAGE.MY_CHANNEL
	},
	{
		icon: CirclePlay,
		label: 'Subscription',
		link: PUBLIC_PAGE.SUBSCRIPTIONS
	},
	{
		icon: History,
		label: 'History',
		link: PUBLIC_PAGE.HISTORY
	},
	{
		icon: FolderHeart,
		label: 'Liked videos',
		link: PUBLIC_PAGE.LIKED_VIDEOS,
		isBottomBorder: true
	}
]

export const MORE_SIDEBAR_DATA: ISidebarItem[] = [
	{
		icon: Settings,
		label: 'Settings',
		link: PUBLIC_PAGE.SETTINGS
	},
	{
		icon: CircleAlert,
		label: 'Send feedback',
		link: PUBLIC_PAGE.FEEDBACK
	}
]

//работает перенаправление только если пользователь на своем канале
//если на другом канале, просто выход из системы, но тогда не обновляется кнопка подписки (только после перезагрузки страницы).
import { useMutation } from '@tanstack/react-query'
import { LogOut } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { PAGE } from '@/config/public-page.config'
import { STUDIO_PAGE } from '@/config/studio-page.config'
import { useAuth } from '@/hooks/useAuth'
import { authService } from '@/services/auth.service'

export function Logout() {
	const router = useRouter()
	const pathname = usePathname()
	const { isLoggedIn, user } = useAuth()

	const logoutMutation = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout(),
		onSuccess: (_, cachedUser) => {
			const isPrivatePage =
				pathname.includes(STUDIO_PAGE.STUDIO_HOME) ||
				pathname.includes(STUDIO_PAGE.SETTINGS) ||
				pathname.includes(PAGE.LIKED_VIDEOS) ||
				pathname.includes(PAGE.PLAYLISTS()) ||
				pathname.includes(PAGE.SUBSCRIPTIONS) ||
				pathname.includes(PAGE.HISTORY)

			const currentChannel = pathname.startsWith('/channel/') ? pathname.split('/')[2] : null

			const isUserChannel = currentChannel?.trim() === cachedUser?.email?.split('@')[0]?.trim()

			if (isPrivatePage || isUserChannel) {
				router.push(PAGE.HOME)
			}
		}
	})

	if (!isLoggedIn) return null

	return (
		<button
			onClick={() => {
				// явно передаём данные в mutate
				const cachedUser = { ...user }
				logoutMutation.mutate(undefined, {
					onSuccess: () => {
						const isPrivatePage =
							pathname.includes(STUDIO_PAGE.STUDIO_HOME) ||
							pathname.includes(STUDIO_PAGE.SETTINGS) ||
							pathname.includes(PAGE.LIKED_VIDEOS) ||
							pathname.includes(PAGE.PLAYLISTS()) ||
							pathname.includes(PAGE.SUBSCRIPTIONS) ||
							pathname.includes(PAGE.HISTORY)

						const currentChannel = pathname.startsWith('/channel/') ? pathname.split('/')[2] : null

						const isUserChannel =
							currentChannel?.trim() === cachedUser?.email?.split('@')[0]?.trim()

						if (isPrivatePage || isUserChannel) {
							router.push(PAGE.HOME)
						}
					}
				})
			}}
			className='group flex items-center gap-5 py-2 hover:text-primary transition-colors duration-200'
			title='Logout'
		>
			<LogOut className='min-w-6 pb-[3px] group-hover:rotate-6' />
			<span>{logoutMutation.isPending ? 'Please wait...' : 'Logout'}</span>
		</button>
	)
}

import { useMutation } from '@tanstack/react-query'
import cn from 'clsx'
import { LogOut } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { PAGE } from '@/config/public-page.config'
import { STUDIO_PAGE } from '@/config/studio-page.config'
import { useAuth } from '@/hooks/useAuth'
import { authService } from '@/services/auth.service'

export function Logout() {
	const router = useRouter()
	const pathname = usePathname()

	const { mutate, isPending } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout(),
		onSuccess: () => {
			const isPrivatePage =
				pathname.includes(STUDIO_PAGE.STUDIO_HOME) ||
				pathname.includes(STUDIO_PAGE.SETTINGS) ||
				pathname.includes(PAGE.LIKED_VIDEOS) ||
				pathname.includes(PAGE.PLAYLISTS()) ||
				pathname.includes(PAGE.SUBSCRIPTIONS) ||
				pathname.includes(PAGE.HISTORY)

			const isChannelPage = pathname.startsWith('/channel/')

			if (isPrivatePage || isChannelPage) {
				router.push(PAGE.HOME)
			}
		}
	})
	const { isLoggedIn } = useAuth()

	if (!isLoggedIn) return null

	return (
		<button
			onClick={() => mutate()}
			className={
				'group flex items-center gap-5 py-2 hover:text-primary transition-colors duration-200'
			}
			title='Logout'
		>
			<LogOut className={cn('min-w-6 pb-[3px] group-hover:rotate-6')} />
			<span>{isPending ? 'Please wait...' : 'Logout'}</span>
		</button>
	)
}

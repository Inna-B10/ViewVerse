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
		onSuccess: (_: unknown, cachedUser: { email?: string } | undefined) => {
			const isPrivatePage = pathname.includes(STUDIO_PAGE.STUDIO_HOME) || pathname.includes('/user')

			const currentChannel = pathname.startsWith('/channel/') ? pathname.split('/')[2] : null

			const isUserChannel =
				currentChannel?.trim() &&
				cachedUser?.email &&
				currentChannel.trim() === cachedUser.email.split('@')[0].trim()

			if (isPrivatePage || isUserChannel) {
				router.push(PAGE.HOME)
			}
		}
	})
	const { isLoggedIn } = useAuth()

	if (!isLoggedIn) return null

	return (
		<button
			onClick={() => mutate(undefined)}
			className={
				'group flex items-center gap-5 py-2 hover:text-primary transition-colors duration-200'
			}
			title='Logout'
			aria-label='Logout'
		>
			<LogOut className={cn('min-w-6 pb-[3px] group-hover:rotate-6')} />
			<span>{isPending ? 'Please wait...' : 'Logout'}</span>
		</button>
	)
}

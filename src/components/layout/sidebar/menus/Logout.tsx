import { useMutation } from '@tanstack/react-query'
import cn from 'clsx'
import { LogOut } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { PAGE } from '@/config/public-page.config'
import { STUDIO_PAGE } from '@/config/studio-page.config'
import { authService } from '@/services/auth.service'
import { useTypedSelector } from '@/store'

export function Logout() {
	const router = useRouter()
	const pathname = usePathname()

	const { mutate, isPending } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout(),
		onSuccess: () => {
			if (pathname.includes(STUDIO_PAGE.STUDIO_HOME) || pathname.includes(STUDIO_PAGE.SETTINGS)) {
				router.push(PAGE.HOME)
			}
		}
	})

	const { isLoggedIn } = useTypedSelector(state => state.auth)

	if (!isLoggedIn) return null

	return (
		<button
			onClick={() => mutate()}
			className={'group flex items-center gap-5 py-2 hover:text-primary transition-colors '}
		>
			<LogOut className={cn('min-w-6 pb-[3px] group-hover:rotate-6')} />
			<span>{isPending ? 'Please wait...' : 'Logout'}</span>
		</button>
	)
}

import { LogIn } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { LinkButton } from '@/ui/button/LinkButton'
import { PAGE } from '@/config/public-page.config'
import { STUDIO_PAGE } from '@/config/studio-page.config'
import { useTypedSelector } from '@/store'

export function HeaderProfile() {
	const { isLoggedIn } = useTypedSelector(state => state.auth)

	return isLoggedIn ? (
		<Link
			href={STUDIO_PAGE.SETTINGS}
			className='shrink-0'
		>
			{/* [TODO]:  Auth Avatar*/}
			<Image
				src='/uploads/avatars/tomorrow.jpg'
				alt=''
				width={40}
				height={40}
				className='rounded-lg'
			/>
		</Link>
	) : (
		<LinkButton href={PAGE.AUTH}>
			<LogIn size={20} />
			Auth
		</LinkButton>
	)
}

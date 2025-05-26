import cn from 'clsx'
import { SquarePlay } from 'lucide-react'
import Link from 'next/link'
import { COLORS } from '@/constants/colors.constants'
import { PAGE } from '@/config/public-page.config'

interface LogoProps {
	isSidebar: boolean
}
export function Logo({ isSidebar = true }: LogoProps) {
	return (
		<Link
			href={PAGE.HOME}
			className='inline-flex items-center gap-1.5'
			title='ViewVerse - home page'
			aria-label='ViewVerse - home page'
		>
			<SquarePlay
				color={COLORS.primary}
				size={isSidebar ? 26 : 34}
			/>
			<h1
				className={cn('font-philosopher text-2xl font-bold  text-primary', {
					'text-[2.5rem]': !isSidebar
				})}
			>
				ViewVerse
			</h1>
		</Link>
	)
}

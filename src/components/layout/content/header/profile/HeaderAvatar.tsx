import Image from 'next/image'
import Link from 'next/link'
import { SkeletonLoader } from '@/ui/SkeletonLoader'
import { PAGE } from '@/config/public-page.config'
import { useProfile } from '@/hooks/useProfile'

export function HeaderAvatar() {
	const { isLoading, profile } = useProfile()

	if (isLoading) return <SkeletonLoader className='w-10 mb-0 rounded-md' />

	return (
		<div className='relative'>
			<Link
				href={PAGE.USER_SETTINGS}
				className='shrink-0'
				title='User settings'
				aria-label='Open user settings'
			>
				<Image
					src={profile?.avatarUrl || '/images/default/default-avatar.png'}
					alt=''
					width={40}
					height={40}
					className='rounded-lg'
				/>
			</Link>
			{profile?.verificationToken && (
				<div className='absolute -left-4 -bottom-3.5 bg-red-600 rounded whitespace-nowrap text-xs w-max px-1'>
					Not verified!
				</div>
			)}
		</div>
	)
}

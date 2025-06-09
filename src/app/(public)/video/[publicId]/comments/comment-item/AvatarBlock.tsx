import Image from 'next/image'
import Link from 'next/link'
import { PAGE } from '@/config/public-page.config'
import type { IChannel } from '@/types/channel.types'
import type { IUser } from '@/types/user.types'

interface Props {
	user: IUser & { channel?: IChannel }
}

export function AvatarBlock({ user }: Props) {
	if (user?.channel) {
		return (
			<Link
				href={PAGE.CHANNEL(user.channel.slug || '')}
				title={`Open channel: ${user.channel.slug}` || ''}
				aria-label={`Open channel: ${user.channel.slug}` || ''}
			>
				<Image
					alt={`${user.name}'s avatar` || ''}
					src={user.avatarUrl || '/images/default/default-avatar.png'}
					width={40}
					height={40}
					className='rounded flex-shrink-0 shadow-md'
				/>
			</Link>
		)
	}
	return (
		<div className='min-w-max h-10 pt-1'>
			<Image
				alt="Guest's avatar"
				src='/images/default/default-avatar.png'
				width={40}
				height={40}
				className='rounded flex-shrink-0 shadow-md'
				title={user?.name || 'Guest'}
			/>
		</div>
	)
}

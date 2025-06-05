import Image from 'next/image'
import Link from 'next/link'
import { PAGE } from '@/config/public-page.config'
import type { IChannel } from '@/types/channel.types'
import type { IUser } from '@/types/user.types'

interface Props {
	// user: ISingleVideoResponse['comments'][0]['user']
	user: IUser & { channel?: IChannel }
}

export function AvatarBlock({ user }: Props) {
	if (user?.channel) {
		return (
			<Link
				href={PAGE.CHANNEL(user.channel.slug || '')}
				title={`Open ${user.name} channel` || ''}
				aria-label={`Open ${user.name} channel` || ''}
			>
				<Image
					alt={user.name || ''}
					src={user.channel?.avatarUrl || '/images/default/default-avatar.png'}
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
				alt='Guest avatar'
				src='/images/default/default-avatar.png'
				width={40}
				height={40}
				className='rounded flex-shrink-0 shadow-md'
				title={user?.name || 'Guest'}
			/>
		</div>
	)
}

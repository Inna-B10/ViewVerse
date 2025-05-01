import Link from 'next/link'
import { PAGE } from '@/config/public-page.config'
import { VerifiedBadge } from './VerifiedBadge'
import type { IChannel } from '@/types/channel.types'

interface IVideoChannelName {
	channel: IChannel
}

export function VideoChannelName({ channel }: IVideoChannelName) {
	return (
		<Link
			href={PAGE.CHANNEL(channel?.slug || '')}
			className='flex items-center gap-1'
		>
			<span className='text-gray-400 text-sm'>{channel?.user?.name || ''}</span>
			{channel.isVerified && <VerifiedBadge />}
		</Link>
	)
}

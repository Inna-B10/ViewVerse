import Link from 'next/link'
import { twMerge } from 'tailwind-merge'
import { PAGE } from '@/config/public-page.config'
import { VerifiedBadge } from '../VerifiedBadge'
import type { IChannel } from '@/types/channel.types'

interface IVideoChannelName {
	channel: IChannel
	spanClassName?: string
}

export function VideoChannelName({ channel, spanClassName }: IVideoChannelName) {
	return (
		<Link
			href={PAGE.CHANNEL(channel?.slug || '')}
			className='flex items-center gap-1 w-fit'
			title={`channel: ${channel?.user.name}` || ''}
		>
			<span className={twMerge('text-gray-400 text-sm', spanClassName)}>
				{channel?.user?.name || ''}
			</span>
			{channel.isVerified && <VerifiedBadge />}
		</Link>
	)
}

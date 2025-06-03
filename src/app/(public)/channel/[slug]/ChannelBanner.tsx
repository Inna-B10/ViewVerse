import Image from 'next/image'
import type { IChannel } from '@/types/channel.types'

interface Props {
	channel: IChannel
}

export function ChannelBanner({ channel }: Props) {
	return (
		<div className='relative w-full h-[249px] rounded-lg overflow-hidden shadow-md'>
			<Image
				alt={channel.user.name || ''}
				src={channel.bannerUrl || '/images/default/default-banner.jpg'}
				fill
				className='object-cover'
				quality={90}
				priority
			/>
		</div>
	)
}

'use client'

import dynamicNext from 'next/dynamic'
import Image from 'next/image'
import { Heading } from '@/ui/Heading'
import { SkeletonLoader } from '@/ui/SkeletonLoader'
import { VerifiedBadge } from '@/ui/VerifiedBadge'
import { transformCount } from '@/utils/transform-count'
import { ChannelBanner } from './ChannelBanner'
import type { IChannel } from '@/types/channel.types'

const DynamicSubscribeButton = dynamicNext(
	() => import('@/components/SubscribeButton').then(mod => mod.SubscribeButton),
	{
		ssr: false,
		loading: () => <SkeletonLoader className='w-36 h-10 rounded-md' />
	}
)

export function ChannelSubPage({ channel }: { channel: IChannel }) {
	return (
		<>
			<ChannelBanner channel={channel} />
			<div className='flex gap-5 mt-7 mb-12 w-1/2'>
				<Image
					alt={channel.slug}
					src={channel.avatarUrl || '/default-avatar.png'}
					width={100}
					height={100}
					quality={90}
					priority
					className='object-cover rounded-lg flex-shrink-0 shadow-md w-[150px] h-auto'
				/>
				<div className='flex flex-col justify-between'>
					<Heading>
						{channel.user.name} {channel.isVerified && <VerifiedBadge size={16} />}
					</Heading>

					<div className='mb-2 text-gray-400 text-xs whitespace-nowrap flex items-center gap-1'>
						<span>@{channel.slug}</span>
						<span>♦</span>
						<span>{transformCount(channel.subscribers.length)} subscribers</span>
						<span>♦</span>
						<span>{channel.videos.length} videos</span>
					</div>
					<article className='mb-4 text-gray-200 text-sm leading-snug'>
						{channel.description}
					</article>
					<DynamicSubscribeButton slug={channel.slug} />
				</div>
			</div>
		</>
	)
}

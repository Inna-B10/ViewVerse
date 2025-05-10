'use client'

import { useMutation } from '@tanstack/react-query'
import { Bell } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { PAGE } from '@/config/public-page.config'
import { useProfile } from '@/hooks/useProfile'
import { Button } from './ui/button/Button'
import { channelService } from '@/services/channel.service'

export function SubscribeButton({
	slug,
	videoChannelSlug
}: {
	slug: string
	videoChannelSlug?: string
}) {
	const router = useRouter()
	const { profile, refetch } = useProfile()
	const pathname = usePathname()

	const { mutate } = useMutation({
		mutationKey: ['subscribe'],
		mutationFn: () => channelService.toggleSubscribe(slug),
		onSuccess: () => {
			refetch()
		}
	})

	const clickHandler = () => {
		if (profile) {
			mutate()
		} else {
			router.push(PAGE.AUTH)
		}
	}

	const isOwner =
		profile?.channel?.slug === pathname.split('/')[2].trim() ||
		profile?.channel?.slug === videoChannelSlug

	const isSubscribed = profile?.subscriptions.some(sub => sub.slug === slug)

	return (
		<Button
			onClick={clickHandler}
			variant={isSubscribed ? 'secondary' : 'primary'}
			title={isSubscribed ? 'Unsubscribe' : 'Subscribe'}
			disabled={isOwner}
		>
			{isSubscribed ? (
				<div className='fill-[#fff] transition-colors duration-200'>
					<Bell
						size={18}
						className='inline mr-1'
					/>
					Subscribed
				</div>
			) : (
				<div className='pr-[0.60rem]  transition-colors duration-200'>
					<Bell
						className='inline mr-1'
						size={18}
					/>
					Subscribe
				</div>
			)}
		</Button>
	)
}

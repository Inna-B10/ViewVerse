'use client'

import { useMutation } from '@tanstack/react-query'
import { Bell } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { PAGE } from '@/config/public-page.config'
import { useProfile } from '@/hooks/useProfile'
import { Button } from './ui/button/Button'
import { channelService } from '@/services/channel.service'

export function SubscribeButton({ slug }: { slug: string }) {
	const router = useRouter()
	const { profile, refetch } = useProfile()

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

	const isSubscribed = profile?.subscriptions.some(sub => sub.slug === slug)

	return (
		<Button
			onClick={clickHandler}
			variant={isSubscribed ? 'secondary' : 'primary'}
		>
			{isSubscribed ? (
				<>
					<Bell
						className='mr-1 inline  fill-[#fff]'
						size={18}
					/>
					Subscribed
				</>
			) : (
				<div style={{ ['paddingRight' as string]: '0.65rem' }}>
					<Bell
						className='mr-1 inline'
						size={18}
					/>
					Subscribe
				</div>
			)}
		</Button>
	)
}

'use client'

import { Cog } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { Heading } from '@/ui/Heading'
import { SkeletonLoader } from '@/ui/SkeletonLoader'
import { Button } from '@/ui/button/Button'
import { useProfile } from '@/hooks/useProfile'

const DynamicChannelSettingsForm = dynamic(
	() => import('./ChannelSettingsForm').then(mod => mod.ChannelSettingsForm),
	{
		ssr: false,
		loading: () => (
			<div className='w-3/4 mt-24'>
				<SkeletonLoader
					className='mb-8 rounded-md h-36'
					count={3}
				/>
			</div>
		)
	}
)

export function ChannelSettingsDynPage() {
	const { profile } = useProfile()
	const isExistChannel = !!profile?.channel?.slug
	const [isShowForm, setIsShowForm] = useState(isExistChannel)

	useEffect(() => {
		return () => {
			setIsShowForm(isExistChannel)
		}
	}, [isExistChannel])

	return (
		<div>
			<Heading
				Icon={Cog}
				isPageHeading
			>
				{isExistChannel ? 'Channel settings' : 'Create channel'}
			</Heading>
			{isShowForm ? (
				<DynamicChannelSettingsForm isExistChannel={isExistChannel} />
			) : (
				<Button onClick={() => setIsShowForm(true)}>Create</Button>
			)}
		</div>
	)
}

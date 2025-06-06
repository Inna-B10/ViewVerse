'use client'

import { Cog } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Heading } from '@/ui/Heading'
import { Button } from '@/ui/button/Button'
import { useProfile } from '@/hooks/useProfile'
import { ChannelSettingsForm } from './ChannelSettingsForm'

// export const metadata: Metadata = {
// 	title: 'Settings',
// 	...NO_INDEX_PAGE
// }

export default function ChannelSettingsPage() {
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
				<ChannelSettingsForm isExistChannel={isExistChannel} />
			) : (
				<Button onClick={() => setIsShowForm(true)}>Create</Button>
			)}
		</div>
	)
}

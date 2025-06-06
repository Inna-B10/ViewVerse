import { SquareUserRound } from 'lucide-react'
import type { Metadata } from 'next'
import { Heading } from '@/ui/Heading'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { UserSettingsForm } from './UserSettingsForm'

export const metadata: Metadata = {
	title: 'Settings',
	...NO_INDEX_PAGE
}

export default function SettingsPage() {
	return (
		<div>
			<Heading
				Icon={SquareUserRound}
				isPageHeading
			>
				User settings
			</Heading>

			<UserSettingsForm />
		</div>
	)
}

import { Cog } from 'lucide-react'
import type { Metadata } from 'next'
import { Heading } from '@/ui/Heading'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { SettingsForm } from './SettingsForm'

export const metadata: Metadata = {
	title: 'Settings',
	...NO_INDEX_PAGE
}

export default function SettingsPage() {
	return (
		<div className='flex items-center gap-1.5 opacity-90 mb-4'>
			<Heading
				Icon={Cog}
				isPageHeading
			>
				Settings
			</Heading>

			<SettingsForm />
		</div>
	)
}

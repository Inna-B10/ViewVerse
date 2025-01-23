import { Bell, LayoutGrid, PlusSquare } from 'lucide-react'
import Link from 'next/link'
import { STUDIO_PAGE } from '@/config/studio-page.config'

export function HeaderLinks() {
	return (
		<div className='flex items-center gap-2 lg:gap-4'>
			<Link
				href={STUDIO_PAGE.UPLOAD_VIDEO}
				title='upload video'
				className='transition-opacity opacity-50 hover:opacity-100'
			>
				<PlusSquare size={20} />
			</Link>
			<Link
				href={STUDIO_PAGE.HOME}
				title='studio'
				className='transition-opacity opacity-50 hover:opacity-100'
			>
				<LayoutGrid size={20} />
			</Link>
			<Link
				href={STUDIO_PAGE.HOME}
				title='notifications'
				className='transition-opacity opacity-50 hover:opacity-100'
			>
				<Bell size={20} />
			</Link>
		</div>
	)
}

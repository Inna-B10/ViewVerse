import { Info, LayoutGrid, PlusSquare } from 'lucide-react'
import Link from 'next/link'
import { STUDIO_PAGE } from '@/config/studio-page.config'

export function HeaderLinks() {
	return (
		<div className='flex items-center gap-2 lg:gap-4'>
			<Link
				href={STUDIO_PAGE.UPLOAD_VIDEO}
				title='Upload video'
				className='transition-opacity opacity-50 hover:opacity-100 duration-200'
			>
				<PlusSquare size={20} />
			</Link>
			<Link
				href={STUDIO_PAGE.STUDIO_HOME}
				title='Studio'
				className='transition-opacity opacity-50 hover:opacity-100 duration-200'
			>
				<LayoutGrid size={20} />
			</Link>
			<Link
				href={STUDIO_PAGE.STUDIO_HOME}
				title='Notifications'
				className='transition-opacity opacity-50 hover:opacity-100 duration-200'
			>
				<Info size={20} />
			</Link>
		</div>
	)
}

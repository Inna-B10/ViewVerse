import Image from 'next/image'
import Link from 'next/link'
import { STUDIO_PAGE } from '@/config/studio-page.config'

export function HeaderProfile() {
	return (
		<Link
			href={STUDIO_PAGE.SETTINGS}
			className='shrink-0'
		>
			{/* [TODO]:  Auth Avatar*/}
			<Image
				src='/uploads/avatars/tomorrow.jpg'
				alt=''
				width={40}
				height={40}
				className='rounded-lg'
			/>
		</Link>
	)
}

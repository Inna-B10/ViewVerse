'use client'

import { Check } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { PAGE } from '@/config/public-page.config'

export default function VerifiedPage() {
	const router = useRouter()

	useEffect(() => {
		setTimeout(() => {
			router.push(PAGE.HOME)
		}, 2500)
	}, [router])

	return (
		<div className='mx-auto max-w-fit mt-24 p-20 pt-24 rounded-md text-center border border-border bg-field'>
			<h2 className='font-medium text-3xl mb-5 inline-flex gap-2 items-center'>
				<Check
					size={50}
					className='text-green-500'
				/>{' '}
				Email successfully verified!
			</h2>
		</div>
	)
}

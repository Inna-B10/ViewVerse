import { Check } from 'lucide-react'

export default function VerifiedPage() {
	return (
		<div className='mx-auto w-1/2 mt-24 text-center'>
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

import { BadgeCheck } from 'lucide-react'

export function VerifiedBadge({ size = 14 }: { size?: number }) {
	return (
		<span>
			<BadgeCheck
				className='text-green-500 h-auto inline'
				size={size}
			/>
		</span>
	)
}

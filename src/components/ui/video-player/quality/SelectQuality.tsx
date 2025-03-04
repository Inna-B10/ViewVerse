'use client'

import { AnimatePresence, m } from 'framer-motion'
import { twMerge } from 'tailwind-merge'
import { useOutside } from '@/hooks/useOutside'
import { VIDEO_QUALITIES } from './quality.data'
import type { EnumVideoPlayerQuality } from '@/types/video-player.types'

interface Props {
	currentValue: EnumVideoPlayerQuality
	onChange: (quality: EnumVideoPlayerQuality) => void
}

export function SelectQuality({ currentValue, onChange }: Props) {
	const { isShow, ref, setIsShow } = useOutside(false)

	return (
		<div
			className='relative'
			ref={ref}
		>
			<button
				onClick={() => setIsShow(!isShow)}
				className='transition-colors hover:text-primary'
			>
				{currentValue}
			</button>

			<AnimatePresence>
				{isShow && (
					<m.ul
						className='bg-bg/80 py-2 px-4 rounded absolute bottom-[160%] -left-4 z-10 shadow'
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 10 }}
						transition={{ duration: 0.3 }}
					>
						{VIDEO_QUALITIES.map(quality => (
							<li
								key={quality}
								className='mb-1'
							>
								<button
									onClick={() => {
										onChange(quality)
										setIsShow(false)
									}}
									className={twMerge(
										'transition-colors hover:text-primary',
										quality === currentValue && ' text-primary'
									)}
									disabled={quality === currentValue ? true : false}
								>
									{quality}
								</button>
							</li>
						))}
					</m.ul>
				)}
			</AnimatePresence>
		</div>
	)
}

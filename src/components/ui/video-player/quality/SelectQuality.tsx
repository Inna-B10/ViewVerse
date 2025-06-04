'use client'

import { AnimatePresence, m } from 'framer-motion'
import { twMerge } from 'tailwind-merge'
import { useOutside } from '@/hooks/useOutside'
import { VIDEO_QUALITIES } from './quality.data'
import { EnumVideoPlayerQuality } from '@/types/video-player.types'

interface Props {
	currentValue: EnumVideoPlayerQuality | null
	onChange: (quality: EnumVideoPlayerQuality) => void
	maxResolution: EnumVideoPlayerQuality
}

export function SelectQuality({ currentValue, onChange, maxResolution }: Props) {
	const { isShow, ref, setIsShow } = useOutside(false) as {
		isShow: boolean
		ref: React.RefObject<HTMLDivElement>
		setIsShow: (value: boolean) => void
	}

	const availableQualities = VIDEO_QUALITIES.slice(VIDEO_QUALITIES.indexOf(maxResolution))

	return (
		<div
			className='relative'
			ref={ref}
		>
			<button
				title='Change video quality'
				aria-label='Change video quality'
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
						{availableQualities.map(quality => (
							<li
								key={quality}
								className='mb-1'
							>
								<button
									title='Select this quality'
									aria-label='Select this quality'
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

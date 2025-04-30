import cn from 'clsx'
import { type ChangeEvent, useState } from 'react'
import { COLORS } from '@/constants/colors.constants'
import { getTime } from '../video-player.utils'

interface Props {
	currentTime: number
	duration: number
	progress: number
	onSeek: (time: number) => void
}

export function PlayerProgressBar({ currentTime, progress, duration, onSeek }: Props) {
	const [isDragging, setIsDragging] = useState(false)

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = Number(event.target.value)
		onSeek(value)
	}

	const handleMouseUp = () => {
		setIsDragging(false)
	}

	return (
		<div
			className='relative w-full flex items-center rounded '
			style={{
				backgroundColor: 'rgb(196 196 196 / 60%)'
			}}
		>
			<div
				className='absolute top-0 left-0 h-1.5 rounded'
				style={{
					width: `${progress}%`,
					backgroundColor: COLORS.primary,
					transition: 'width 0.1s ease'
				}}
			/>

			<div
				className={cn(
					'absolute -top-10 left-0 text-[#353535] font-semibold text-sm transition-opacity duration-200 min-w-fit px-2 py-1 rounded-md bg-[#f4f4f4]',
					isDragging ? 'opacity-100' : 'opacity-0'
				)}
				style={{
					left: `calc(${progress}% - 20px)`,
					boxShadow: 'inset 0 0 2px 1px #6e6e6e'
				}}
			>
				{getTime(currentTime)}
			</div>
			<input
				type='range'
				min={0}
				max={duration || 1}
				value={currentTime}
				onChange={handleChange}
				onMouseDown={() => setIsDragging(true)}
				onMouseUp={handleMouseUp}
				onTouchEnd={handleMouseUp}
				className='w-full h-1.5 opacity-0 appearance-none pointer-events-auto cursor-pointer'
			/>
		</div>
	)
}

'use client'

import { Maximize, Pause, Play, RectangleHorizontal } from 'lucide-react'
import { useVideoPlayer } from '@/ui/video-player/use-video-player/useVideoPlayer'
import { PlayerProgressBar } from './progress-bar/PlayerProgressBar'
import { SelectQuality } from './quality/SelectQuality'
import { getTime } from './video-player.utils'
import { VolumeControl } from './volume/VolumeControl'
import { EnumVideoPlayerQuality } from '@/types/video-player.types'

export function VideoPlayer({
	fileName,
	toggleTheaterMode
}: {
	fileName: string
	toggleTheaterMode: () => void
}) {
	const { fn, playerRef, state } = useVideoPlayer({ fileName, toggleTheaterMode })

	//[FIXME] not every video has all quality options
	//[FIXME] not valid video duration on first loading
	return (
		<div className='relative rounded-2xl overflow-hidden mb-5'>
			{/* ---------------------------------- Video --------------------------------- */}
			<video
				ref={playerRef}
				className='aspect-video'
				controls={false}
				src={`/uploads/videos/${EnumVideoPlayerQuality['1080p']}/${fileName}`}
				preload='metadata'
			/>

			<div className='flex items-center justify-between absolute  bottom-5 left-5 right-5'>
				<div className='flex items-center gap-4'>
					{/* -------------------------------- Btn Play -------------------------------- */}
					<button
						onClick={fn.togglePlayPause}
						className='transition-colors hover:text-primary'
					>
						{state.isPlaying ? <Pause /> : <Play />}
					</button>
					{/* ------------------------------- ProgressBar ------------------------------ */}
					<PlayerProgressBar progress={state.progress} />

					<div>
						<span>{getTime(state.videoTime)}</span>
					</div>
				</div>
				<div className='flex items-center gap-5'>
					{/* ----------------------------- Volume Control ----------------------------- */}
					<VolumeControl
						changeVolume={fn.changeVolume}
						toggleMute={fn.toggleMute}
						value={state.volume}
						isMuted={state.isMuted}
					/>
					{/* ------------------------------ Video Quality ----------------------------- */}
					<SelectQuality
						currentValue={state.quality}
						onChange={fn.changeQuality}
					/>
					{/* ------------------------------ Theater Mode ------------------------------ */}
					<button
						className='transition-colors hover:text-primary'
						onClick={toggleTheaterMode}
					>
						<RectangleHorizontal />
					</button>
					{/* ----------------------------- Btn Full Screen ---------------------------- */}
					<button
						onClick={fn.toggleFullScreen}
						className='hoverPrimary'
					>
						<Maximize />
					</button>
				</div>
			</div>
		</div>
	)
}

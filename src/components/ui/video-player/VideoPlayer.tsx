'use client'

import { Lightbulb, LightbulbOff, Maximize, Pause, Play, RectangleHorizontal } from 'lucide-react'
import { PlayerProgressBar } from './progress-bar/PlayerProgressBar'
import { SelectQuality } from './quality/SelectQuality'
import { useVideoPlayer } from './use-video-player/useVideoPlayer'
import { getTime } from './video-player.utils'
import { VolumeControl } from './volume/VolumeControl'
import { EnumVideoPlayerQuality } from '@/types/video-player.types'

interface Props {
	fileName: string
	toggleTheaterMode: () => void
	maxResolution: EnumVideoPlayerQuality
}

export function VideoPlayer({ fileName, toggleTheaterMode, maxResolution }: Props) {
	const { fn, playerRef, bgRef, state } = useVideoPlayer({ fileName, toggleTheaterMode })

	//[FIXME] not valid video duration on first loading
	return (
		<div className='relative rounded-2xl'>
			{state.isBacklightMode && (
				<video
					ref={bgRef}
					className='absolute top-0 mx-auto width-full object-center object-cover filter blur-3xl scale-[1.02] brightness-90 contrast-125 saturate-150 rounded-xl'
					src={`/uploads/videos/${EnumVideoPlayerQuality['720p']}/${fileName}`}
					muted
				/>
			)}
			<video
				ref={playerRef}
				className='aspect-video width-full mx-auto relative z-[1] rounded-xl'
				controls={false}
				src={`/uploads/videos/${EnumVideoPlayerQuality['1080p']}/${fileName}`}
				preload='metadata'
			/>

			<div className='grid grid-cols-[7fr_1fr] gap-7 absolute bottom-5 left-5 right-5 z-[1]'>
				<div className='flex items-center gap-4 w-full'>
					{/* //[FIXME] pause btn not changes to play btn at the end of video */}
					{/* -------------------------------- Btn Play -------------------------------- */}
					<button
						onClick={fn.togglePlayPause}
						className='transition-colors hover:text-primary'
						title='Play/pause'
					>
						{state.isPlaying ? <Pause /> : <Play />}
					</button>
					{/* ------------------------------- ProgressBar ------------------------------ */}
					<PlayerProgressBar
						currentTime={state.currentTime}
						duration={state.videoTime}
						onSeek={fn.onSeek}
					/>

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
						maxResolution={maxResolution}
					/>
					{/* ---------------------------- Btn Backlight Mode ---------------------------- */}
					<button
						className='transition-colors hover:text-primary'
						onClick={fn.toggleBacklightMode}
						title={state.isBacklightMode ? 'Lightning off' : 'Lightning on'}
					>
						{state.isBacklightMode ? <Lightbulb /> : <LightbulbOff />}
					</button>
					{/* ------------------------------ Theater Mode ------------------------------ */}
					<button
						className='transition-colors hover:text-primary'
						onClick={toggleTheaterMode}
						title='Theater mode'
					>
						<RectangleHorizontal />
					</button>
					{/* ----------------------------- Btn Full Screen ---------------------------- */}
					<button
						onClick={fn.toggleFullScreen}
						className='transition-colors hover:text-primary'
						title='Full screen'
					>
						<Maximize />
					</button>
				</div>
			</div>
		</div>
	)
}

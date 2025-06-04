import { Lightbulb, LightbulbOff, Maximize, Pause, Play, RectangleHorizontal } from 'lucide-react'
import { PlayerProgressBar } from './progress-bar/PlayerProgressBar'
import { SelectQuality } from './quality/SelectQuality'
import { getTime } from './video-player.utils'
import { VolumeControl } from './volume/VolumeControl'
import { EnumVideoPlayerQuality } from '@/types/video-player.types'

interface PlayerState {
	isPlaying: boolean
	currentTime: number
	videoTime: number
	volume: number
	isMuted: boolean
	quality: string | null
	isBacklightMode: boolean
}

interface Props {
	state: PlayerState
	maxResolution: EnumVideoPlayerQuality
	toggleTheaterMode: () => void
	fn: {
		togglePlayPause: () => void
		onSeek: (time: number) => void
		changeVolume: (volume: number) => void
		toggleMute: () => void
		changeQuality: (quality: EnumVideoPlayerQuality) => void
		toggleBacklightMode: () => void
		toggleFullScreen: () => void
	}
}

export function PlayerControls({ state, fn, maxResolution, toggleTheaterMode }: Props) {
	return (
		<div className='grid grid-cols-[7fr_1fr] gap-7 absolute bottom-5 left-5 right-5 z-[1] py-1  px-2 hover:rounded hover:bg-[#9c9c9c70] transition-all duration-300'>
			<div className='flex items-center gap-4 w-full'>
				{/* -------------------------------- Btn Play -------------------------------- */}
				<button
					onClick={fn.togglePlayPause}
					className='transition-colors hover:text-primary'
					title={state.isPlaying ? 'Pause' : 'Play'}
					aria-label={state.isPlaying ? 'Pause' : 'Play'}
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
					currentValue={state.quality as EnumVideoPlayerQuality | null}
					onChange={fn.changeQuality}
					maxResolution={maxResolution}
				/>
				{/* ---------------------------- Btn Backlight Mode ---------------------------- */}
				<button
					onClick={fn.toggleBacklightMode}
					className='transition-colors hover:text-primary'
					title={state.isBacklightMode ? 'Lightning off' : 'Lightning on'}
					aria-label={state.isBacklightMode ? 'Lightning off' : 'Lightning on'}
				>
					{state.isBacklightMode ? <Lightbulb /> : <LightbulbOff />}
				</button>
				{/* ------------------------------ Theater Mode ------------------------------ */}
				<button
					onClick={toggleTheaterMode}
					className='transition-colors hover:text-primary'
					title='View in theater mode'
					aria-label='View in theater mode'
				>
					<RectangleHorizontal />
				</button>
				{/* ----------------------------- Btn Full Screen ---------------------------- */}
				<button
					onClick={fn.toggleFullScreen}
					className='transition-colors hover:text-primary'
					title='View in full screen'
					aria-label='View in full screen'
				>
					<Maximize />
				</button>
			</div>
		</div>
	)
}

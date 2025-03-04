'use client'

import { Maximize, Pause, Play } from 'lucide-react'
import { useVideoPlayer } from '@/hooks/useVideoPlayer'
import { PlayerProgressBar } from './progress-bar/PlayerProgressBar'
import { SelectQuality } from './quality/SelectQuality'
import { EnumVideoPlayerQuality } from '@/types/video-player.types'

export function VideoPlayer({ fileName }: { fileName: string }) {
	const { fn, playerRef, state } = useVideoPlayer({ fileName })

	//[TODO] not every video has all quality options
	return (
		<div className='relative rounded-lg overflow-hidden'>
			<video
				ref={playerRef}
				className='w-full h-full aspect-video'
				controls={false}
				src={`/uploads/videos/${EnumVideoPlayerQuality['1080p']}/${fileName}`}
				preload='metadata'
			/>

			<div className='flex items-center justify-between p-3 relative'>
				<div className='flex items-center gap-4'>
					<button
						onClick={fn.togglePlayPause}
						className='transition-colors hover:text-primary'
					>
						{state.isPlaying ? <Pause /> : <Play />}
					</button>
					<PlayerProgressBar progress={state.progress} />

					<div>
						<span>
							{Math.floor(state.videoTime / 60) +
								':' +
								('0' + Math.floor(state.videoTime % 60)).slice(-2)}
						</span>
					</div>
				</div>
				<div className='flex items-center gap-5'>
					<SelectQuality
						currentValue={state.quality}
						onChange={fn.changeQuality}
					/>
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

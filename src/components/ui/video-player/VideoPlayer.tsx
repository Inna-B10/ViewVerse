'use client'

import { Lightbulb, LightbulbOff, Maximize, Pause, Play, RectangleHorizontal } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useUpdateViews } from '@/hooks/useUpdateViews'
import { findPrimaryAndBackgroundVideo } from '@/utils/findMainAndBackgroundVideo'
import { SkeletonLoader } from '../SkeletonLoader'
import { PlayerProgressBar } from './progress-bar/PlayerProgressBar'
import { SelectQuality } from './quality/SelectQuality'
import { useVideoPlayer } from './use-video-player/useVideoPlayer'
import { getTime } from './video-player.utils'
import { VolumeControl } from './volume/VolumeControl'
import { EnumVideoPlayerQuality } from '@/types/video-player.types'
import type { ISingleVideoResponse } from '@/types/video.types'

interface Props {
	isVideoOwner: boolean
	video: ISingleVideoResponse
	toggleTheaterMode: () => void
	maxResolution: EnumVideoPlayerQuality
}

export function VideoPlayer({ video, isVideoOwner, toggleTheaterMode, maxResolution }: Props) {
	const fileName = video.videoFileName

	/* ------------------- Checking The Existing Video Quality ------------------ */
	const [mainSrc, setMainSrc] = useState<string | null>(null)
	const [bgSrc, setBgSrc] = useState<string | null>(null)
	const [mainQuality, setMainQuality] = useState<string | null>(null)

	useEffect(() => {
		async function loadVideos() {
			const { primaryVideo, backgroundVideo, primaryQuality } =
				await findPrimaryAndBackgroundVideo(fileName)
			setMainSrc(primaryVideo)
			setBgSrc(backgroundVideo)
			setMainQuality(primaryQuality)
		}
		loadVideos()
	}, [fileName])

	const { fn, playerRef, bgRef, state } = useVideoPlayer({
		fileName,
		toggleTheaterMode,
		mainQuality
	})

	const { runUpdateViews } = useUpdateViews({ video })

	const hasPlayedRef = useRef(false)

	return (
		<div className='relative rounded-2xl w-fit mx-auto'>
			{mainQuality ? (
				<>
					{state.isBacklightMode && bgSrc && (
						<video
							ref={bgRef}
							className='absolute top-1/2 -translate-y-1/2 left-1/2 transform -translate-x-1/2 w-full object-center object-cover filter blur-3xl scale-[1.02] brightness-90 contrast-125 saturate-150 rounded-xl'
							src={bgSrc}
							muted
						/>
					)}
					<video
						ref={playerRef}
						onPlay={() => {
							if (!isVideoOwner && !hasPlayedRef.current) {
								hasPlayedRef.current = true
								runUpdateViews() // safe hook call
							}
						}}
						onEnded={() => {
							fn.setIsPlaying(false)
						}}
						className='aspect-video width-full mx-auto relative z-[1] rounded-xl'
						controls={false}
						src={mainSrc}
						preload='metadata'
					/>

					<div className='grid grid-cols-[7fr_1fr] gap-7 absolute bottom-5 left-5 right-5 z-[1] py-1  px-2 hover:rounded hover:bg-[#9c9c9c70] transition-all duration-300'>
						<div className='flex items-center gap-4 w-full'>
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
								currentValue={state.quality as EnumVideoPlayerQuality | null}
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
				</>
			) : (
				// <div className='w-full h-[80svh] bg-field border border-border rounded-md flex flex-col gap-4 items-center justify-center text-2xl'>
				// 	<VideoOff size={40} />
				// 	<p>Error loading media: </p>
				// 	<p>File Could Not Be Played</p>
				// </div>
				//[TODO] доработать загрузку плеера на VideoPlayer
				<SkeletonLoader className='h-[80svh] w-full' />
			)}
		</div>
	)
}

'use client'

import {
	Lightbulb,
	LightbulbOff,
	Maximize,
	Pause,
	Play,
	RectangleHorizontal,
	VideoOff
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useUpdateViews } from '@/hooks/useUpdateViews'
import { findPrimaryAndBackgroundVideo } from '@/utils/findMainAndBackgroundVideo'
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
	const [isVideoReady, setIsVideoReady] = useState(false)
	const [isLoading, setIsLoading] = useState(true)

	/* ------------------- Checking The Existing Video Quality ------------------ */
	const [mainSrc, setMainSrc] = useState<string | null>(null)
	const [bgSrc, setBgSrc] = useState<string | null>(null)
	const [mainQuality, setMainQuality] = useState<string | null>(null)

	useEffect(() => {
		async function loadVideos() {
			setIsLoading(true)
			const { primaryVideo, backgroundVideo, primaryQuality } =
				await findPrimaryAndBackgroundVideo(fileName)
			setMainSrc(primaryVideo)
			setBgSrc(backgroundVideo)
			setMainQuality(primaryQuality)
			setIsLoading(false)
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

	{
		/* Skeleton while video is loading */
	}
	if (isLoading) {
		return (
			<div className='aspect-video relative -top-full bg-field border border-border rounded-md animate-pulse flex items-center justify-center'>
				<p className='text-lg text-muted-foreground'>Video loading...</p>
			</div>
		)
	}

	if (!mainQuality) {
		return (
			<div className='aspect-video bg-field border border-border rounded-md flex flex-col gap-4 items-center justify-center text-2xl'>
				<VideoOff size={40} />
				<p>Error loading media: </p>
				<p>File Could Not Be Played</p>
			</div>
		)
	}

	return (
		<div className='aspect-video relative rounded-2xl mx-auto '>
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
					onCanPlay={() => setIsVideoReady(true)}
					onPlay={() => {
						if (!isVideoOwner && !hasPlayedRef.current) {
							hasPlayedRef.current = true
							runUpdateViews() // safe hook call
						}
					}}
					onEnded={() => {
						fn.setIsPlaying(false)
					}}
					className={`relative top-0 left-0 w-full h-full rounded-xl z-[1] transition-opacity duration-300 ${
						isVideoReady ? 'opacity-100' : 'opacity-0'
					}`}
					controls={false}
					src={mainSrc ?? undefined}
					preload='metadata'
				/>

				{isVideoReady && (
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
				)}
			</>
		</div>
	)
}

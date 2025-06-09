import { useRef, useState } from 'react'
import { useUpdateViews } from '@/hooks/useUpdateViews'
import { PlayerControls } from './PlayerControls'
import { VideoError } from './VideoError'
import { VideoLoading } from './VideoLoading'
import { useVideoPlayer } from './use-video-player/useVideoPlayer'
import { useVideoSources } from './use-video-player/useVideoSources'
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
	const hasPlayedRef = useRef(false)

	/* ------------------- Checking The Existing Video Quality */
	const { mainQuality, isLoading, mainSrc, bgSrc } = useVideoSources(fileName)

	const { fn, playerRef, bgRef, state } = useVideoPlayer({
		fileName,
		toggleTheaterMode,
		mainQuality
	})

	const { runUpdateViews } = useUpdateViews({ video })

	/* ------------------- Skeleton while video is loading */
	if (isLoading) return <VideoLoading />

	/* ------------------- If file not found on the server */
	if (!mainQuality) return <VideoError />

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
					/* ----------------------------- PlayerControls  */
					<PlayerControls
						state={state}
						fn={fn}
						maxResolution={maxResolution}
						toggleTheaterMode={toggleTheaterMode}
					/>
				)}
			</>
		</div>
	)
}

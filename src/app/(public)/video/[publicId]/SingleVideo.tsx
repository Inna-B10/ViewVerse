'use client'

import cn from 'clsx'
import { useState } from 'react'
import { Heading } from '@/ui/Heading'
import { VideoPlayer } from '@/ui/video-player/VideoPlayer'
import { useSidebar } from '@/providers/SidebarContext'
import { useProfile } from '@/hooks/useProfile'
import { SimilarVideos } from './SimilarVideos'
import { Comments } from './comments/Comments'
import { VideoActions } from './video-actions/VideoActions'
import { VideoChannel } from './video-channel/VideoChannel'
// import { VideoDescription } from './description/VideoDescription'
import type { ISingleVideoResponse } from '@/types/video.types'
import styles from './description/VideoDescription.module.scss'

interface Props {
	video: ISingleVideoResponse
}

export function SingleVideo({ video }: Props) {
	const { isShowedSidebar } = useSidebar()
	const [isTheaterMode, setIsTheaterMode] = useState(false)
	const { profile } = useProfile()

	const isVideoOwner = profile?.channel?.slug === video.channel.slug

	return (
		<section className='grid grid-cols-[3fr_.8fr] gap-6 relative'>
			<div>
				<div
					className={cn(
						isTheaterMode
							? 'absolute top-0 left-0 max-h-screen z-50 mx-8'
							: isShowedSidebar
								? 'relative '
								: 'relative max-h-[90svh]'
					)}
				>
					<VideoPlayer
						isVideoOwner={isVideoOwner}
						video={video}
						toggleTheaterMode={() => {
							setIsTheaterMode(!isTheaterMode)
						}}
						maxResolution={video.maxResolution}
					/>
				</div>

				<div
					className={cn(
						'flex justify-between  gap-4 items-start pb-6 mb-6 border-b border-border',
						{
							'pt-8': !isTheaterMode,
							'pt-[51rem]': isTheaterMode && !isShowedSidebar,
							'pt-[45rem]': isTheaterMode && isShowedSidebar
						}
					)}
				>
					{/*  ------------------------------- Video Title ------------------------------  */}
					<div>
						<Heading
							classNameHeading='text-[1.4rem]'
							className='mb-2 text-white'
						>
							{video.title}
						</Heading>
						<div className='text-gray-400 text-xs whitespace-nowrap'>
							{video.viewsCount.toLocaleString('no-NO')} views
						</div>
					</div>

					{/*  --------------------------- Playlists / Like Button --------------------------  */}
					<VideoActions
						video={video}
						isVideoOwner={isVideoOwner}
					/>
				</div>

				{/*  ----------------------------- Channel Details ----------------------------  */}
				<VideoChannel video={video} />
				{/* ---------------------------- Video Description --------------------------- */}
				{/* //[TODO] обработать теги/перенос строк */}

				{/* <VideoDescription description={video.description} /> */}
				<div className='relative mb-4 bg-gray-800 px-3  py-2.5 rounded whitespace-pre-line'>
					<article className={styles.article}>{video.description}</article>
				</div>

				{/* -------------------------------- Comments -------------------------------- */}
				<Comments video={video} />
			</div>

			{/*  ----------------------------- Similar Videos -----------------------------  */}
			{!!video.similarVideos.length && (
				<div
					className={cn({
						'pt-[51rem]': isTheaterMode && !isShowedSidebar,
						'pt-[45rem]': isTheaterMode && isShowedSidebar
					})}
				>
					<SimilarVideos videos={video.similarVideos} />
				</div>
			)}
		</section>
	)
}

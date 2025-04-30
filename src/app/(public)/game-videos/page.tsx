import { Gamepad2 } from 'lucide-react'
import type { Metadata } from 'next'
import { Heading } from '@/ui/Heading'
import { VideoCard } from '@/ui/video-card/VideoCard'
import { PAGE } from '@/config/public-page.config'
import { videoService } from '@/services/video.service'

export const revalidate = 100

export const metadata: Metadata = {
	title: 'Game videos',
	description: 'Best of videos about gaming',
	alternates: {
		canonical: PAGE.GAME_VIDEOS
	},
	openGraph: {
		type: 'website',
		url: PAGE.GAME_VIDEOS,
		title: 'Game videos'
	}
}

export default async function GameVideos() {
	const data = await videoService.getGameVideos()

	return (
		<section className='mb-10'>
			<Heading Icon={Gamepad2}>Videos about gaming</Heading>
			<div className='grid-cols'>
				{data?.videos?.length ? (
					data.videos.map(video => (
						<VideoCard
							key={video.id}
							video={video}
						/>
					))
				) : (
					<div>
						<p>Videos about gaming are temporarily unavailable.</p>
					</div>
				)}
			</div>
		</section>
	)
}

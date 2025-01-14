import { Compass, Flame } from 'lucide-react'
import type { Metadata } from 'next'
import { Heading } from '@/ui/Heading'
import { VideoCard } from '@/ui/video-card/VideoCard'
import { Explore } from '../explore/Explore'
import { videoService } from '@/services/video.service'

export const metadata: Metadata = {
	title: 'Home',
	description: 'ViewVerse  — your go-to place for a world of videos!',
	alternates: {
		canonical: '/'
	},
	openGraph: {
		type: 'website',
		url: '/',
		title: 'ViewVerse'
	}
}

export default async function Home() {
	const data = await videoService.getTrendingVideos()
	const trendingVideos = data.slice(0, 5)

	return (
		<>
			{/* -------------------------------- Trending videos -------------------------------- */}
			{!!trendingVideos.length && (
				<section className='mb-10'>
					<Heading Icon={Flame}>Trending</Heading>
					<div className='grid-cols'>
						{trendingVideos.map(video => (
							<VideoCard
								key={video.id}
								video={video}
								Icon={Flame}
							/>
						))}
					</div>
				</section>
			)}
			{/* --------------------------------- Explore videos -------------------------------- */}
			<section>
				<Heading Icon={Compass}>Explore</Heading>
				<Explore />
			</section>
		</>
	)
}

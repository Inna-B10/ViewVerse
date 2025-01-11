import { Compass, Flame } from 'lucide-react'
import type { Metadata } from 'next'
import { Heading } from '@/ui/Heading'
import { VideoCard } from '@/ui/video-card/VideoCard'
import { Explore } from '../explore/Explore'
import { videoService } from '@/services/video.service'

//NB ISR - Incremental Static Regeneration
//NB uses static page(loads on server) but revalidates every 100 sec
// videos in the Trending block are the same for all users, so a static page is loaded (but with revalidation).
// videos in the Explore block depend on a specific user, so they are loaded on the client side and with a little delay
export const revalidate = 100
export const dynamic = 'force-static'

export const metadata: Metadata = {
	title: 'Home',
	description: 'FUN video platform',
	alternates: {
		canonical: '/'
	},
	openGraph: {
		type: 'website',
		url: '/',
		title: 'FUN Video'
	}
}

export default async function Home() {
	const data = await videoService.getTrendingVideos()
	const trendingVideos = data.slice(0, 5)

	return (
		<>
			<section>
				{/* -------------------------------- Trending videos -------------------------------- */}
				<Heading Icon={Flame}>Trending</Heading>
				<div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5'>
					{trendingVideos.length &&
						trendingVideos.map(video => (
							<VideoCard
								key={video.id}
								video={video}
								Icon={Flame}
							/>
						))}
				</div>
			</section>
			{/* --------------------------------- Explore videos -------------------------------- */}
			<section>
				<Heading Icon={Compass}>Explore</Heading>
				<Explore />
			</section>
		</>
	)
}

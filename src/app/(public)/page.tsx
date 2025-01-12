import { Compass, Flame } from 'lucide-react'
import type { Metadata } from 'next'
import { Heading } from '@/ui/Heading'
import { VideoCard } from '@/ui/video-card/VideoCard'
import { Explore } from '../explore/Explore'
// import { GetMediaQuery } from '@/utils/get-media-query'
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
	//could not use because TrendingVideos randers on server

	// let count = GetMediaQuery()
	// switch (count) {
	// 	case 1:
	// 		count = 3
	// 		break
	// 	case 2:
	// 		count = 4
	// 		break
	// 	case 3:
	// 		count = 3
	// 		break
	// 	case 5:
	// 		count = 5
	// 		break
	// }
	const trendingVideos = data.slice(0, 5)

	return (
		<>
			<section>
				{/* -------------------------------- Trending videos -------------------------------- */}
				<Heading Icon={Flame}>Trending</Heading>
				<div className='grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3'>
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

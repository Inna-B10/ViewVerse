import { Flame } from 'lucide-react'
import type { Metadata } from 'next'
import { Heading } from '@/ui/Heading'
import { VideoCard } from '@/ui/video-card/VideoCard'
import { PAGE } from '@/config/public-page.config'
import { videoService } from '@/services/video.service'

//NB ISR - Incremental Static Regeneration
//NB uses static page(loads on server) but revalidates every 100 sec
// videos in the Trending block are the same for all users, so a static page is loaded (but with revalidation).
// videos in the Explore block depend on a specific user, so they are loaded on the client side and with a little delay
export const revalidate = 100

export const metadata: Metadata = {
	title: 'Trending',
	description: "Top Trending Videos You Don't Want to Miss!",
	alternates: {
		canonical: PAGE.TRENDING
	},
	openGraph: {
		type: 'website',
		url: PAGE.TRENDING,
		title: 'Trending'
	}
}

export default async function Trending() {
	const data = await videoService.getTrendingVideos()

	return (
		<section className='mb-10'>
			<Heading Icon={Flame}>Trending</Heading>
			<div className='grid-cols'>
				{data.length ? (
					data.map(video => (
						<VideoCard
							key={video.id}
							video={video}
							Icon={Flame}
						/>
					))
				) : (
					<div>
						<p>Trends are temporarily unavailable.</p>
					</div>
				)}
			</div>
		</section>
	)
}

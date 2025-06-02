import { type ISitemapField, getServerSideSitemap } from 'next-sitemap'
import { PAGE } from '@/config/public-page.config'
import { videoService } from '@/services/video.service'

const url = 'https://viewverse.com'

export async function GET(request: Request) {
	const data = await videoService.filterVideos()

	//static
	const fields: ISitemapField[] = [
		{
			loc: url,
			lastmod: new Date().toISOString(),
			changefreq: 'daily',
			priority: 0.9
		}
	]

	//dynamic
	if (data.videos.length) {
		data.videos.forEach(video => {
			fields.push({
				loc: `${url}${PAGE.VIDEO(video.publicId)}`,
				lastmod: new Date(video.updatedAt).toISOString(),
				changefreq: 'daily',
				priority: 1.0
			})
		})
	}

	return getServerSideSitemap(fields)
}

import axios from 'axios'
import type { IApiResponseVideos, IVideo } from '@/types/video.types'

class VideoService {
	/* -------------------------------- Trending -------------------------------- */
	async getTrendingVideos() {
		const { data } = await axios.get<IVideo[]>('http://localhost:4200/api/videos/trending')
		return data
	}

	/* --------------------------------- Explore -------------------------------- */
	async getExploreVideos() {
		const { data } = await axios.get<IApiResponseVideos>('http://localhost:4200/api/videos/explore')
		return data
	}

	/* --------------------------------- Search --------------------------------- */
	async filterVideos(searchTerm?: string | null) {
		const { data } = await axios.get<IApiResponseVideos>(
			'http://localhost:4200/api/videos',
			searchTerm
				? {
						params: {
							searchTerm
						}
					}
				: {}
		)
		return data
	}
}

export const videoService = new VideoService()

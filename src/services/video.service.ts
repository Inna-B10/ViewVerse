import axios from 'axios'
import type { IVideo } from '@/types/video.types'

// class VideoService {
// 	async getExploreVideos() {
// 		const data = await axios.get<IVideo[]>('http://localhost:4200/api/videos/explore')
// 		console.log(data)
// 		return data
// 		// return axios.get<IVideo[]>('/videos/explore')
// 	}
// }

class VideoService {
	async getExploreVideos() {
		return await axios.get<IVideo[]>('http://localhost:4200/api/videos/explore')
	}
}

export const videoService = new VideoService()

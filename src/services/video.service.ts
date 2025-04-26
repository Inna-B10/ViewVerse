import { axiosClassic } from '@/api/axios'
import type {
	IApiResponseVideos,
	ISingleVideoResponse,
	IVideo,
	IVideosPagination
} from '@/types/video.types'

class VideoService {
	private _VIDEOS = '/videos'

	/* ---------------------------- Get All / Search ---------------------------- */
	async filterVideos(searchTerm?: string | null) {
		const { data } = await axiosClassic.get<IVideosPagination>(
			this._VIDEOS,
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

	/* ------------------------- Get Video By PublicId -------------------------- */
	byPublicId(publicId?: string | null) {
		const data = axiosClassic.get<ISingleVideoResponse>(`${this._VIDEOS}/by-publicId/${publicId}`)
		return data
	}

	/* ------------------------------- Game Videos ------------------------------ */
	async getGameVideos() {
		const { data } = await axiosClassic.get<IApiResponseVideos>(`${this._VIDEOS}/games`)
		return data
	}

	/* -------------------------------- Trending -------------------------------- */
	async getTrendingVideos() {
		const { data } = await axiosClassic.get<IVideo[]>(`${this._VIDEOS}/trending`)
		return data
	}

	/* --------------------------------- Explore -------------------------------- */
	async getExploreVideos(userId?: string) {
		const { data } = await axiosClassic.get<IApiResponseVideos>(`${this._VIDEOS}/explore`, {
			params: {
				userId
			}
		})
		return data
	}
}

export const videoService = new VideoService()

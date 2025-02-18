import { axiosClassic } from '@/api/axios'
import type { IApiResponseVideos, ISingleVideoResponse, IVideo } from '@/types/video.types'

class VideoService {
	private _VIDEOS = '/videos'

	/* ---------------------------- Get All / Search ---------------------------- */
	async filterVideos(searchTerm?: string | null) {
		const { data } = await axiosClassic.get<IApiResponseVideos[]>(
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
	// 	return axiosClassic.get<IVideo[]>(
	// 		this._VIDEOS,
	// 		searchTerm
	// 			? {
	// 					params: {
	// 						searchTerm
	// 					}
	// 				}
	// 			: {}
	// 	)
	// }
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
	async getExploreVideos() {
		const { data } = await axiosClassic.get<IApiResponseVideos>(`${this._VIDEOS}/explore`)
		return data
	}
}

export const videoService = new VideoService()

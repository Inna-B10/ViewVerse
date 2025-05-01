import { instance } from '@/api/axios'
import type { IFullVideo } from '@/types/video.types'

class WatchHistoryService {
	private _WATCH_HISTORY = '/watch-history'

	/* ----------------------------------- Get ---------------------------------- */
	async getUserHistory() {
		const { data } = await instance.get<{ video: IFullVideo }[]>(this._WATCH_HISTORY)
		return data
	}

	/* ----------------------------------- Add ---------------------------------- */
	async addToHistory(videoId: string) {
		const { data } = await instance.post(this._WATCH_HISTORY, { videoId })
		return data
	}

	/* -------------------------------- Clear All ------------------------------- */
	async clearHistory() {
		const { data } = await instance.delete(this._WATCH_HISTORY)
		return data
	}
}

export const watchHistoryService = new WatchHistoryService()

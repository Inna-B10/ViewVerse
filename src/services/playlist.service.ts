import { instance } from '@/api/axios'
import type { IPlaylist, IPlaylistData } from '@/types/playlist.types'

class PlaylistService {
	private _PLAYLISTS = '/playlists'

	/* ----------------------------------- Get ---------------------------------- */
	async getUserPlaylists() {
		const { data } = await instance.get<IPlaylist[]>(this._PLAYLISTS)
		return data
	}

	async getPlaylistById(playlistId: string) {
		const { data } = await instance.get<IPlaylist>(`${this._PLAYLISTS}/${playlistId}`)
		return data
	}

	async toggleVideoInPlaylist(playlistId: string, videoId: string) {
		const { data } = await instance.post(`${this._PLAYLISTS}/${playlistId}/toggle-video`, {
			videoId
		})
		return data
	}

	async createPlaylist(playlist: IPlaylistData) {
		const { data } = await instance.post(this._PLAYLISTS, playlist)
		return data
	}
}

export const playlistService = new PlaylistService()

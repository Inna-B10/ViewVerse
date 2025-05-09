import { instance } from '@/api/axios'
import type { IPlaylist, IPlaylistData } from '@/types/playlist.types'

class PlaylistService {
	private _PLAYLISTS = '/playlists'

	/* ------------------------ Get All User's Playlists ------------------------ */
	async getUserPlaylists() {
		const { data } = await instance.get<IPlaylist[]>(this._PLAYLISTS)
		return data
	}

	/* -------------------------- Get Playlist Details -------------------------- */
	async getPlaylistById(playlistId: string) {
		const { data } = await instance.get<IPlaylist>(`${this._PLAYLISTS}/${playlistId}`)
		return data
	}

	/* ----------------------- Toggle Video In Playlist(s) ---------------------- */
	async toggleVideoInPlaylist(playlistId: string, videoId: string) {
		const { data } = await instance.post(`${this._PLAYLISTS}/${playlistId}/toggle-video`, {
			videoId
		})
		return data
	}

	/* ----------------------------- Create Playlist ---------------------------- */
	async createPlaylist(playlist: IPlaylistData) {
		const { data } = await instance.post(this._PLAYLISTS, playlist)
		return data
	}

	/* ----------------------------- Delete Playlist ---------------------------- */
	async deletePlaylist(playlistId: string) {
		const { data } = await instance.delete<IPlaylist>(`${this._PLAYLISTS}/${playlistId}`)
		return data
	}

	/* ----------------------------- Rename Playlist ---------------------------- */
	async renamePlaylist(playlistId: string, newName: string) {
		const { data } = await instance.put<IPlaylist>(`${this._PLAYLISTS}/${playlistId}`, {
			title: newName
		})
		return data
	}
}

export const playlistService = new PlaylistService()

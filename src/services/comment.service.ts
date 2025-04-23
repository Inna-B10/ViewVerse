import { axiosClassic } from '@/api/axios'
import type { IComment } from '@/types/comment.types'

class CommentService {
	private _COMMENTS = '/comments'

	/* ------------------------- Get Comments byVideo -------------------------- */
	async byVideoPublicId(publicId?: string | null) {
		const { data } = await axiosClassic.get<IComment[]>(`${this._COMMENTS}/by-video/${publicId}`)
		return data
	}
	//
	// 	/* --------------------------------- Create --------------------------------- */
	// 	async create(settings: ICommentData) {
	// 		const { data } = await instance.post<IComment>(this._COMMENTS, settings)
	// 		return data
	// 	}
	//
	// 	/* --------------------------------- Update --------------------------------- */
	// 	async update(id: string, settings: ICommentData) {
	// 		const { data } = await instance.put<IComment>(`${this._COMMENTS}/${id}`, settings)
	// 		return data
	// 	}
	//
	// 	/* --------------------------------- Delete --------------------------------- */
	// 	async delete(id: string) {
	// 		const { data } = await instance.delete<IComment>(`${this._COMMENTS}/${id}`)
	// 		return data
	// 	}
}

export const commentService = new CommentService()

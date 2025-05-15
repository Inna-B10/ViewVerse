import { instance } from '@/api/axios'
import type { IFileResponse, IProgressProcessingResponse } from '@/types/file.types'

class FileService {
	private _UPLOAD_FILE = '/upload-file'

	upload(file: FormData, folder?: string) {
		const data = instance.post<IFileResponse[]>(this._UPLOAD_FILE, file, {
			params: { folder },
			headers: { 'Content-Type': 'multipart/form-data' }
		})
		return data
	}

	getProcessingStatus(fileName: string) {
		const data = instance.get<IProgressProcessingResponse>(
			`${this._UPLOAD_FILE}/status/${fileName}`
		)
		return data
	}
}

export const fileService = new FileService()

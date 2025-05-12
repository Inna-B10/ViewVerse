import { instance } from '@/api/axios'

class FileService {
	private _UPLOAD_FILE = '/upload-file'

	upload(file: FormData, folder?: string) {
		const data = instance.post<{ url: string; name: string }[]>(this._UPLOAD_FILE, file, {
			params: { folder },
			headers: { 'Content-Type': 'multipart/form-data' }
		})
		return data
	}
	getProcessingStatus(fileName: string) {
		const data = instance.get<number>(`${this._UPLOAD_FILE}/${fileName}`)
		return data
	}
}

export const fileService = new FileService()

import { useMutation } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { type ChangeEvent, useCallback } from 'react'
import toast from 'react-hot-toast'
import { cropThumbnail } from '@/utils/cropThumbnail'
import { validateFileSize } from './validate-file-size'
import { fileService } from '@/services/studio/file.service'
import type { IFileResponse } from '@/types/file.types'

interface Props {
	folder?: string
	onChange?: (...event: unknown[]) => void
	onSuccess?: (data: IFileResponse[]) => void
	onError?: () => void
	maxFileSize?: number
}

type TUseUpload = (props: Props) => {
	uploadFile: (e: ChangeEvent<HTMLInputElement>) => void
	isLoading: boolean
}

export const useUpload: TUseUpload = ({ onChange, folder, onSuccess, onError, maxFileSize }) => {
	const { mutate, isPending } = useMutation({
		mutationKey: ['upload file'],
		mutationFn: (data: FormData) => fileService.upload(data, folder),

		onSuccess: ({ data }) => {
			if (onChange) onChange(data[0].url)
			if (onSuccess) onSuccess(data)
		},

		onError: (error: unknown) => {
			let message = 'Something went wrong'

			if (isAxiosError(error)) {
				// axios defined that it is his error
				message = error.response?.data?.message || error.message || message
			} else if (error instanceof Error) {
				message = error.message || message
			}

			toast.error(message)
			if (onError) onError()
		}
	})

	const uploadFile = useCallback(
		async (e: ChangeEvent<HTMLInputElement>) => {
			const files = e.target.files
			if (!files?.length) return

			const file = files[0]

			if (!validateFileSize(file, maxFileSize)) return

			if (file.type.startsWith('image/') && folder === 'thumbnails') {
				const imageUrl = URL.createObjectURL(file)
				const croppedBlob = await cropThumbnail(imageUrl, 16 / 9)
				if (!croppedBlob) return

				const formData = new FormData()
				formData.append('file', croppedBlob, file.name)

				mutate(formData)
			} else {
				const formData = new FormData()
				formData.append('file', file)

				mutate(formData)
			}
		},
		[mutate, maxFileSize, folder]
	)

	return {
		uploadFile,
		isLoading: isPending
	}
}

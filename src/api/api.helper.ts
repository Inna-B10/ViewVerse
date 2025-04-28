export interface ErrorResponse {
	response?: {
		data?: {
			message?: string | string[]
		}
	}
	message: string
}

export const errorCatch = (error: ErrorResponse): string => {
	const message = error?.response?.data?.message

	return message ? (typeof message === 'object' ? message[0] : message) : error.message
}

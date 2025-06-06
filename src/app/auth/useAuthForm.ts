import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useRef, useTransition } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import type { SubmitHandler, UseFormReset } from 'react-hook-form'
import { PAGE } from '@/config/public-page.config'
import { authService } from '@/services/auth.service'
import type { IAuthData, IAuthForm } from '@/types/auth-form.types'

export function useAuthForm(type: 'login' | 'register', reset: UseFormReset<IAuthForm>) {
	const router = useRouter()
	const [isPending, startTransition] = useTransition()

	const recaptchaRef = useRef<ReCAPTCHA>(null)

	//NB if uses mutateAsync (instead of mutate) - onSuccess and onError must be processed manually (outside of useMutation)
	const { mutateAsync, isPending: isAuthPending } = useMutation({
		mutationKey: [type],
		mutationFn: (data: IAuthData) => authService.main(type, data, recaptchaRef.current?.getValue())
	})

	const onSubmit: SubmitHandler<IAuthForm> = async ({ email, password }) => {
		const token = recaptchaRef.current?.getValue()
		const { toast } = await import('react-hot-toast')
		if (!token) {
			toast.error('Pass the captcha!', { id: 'recaptcha' })
			return
		}
		toast.promise(mutateAsync({ email, password }), {
			loading: 'Loading...',
			success: () => {
				startTransition(() => {
					reset()
					router.push(PAGE.HOME)
				})
				// Показываем отдельный toast после выполнения
				if (type === 'register') {
					setTimeout(() => {
						toast.success(
							'You have successfully registered.\nPlease check your email to verify your account.',
							{ duration: 6000 }
						)
					}, 0) // в следующем тике, чтобы не конфликтовало с promise-toast

					return '' // не показывать встроенный success-toast
				}
				return 'Success! You are logged in.'
			},
			error: (e: unknown) => {
				if (axios.isAxiosError(e)) {
					return e.response?.data?.message || 'An Axios error occurred'
				}
				return 'Something went wrong'
			}
		})
	}

	const isLoading = isPending || isAuthPending

	return { onSubmit, recaptchaRef, isLoading }
}

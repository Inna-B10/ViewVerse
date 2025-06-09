import { useEffect, useState } from 'react'
import { Button } from './ui/button/Button'
import { authService } from '@/services/auth.service'

export function ResendVerificationButton() {
	const [isLoading, setIsLoading] = useState(false)
	const [countdown, setCountdown] = useState(0)

	// press no more than once per minute
	useEffect(() => {
		let timer: NodeJS.Timeout
		if (countdown > 0) {
			timer = setTimeout(() => setCountdown(countdown - 1), 1000)
		}
		return () => clearTimeout(timer)
	}, [countdown])

	const handleResend = async () => {
		setIsLoading(true)
		try {
			await authService.resendVerificationEmail()
			const { toast } = await import('react-hot-toast')
			toast.success('The verification link has been sent.\nCheck your email.', { duration: 6000 })
			setCountdown(60)
		} catch (error) {
			console.error(error)
			const { toast } = await import('react-hot-toast')
			toast.error('Error sending email.')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div>
			<Button
				onClick={handleResend}
				disabled={isLoading || countdown > 0}
			>
				{isLoading ? 'Sending...' : 'Resend verification'}
			</Button>
		</div>
	)
}

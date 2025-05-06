'use client'

import { useEffect } from 'react'
import { authService } from '@/services/auth.service'

export function AuthInitializer() {
	useEffect(() => {
		authService.initializeAuth()
	}, [])

	return null
}

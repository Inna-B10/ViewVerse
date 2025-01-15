'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { LazyMotion, domAnimation } from 'framer-motion'
import { type ReactNode, useState } from 'react'

export function Providers({ children }: { children: ReactNode }) {
	const [queryClient] = useState(() => new QueryClient())

	return (
		<QueryClientProvider client={queryClient}>
			<LazyMotion features={domAnimation}>{children}</LazyMotion>
		</QueryClientProvider>
	)
}

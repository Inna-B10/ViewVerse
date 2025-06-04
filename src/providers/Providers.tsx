'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { LazyMotion, domAnimation } from 'framer-motion'
import { type ReactNode, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { SidebarProvider } from './SidebarContext'
import { store } from '@/store'

export function Providers({ children }: { children: ReactNode }) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						retry: 1,
						refetchOnWindowFocus: false
					},
					mutations: {
						retry: 1
					}
				}
			})
	)

	return (
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<LazyMotion features={domAnimation}>
					<SidebarProvider>{children}</SidebarProvider>
					<Toaster
						toastOptions={{
							style: {
								backgroundColor: '#3f3f46',
								// backgroundColor: '#202937',
								color: 'white'
							},
							className: 'border border-white/20  shadow-lg'
						}}
					/>
				</LazyMotion>
			</Provider>
		</QueryClientProvider>
	)
}

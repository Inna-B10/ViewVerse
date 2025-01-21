'use client'

import cn from 'clsx'
import { type PropsWithChildren, useEffect, useState } from 'react'
import { Content } from './content/Content'
import { Sidebar } from './sidebar/Sidebar'
import { authService } from '@/services/auth.service'
import styles from './Layout.module.scss'

export function Layout({ children }: PropsWithChildren<unknown>) {
	const [isShowedSidebar, setIsShowedSidebar] = useState(true)

	const toggleSidebar = () => {
		setIsShowedSidebar(!isShowedSidebar)
	}

	//Check if user has/needs accessToken
	useEffect(() => {
		authService.initializeAuth()
	})

	return (
		<main
			className={cn(
				'flex min-h-screen',
				styles.initialSidebar,
				isShowedSidebar ? styles.showedSidebar : styles.hidedSidebar
			)}
		>
			{/* --------------------------------- Sidebar -------------------------------- */}
			<Sidebar
				toggleSidebar={toggleSidebar}
				isShowedSidebar={isShowedSidebar}
			/>
			{/* --------------------------------- Content -------------------------------- */}
			<Content>{children}</Content>
		</main>
	)
}

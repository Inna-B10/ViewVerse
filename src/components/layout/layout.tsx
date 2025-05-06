'use client'

import cn from 'clsx'
import { type PropsWithChildren } from 'react'
import { useSidebar } from '@/providers/SidebarContext'
import { Content } from './content/Content'
import { Sidebar } from './sidebar/Sidebar'
import { useTypedSelector } from '@/store'
import styles from './Layout.module.scss'

export function Layout({ children }: PropsWithChildren<unknown>) {
	const { isShowedSidebar } = useSidebar()
	const { authReady } = useTypedSelector(state => state.auth)

	if (!authReady) return null

	return (
		<main
			className={cn(
				'flex min-h-screen',
				styles.initialSidebar,
				isShowedSidebar ? styles.showedSidebar : styles.hidedSidebar
			)}
		>
			{/* --------------------------------- Sidebar -------------------------------- */}

			<Sidebar />
			{/* --------------------------------- Content -------------------------------- */}
			<Content>{children}</Content>
		</main>
	)
}

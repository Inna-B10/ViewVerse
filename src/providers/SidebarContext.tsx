import { type ReactNode, createContext, useContext, useState } from 'react'

interface SidebarContextType {
	isShowedSidebar: boolean
	toggleSidebar: () => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function SidebarProvider({ children }: { children: ReactNode }) {
	const [isShowedSidebar, setIsShowedSidebar] = useState(false)

	const toggleSidebar = () => setIsShowedSidebar(prev => !prev)

	return (
		<SidebarContext.Provider value={{ isShowedSidebar, toggleSidebar }}>
			{children}
		</SidebarContext.Provider>
	)
}

export function useSidebar() {
	const context = useContext(SidebarContext)
	if (!context) throw new Error('useSidebar must be used within SidebarProvider')
	return context
}

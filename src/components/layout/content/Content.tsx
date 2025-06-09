import type { PropsWithChildren } from 'react'
import { Header } from './header/Header'

export function Content({ children }: PropsWithChildren<unknown>) {
	return (
		<div className='flex-1 relative'>
			<Header />
			<div className='p-layout'>{children}</div>
		</div>
	)
}

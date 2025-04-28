import type { PropsWithChildren } from 'react'
import { Layout } from '@/components/layout/layout'

export default function StudioLayout({ children }: PropsWithChildren<unknown>) {
	return <Layout>{children}</Layout>
}

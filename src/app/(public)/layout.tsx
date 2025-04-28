import type { PropsWithChildren } from 'react'
import { Layout } from '@/components/layout/layout'

export default function PublicLayout({ children }: PropsWithChildren<unknown>) {
	return <Layout>{children}</Layout>
}

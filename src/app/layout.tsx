import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'
import { Layout } from '@/components/layout/layout'
import './globals.scss'

const notoSans = Noto_Sans({
	// variable: '--font-noto-sans',
	subsets: ['latin']
})

export const metadata: Metadata = {
	title: 'FUN Video - Next.js 15',
	description: 'App for video watching (youtube mod)'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={`${notoSans.className}  antialiased`}>
				<Layout>{children}</Layout>
			</body>
		</html>
	)
}

import { type Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'
import { Layout } from '@/components/layout/Layout'
import { Providers } from '@/providers/Providers'
import './globals.scss'

const notoSans = Noto_Sans({
	// variable: '--font-noto-sans',
	subsets: ['latin']
})

export const metadata: Metadata = {
	title: {
		absolute: 'FUN Video - Next.js 15',
		template: `%s | FUN Video`
	},
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
				<Providers>
					<Layout>{children}</Layout>
				</Providers>
			</body>
		</html>
	)
}

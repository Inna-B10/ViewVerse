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
		absolute: 'ViewVerse - Next.js 15',
		template: `%s | ViewVerse`
	},
	description:
		'ViewVerse — a new universe of videos where everyone can watch, create, and share content.'
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

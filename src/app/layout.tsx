import { type Metadata } from 'next'
import { M_PLUS_Rounded_1c, Philosopher } from 'next/font/google'
import { AuthInitializer } from '@/components/AuthInitializer'
import { Providers } from '@/providers/Providers'
import { SITE_URL } from '@/constants/constants'
import './globals.scss'

/* ------------------------------ Default Font  */
const mplus = M_PLUS_Rounded_1c({
	weight: ['400', '500', '700'],
	variable: '--font-mplus',
	subsets: ['latin']
})
// const overpass = Overpass({
// 	weight: ['400', '700'],
// 	variable: '--font-overpass',
// 	subsets: ['latin']
// })

/* ------------------------------ Heading Font  */
const philosopher = Philosopher({
	weight: ['400', '700'],
	variable: '--font-philosopher',
	subsets: ['latin']
})

export const fetchCache = 'default-cache'

export const metadata: Metadata = {
	title: {
		absolute: 'ViewVerse - Next.js 15',
		template: `%s | ViewVerse`
	},
	description:
		'ViewVerse — a new universe of videos where everyone can watch, create, and share content.',
	metadataBase: new URL(SITE_URL)
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={`${mplus.className} ${philosopher.variable} antialiased`}>
				<Providers>
					{/* Check if user has/needs accessToken */}
					<AuthInitializer />
					{children}
				</Providers>
			</body>
		</html>
	)
}

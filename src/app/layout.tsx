import { type Metadata } from 'next'
import { M_PLUS_Rounded_1c, Philosopher } from 'next/font/google'
import { Layout } from '@/components/layout/Layout'
import { Providers } from '@/providers/Providers'
import './globals.scss'

/* ------------------------------ Default Font  */
const mplus = M_PLUS_Rounded_1c({
	weight: ['400', '700'],
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
			<body className={`${mplus.className} ${philosopher.variable} antialiased`}>
				<Providers>
					<Layout>{children}</Layout>
				</Providers>
			</body>
		</html>
	)
}

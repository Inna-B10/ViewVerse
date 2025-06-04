import { type Metadata, type Viewport } from 'next'
import { M_PLUS_Rounded_1c, Philosopher } from 'next/font/google'
import { Providers } from '@/providers/Providers'
import { COLORS } from '@/constants/colors.constants'
import { SITE_NAME, SITE_URL } from '@/constants/constants'
import './globals.scss'

export const fetchCache = 'default-cache'

/* ------------------------------ Default Font  */
const mplus = M_PLUS_Rounded_1c({
	weight: ['400', '500', '700'],
	variable: '--font-mplus',
	subsets: ['latin']
})
/* ------------------------------ Heading Font  */
const philosopher = Philosopher({
	weight: ['400', '700'],
	variable: '--font-philosopher',
	subsets: ['latin']
})

/* -------------------------------- Metadata  */
export const metadata: Metadata = {
	icons: {
		icon: '/images/logo-adaptive.svg',
		shortcut: '/images/logo-adaptive.svg',
		apple: '/images/256.png',
		other: {
			rel: 'images',
			url: '/images/256.png',
			sizes: '256x256',
			type: 'image/png'
		}
	},
	title: {
		absolute: `${SITE_NAME} - Next.js 15`,
		template: `%s | ${SITE_NAME}`
	},
	description:
		'ViewVerse — an universe of videos where everyone can watch, create, and share content.',
	openGraph: {
		type: 'website',
		siteName: 'localhost',
		emails: ['info@viewverse.com'],
		images: [
			{
				url: 'images/social_media.jpg',
				width: 915,
				height: 449,
				alt: `${SITE_NAME}`
			}
		]
	},
	metadataBase: new URL(SITE_URL),
	applicationName: `${SITE_NAME}`,
	manifest: '/manifest.json',
	publisher: 'author',
	formatDetection: {
		telephone: false
	}
	// verification:
}

/* -------------------------------- Viewport  */
export const viewport: Viewport = {
	themeColor: COLORS.bg
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={`${mplus.className} ${philosopher.variable} antialiased`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}

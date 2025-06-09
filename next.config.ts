// import type { NextConfig } from 'next'
//
// const nextConfig: NextConfig = {
// 	reactStrictMode: true,
// 	poweredByHeader: false,
// 	async rewrites() {
// 		return [
// 			{
// 				source: '/uploads/:path*',
// 				destination: `${process.env.NEXT_PUBLIC_SERVER_URL}/uploads/:path*`
// 			}
// 		]
// 	},
// 	eslint: {
// 		// Warning: This allows production builds to successfully complete even if
// 		// your project has ESLint errors.
// 		ignoreDuringBuilds: true
// 	}
// }
//
// export default nextConfig
import createAnalyzer from '@next/bundle-analyzer'
import type { NextConfig } from 'next'

const withBundleAnalyzer = createAnalyzer({
	enabled: process.env.ANALYZE === 'true'
})

const nextConfig: NextConfig = {
	reactStrictMode: true,
	poweredByHeader: false,
	async rewrites() {
		return [
			{
				source: '/uploads/:path*',
				destination: `${process.env.NEXT_PUBLIC_SERVER_URL}/uploads/:path*`
			}
		]
	},
	eslint: {
		ignoreDuringBuilds: true
	}
}

// ⬇️ Экспорт с обёрткой анализа
export default withBundleAnalyzer(nextConfig)

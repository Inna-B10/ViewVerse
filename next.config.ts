import type { NextConfig } from 'next'

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
		// Warning: This allows production builds to successfully complete even if
		// your project has ESLint errors.
		ignoreDuringBuilds: true
	}
}

export default nextConfig

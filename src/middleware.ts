import type { NextRequest, NextResponse } from 'next/server'
import { PAGE } from './config/public-page.config'
import { STUDIO_PAGE } from './config/studio-page.config'
import { protectLogin } from './server-actions/middlewares/protect-login.middleware'
import { protectStudio } from './server-actions/middlewares/protect-studio.middleware'

export async function middleware(request: NextRequest, response: NextResponse) {
	const url = new URL(request.url)
	const pathname = url.pathname

	if (pathname.includes(STUDIO_PAGE.STUDIO_HOME) || pathname.includes(PAGE.SUBSCRIPTIONS)) {
		return protectStudio(request)
	}

	if (pathname.includes(PAGE.AUTH)) {
		return protectLogin(request)
	}
}

export const config = {
	matcher: [
		'/studio/:path*',
		'/auth/:path*'
		//[FIXME] redirect to auth
		// , '/subscriptions/:path*'
	]
}

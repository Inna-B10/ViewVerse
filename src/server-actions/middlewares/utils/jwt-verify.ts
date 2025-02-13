'use server'

import * as jose from 'jose'

// in more advanced projects can be added
// role?:string
// isAdmin:boolean
interface ITokenInside {
	id: string
	iat: number
	exp: number
}

export async function jwtVerifyServer(accessToken: string) {
	try {
		const { payload }: { payload: ITokenInside } = await jose.jwtVerify(
			accessToken,
			new TextEncoder().encode(`${process.env.JWT_SECRET}`)
		)

		return payload
	} catch (error) {
		// handling JWT-verification errors
		if (error instanceof Error && error.message.includes('exp claim timestamp check failed')) {
			// token expired
			console.log('Token expired')
			return null
		}

		console.log('Error verifying token: ', error)
		return null
	}
}

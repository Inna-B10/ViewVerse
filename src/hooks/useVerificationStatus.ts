import { useProfile } from './useProfile'

export const useVerificationStatus = () => {
	const { profile } = useProfile()
	return !!profile?.verificationToken
}

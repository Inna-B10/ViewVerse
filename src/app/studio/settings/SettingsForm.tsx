'use client'

import { useSettings } from './useSettings'

export function SettingsForm() {
	const { form, isLoading, onSubmit } = useSettings()
	return <div>SettingsForm</div>
}

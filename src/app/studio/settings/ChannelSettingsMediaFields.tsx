import { type Control, Controller } from 'react-hook-form'
import { UploadField } from '@/ui/upload-field/UploadField'
import type { IChannelSettingsData } from '@/types/settings.types'

interface Props {
	control: Control<IChannelSettingsData>
}

export function ChannelSettingsMediaFields({ control }: Props) {
	return (
		<div className='flex flex-col justify-between mb-6'>
			<Controller
				control={control}
				name='bannerUrl'
				render={({ field: { onChange, value }, fieldState: { error } }) => (
					<UploadField
						label='Banner: '
						help='The overlay in the middle displays the content that will be visible on the site.'
						onChange={onChange}
						value={value}
						error={error}
						folder='banners'
						sizePreview={[458, 258]}
						overlay='/images/default/overlay.png'
					/>
				)}
			/>
		</div>
	)
}

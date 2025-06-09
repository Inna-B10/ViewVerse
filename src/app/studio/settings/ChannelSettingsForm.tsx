import { Controller } from 'react-hook-form'
import { Button } from '@/ui/button/Button'
import { Field } from '@/ui/fields/Field'
import { Textarea } from '@/ui/fields/Textarea'
import { UploadField } from '@/ui/upload-field/UploadField'
import { useChannelSettings } from './useChannelSettings'

export function ChannelSettingsForm({ isExistChannel }: { isExistChannel: boolean }) {
	//NB in case without destructuring: const { formObject, isLoading, onSubmit } = useSettings()
	const {
		formObject: {
			handleSubmit,
			register,
			formState: { errors },
			control
		},
		isLoading,
		isProfileLoading,
		onSubmit
	} = useChannelSettings()

	if (isProfileLoading) return <div>Loading...</div>

	return (
		<div className='w-3/5'>
			<form
				//NB in case without destructuring: onSubmit={formObject.handleSubmit(onSubmit)}
				onSubmit={handleSubmit(onSubmit)}
				name='auth'
			>
				<div className='grid grid-cols-2 gap-10'>
					<div>
						<Field
							label='Slug (alias)'
							placeholder='Your slug'
							type='text'
							name='slug'
							registration={register('slug', { required: 'Slug is required!' })}
							error={errors.slug?.message}
						/>
						<Textarea
							label='Description'
							placeholder='Enter text about your channel'
							name='description'
							rows={9}
							registration={register('description')}
							error={errors.description?.message}
						/>
					</div>

					{/* --------------------------------- Banner --------------------------------- */}
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
				</div>
				<div className='text-center mt-12'>
					<Button
						type='submit'
						isLoading={isLoading}
						title={isExistChannel ? 'Update channel settings' : 'Create channel'}
						aria-label={isExistChannel ? 'Update channel settings' : 'Create channel'}
					>
						{isExistChannel ? 'Update' : 'Create'}
					</Button>
				</div>
			</form>
		</div>
	)
}

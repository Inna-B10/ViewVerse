'use client'

import dynamic from 'next/dynamic'
import { Button } from '@/ui/button/Button'
import { Field } from '@/ui/fields/Field'
import { Textarea } from '@/ui/fields/Textarea'
import { useChannelSettings } from './useChannelSettings'

const DynamicChannelSettingsMediaFields = dynamic(() =>
	import('./ChannelSettingsMediaFields').then(mod => mod.ChannelSettingsMediaFields)
)

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
							name='slug.slug'
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
					{/* ------------------------------ banner ----------------------------- */}
					<DynamicChannelSettingsMediaFields control={control} />
				</div>
				<div className='text-center mt-12'>
					<Button
						type='submit'
						isLoading={isLoading}
						title='Update settings'
						aria-label='Update settings'
					>
						{isExistChannel ? 'Update' : 'Create'}
					</Button>
				</div>
			</form>
		</div>
	)
}

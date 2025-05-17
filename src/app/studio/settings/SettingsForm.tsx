'use client'

import { Controller } from 'react-hook-form'
import { Button } from '@/ui/button/Button'
import { Field } from '@/ui/fields/Field'
import { Textarea } from '@/ui/fields/Textarea'
import { UploadField } from '@/ui/upload-field/UploadField'
import { useSettings } from './useSettings'

export function SettingsForm() {
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
	} = useSettings()

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
							label='Email'
							placeholder='Your email'
							type='email'
							name='email'
							registration={register('email', { required: 'Email is required!' })}
							error={errors.email?.message}
						/>
						<Field
							label='Password'
							placeholder='Your password'
							type='password'
							name='password'
							registration={register('password')}
							error={errors.password?.message}
						/>
						<Field
							label='Name'
							placeholder='Your name'
							type='text'
							name='name'
							registration={register('name')}
							error={errors.name?.message}
						/>
						<Field
							label='Slug (alias)'
							placeholder='Your slug'
							type='text'
							name='slug'
							registration={register('channel.slug')}
							error={errors.channel?.slug?.message}
						/>
						<Textarea
							label='Description'
							placeholder='Enter description'
							name='description'
							rows={4}
							registration={register('channel.description')}
							error={errors.channel?.description?.message}
						/>
					</div>
					<div>
						<Controller
							control={control}
							name='channel.avatarUrl'
							render={({ field: { onChange, value }, fieldState: { error } }) => (
								<UploadField
									label='Avatar: '
									onChange={onChange}
									value={value}
									error={error}
									folder='avatars'
									className='mb-4'
								/>
							)}
						/>
						<Controller
							control={control}
							name='channel.bannerUrl'
							render={({ field: { onChange, value }, fieldState: { error } }) => (
								<UploadField
									label='Banner: '
									onChange={onChange}
									value={value}
									error={error}
									folder='banners'
									sizePreview={[446, 250]}
									overlay='/overlay.png'
								/>
							)}
						/>
					</div>
				</div>
				<div className='text-center mt-12'>
					<Button
						type='submit'
						isLoading={isLoading}
					>
						Update
					</Button>
				</div>
			</form>
		</div>
	)
}

'use client'

import dynamic from 'next/dynamic'
import { Button } from '@/ui/button/Button'
import { Field } from '@/ui/fields/Field'
import { useUserSettings } from './useUserSettings'

const DynamicUserSettingsMediaFields = dynamic(() =>
	import('./UserSettingsMediaFields').then(mod => mod.UserSettingsMediaFields)
)

export function UserSettingsForm() {
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
	} = useUserSettings()

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
					</div>
					{/* ------------------------------ Avatar ----------------------------- */}
					{/* <div className='flex flex-col justify-between mb-6'>
						<Controller
							control={control}
							name='avatarUrl'
							render={({ field: { onChange, value }, fieldState: { error } }) => (
								<UploadField
									label='Avatar: '
									help='preferred image dimensions 240 x 240'
									onChange={onChange}
									value={value}
									error={error}
									folder='avatars'
									className='mb-4'
								/>
							)}
						/>
					</div> */}
					<DynamicUserSettingsMediaFields control={control} />
				</div>
				<div className='text-center mt-12'>
					<Button
						type='submit'
						isLoading={isLoading}
						title='Update settings'
						aria-label='Update settings'
					>
						Update
					</Button>
				</div>
			</form>
		</div>
	)
}

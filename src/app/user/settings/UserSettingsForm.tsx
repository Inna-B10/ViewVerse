'use client'

import { SquareUserRound } from 'lucide-react'
import { Controller } from 'react-hook-form'
import { ResendVerificationButton } from '@/components/ResendVerificationButton'
import { Heading } from '@/ui/Heading'
import { Button } from '@/ui/button/Button'
import { Field } from '@/ui/fields/Field'
import { UploadField } from '@/ui/upload-field/UploadField'
import { useVerificationStatus } from '@/hooks/useVerificationStatus'
import { useUserSettings } from './useUserSettings'

export function UserSettingsForm() {
	const hasVerificationToken = useVerificationStatus()

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
		<>
			<Heading
				Icon={SquareUserRound}
				isPageHeading
			>
				User settings
			</Heading>
			<div className='flex justify-between mt-16 mr-16'>
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
									labelClassName={hasVerificationToken ? 'text-red-500' : ''}
									notVerifiedNote={hasVerificationToken ? '(not verified!)' : ''}
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
							<div className='flex flex-col justify-between mb-6'>
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
							</div>
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
				{hasVerificationToken && (
					<div className='w-1/5 border-l border-border pl-10 flex flex-col justify-between'>
						<p>
							Once your email has been verified, you will be permitted to create your channel and
							upload your videos.
						</p>
						<ResendVerificationButton />
					</div>
				)}
			</div>
		</>
	)
}

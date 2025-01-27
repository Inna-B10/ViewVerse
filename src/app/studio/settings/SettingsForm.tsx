'use client'

import { Button } from '@/ui/button/Button'
import { Field } from '@/ui/field/Field'
import { Textarea } from '@/ui/field/Textarea'
import { useSettings } from './useSettings'

export function SettingsForm() {
	//NB if without destructuring: const { formObject, isLoading, onSubmit } = useSettings()
	const {
		formObject: {
			handleSubmit,
			register,
			formState: { errors }
		},
		isLoading,
		onSubmit
	} = useSettings()
	return (
		<div className='w-3/5'>
			<form
				//NB if without destructuring: onSubmit={formObject.handleSubmit(onSubmit)}
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
							registration={register('password', { required: 'Password is required!' })}
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
					<div></div>
				</div>
				<div className='text-center mt-[1.1rem]'>
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

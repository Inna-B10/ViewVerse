'use client'

import { useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { Logo } from '@/components/layout/sidebar/header/Logo'
import { Button } from '@/ui/button/Button'
import { Field } from '@/ui/field/Field'
import type { IAuthForm } from '../../types/auth.form.types'

export function Auth() {
	const [isLogin, setIsLogin] = useState(true)
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch //for tracking password (for comparison password/confirmPassword)
	} = useForm<IAuthForm>({
		mode: 'onChange' //show errors onChange (not onSubmit)
	})
	const password = watch('password')

	const onSubmit: SubmitHandler<IAuthForm> = data => {
		if (isLogin) {
			console.log('login', data)
		} else {
			console.log('reg', data)
		}
	}
	return (
		<section className='w-screen h-screen flex flex-col justify-center items-center'>
			<div className='text-center mb-14'>
				<Logo isSidebar={false} />
			</div>
			<div
				className='w-[80%]  xs:w-[310px]
				p-8
				border
				border-border
				rounded'
			>
				{/* <div className='text-center mb-4'>
					<Logo />
				</div> */}
				<div className='flex justify-center mb-6'>
					<button
						type='button'
						className={`px-4 py-2 font-semibold ${isLogin ? 'text-primary border-b-2 border-primary' : 'text-gray-600'}`}
						onClick={() => setIsLogin(true)}
					>
						Login
					</button>
					<button
						type='button'
						className={`px-4 py-2 font-semibold ${!isLogin ? 'text-primary border-b-2 border-primary' : 'text-gray-600'}`}
						onClick={() => setIsLogin(false)}
					>
						Registration
					</button>
				</div>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Field
						label='Email'
						placeholder='Your email'
						type='email'
						registration={register('email', { required: 'Email is required!' })}
						error={errors.email?.message}
					/>
					<Field
						label='Password'
						placeholder='Your password'
						type='password'
						registration={register('password', { required: 'Password is required!' })}
						error={errors.password?.message}
					/>
					{!isLogin && (
						<Field
							label='Confirm password'
							placeholder='Password confirmation'
							type='password'
							registration={register('confirmPassword', {
								validate: value => value === password || 'Passwords don`t match!'
							})}
							error={errors.confirmPassword?.message}
						/>
					)}
					<div className='text-center mt-8'>
						<Button type='submit'>{isLogin ? 'Login' : 'Registration'}</Button>
					</div>
				</form>
			</div>
		</section>
	)
}

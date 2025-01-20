'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { useForm } from 'react-hook-form'
import { Logo } from '@/components/layout/sidebar/header/Logo'
import { SkeletonLoader } from '@/ui/SkeletonLoader'
import { Button } from '@/ui/button/Button'
import { Field } from '@/ui/field/Field'
import { PAGE } from '@/config/public-page.config'
import type { IAuthForm } from '../../types/auth-form.types'
import { useAuthForm } from './useAuthForm'
import { useTypedSelector } from '@/store'
import styles from './captcha.module.scss'

export function Auth() {
	const [isLogin, setIsLogin] = useState(true)

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch, //for tracking password (for comparison password/confirmPassword)
		reset
	} = useForm<IAuthForm>({
		mode: 'onChange' //show errors onChange (not onSubmit)
	})

	const { isLoading, recaptchaRef, onSubmit } = useAuthForm(isLogin ? 'login' : 'register', reset)

	const password = watch('password')

	const accessToken = useTypedSelector(state => state.auth.accessToken)

	const router = useRouter()

	// if user is loget in (has accessToken) => do not show auth page (redirect to home)
	useEffect(() => {
		if (!accessToken) return
		router.push(PAGE.HOME)
	}, [accessToken, router])

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

				<form
					onSubmit={handleSubmit(onSubmit)}
					name='auth'
				>
					{isLoading ? (
						<SkeletonLoader count={3} />
					) : (
						<>
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
							{!isLogin && (
								<Field
									label='Confirm password'
									placeholder='Password confirmation'
									type='password'
									name='confirmPassword'
									registration={register('confirmPassword', {
										validate: value => {
											console.log('pass: ', password, 'val: ', value)
											return value === password || 'Passwords don`t match!'
										}
									})}
									error={errors.confirmPassword?.message}
								/>
							)}
							<ReCAPTCHA
								ref={recaptchaRef}
								size='normal'
								sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
								theme='light'
								className={styles.recaptcha}
							/>
						</>
					)}

					<div className='text-center mt-[1.1rem]'>
						<Button
							type='submit'
							isLoading={isLoading}
						>
							{isLogin ? 'Login' : 'Registration'}
						</Button>
					</div>
				</form>
			</div>
		</section>
	)
}

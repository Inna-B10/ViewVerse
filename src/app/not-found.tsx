import { Logo } from '@/components/layout/sidebar/header/Logo'

export default function NotFoundPage() {
	return (
		<div className='w-screen h-screen flex flex-col'>
			<div className='my-14 mx-8'>
				<Logo isSidebar={true} />
			</div>
			<div className='mx-auto w-1/2 mt-24 text-center'>
				<h2 className='font-bold text-6xl mb-5'>404</h2>
				<p className='text-xl'>Page not found!</p>
			</div>
		</div>
	)
}

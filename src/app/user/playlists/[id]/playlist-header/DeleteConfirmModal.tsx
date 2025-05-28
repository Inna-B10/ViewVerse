import type { UseMutateFunction } from '@tanstack/react-query'
import * as m from 'framer-motion/m'
import { X } from 'lucide-react'
import type { Dispatch, RefObject, SetStateAction } from 'react'
import { Button } from '@/ui/button/Button'
import type { IPlaylist } from '@/types/playlist.types'

interface Props {
	refDelete: RefObject<any | null>
	setIsShowDelete: Dispatch<SetStateAction<boolean>>
	deletePlaylist: UseMutateFunction<IPlaylist, Error, void, unknown>
}

export function DeleteConfirmModal({ refDelete, setIsShowDelete, deletePlaylist }: Props) {
	return (
		<div className='fixed inset-0 flex items-center justify-center bg-black/70 z-50'>
			<m.div
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.9 }}
				transition={{ duration: 0.3 }}
				className='w-[80%] max-w-[30rem] relative'
				ref={refDelete}
			>
				<div className='bg-bgSecondary flex flex-col items-center justify-center gap-4 rounded-lg p-4 pb-7'>
					<button
						title='Close the form'
						aria-label='Close the form'
						onClick={() => setIsShowDelete(false)}
						className='absolute top-2 right-2 text-gray-500 hover:text-white transition-colors'
					>
						<X size={18} />
					</button>
					<p className='font-semibold text-lg mt-3'>
						Are you sure you want to delete this playlist?
					</p>
					<p className='text-sm mb-3'>If it contains any videos, they will also be deleted.</p>
					<Button
						onClick={() => deletePlaylist()}
						title='Delete playlist'
						aria-label='Delete playlist'
					>
						Delete
					</Button>
				</div>
			</m.div>
		</div>
	)
}

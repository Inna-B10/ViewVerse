import { UploadCloud } from 'lucide-react'
import { useId } from 'react'
import type { FieldError } from 'react-hook-form'
import { ImagePreview } from './imagePreview'
import { useUpload } from './useUpload'

interface Props {
	folder?: string
	value?: string
	onChange: (url: string) => void
	label: string
	error?: FieldError
	className?: string
	isImage?: boolean
	aspectRation?: '16:9' | '1:1'
	overlay?: string
}

export function UploadField({
	folder,
	value,
	onChange,
	label,
	error,
	className,
	isImage = true,
	aspectRation = '1:1',
	overlay
}: Props) {
	const { isLoading, uploadFile } = useUpload({ folder, onChange })
	const inputId = useId()

	return (
		<div className={className}>
			<label
				htmlFor={inputId}
				className='block text-grey-400 font-medium mb-2'
			>
				{label}
			</label>
			<label
				htmlFor={inputId}
				className='flex items-center px-[1rem] py-2 bg-field border border-primary text-white text-xs rounded cursor-pointer hover:bg-primary hover:text-field font-bold transition-colors w-max'
			>
				<UploadCloud
					className='mr-2'
					size={16}
				/>
				Upload
			</label>

			<input
				id={inputId}
				type='file'
				onChange={uploadFile}
				accept='image/*'
				className='hidden'
			/>
			{error && <p className='text-red-600 text-sm mt-1'>{error.message}</p>}

			{isImage && (
				<ImagePreview
					isLoading={isLoading}
					aspectRation={aspectRation}
					overlay={overlay}
					value={value}
				/>
			)}
		</div>
	)
}

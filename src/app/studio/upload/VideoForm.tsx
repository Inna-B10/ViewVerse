import { Controller, type UseFormReturn } from 'react-hook-form'
import { Field } from '@/ui/fields/Field'
import { TagsField } from '@/ui/fields/TagsField'
import { Textarea } from '@/ui/fields/Textarea'
import { UploadField } from '@/ui/upload-field/UploadField'
import { stripHtmlWithBreak } from '@/utils/strip-html'
import { UploadVideoSkeleton } from './UploadVideoSkeleton'
import type { IVideoFormData } from '@/types/studio-videos.types'

interface Props {
	isPending?: boolean
	form: UseFormReturn<IVideoFormData, any, IVideoFormData>
}

export function VideoForm({
	form: {
		formState: { errors },
		control,
		register,
		watch
	},
	isPending
}: Props) {
	return (
		<div className='grid grid-cols-[2fr_1fr] gap-10'>
			{isPending ? (
				<UploadVideoSkeleton />
			) : (
				<>
					<div>
						{/* ---------------------------------- Title --------------------------------- */}
						<Field
							label='Title:'
							placeholder='Enter title'
							type='text'
							name='title'
							registration={register('title', { required: 'Title is required!' })}
							error={errors.title?.message}
						/>
						{/* ------------------------------- Description ------------------------------ */}
						<Controller
							control={control}
							rules={{
								validate: value => !!value?.trim() || 'Description is required!'
							}}
							name='description'
							render={({ field: { onChange, value }, fieldState: { error } }) => (
								<Textarea
									label='Description:'
									placeholder='Enter description'
									name='description'
									value={stripHtmlWithBreak(value || '')}
									rows={6}
									onChange={e => onChange(e.target.value)}
									error={error?.message}
									className='mt-5'
								/>
							)}
						/>

						{/* ---------------------------------- Tags ---------------------------------- */}
						<Controller
							control={control}
							name='tags'
							render={({ field: { onChange, value }, fieldState: { error } }) => (
								<TagsField
									label='Tags:'
									onTagsChange={onChange}
									tags={value}
									error={error?.message}
								/>
							)}
						/>
					</div>
					{/* -------------------------------- Thumbnail ------------------------------- */}
					<div className='flex flex-col justify-between  max-w-[288px]'>
						<Controller
							control={control}
							rules={{
								validate: value => !!value || 'Thumbnail is required!'
							}}
							name='thumbnailUrl'
							render={({ field: { onChange, value }, fieldState: { error } }) => (
								<UploadField
									label='Thumbnail: '
									onChange={onChange}
									value={value}
									error={error}
									folder='thumbnails'
									classNameButton=' border-border'
									sizePreview={[288, 161]}
								/>
							)}
						/>

						{/* -------------------------------- File Name ------------------------------- */}
						<div className='w-full mb-4'>
							<span className='block text-gray-200 font-medium mb-2'>File name:</span>
							<div className='text-xs p-2 bg-field rounded border border-border'>
								{watch('videoFileName')}
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	)
}

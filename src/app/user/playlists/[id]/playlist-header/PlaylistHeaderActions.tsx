import { PenBox, Save, Trash2 } from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'

interface Props {
	isEditing: boolean
	setIsEditing: Dispatch<SetStateAction<boolean>>
	setIsShowDelete: Dispatch<SetStateAction<boolean>>
	handleChangeTitle: (text: string) => Promise<void>
	title: string
}

export function PlaylistHeaderActions({
	isEditing,
	setIsEditing,
	setIsShowDelete,
	handleChangeTitle,
	title
}: Props) {
	return (
		<div className='flex items-center gap-3'>
			{isEditing ? (
				/* ---------------------------------- Save ---------------------------------- */
				<button
					onClick={() => handleChangeTitle(title)}
					className='opacity-70 hover:opacity-100 hover:text-primary transition-all duration-300'
					title='Save title'
					aria-label='Save title'
				>
					<Save size={24} />
				</button>
			) : (
				/* --------------------------------- Rename --------------------------------- */
				<button
					title='Rename playlist'
					aria-label='Rename playlist'
					onClick={() => setIsEditing(true)}
					className='opacity-70 hover:opacity-100 hover:text-primary transition-all duration-300'
				>
					<PenBox size={24} />
				</button>
			)}
			<button
				/* --------------------------------- Delete --------------------------------- */
				title='Delete playlist'
				aria-label='Delete playlist'
				onClick={() => setIsShowDelete(true)}
				className='opacity-70 hover:opacity-100 hover:text-primary transition-all duration-300'
			>
				<Trash2 size={24} />
			</button>
		</div>
	)
}

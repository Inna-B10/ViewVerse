'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { Heading } from '@/ui/Heading'
import { VerifiedBadge } from '@/ui/VerifiedBadge'
import AutoResizeTextarea from '@/ui/fields/AutoResizeTextarea'
import { PAGE } from '@/config/public-page.config'
import { useAuth } from '@/hooks/useAuth'
import { transformDate } from '@/utils/transform-date'
import type { ISingleVideoResponse } from '@/types/video.types'

const DynamicCommentActions = dynamic(
	() => import('./CommentActions').then(mod => mod.CommentActions),
	{ ssr: false }
)

interface Props {
	comment: ISingleVideoResponse['comments'][0]
	refetch: () => void
}

export function CommentItem({ comment, refetch }: Props) {
	const [text, setText] = useState(comment.text)
	const { isLoggedIn, user } = useAuth()
	const [isEdited, setIsEdited] = useState(false)

	const textareaRef = useRef<HTMLTextAreaElement | null>(null)

	useEffect(() => {
		setIsEdited(text.trim() !== comment.text.trim())
	}, [text, comment.text])

	return (
		<div className='even:bg-bgSecondary px-4  pt-7 even:pt-5 pb-5 rounded-md'>
			<div className='flex gap-4 items-start  pt-1'>
				{comment.user?.channel ? (
					<Link
						href={PAGE.CHANNEL(comment.user.channel?.slug || '')}
						title={`Open ${comment.user.name} channel` || ''}
						aria-label={`Open ${comment.user.name} channel` || ''}
					>
						<Image
							alt={comment.user.name || ''}
							src={comment.user.channel?.avatarUrl || '/images/default-avatar.png'}
							width={40}
							height={40}
							className='rounded flex-shrink-0 shadow-md'
						/>
					</Link>
				) : (
					<div className='min-w-max h-10 pt-1'>
						<Image
							alt='Guest avatar'
							src='/images/default-avatar.png'
							width={40}
							height={40}
							className='rounded flex-shrink-0 shadow-md'
							title={comment.user.name}
						/>
					</div>
				)}
				<div className='w-full'>
					<div className='flex items-center gap-3'>
						<Heading
							hTag='h3'
							className='m-0 text-base'
						>
							{comment.user.name}{' '}
							{comment.user.channel?.isVerified && (
								<sup>
									<VerifiedBadge size={12} />
								</sup>
							)}
						</Heading>

						<div className='text-gray-500 text-xs whitespace-nowrap'>
							{transformDate(comment.createdAt)}
						</div>
					</div>
					<div>
						{isLoggedIn && user?.id && user?.id === comment.user.id ? (
							/* --------------------------- If Editable Comment  */
							<AutoResizeTextarea
								ref={textareaRef}
								onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
									setText(e.target.value)
								}}
								onBlur={(e: React.FocusEvent<HTMLTextAreaElement>) =>
									setText(e.target.value.trim())
								}
								value={text}
								className='w-full text-gray-300 text-sm leading-snug rounded resize-none bg-transparent outline-none border border-transparent py-1 focus:border-border  focus:bg-field'
							/>
						) : (
							/* ------------------------- If Unchangeable Comment  */
							<div className='text-gray-200 text-[0.9rem]  leading-normal'>{text.trim()}</div>
						)}
					</div>

					{/* ---------------------------- Edit/delete Btns ---------------------------- */}
					<DynamicCommentActions
						comment={comment}
						refetch={refetch}
						newText={text}
						isEditing={isEdited}
						resetEdited={() => setIsEdited(false)}
						textareaRef={textareaRef}
					/>
				</div>
			</div>
		</div>
	)
}

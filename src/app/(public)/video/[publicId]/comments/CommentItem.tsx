import Image from 'next/image'
import Link from 'next/link'
import { Heading } from '@/ui/Heading'
import { VerifiedBadge } from '@/ui/video-card/VerifiedBadge'
import { PAGE } from '@/config/public-page.config'
import { transformDate } from '@/utils/transform-date'
import type { ISingleVideoResponse } from '@/types/video.types'

interface ICommentItem {
	comment: ISingleVideoResponse['comments'][0]
}

export function CommentItem({ comment }: ICommentItem) {
	return (
		<div className='even:bg-bgSecondary px-4  pt-7 even:pt-5 pb-5 rounded-md'>
			<div className='flex gap-4 items-start  pt-1'>
				{comment.user?.channel ? (
					<Link
						href={PAGE.CHANNEL(comment.user.channel?.slug || '')}
						title={`${comment.user.channel?.user.name} channel`}
					>
						<Image
							alt={comment.user.name || ''}
							src={comment.user.channel?.avatarUrl || '/avatar.png'}
							width={40}
							height={40}
							title={comment.user.name}
							className='rounded flex-shrink-0 shadow-md'
						/>
					</Link>
				) : (
					<div className='min-w-max h-10 pt-1'>
						<Image
							alt='Guest avatar'
							src='/avatar.png'
							width={40}
							height={40}
							className='rounded flex-shrink-0 shadow-md'
							title={comment.user.name}
						/>
					</div>
				)}
				<div>
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
							{transformDate(comment.createdAt)} subscribers
						</div>
					</div>
					<div className='text-gray-200 text-[0.9rem]  leading-normal'>{comment.text}</div>
					{/* <CommentActions /> */}
				</div>
			</div>
		</div>
	)
}

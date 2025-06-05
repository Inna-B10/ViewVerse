import { Heading } from '@/ui/Heading'
import { VerifiedBadge } from '@/ui/VerifiedBadge'
import { transformDate } from '@/utils/transform-date'
import type { IChannel } from '@/types/channel.types'
import type { IUser } from '@/types/user.types'

interface Props {
	// user: ISingleVideoResponse['comments'][0]['user']
	user: IUser & { channel?: IChannel }
	createdAt: string
}

export function CommentHeader({ user, createdAt }: Props) {
	return (
		<div className='flex items-center gap-3'>
			<Heading
				hTag='h3'
				className='m-0 text-base'
			>
				{user.name ? user.name : 'Anonymous'}{' '}
				{user.channel?.isVerified && (
					<sup>
						<VerifiedBadge size={12} />
					</sup>
				)}
			</Heading>

			<div className='text-gray-500 text-xs whitespace-nowrap'>{transformDate(createdAt)}</div>
		</div>
	)
}

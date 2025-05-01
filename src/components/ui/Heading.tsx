import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
	children: ReactNode
	Icon?: LucideIcon
	isPageHeading?: boolean
	hSize?: string
	className?: string
	hTag?: React.ElementType
	classNameHeading?: string
}

export function Heading({
	children,
	Icon,
	isPageHeading = false,
	className,
	hSize,
	hTag: Tag = 'h2',
	classNameHeading
}: Props) {
	return (
		<div
			className={twMerge(
				'text-primary flex items-center',
				isPageHeading ? 'gap-2.5 mb-8' : 'gap-1.5 mb-6',
				className
			)}
		>
			{Icon && <Icon />}
			<Tag
				className={twMerge(
					'font-philosopher font-bold',
					classNameHeading,
					Tag == 'h2' && !hSize ? 'text-3xl' : hSize
				)}
			>
				{children}
			</Tag>
		</div>
	)
}

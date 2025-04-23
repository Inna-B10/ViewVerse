interface ICommentActions {}

export function CommentActions({}: ICommentActions) {
	return (
		<div className='flex items-center gap-3 mt-4'>
			<button className='relative text-gray-500 text-xs whitespace-nowrap  transition-all duration-300 hover:text-gray-400 after:content-[""] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[0.7px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full'>
				Edit
			</button>

			<button className='relative text-gray-500 text-xs whitespace-nowrap transition-all duration-300 hover:text-gray-400 after:content-[""] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[0.7px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full'>
				Delete
			</button>
		</div>
	)
}

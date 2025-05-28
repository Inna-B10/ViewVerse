import { VideoOff } from 'lucide-react'

export function VideoError() {
	return (
		<div className='aspect-video bg-field border border-border rounded-md flex flex-col gap-4 items-center justify-center text-2xl'>
			<VideoOff size={40} />
			<p>Error loading media: </p>
			<p>File Could Not Be Played</p>
		</div>
	)
}

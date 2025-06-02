import { type Dispatch, type SetStateAction, useCallback, useEffect, useRef, useState } from 'react'

type TypeOut = {
	ref: React.RefObject<any | null>
	isShow: boolean
	setIsShow: Dispatch<SetStateAction<boolean>>
}

export const useOutside = (initialIsVisible: boolean, onClose?: () => void): TypeOut => {
	const [isShow, setIsShow] = useState(initialIsVisible)
	const ref = useRef<HTMLElement>(null)

	const handleClickOutside = useCallback(
		(event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				setIsShow(false)
				onClose?.()
			}
		},
		[ref, onClose]
	)

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, true)
		return () => {
			document.removeEventListener('click', handleClickOutside, true)
		}
	}, [handleClickOutside])

	return { ref, isShow, setIsShow }
}

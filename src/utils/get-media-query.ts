'use client'

import { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

export function GetMediaQuery() {
	const [countColumns, setCountColumns] = useState(1)

	const isSmallScreen = useMediaQuery({ minWidth: 540, maxWidth: 767 })
	const isMediumScreen = useMediaQuery({ minWidth: 768, maxWidth: 1024 })
	const isLargeScreen = useMediaQuery({ minWidth: 1024 })

	useEffect(() => {
		if (isSmallScreen) setCountColumns(2)
		if (isMediumScreen) setCountColumns(3)
		if (isLargeScreen) setCountColumns(5)
	}, [isSmallScreen, isMediumScreen, isLargeScreen])

	return countColumns
}

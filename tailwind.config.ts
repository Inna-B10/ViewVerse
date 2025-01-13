import type { Config } from 'tailwindcss'
// import plugin from 'tailwindcss/plugin'
import { COLORS } from './src/constants/colors.constants'

export default {
	content: ['./src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			colors: COLORS,
			padding: {
				layout: '1.2rem'
			},
			transitionTimingFunction: {
				DEFAULT: 'ease-in-out'
			},
			boxShadow: {
				orange: '0 0 5px 1px rgb(255, 167, 78)'
			},
			transitionDuration: {
				DEFAULT: '150ms'
			},
			fontFamily: {
				philosopher: 'var(--font-philosopher)',
				mplus: 'var(--font-mplus)'
			},
			screens: {
				xs: '540px'
			}
		}
	},
	plugins: [
		//fot lang video title
		// plugin(function ({ addUtilities }) {
		// 	addUtilities({
		// 		'.line-clamp-2': {
		// 			display: '-webkit-box',
		// 			'-webkit-line-clamp': '2',
		// 			'-webkit-box-orient': 'vertical',
		// 			overflow: 'hidden',
		// 			'text-overflow': 'ellipsis'
		// 		}
		// 	})
		// })
	]
} satisfies Config

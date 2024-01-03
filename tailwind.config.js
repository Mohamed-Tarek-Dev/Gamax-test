const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: [],
	theme: {
		screens: {
			xs: '320px',
			phone: '430px',
			desktop: '1920px',
			...defaultTheme.screens,
		},
		container: {
			center: true,
			padding: '1rem',
		},
		extend: {
			fontFamily: {
				poppins: 'Poppins',
				montserrat: 'Montserrat',
			},
			colors: {
				PrimaryColor: '#053B50',
				SecondaryColor: '#3C99C0',
				SecondaryColorHover: '#62c1e9',
				Gray500: '#9D9B9B',
				Gray400: '#D1D1D1',
				DarkModeBackGround: '#232628',
				DarkModeFrameColor: '#34383A',
				WhiteColor: '#fff',
				DangerColor: '#C3423F',
				SuccessColor: '#9BC53D',
				LightModeBackGround: '#F0F2F5',
				LightModeFrameColor: '#FFFFFF',
				LightModeTextColor: '#000',
				SearchBarBg: '#02202B',
			},
		},
	},
	plugins: [],
};

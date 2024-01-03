// https://nuxt.com/docs/api/configuration/nuxt-config

module.exports = {
	modules: [
		'@nuxtjs/i18n',
		'@nuxtjs/tailwindcss',
		'@pinia/nuxt',
		'nuxt-icon',
		'@nuxtjs/color-mode',
		'nuxt-icon',
		'nuxt-vue3-google-signin',
		'@nuxt/image',
	],
	vite: {
		define: {
			// Assuming you want to disable detailed hydration mismatch warnings in production:
			__VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
		},
	},

	colorMode: {
		classSuffix: '',
		preference: 'system',
		fallback: 'dark',
	},
	pinia: {
		autoImports: ['defineStore', ['defineStore', 'definePiniaStore']],
	},
	build: {
		transpile: ['@vuepic/vue-datepicker'],
	},
	i18n: {
		vueI18n: './i18n.config.ts', // if you are using custom path, default
	},

	components: [
		{ path: '~/components/UI', extensions: ['vue'] },
		{ path: '~/components/PostsAndComments', extensions: ['vue'] },
		{ path: '~/components', extensions: ['vue'], pathPrefix: false },
	],

	runtimeConfig: {
		public: {
			ApiUrl: 'https://api.gamersverse.gg/api',
			FileApiUrl:
				'https://api.gamersverse.gg/api/StaticFiles/download?filePath=',
			ProfilePictureUrl:
				'https://api.gamersverse.gg/api/StaticFiles/downloadProfilePhoto?UserID=',
			CoverPictureUrl:
				'https://api.gamersverse.gg/api/StaticFiles/downloadCoverPhoto?UserID=',
			QuestionReacts: {
				up: { id: 0, img: '/assets/imgs/reactimg.png' },
				down: { id: 1, img: '/assets/imgs/reactimg.png' },
			},
			Reacts: {
				gg: {
					id: 2,
					img: 'https://api.gamersverse.gg/api/StaticFiles/download?filePath=StaticFiles/gg.png',
				},
				rip: {
					id: 3,
					img: 'https://api.gamersverse.gg/api/StaticFiles/download?filePath=StaticFiles/rip.png',
				},
				wp: {
					id: 4,
					img: 'https://api.gamersverse.gg/api/StaticFiles/download?filePath=StaticFiles/wp.png',
				},
				nt: {
					id: 5,
					img: 'https://api.gamersverse.gg/api/StaticFiles/download?filePath=StaticFiles/nt.png',
				},
			},
			Games: [
				{
					GameName: 'Valorant',
					GameRoute: '/gamestatus/valorant',
					GamePic:
						'https://api.gamersverse.gg/api/StaticFiles/download?filePath=StaticFiles/valorantcover.png',
				},
				{
					GameName: 'league of legeneds',
					GameRoute: '/gamestatus/lol',
					GamePic:
						'https://api.gamersverse.gg/api/StaticFiles/download?filePath=StaticFiles/leagueoflegeneds.png',
				},
				{
					GameName: 'Apex Legeneds',
					GameRoute: '/comingsoon',
					GamePic:
						'https://api.gamersverse.gg/api/StaticFiles/download?filePath=StaticFiles/apexlegends.jpg',
				},
				{
					GameName: 'Fortnite',
					GameRoute: '/comingsoon',
					GamePic:
						'https://api.gamersverse.gg/api/StaticFiles/download?filePath=StaticFiles/fortnite.png',
				},
				{
					GameName: 'Rainbow Six Siege',
					GameRoute: '/comingsoon',
					GamePic:
						'https://api.gamersverse.gg/api/StaticFiles/download?filePath=StaticFiles/rainbow.jpg',
				},
				{
					GameName: 'pubg',
					GameRoute: '/comingsoon',
					GamePic:
						'https://api.gamersverse.gg/api/StaticFiles/download?filePath=StaticFiles/pubg.jpg',
				},
				{
					GameName: 'Call Of Duty',
					GameRoute: '/comingsoon',
					GamePic:
						'https://api.gamersverse.gg/api/StaticFiles/download?filePath=StaticFiles/cod.jpg',
				},
				{
					GameName: 'battlefield',
					GameRoute: '/comingsoon',
					GamePic:
						'https://api.gamersverse.gg/api/StaticFiles/download?filePath=StaticFiles/battlefield.jpg',
				},
			],
			googleClientId:
				'103517342731-fako9klbvgus90gfcvh6ripn73552tef.apps.googleusercontent.com',
			// twitchClientId: process.env.TWITCH_CLIENT_ID,
			// twitchClientSecret: process.env.TWITCH_CLIENT_SECRET,
		},
		// public: {
		// 	ApiUrl: 'http://localhost:5285/api',
		// 	FileApiUrl:
		// 		'http://localhost:5285/api/StaticFiles/download?filePath=',
		// 	ProfilePictureUrl:
		// 		'http://localhost:5285/api/StaticFiles/downloadProfilePhoto?UserID=',
		// 	CoverPictureUrl:
		// 		'http://localhost:5285/api/StaticFiles/downloadCoverPhoto?UserID=',
		// 	QuestionReacts: {
		// 		up: { id: 0, img: '/assets/imgs/reactimg.png' },
		// 		down: { id: 1, img: '/assets/imgs/reactimg.png' },
		// 	},
		// 	Reacts: {
		// 		gg: {
		// 			id: 2,
		// 			img: 'http://localhost:5285/api/StaticFiles/download?filePath=StaticFiles/gg.png',
		// 		},
		// 		rip: {
		// 			id: 3,
		// 			img: 'http://localhost:5285/api/StaticFiles/download?filePath=StaticFiles/rip.png',
		// 		},
		// 		wp: {
		// 			id: 4,
		// 			img: 'http://localhost:5285/api/StaticFiles/download?filePath=StaticFiles/wp.png',
		// 		},
		// 		nt: {
		// 			id: 5,
		// 			img: 'http://localhost:5285/api/StaticFiles/download?filePath=StaticFiles/nt.png',
		// 		},
		// 	},
		// 	Games: [
		// 		{
		// 			GameName: 'Valorant',
		// 			GameRoute: '/gamestatus/valorant/show',
		// 			GamePic:
		// 				'http://localhost:5285/api/StaticFiles/download?filePath=StaticFiles/valorantcover.png',
		// 		},
		// 		{
		// 			GameName: 'league of legeneds',
		// 			GameRoute: '/gamestatus/lol/show',
		// 			GamePic:
		// 				'http://localhost:5285/api/StaticFiles/download?filePath=StaticFiles/leagueoflegeneds.png',
		// 		},
		// 		{
		// 			GameName: 'Apex Legeneds',
		// 			GameRoute: 'gamestatus/comingsoon',
		// 			GamePic:
		// 				'http://localhost:5285/api/StaticFiles/download?filePath=StaticFiles/apexlegends.jpg',
		// 		},
		// 		{
		// 			GameName: 'Fortnite',
		// 			GameRoute: 'gamestatus/comingsoon',
		// 			GamePic:
		// 				'http://localhost:5285/api/StaticFiles/download?filePath=StaticFiles/fortnite.png',
		// 		},
		// 		{
		// 			GameName: 'Rainbow Six Siege',
		// 			GameRoute: 'gamestatus/comingsoon',
		// 			GamePic:
		// 				'http://localhost:5285/api/StaticFiles/download?filePath=StaticFiles/rainbow.jpg',
		// 		},
		// 		{
		// 			GameName: 'pubg',
		// 			GameRoute: 'gamestatus/comingsoon',
		// 			GamePic:
		// 				'http://localhost:5285/api/StaticFiles/download?filePath=StaticFiles/pubg.jpg',
		// 		},
		// 		{
		// 			GameName: 'Call Of Duty',
		// 			GameRoute: 'gamestatus/comingsoon',
		// 			GamePic:
		// 				'http://localhost:5285/api/StaticFiles/download?filePath=StaticFiles/cod.jpg',
		// 		},
		// 		{
		// 			GameName: 'battlefield',
		// 			GameRoute: 'gamestatus/comingsoon',
		// 			GamePic:
		// 				'http://localhost:5285/api/StaticFiles/download?filePath=StaticFiles/battlefield.jpg',
		// 		},
		// 	],
		// 	googleClientId: process.env.GOOGLE_CLIENT_ID,
		// 	twitchClientId: process.env.TWITCH_CLIENT_ID,
		// 	twitchClientSecret: process.env.TWITCH_CLIENT_SECRET,
		// },
	},

	googleSignIn: {
		clientId: process.env.GOOGLE_CLIENT_ID,
	},

	app: {
		head: {
			title: 'GamersVerse', // for all pages
			meta: [
				{
					name: 'description',
					content:
						'Gamers Verse Is Social Media Platform Designed And Developed To Be Place Where Gamers Can Meet And Play Together And Share Their Memories Together',
				},
			],
			link: [
				// {rel: "stylesheet", href: "https://fonts.googleapis.com/icon?family=Material+Icons"}و
				// { rel: 'canonical', href: 'https://www.gamax.co/' },
			],
		},
		layoutTransition: { name: 'layout', mode: 'out-in' },
	},
};

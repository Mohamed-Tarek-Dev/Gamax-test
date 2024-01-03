import { useMainStore } from '@/stores/index';
export const useInterestsStore = defineStore('intersts', () => {
	// ====== Satae
	const config = useRuntimeConfig();
	const mainStore = useMainStore();
	const selectedConsoles = ref([]);
	const selectedGames = ref([]);
	const selectedInterests = ref([]);
	const consoles = ref(['Playstation', 'Xbox', 'Mobile', 'PC']);
	const games = ref([
		{
			name: 'Valorant',
			image: '/images/Interests/games/1.png',
		},
		{
			name: 'PUBG',
			image: '/images/Interests/games/2.png',
		},
		{
			name: 'APEX',
			image: '/images/Interests/games/3.png',
		},
		{
			name: 'BATTLEFLD',
			image: '/images/Interests/games/4.png',
		},
		{
			name: 'LEAGU OF LEGENDS',
			image: '/images/Interests/games/5.png',
		},
	]);

	const interests = ref([
		'🎨 Art',
		'⛩️ Architecture',
		'🖌️ Chinese calligraphy',
		'🍿 Cinema',
		'💃🏻 Dance',
		'📐 Illustration',
		'👜 Fashion',
		'🖼️ Graphic design',
		'📜 Literature',
		'📷 Photography',
		'🎵 Music',
		'✈ ️ Travel',
		'🖌️ Design',
		'🍣 Sushi',
		'🏀 Basketball',
		'🏓 Ping Pong',
		'🎮 Games',
		'🎲 Board games',
	]);

	// ====== Getters
	const getSelectedConsoles = computed(() => selectedConsoles.value);
	const getSelectedGames = computed(() => selectedGames.value);
	const getSelectedInterests = computed(() => selectedInterests.value);
	const getConsoles = computed(() => consoles.value);
	const getGames = computed(() => games.value);
	const getInterests = computed(() => interests.value);

	// =========== Actions

	// Selects a console
	const selectConsoles = (device) => {
		const index = selectedConsoles.value.indexOf(device);
		if (index === -1) {
			selectedConsoles.value.push(device);
		} else {
			selectedConsoles.value.splice(index, 1);
		}
		console.log(selectedConsoles.value);
	};

	const isSelected = (device) => {
		return selectedConsoles.value.includes(device);
	};

	// Toggles a game
	const toggleGame = (game) => {
		const index = selectedGames.value.indexOf(game);
		if (index === -1) {
			selectedGames.value.push(game);
		} else {
			selectedGames.value.splice(index, 1);
		}
		console.log(selectedGames.value);
	};

	// Toggles an interest
	const clickedInterests = ref(interests.value.map(() => false));
	const toggleIcon = (index) => {
		clickedInterests.value[index] = !clickedInterests.value[index];

		const interest = interests.value[index];
		const interestIndex = selectedInterests.value.indexOf(interest);

		if (interestIndex === -1) {
			selectedInterests.value.push(interest);
			console.log(selectedInterests.value);
		} else {
			selectedInterests.value.splice(interestIndex, 1);
			console.log(selectedInterests.value);
		}
	};

	// Add Interests
	const error = ref(null);
	const addProfileInterestData = async () => {
		// 	try {
		// 	const response = await $fetch(
		// 		`${config.public.ApiUrl}/Accounts/AddProfileInterestData`,
		// 		{
		// 			method: 'POST',
		// 			body: body,
		// 			credentials: 'include',
		// 		}
		// 	);
		// 	// Handle the response as needed
		// 	console.log(response);
		// } catch (err) {
		// 	error.value = err;
		// 	console.log(error.value);
		// } finally {
		// 	console.log('done');
		// }
	};

	return {
		selectedConsoles,
		selectedGames,
		selectedInterests,
		clickedInterests,
		consoles,
		games,
		getConsoles,
		getSelectedConsoles,
		getSelectedGames,
		getSelectedInterests,
		getInterests,
		getGames,
		selectConsoles,
		isSelected,
		toggleGame,
		toggleIcon,
		addProfileInterestData,
	};
});

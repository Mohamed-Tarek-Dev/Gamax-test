<template>
	<div class="mt-24">
		<div class="categories">
			<h2 class="mb-3 mt-10 text-3xl text-white">
				{{ $t('interests.games_page.popular_games') }}
			</h2>
			<ul class="my-28 grid grid-cols-5 gap-x-7 gap-y-44">
				<li
					class="categories__game flex h-40 w-full flex-col items-center justify-center rounded-[9px]"
					:class="{
						selected: selectedGames.includes(game),
					}"
					v-for="game in games"
					:key="game.id"
					@click="interestsStore.toggleGame(game)"
				>
					<NuxtImg :src="game.image" alt="Valorant" loading="lazy" />
					<p class="mt-2 text-center text-sm text-black">
						{{ game.name }}
					</p>
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup>
	import { storeToRefs } from 'pinia';
	import { useInterestsStore } from '@/stores/interests';

	const interestsStore = useInterestsStore();

	const { games, selectedGames } = storeToRefs(interestsStore);
</script>

<style lang="scss" scoped>
	.categories {
		&__game {
			@apply cursor-pointer;
			img {
				@apply w-[100%];
			}
			p {
				@apply mt-2 w-full bg-white px-[20px] py-[13px] text-center text-sm font-medium text-black;
				border-bottom-left-radius: 10px;
				border-bottom-right-radius: 10px;
			}

			&:hover {
				p {
					@apply bg-SecondaryColor text-white;
				}
			}

			&.selected {
				p {
					@apply bg-SecondaryColor text-white;
				}
			}
		}
	}
</style>

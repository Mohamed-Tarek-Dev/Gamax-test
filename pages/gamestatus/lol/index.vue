<script setup>
	definePageMeta({
		middleware: 'require-auth',
		layout: 'main',
	});

	const SearchBarValue = ref('');
	const Config = useRuntimeConfig();
	const SearchLol = () => {
		navigateTo(`/gamestatus/lol/${SearchBarValue.value}`);
	};
</script>

<template>
	<div
		class="thecontainer flex flex-col gap-12 rounded-xl font-montserrat text-LightModeFrameColor md:mt-10"
	>
		<div
			class="thebg relative flex h-[350px] flex-col justify-center gap-10 overflow-hidden px-4 md:px-14"
		>
			<div
				class="absolute left-0 top-0 h-full w-full bg-DarkModeBackGround/50"
			></div>
			<div class="z-[5] flex flex-col gap-2">
				<p class="text-3xl font-semibold">LEAGUE OF LEGENDS STATS</p>
				<p class="text-base font-semibold">
					Check Detailed LOL Stats and Leaderboards
				</p>
			</div>
			<SearchBar
				:modelValue="SearchBarValue"
				:bgcolor="`bg-LightModeFrameColor`"
				@update:model-value="SearchBarValue = $event"
				class="z-[5] w-full text-DarkModeBackGround md:w-1/2"
				@SearchFunction="SearchLol"
			/>
		</div>
		<p
			class="text-xl font-semibold text-DarkModeBackGround dark:text-LightModeFrameColor"
		>
			Other Games
		</p>
		<div
			class="m-auto flex w-[90%] flex-wrap justify-center gap-8 lg:w-[800px] desktop:w-[944px]"
		>
			<NuxtLink
				v-for="Game in Config.public.Games"
				:to="Game.GameRoute"
				class="relative flex h-[283px] w-[186px] items-center justify-center overflow-hidden rounded-xl lg:w-[212px]"
			>
				<img
					:src="Game.GamePic"
					class="absolute z-0 h-full w-full object-cover"
					loading="lazy"
				/>
				<div
					class="absolute z-0 h-full w-full bg-DarkModeFrameColor/50"
				></div>
				<p class="z-10 text-center text-2xl font-semibold uppercase">
					{{ Game.GameName }}
				</p>
			</NuxtLink>
		</div>
	</div>
</template>

<style scoped>
	.thebg {
		background: url('https://api.gamersverse.gg/api/StaticFiles/download?filePath=StaticFiles/omenbg.png')
			center no-repeat;
		background-size: cover;
	}
</style>

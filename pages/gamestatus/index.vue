<script setup>
	definePageMeta({
		middleware: 'require-auth',
		layout: 'main',
	});

	const Config = useRuntimeConfig();
</script>

<template>
	<div
		class="min-h-[80vh] w-full font-montserrat text-DarkModeBackGround dark:text-LightModeFrameColor md:mt-12"
	>
		<p class="mb-12 ml-4 text-xl font-semibold uppercase lg:mb-20 lg:ml-16">
			All Games
		</p>
		<div
			class="m-auto flex w-[90%] flex-wrap justify-center gap-8 lg:w-[800px] desktop:w-[944px]"
		>
			<NuxtLink
				v-for="Game in Config.public.Games"
				:to="Game.GameRoute"
				class="relative flex h-[283px] w-[186px] items-center justify-center overflow-hidden rounded-xl text-LightModeFrameColor lg:w-[212px]"
			>
				<img
					:src="Game.GamePic"
					class="absolute z-0 h-full w-full object-cover"
					loading="lazy"
				/>
				<div
					class="absolute z-0 h-full w-full bg-DarkModeFrameColor/50"
				></div>
				<p class="z-[5] text-center text-2xl font-semibold uppercase">
					{{ Game.GameName }}
				</p>
			</NuxtLink>
		</div>
	</div>
</template>

<style scoped></style>

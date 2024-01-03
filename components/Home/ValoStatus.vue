<script setup>
	const MouseIn = ref(false);
</script>

<template>
	<div
		class="flex w-full flex-col gap-8 overflow-hidden rounded-lg bg-LightModeFrameColor p-4 dark:bg-DarkModeFrameColor"
		@mouseover="MouseIn = true"
		@mouseleave="MouseIn = false"
	>
		<div class="flex items-center justify-between">
			<img
				src="@/assets/imgs/valorantlogo.svg"
				class="w-[100px] object-cover"
				loading="lazy"
				v-if="$colorMode.value == 'dark'"
			/>
			<img
				src="@/assets/imgs/valologo.svg"
				class="w-[100px] object-cover"
				loading="lazy"
				v-else
			/>
			<div class="flex items-center gap-2">
				<img
					src="@/assets/imgs/unranked.png"
					loading="lazy"
					class="h-[50px] w-[50px] object-cover"
				/>

				<div class="flex flex-col gap-1 text-Gray500">
					<p>Rating</p>
					<p>????</p>
				</div>
			</div>
		</div>
		<div class="flex items-center justify-between gap-5">
			<img
				src="@/assets/imgs/champer.png"
				class="w-[50px] object-contain"
			/>
		</div>
		<Transition name="fade-in">
			<div
				class="bg-AllColorsTextColor/20 absolute inset-0 flex items-center justify-center rounded-lg"
				v-if="MouseIn"
			>
				<NuxtLink to="/comingsoon">
					<p
						class="flex items-center gap-2 rounded-xl bg-SecondaryColor px-4 py-2 text-sm text-LightModeFrameColor"
					>
						<Icon
							name="humbleicons:external-link"
							size="24px"
						/>Link Your Game Now
					</p>
				</NuxtLink>
			</div>
		</Transition>
	</div>
</template>

<style scoped>
	.fade-in-enter-active,
	.fade-in-leave-active {
		transition: opacity 0.5s ease;
	}

	.fade-in-enter-from,
	.fade-in-leave-to {
		opacity: 0;
	}
</style>

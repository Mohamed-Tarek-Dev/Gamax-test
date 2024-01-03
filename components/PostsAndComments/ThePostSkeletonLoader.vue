<script setup>
	const colorMode = useColorMode();

	const isDark = computed(() => {
		return colorMode.value;
	});
</script>

<template>
	<div
		class="dark:bg-DarkModeFrameColor bg-LightModeFrameColor flex w-full flex-col gap-4 overflow-hidden rounded-xl"
	>
		<div class="flex flex-col p-8 pb-0">
			<div class="flex items-center gap-4">
				<div
					class="h-[50px] w-[50px] rounded-full"
					:class="{
						' skeleton': isDark == 'dark',
						'skeleton-light': isDark != 'dark',
					}"
				></div>
				<div
					class="flex w-1/3 flex-col p-2"
					:class="{
						' skeleton': isDark == 'dark',
						'skeleton-light': isDark != 'dark',
					}"
				></div>
			</div>
			<p
				class="mt-4 w-full p-4 text-base font-semibold"
				:class="{
					' skeleton': isDark == 'dark',
					'skeleton-light': isDark != 'dark',
				}"
			></p>
			<div class="relative mb-4 mt-2 overflow-hidden">
				<div
					class="flex h-[200px] flex-col gap-2 rounded"
					:class="{
						' skeleton': isDark == 'dark',
						'skeleton-light': isDark != 'dark',
					}"
				></div>
			</div>
		</div>
	</div>
</template>

<style scoped></style>

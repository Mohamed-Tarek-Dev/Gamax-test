<template>
	<div
		class="relative flex h-[250px] w-full flex-col gap-6 px-12 py-4 text-LightModeFrameColor"
	>
		<img
			src="@/assets/imgs/pyke.png"
			class="absolute left-0 top-0 h-full w-full rounded-lg object-cover"
			loading="lazy"
		/>
		<div class="z-[5] flex w-fit flex-col items-center gap-4">
			<img
				src="@/assets/imgs/profile.png"
				class="h-[116px] w-[116px] rounded-full"
				loading="lazy"
			/>
			<p>Arabola</p>
			<p class="flex items-center gap-2">
				<Icon name="mdi:eye" size="14px" />400 views
			</p>
		</div>
	</div>
</template>

<script setup></script>

<style scoped></style>

<script setup></script>

<template>
	<div
		class="flex w-full flex-col rounded-xl bg-LightModeFrameColor p-4 font-montserrat text-DarkModeBackGround dark:bg-DarkModeFrameColor dark:text-LightModeFrameColor"
	>
		<div class="mb-3 flex justify-between">
			<p class="text-xl font-semibold">
				{{ $t('gamestatus_page.CurrentRanking') }}
			</p>
			<Icon name="jam:alert" size="20px" />
		</div>
		<div class="mb-12 flex items-center gap-3">
			<img
				src="@/assets/imgs/silverrankvalo.png"
				class="h-[39px] w-[39px] object-cover"
				loading="lazy"
			/>
			<div class="flex flex-col">
				<p class="text-Gray500">
					{{ $t('gamestatus_page.Rating') }}
				</p>
				<p class="font-semibold">Silver 3</p>
			</div>
		</div>
		<div class="flex flex-col gap-6">
			<p class="ml-16 text-xl font-semibold">
				{{ $t('gamestatus_page.PeakRating') }}
			</p>
			<div class="flex items-center gap-3">
				<img
					src="@/assets/imgs/goldrankvalo.png"
					class="h-[39px] w-[39px] object-cover"
					loading="lazy"
				/>
				<div class="flex flex-col">
					<p class="text-xl font-semibold">Gold2</p>
					<p class="font-medium text-Gray500">EPISODE 5: ACT 3</p>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped></style>

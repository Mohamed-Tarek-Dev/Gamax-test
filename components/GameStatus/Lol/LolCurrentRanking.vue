<script setup></script>

<template>
	<div
		class="flex flex-col bg-LightModeFrameColor font-montserrat text-DarkModeBackGround dark:bg-DarkModeFrameColor dark:text-LightModeFrameColor"
	>
		<div class="flex items-center gap-3 px-5 py-3">
			<img
				src="@/assets/imgs/lolranking.png"
				class="h-[35px] w-[35px] object-contain"
				loading="lazy"
			/>
			<p class="font-semibold">Current Ranking</p>
		</div>
		<div class="flex items-center gap-3 p-4">
			<img
				src="@/assets/imgs/lolchallenger.png"
				class="h-[40px] w-[40px] object-contain"
				loading="lazy"
			/>
			<div class="flex flex-col gap-1">
				<p class="text-LightModePrimaryColorTwo text-xs font-medium">
					Challenger
				</p>
				<p class="font-semibold">
					2,015
					<sup
						class="text-LightModePrimaryColorTwo text-xs font-medium"
						>LP</sup
					>
				</p>
			</div>
		</div>
		<div
			class="bg-LightModePrimaryColor flex flex-col gap-3 p-4 dark:bg-DarkModeFrameColor"
		>
			<p class="text-xm font-medium">Peak Rating</p>
			<div class="flex items-center gap-2">
				<img
					src="@/assets/imgs/lolchallenger.png"
					class="h-[40px] w-[40px] object-contain"
					loading="lazy"
				/>
				<div class="flex flex-col gap-1">
					<p class="font-semibold">
						Challenger
						<span
							class="text-xm text-LightModePrimaryColorTwo font-medium"
							>2,015 <sup class="text-xs">LP</sup></span
						>
					</p>
					<p
						class="text-LightModePrimaryColorTwo text-xs font-medium"
					>
						Season 2023 Split 2
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped></style>

<template>
	<div
		class="flex flex-col gap-4 bg-LightModeFrameColor font-montserrat text-DarkModeBackGround dark:bg-DarkModeFrameColor dark:text-LightModeFrameColor"
	>
		<div class="flex items-center gap-3 p-4">
			<Icon name="bx:medal" size="32px" class="text-SecondaryColor" />
			<div class="flex flex-col gap-1">
				<p class="text-lg font-semibold">Top Champions</p>
				<p class="text-LightModePrimaryColorTwo text-sm font-medium">
					Stats for the selected season
				</p>
			</div>
		</div>
		<div class="flex flex-col items-center gap-4">
			<img
				src="@/assets/imgs/kassa.jpg"
				class="max-h-[90px] w-full border-y-2 border-SecondaryColor object-cover object-top"
				loading="lazy"
			/>
			<div class="flex flex-col items-center">
				<p class="font-semibold">Bel'Veth</p>
				<div class="flex items-center gap-3">
					<p class="font-medium text-SecondaryColor">KDA 3.73</p>
					<p class="font-medium text-SecondaryColor">WR 62%</p>
				</div>
				<div class="flex items-center gap-3">
					<p
						class="text-LightModePrimaryColorTwo text-xs font-medium"
					>
						7.6 / 3.6 / 5.7
					</p>
					<p
						class="text-LightModePrimaryColorTwo text-xs font-medium"
					>
						132W - 82L
					</p>
				</div>
			</div>
		</div>
		<div class="flex flex-col items-center gap-4">
			<img
				src="@/assets/imgs/garen.jpg"
				class="max-h-[90px] w-full border-y-2 border-SecondaryColor object-cover object-top"
				loading="lazy"
			/>
			<div class="flex flex-col items-center">
				<p class="font-semibold">Garen</p>
				<div class="flex items-center gap-3">
					<p class="font-medium text-SecondaryColor">KDA 3.73</p>
					<p class="font-medium text-SecondaryColor">WR 62%</p>
				</div>
				<div class="flex items-center gap-3">
					<p
						class="text-LightModePrimaryColorTwo text-xs font-medium"
					>
						7.6 / 3.6 / 5.7
					</p>
					<p
						class="text-LightModePrimaryColorTwo text-xs font-medium"
					>
						132W - 82L
					</p>
				</div>
			</div>
		</div>
		<div class="flex flex-col items-center gap-4">
			<img
				src="@/assets/imgs/akali.jpg"
				class="max-h-[90px] w-full border-y-2 border-SecondaryColor object-cover object-top"
				loading="lazy"
			/>
			<div class="flex flex-col items-center">
				<p class="font-semibold">Akali</p>
				<div class="flex items-center gap-3">
					<p class="font-medium text-SecondaryColor">KDA 3.73</p>
					<p class="font-medium text-SecondaryColor">WR 62%</p>
				</div>
				<div class="flex items-center gap-3">
					<p
						class="text-LightModePrimaryColorTwo text-xs font-medium"
					>
						7.6 / 3.6 / 5.7
					</p>
					<p
						class="text-LightModePrimaryColorTwo text-xs font-medium"
					>
						132W - 82L
					</p>
				</div>
			</div>
		</div>
		<div
			class="flex items-center justify-center bg-LightModeFrameColor p-4 dark:bg-DarkModeFrameColor"
		>
			<div
				class="flex w-3/4 cursor-pointer items-center justify-center rounded-xl bg-LightModeTextColor/10 py-3 font-semibold dark:bg-LightModeFrameColor/10 dark:text-LightModeFrameColor"
			>
				View All
			</div>
		</div>
	</div>
</template>

<script setup></script>

<style scoped></style>

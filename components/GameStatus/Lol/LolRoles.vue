<template>
	<div
		class="flex flex-col gap-4 bg-LightModeFrameColor font-montserrat text-DarkModeBackGround dark:bg-DarkModeFrameColor dark:text-LightModeFrameColor"
	>
		<div
			class="flex items-center gap-3 border-b-2 border-SecondaryColor p-4"
		>
			<img
				src="@/assets/imgs/roles.png"
				class="h-[35px] w-[35px] object-contain"
				loading="lazy"
			/>
			<div class="flex flex-col gap-1">
				<p class="text-lg font-semibold">Roles</p>
				<p class="text-LightModePrimaryColorTwo text-sm font-medium">
					Stats from last 323 matches
				</p>
			</div>
		</div>
		<div class="flex items-center gap-4 p-2">
			<div class="rounded-full bg-SecondaryColor p-2">
				<img
					src="@/assets/imgs/TopRole.png"
					class="h-[30px] w-[30px] object-contain"
					loading="lazy"
				/>
			</div>
			<div class="flex flex-grow flex-col gap-1">
				<p class="text-sm font-medium">Top</p>
				<div class="flex font-semibold text-SecondaryColor">
					<p class="w-1/2">WR 83.3%</p>
					<p class="w-1/2">KDA 2.23</p>
				</div>
				<div class="flex text-xs font-medium">
					<p class="w-1/2">5W - 1L</p>
					<p class="w-1/2">2.8 / 3.7 / 5.3</p>
				</div>
			</div>
		</div>
		<div class="flex items-center gap-4 p-2">
			<!-- Bottom -->
			<div class="rounded-full bg-SecondaryColor p-2">
				<img
					src="@/assets/imgs/BottomRole.png"
					class="h-[30px] w-[30px] object-contain"
					loading="lazy"
				/>
			</div>
			<div class="flex flex-grow flex-col gap-1">
				<p class="text-sm font-medium">Bottom</p>
				<div class="flex font-semibold text-SecondaryColor">
					<p class="w-1/2">WR 55.2%</p>
					<p class="w-1/2">KDA 2.84</p>
				</div>
				<div class="flex text-xs font-medium">
					<p class="w-1/2">16W - 13L</p>
					<p class="w-1/2">4.8 / 4.6 / 8.1</p>
				</div>
			</div>
		</div>
		<div class="flex items-center gap-4 p-2">
			<!-- Support -->
			<div class="rounded-full bg-SecondaryColor p-2">
				<img
					src="@/assets/imgs/SupportRole.png"
					class="h-[30px] w-[30px] object-contain"
					loading="lazy"
				/>
			</div>
			<div class="flex flex-grow flex-col gap-1">
				<p class="text-sm font-medium">Support</p>
				<div class="flex font-semibold text-SecondaryColor">
					<p class="w-1/2">WR 100.0%</p>
					<p class="w-1/2">KDA 16.00</p>
				</div>
				<div class="flex text-xs font-medium">
					<p class="w-1/2">1W - 0L</p>
					<p class="w-1/2">2.0 / 1.0 / 14.0</p>
				</div>
			</div>
		</div>
		<div class="flex items-center gap-4 p-2">
			<!-- Jungle -->
			<div class="rounded-full bg-SecondaryColor p-2">
				<img
					src="@/assets/imgs/JungleRole.png"
					class="h-[30px] w-[30px] object-contain"
					loading="lazy"
				/>
			</div>
			<div class="flex flex-grow flex-col gap-1">
				<p class="text-sm font-medium">Jungle</p>
				<div class="flex font-semibold text-SecondaryColor">
					<p class="w-1/2">WR 60.9%</p>
					<p class="w-1/2">KDA 3.71</p>
				</div>
				<div class="flex text-xs font-medium">
					<p class="w-1/2">173W - 111L</p>
					<p class="w-1/2">6.7 / 3.6 / 6.6</p>
				</div>
			</div>
		</div>
		<div class="flex items-center gap-4 p-2">
			<!-- Middle -->
			<div class="rounded-full bg-SecondaryColor p-2">
				<img
					src="@/assets/imgs/MiddleRole.png"
					class="h-[30px] w-[30px] object-contain"
					loading="lazy"
				/>
			</div>
			<div class="flex flex-grow flex-col gap-1">
				<p class="text-sm font-medium">Middle</p>
				<div class="flex font-semibold text-SecondaryColor">
					<p class="w-1/2">WR 0.0%</p>
					<p class="w-1/2">KDA 1.44</p>
				</div>
				<div class="flex text-xs font-medium">
					<p class="w-1/2">0W - 3L</p>
					<p class="w-1/2">1.7 / 6.0 / 7.0</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup></script>

<style scoped></style>

<script setup></script>

<template>
	<div
		class="text-DarkModeBackGround flex w-full flex-wrap justify-center gap-2 dark:text-white xl:justify-between xl:gap-0"
	>
		<div
			class="dark:bg-DarkModeFrameColor bg-LightModeFrameColor flex w-full flex-col items-center justify-center gap-4 rounded-xl p-4 lg:w-[49%] xl:w-[22%]"
		>
			<p class="text-base font-medium">Win %</p>
			<div class="flex items-center justify-between gap-1">
				<div class="flex flex-col">
					<p class="text-xl font-semibold">60.2%</p>
					<p class="text-base font-medium">S.Top 14 %</p>
				</div>
				<CircleSvg
					:radius="25"
					strokeColor="#3C99C0"
					strokePercentage="25"
					remainingColor="#000"
					:strokeWidth="10"
				/>
			</div>
		</div>
		<div
			class="dark:bg-DarkModeFrameColor bg-LightModeFrameColor flex w-full flex-col items-center justify-center gap-4 rounded-xl p-4 lg:w-[49%] xl:w-[22%]"
		>
			<p class="text-base font-medium">Kill Participation</p>
			<div class="flex items-center justify-between gap-1">
				<div class="flex flex-col">
					<p class="text-xl font-semibold">69.8%</p>
					<p class="text-base font-medium">S.Top 21 %</p>
				</div>
				<CircleSvg
					:radius="25"
					strokeColor="#3C99C0"
					strokePercentage="25"
					remainingColor="#000"
					:strokeWidth="10"
				/>
			</div>
		</div>
		<div
			class="dark:bg-DarkModeFrameColor bg-LightModeFrameColor flex w-full flex-col items-center justify-center gap-4 rounded-xl p-4 lg:w-[49%] xl:w-[22%]"
		>
			<p class="text-base font-medium">Objective P</p>
			<div class="flex items-center justify-between gap-1">
				<div class="flex flex-col">
					<p class="text-xl font-semibold">95.7%</p>
					<p class="text-base font-medium">S.Top .5 %</p>
				</div>
				<CircleSvg
					:radius="25"
					strokeColor="#3C99C0"
					strokePercentage="25"
					remainingColor="#000"
					:strokeWidth="10"
				/>
			</div>
		</div>
		<div
			class="dark:bg-DarkModeFrameColor bg-LightModeFrameColor flex w-full flex-col items-center justify-center gap-4 rounded-xl p-4 lg:w-[49%] xl:w-[22%]"
		>
			<p class="text-base font-medium">XP Diff vs Enemy</p>
			<div class="flex items-center justify-between gap-1">
				<div class="flex flex-col">
					<p class="text-xl font-semibold">7.0%</p>
					<p class="text-base font-medium">S.Top 21 %</p>
				</div>
				<CircleSvg
					:radius="25"
					strokeColor="#3C99C0"
					strokePercentage="25"
					remainingColor="#000"
					:strokeWidth="10"
				/>
			</div>
		</div>
	</div>
</template>

<style scoped></style>

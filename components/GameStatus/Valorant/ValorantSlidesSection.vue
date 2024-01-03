<script setup></script>

<template>
	<div
		class="text-DarkModeBackGround flex w-full flex-wrap justify-center gap-2 dark:text-white xl:justify-between xl:gap-0"
	>
		<div
			class="dark:bg-DarkModeFrameColor bg-LightModeFrameColor flex w-full flex-col items-center justify-center gap-4 rounded-xl p-4 lg:w-[49%] xl:w-[22%]"
		>
			<p class="text-base font-medium">
				{{ $t('gamestatus_page.RoundWinPercentage') }}
			</p>
			<div class="flex items-center justify-between gap-1">
				<div class="flex flex-col">
					<p class="text-xl font-semibold">52.8%</p>
					<p class="text-base font-medium">Top 14 %</p>
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
			<p class="text-base font-medium">
				{{ $t('gamestatus_page.KASTWord') }}
			</p>
			<div class="flex items-center justify-between gap-1">
				<div class="flex flex-col">
					<p class="text-xl font-semibold">69.8%</p>
					<p class="text-base font-medium">Bottom 40%</p>
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
			<p class="text-base font-medium">
				{{ $t('gamestatus_page.ACS') }}
			</p>
			<div class="flex items-center justify-between gap-1">
				<div class="flex flex-col">
					<p class="text-xl font-semibold">198.7</p>
					<p class="text-base font-medium">Bottom 33%</p>
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
			<p class="text-base font-medium">
				{{ $t('gamestatus_page.DeathPerRound') }}
			</p>
			<div class="flex items-center justify-between gap-1">
				<div class="flex flex-col">
					<p class="text-xl font-semibold">-10</p>
					<p class="text-base font-medium">Bottom 33%</p>
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

<script setup></script>

<template>
	<div
		class="mt-4 flex w-full flex-col gap-5 overflow-hidden rounded-xl bg-LightModeFrameColor pb-3 font-montserrat text-DarkModeBackGround dark:bg-DarkModeFrameColor dark:text-LightModeFrameColor lg:mt-0"
	>
		<div
			class="flex items-center justify-center gap-4 p-5 text-sm font-medium"
		>
			<img src="@/assets/imgs/rankediconoverviewlol.png" loading="lazy" />
			<p class="text-base font-semibold">Ranked Solo Overview</p>
			<div class="flex items-center gap-2">
				<Icon name="solar:stopwatch-linear" size="24px" />
				<p>133h {{ $t('gamestatus_page.PlayTime') }}</p>
			</div>
			<p>323 {{ $t('gamestatus_page.MatchesWord') }}</p>
		</div>
		<div
			class="divbg relative flex h-[130px] w-full items-center gap-7 p-5 pl-10 text-LightModeFrameColor"
			style="
				--bg-img: url('https://api.gamersverse.gg/api/StaticFiles/download?filePath=StaticFiles/mainsectionbg.jpg');
			"
		>
			<div
				class="absolute left-0 top-0 h-full w-full bg-LightModeFrameColor/20"
			></div>
			<div class="z-[5] flex items-center justify-center gap-6">
				<img
					src="@/assets/imgs/challenger.png"
					class="h-[80px] w-[80px] object-contain"
					loading="lazy"
				/>
				<div class="flex flex-col gap-1">
					<p
						class="text-LightModePrimaryColorTwo text-base font-semibold"
					>
						Challenger
					</p>
					<p class="text-3xl font-semibold">
						2,015 <sup class="text-base">LP</sup>
					</p>
				</div>
				<div class="flex flex-col gap-1">
					<p
						class="text-LightModePrimaryColorTwo text-base font-semibold"
					>
						Win Rate
					</p>
					<p class="text-3xl font-semibold">60.4%</p>
					<p class="text-xs font-medium">195W - 128L</p>
				</div>
			</div>
		</div>
		<div
			class="relative -top-10 mx-auto flex w-full flex-wrap items-center justify-center gap-8 lg:w-[306px] xl:mx-0 xl:w-full"
		>
			<div class="relative">
				<CircleSvg
					:radius="60"
					strokeColor="#3C99C0"
					strokePercentage="75"
					remainingColor="#000"
					:strokeWidth="7"
				/>
				<div
					class="absolute inset-0 flex flex-col items-center justify-center font-medium"
				>
					<p class="text-xs text-Gray500">Damage/Gold</p>
					<p class="text-sm text-white">1.30</p>
					<p class="text-xs text-Gray500">Bottom 15%</p>
				</div>
			</div>
			<div class="relative">
				<CircleSvg
					:radius="60"
					strokeColor="#3C99C0"
					strokePercentage="75"
					remainingColor="#000"
					:strokeWidth="7"
				/>
				<div
					class="absolute inset-0 flex flex-col items-center justify-center font-medium"
				>
					<p class="text-xs text-Gray500">KDA</p>
					<p class="text-sm text-white">3.57</p>
					<p class="text-xs text-Gray500">Top 11%</p>
				</div>
			</div>
			<div class="relative">
				<CircleSvg
					:radius="60"
					strokeColor="#3C99C0"
					strokePercentage="75"
					remainingColor="#000"
					:strokeWidth="7"
				/>
				<div
					class="absolute inset-0 flex flex-col items-center justify-center font-medium"
				>
					<p class="text-xs text-Gray500">CS/min</p>
					<p class="text-sm text-white">6.7</p>
					<p class="text-xs text-Gray500">Top 8 %</p>
				</div>
			</div>
			<div class="relative">
				<CircleSvg
					:radius="60"
					strokeColor="#3C99C0"
					strokePercentage="75"
					remainingColor="#000"
					:strokeWidth="7"
				/>
				<div
					class="absolute inset-0 flex flex-col items-center justify-center font-medium"
				>
					<p class="text-xs text-Gray500">Vision Score</p>
					<p class="text-sm text-white">30</p>
					<p class="text-xs text-Gray500">Top 60%</p>
				</div>
			</div>
			<div class="relative">
				<CircleSvg
					:radius="60"
					strokeColor="#3C99C0"
					strokePercentage="75"
					remainingColor="#000"
					:strokeWidth="7"
				/>
				<div
					class="absolute inset-0 flex flex-col items-center justify-center font-medium"
				>
					<p class="text-xs text-Gray500">Gold/min</p>
					<p class="text-sm text-white">459</p>
					<p class="text-xs text-Gray500">Top 9%</p>
				</div>
			</div>
			<div class="relative">
				<CircleSvg
					:radius="60"
					strokeColor="#3C99C0"
					strokePercentage="75"
					remainingColor="#000"
					:strokeWidth="7"
				/>
				<div
					class="absolute inset-0 flex flex-col items-center justify-center font-medium"
				>
					<p class="text-xs text-Gray500">Avg K/D/A</p>
					<p class="text-sm text-white">6.4/3.7/6.7</p>
				</div>
			</div>
			<div class="relative">
				<CircleSvg
					:radius="60"
					strokeColor="#3C99C0"
					strokePercentage="75"
					remainingColor="#000"
					:strokeWidth="7"
				/>
				<div
					class="absolute inset-0 flex flex-col items-center justify-center font-medium"
				>
					<p class="text-xs text-Gray500">Gold@14</p>
					<p class="text-sm text-white">376</p>
				</div>
			</div>
			<div class="relative">
				<CircleSvg
					:radius="60"
					strokeColor="#3C99C0"
					strokePercentage="75"
					remainingColor="#000"
					:strokeWidth="7"
				/>
				<div
					class="absolute inset-0 flex flex-col items-center justify-center font-medium"
				>
					<p class="text-xs text-Gray500">Damage share</p>
					<p class="text-sm text-white">-.7</p>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.divbg {
		background: var(--bg-img) center no-repeat;
	}
</style>

<script setup></script>

<template>
	<div
		class="mt-4 flex w-full flex-col gap-5 overflow-hidden rounded-xl bg-LightModeFrameColor pb-3 font-montserrat text-DarkModeBackGround dark:bg-DarkModeFrameColor dark:text-LightModeFrameColor lg:mt-0"
	>
		<div
			class="flex items-center justify-center gap-4 p-5 text-sm font-medium"
		>
			<p class="text-base font-semibold">E7: A1 Competitive Overview</p>
			<div class="flex items-center gap-2 text-Gray500">
				<Icon name="solar:stopwatch-linear" size="24px" />
				<p>37h {{ $t('gamestatus_page.PlayTime') }}</p>
			</div>
			<p class="text-Gray500">
				66 {{ $t('gamestatus_page.MatchesWord') }}
			</p>
		</div>
		<div
			class="divbg flex h-[130px] w-full items-center gap-7 p-5 pl-10 text-LightModeFrameColor"
			style="
				--bg-img: url('https://api.gamersverse.gg/api/StaticFiles/download?filePath=StaticFiles/mainsectionbg.jpg');
			"
		>
			<div class="flex items-center justify-center gap-1">
				<img
					src="@/assets/imgs/silverrankvalo.png"
					class="h-[52px] w-[52px] object-cover"
					loading="lazy"
				/>
				<div class="flex flex-col gap-1">
					<p class="text-base font-semibold">
						{{ $t('gamestatus_page.Rating') }}
					</p>
					<p class="text-xl font-semibold">Silver3</p>
				</div>
				<div class="relative">
					<CircleSvg
						:radius="32"
						strokeColor="#3C99C0"
						strokePercentage="75"
						remainingColor="#0D6E63"
						:strokeWidth="5"
					/>
					<div
						class="absolute inset-0 flex flex-col items-center justify-center text-xs font-medium"
					>
						<p>40 W</p>
						<p>15 L</p>
					</div>
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
					<p class="text-xs text-Gray500">
						{{ $t('gamestatus_page.DamagPerRound') }}
					</p>
					<p class="text-sm text-white">133.7</p>
					<p class="text-xs text-Gray500">Bottom 40%</p>
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
					<p class="text-xs text-Gray500">
						{{ $t('gamestatus_page.DamagPerRound') }}
					</p>
					<p class="text-sm text-white">133.7</p>
					<p class="text-xs text-Gray500">Bottom 40%</p>
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
					<p class="text-xs text-Gray500">
						{{ $t('gamestatus_page.DamagPerRound') }}
					</p>
					<p class="text-sm text-white">133.7</p>
					<p class="text-xs text-Gray500">Bottom 40%</p>
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
					<p class="text-xs text-Gray500">
						{{ $t('gamestatus_page.DamagPerRound') }}
					</p>
					<p class="text-sm text-white">133.7</p>
					<p class="text-xs text-Gray500">Bottom 40%</p>
				</div>
			</div>
		</div>
		<div class="flex flex-col flex-wrap gap-4 px-5">
			<div
				class="mx-auto flex w-full flex-wrap items-center justify-center gap-4 lg:w-[368px] xl:w-full xl:flex-nowrap"
			>
				<div
					class="flex w-[25%] items-center gap-1 lg:w-[25%] xl:w-1/6"
				>
					<BarSvg
						primarycolor="#000"
						:width="5"
						:targetheight="35"
						:height="62"
					/>
					<div class="flex flex-col gap-1">
						<p class="text-base font-semibold">Wins</p>
						<p class="text-sm font-medium">40</p>
						<p class="text-sm font-medium text-Gray500">Top 11%</p>
					</div>
				</div>
				<div
					class="flex w-[25%] items-center gap-1 lg:w-[25%] xl:w-1/6"
				>
					<BarSvg
						primarycolor="#000"
						:width="5"
						:targetheight="35"
						:height="62"
					/>
					<div class="flex flex-col gap-1">
						<p class="text-base font-semibold">
							{{ $t('gamestatus_page.KASTWord') }}
						</p>
						<p class="text-sm font-medium">69.6%</p>
						<p class="text-sm font-medium text-Gray500">
							Bottom 17%
						</p>
					</div>
				</div>
				<div
					class="flex w-[25%] items-center gap-1 lg:w-[25%] xl:w-1/6"
				>
					<BarSvg
						primarycolor="#000"
						:width="5"
						:targetheight="35"
						:height="62"
					/>
					<div class="flex flex-col gap-1">
						<p class="text-base font-semibold">
							{{ $t('gamestatus_page.DeathPerRound') }}
						</p>
						<p class="text-sm font-medium">-10%</p>
						<p class="text-sm font-medium text-Gray500">
							Bottom 31%
						</p>
					</div>
				</div>
				<div
					class="flex w-[25%] items-center gap-1 lg:w-[25%] xl:w-1/6"
				>
					<BarSvg
						primarycolor="#000"
						:width="5"
						:targetheight="35"
						:height="62"
					/>
					<div class="flex flex-col gap-1">
						<p class="text-base font-semibold">
							{{ $t('gamestatus_page.Kills') }}
						</p>
						<p class="text-sm font-medium">851</p>
						<p class="text-sm font-medium text-Gray500">Top 28%</p>
					</div>
				</div>
				<div
					class="flex w-[25%] items-center gap-1 lg:w-[25%] xl:w-1/6"
				>
					<BarSvg
						primarycolor="#000"
						:width="5"
						:targetheight="35"
						:height="62"
					/>
					<div class="flex flex-col gap-1">
						<p class="text-base font-semibold">
							{{ $t('gamestatus_page.Deaths') }}
						</p>
						<p class="text-sm font-medium">1.091</p>
						<p class="text-sm font-medium text-Gray500">
							Bottom 0%
						</p>
					</div>
				</div>
				<div
					class="flex w-[25%] items-center gap-1 lg:w-[25%] xl:w-1/6"
				>
					<BarSvg
						primarycolor="#000"
						:width="5"
						:targetheight="35"
						:height="62"
					/>
					<div class="flex flex-col gap-1">
						<p class="text-base font-semibold">
							{{ $t('gamestatus_page.Assists') }}
						</p>
						<p class="text-sm font-medium">40</p>
						<p class="text-sm font-medium text-Gray500">Top 11%</p>
					</div>
				</div>
			</div>
			<div
				class="mx-auto flex flex-wrap items-center justify-center gap-4 lg:w-[368px] xl:w-full xl:flex-nowrap"
			>
				<div
					class="flex w-[25%] items-center gap-1 lg:w-[25%] xl:w-1/6"
				>
					<BarSvg
						primarycolor="#000"
						:width="5"
						:targetheight="35"
						:height="62"
					/>
					<div class="flex flex-col gap-1">
						<p class="text-base font-semibold">
							{{ $t('gamestatus_page.ACS') }}
						</p>
						<p class="text-sm font-medium">198.2</p>
						<p class="text-sm font-medium text-Gray500">
							Bottom 22%
						</p>
					</div>
				</div>
				<div
					class="flex w-[25%] items-center gap-1 lg:w-[25%] xl:w-1/6"
				>
					<BarSvg
						primarycolor="#000"
						:width="5"
						:targetheight="12"
						:height="62"
					/>
					<div class="flex flex-col gap-1">
						<p class="text-base font-semibold">
							{{ $t('gamestatus_page.KDPercentage') }}
						</p>
						<p class="text-sm font-medium">1.32%</p>
						<p class="text-sm font-medium text-Gray500">
							Bottom 17%
						</p>
					</div>
				</div>
				<div
					class="flex w-[25%] items-center gap-1 lg:w-[25%] xl:w-1/6"
				>
					<BarSvg
						primarycolor="#000"
						:width="5"
						:targetheight="35"
						:height="62"
					/>
					<div class="flex flex-col gap-1">
						<p class="text-base font-semibold">
							{{ $t('gamestatus_page.KillsPerRound') }}
						</p>
						<p class="text-sm font-medium">0.6</p>
						<p class="text-sm font-medium text-Gray500">
							Bottom 0%
						</p>
					</div>
				</div>
				<div
					class="flex w-[25%] items-center gap-1 lg:w-[25%] xl:w-1/6"
				>
					<BarSvg
						primarycolor="#000"
						:width="5"
						:targetheight="35"
						:height="62"
					/>
					<div class="flex flex-col gap-1">
						<p class="text-base font-semibold">
							{{ $t('gamestatus_page.FirstBloods') }}
						</p>
						<p class="text-sm font-medium">184</p>
						<p class="text-sm font-medium text-Gray500">
							Bottom 0%
						</p>
					</div>
				</div>
				<div
					class="flex w-[25%] items-center gap-1 lg:w-[25%] xl:w-1/6"
				>
					<BarSvg
						primarycolor="#000"
						:width="5"
						:targetheight="35"
						:height="62"
					/>
					<div class="flex flex-col gap-1">
						<p class="text-base font-semibold">
							{{ $t('gamestatus_page.Flawless') }}
						</p>
						<p class="text-sm font-medium">60</p>
						<p class="text-sm font-medium text-Gray500">
							Bottom 0%
						</p>
					</div>
				</div>
				<div
					class="flex w-[25%] items-center gap-1 lg:w-[25%] xl:w-1/6"
				>
					<BarSvg
						primarycolor="#000"
						:width="5"
						:targetheight="35"
						:height="62"
					/>
					<div class="flex flex-col gap-1">
						<p class="text-base font-semibold">
							{{ $t('gamestatus_page.Aces') }}
						</p>
						<p class="text-sm font-medium">40</p>
						<p class="text-sm font-medium text-Gray500">
							Bottom 0%
						</p>
					</div>
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

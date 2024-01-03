<script setup></script>

<template>
	<div
		class="flex w-full flex-col gap-5 overflow-hidden rounded-xl bg-LightModeFrameColor p-5 pb-3 font-montserrat text-DarkModeBackGround dark:bg-DarkModeFrameColor dark:text-LightModeFrameColor"
	>
		<p class="text-xl font-semibold">
			{{ $t('gamestatus_page.TopAgents') }}
		</p>
		<div class="flex flex-wrap items-center justify-center gap-2">
			<div
				class="flex items-center gap-3 rounded-xl p-2 dark:bg-DarkModeBackGround lg:w-[45%] xl:w-[32%]"
				:class="{
					' bg-Gray400/50': i == 1,
					'bg-Gray400/75': i == 2,
					'bg-Gray400': i == 3,
				}"
				v-for="i in 3"
			>
				<div class="flex flex-col items-center gap-3">
					<img
						src="@/assets/imgs/valoraze.png"
						class="h-[75px] w-[75px] object-cover"
						loading="lazy"
					/>
					<div class="flex flex-col items-center gap-1">
						<p class="text-base font-semibold">Raze</p>
						<p class="text-xs font-semibold">
							49 {{ $t('gamestatus_page.MatchesWord') }}
						</p>
					</div>
				</div>
				<div class="flex items-center gap-1">
					<div class="flex flex-col gap-2 text-sm font-medium">
						<p>{{ $t('gamestatus_page.TimePlayed') }}</p>
						<p>{{ $t('gamestatus_page.WinPercentage') }}</p>
						<p>{{ $t('gamestatus_page.KD') }}</p>
						<p>{{ $t('gamestatus_page.ADR') }}</p>
						<p>{{ $t('gamestatus_page.ACS') }}</p>
					</div>
					<div class="flex flex-col gap-2 text-sm font-medium">
						<p>38 hrs</p>
						<p>63.3%</p>
						<p>0.92</p>
						<p>146.4</p>
						<p>218.7</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped></style>

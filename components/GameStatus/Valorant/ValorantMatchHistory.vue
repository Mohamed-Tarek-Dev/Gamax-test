<script setup></script>

<template>
	<div
		class="flex max-h-[800px] w-full flex-col gap-5 overflow-hidden rounded-xl bg-LightModeFrameColor pb-3 font-montserrat text-DarkModeBackGround dark:bg-DarkModeFrameColor dark:text-LightModeFrameColor"
	>
		<p class="p-5 text-xl font-semibold">
			{{ $t('gamestatus_page.MatchHistory') }}
		</p>
		<div class="flex flex-col items-center overflow-y-auto">
			<div
				class="flex w-full flex-wrap items-center justify-between gap-5 p-4 desktop:flex-nowrap desktop:justify-center"
				v-for="i in 20"
				:class="{
					'bg-SuccessColor/70 dark:bg-SuccessColor/70':
						i % 2 == 1 && i % 10 != 1,
					'bg-DangerColor/70 dark:bg-DangerColor/70':
						i % 2 != 1 && i % 10 != 1,
					'bg-LightModeFrameColor dark:bg-DarkModeFrameColor':
						i % 10 == 1,
				}"
			>
				<img
					src="@/assets/imgs/valoraze.png"
					class="h-[56px] w-[56px] object-cover"
					loading="lazy"
				/>
				<div class="flex items-center gap-3">
					<div class="flex flex-col gap-2">
						<p class="text-sm font-medium dark:text-Gray400">
							Competitive • 23h ago
						</p>
						<p class="text-base font-semibold">Ascent</p>
					</div>
					<div class="flex items-center gap-2">
						<img
							src="@/assets/imgs/silverrankvalo.png"
							class="h-[45px] w-[45px] object-cover"
							loading="lazy"
						/>
						<p
							class="text-LightModeTextColor dark:text-LightModeFrameColor"
						>
							<span
								class="text-LightModeTextColor dark:text-WhiteColor"
							>
								13
							</span>
							:
							<span class="text-Gray400"> 11 </span>
						</p>
					</div>
				</div>
				<div class="flex flex-col gap-2 text-base font-semibold">
					<p>{{ $t('gamestatus_page.KDA') }}</p>
					<p>11 / 21 / 4</p>
				</div>
				<div class="flex items-center gap-4 lg:mx-auto desktop:mx-0">
					<div
						class="flex flex-col items-center gap-1 text-sm font-medium"
					>
						<p class="dark:text-Gray400">
							{{ $t('gamestatus_page.KD') }}
						</p>
						<p>0.5</p>
					</div>
					<div
						class="flex flex-col items-center gap-1 text-sm font-medium"
					>
						<p class="dark:text-Gray400">
							{{ $t('gamestatus_page.DDA') }}
						</p>
						<p>-76</p>
					</div>
					<div
						class="flex flex-col items-center gap-1 text-sm font-medium"
					>
						<p class="dark:text-Gray400">
							{{ $t('gamestatus_page.HeadShotPercentage') }}
						</p>
						<p>12%</p>
					</div>
					<div
						class="flex flex-col items-center gap-1 text-sm font-medium"
					>
						<p class="dark:text-Gray400">
							{{ $t('gamestatus_page.ADR') }}
						</p>
						<p>77</p>
					</div>
					<div
						class="flex flex-col items-center gap-1 text-sm font-medium"
					>
						<p class="dark:text-Gray400">
							{{ $t('gamestatus_page.ACS') }}
						</p>
						<p>128</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	/* width */
	::-webkit-scrollbar {
		width: 5px;
	}

	/* Handle */
	::-webkit-scrollbar-thumb {
		background: #888;
		border-radius: 10px;
	}

	/* Handle on hover */
	::-webkit-scrollbar-thumb:hover {
		background: #555;
	}
</style>

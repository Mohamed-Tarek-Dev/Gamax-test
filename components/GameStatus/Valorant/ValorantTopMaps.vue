<script setup></script>

<template>
	<div
		class="text-Main flex w-full flex-col overflow-hidden rounded-xl bg-LightModeFrameColor pb-3 font-montserrat dark:bg-DarkModeFrameColor dark:text-LightModeFrameColor"
	>
		<div class="mb-3 flex gap-4 border-b border-Gray500 p-4">
			<Icon name="ps:pin-map" size="39px" />
			<p class="text-xl font-semibold">
				{{ $t('gamestatus_page.TopMaps') }}
			</p>
		</div>
		<div class="flex flex-wrap items-center justify-center gap-4">
			<div
				class="map-bg relative h-[134px] w-[97px] gap-2 rounded-xl"
				style="
					--bg-img: url('https://api.gamersverse.gg/api/StaticFiles/download?filePath=StaticFiles/valobind.png');
				"
			>
				<div
					class="absolute flex h-full w-full flex-col items-center justify-center bg-Gray500/20 text-base font-semibold"
				>
					<p>{{ $t('gamestatus_page.BindMap') }}</p>
					<p>71.4%</p>
					<p>5W - 2L</p>
				</div>
			</div>
			<div
				class="map-bg relative h-[134px] w-[97px] gap-2 rounded-xl"
				style="
					--bg-img: url('https://api.gamersverse.gg/api/StaticFiles/download?filePath=StaticFiles/valosplit.png');
				"
			>
				<div
					class="absolute flex h-full w-full flex-col items-center justify-center bg-Gray500/20 text-base font-semibold"
				>
					<p>{{ $t('gamestatus_page.SplitMap') }}</p>
					<p>71.4%</p>
					<p>5W - 2L</p>
				</div>
			</div>
			<div
				class="map-bg relative h-[134px] w-[97px] gap-2 rounded-xl"
				style="
					--bg-img: url('https://api.gamersverse.gg/api/StaticFiles/download?filePath=StaticFiles/valoascent.png');
				"
			>
				<div
					class="absolute flex h-full w-full flex-col items-center justify-center bg-Gray500/20 text-base font-semibold"
				>
					<p>{{ $t('gamestatus_page.AscentMap') }}</p>
					<p>71.4%</p>
					<p>5W - 2L</p>
				</div>
			</div>
			<div
				class="map-bg relative h-[134px] w-[97px] gap-2 rounded-xl"
				style="
					--bg-img: url('https://api.gamersverse.gg/api/StaticFiles/download?filePath=StaticFiles/valofracture.png');
				"
			>
				<div
					class="absolute flex h-full w-full flex-col items-center justify-center bg-Gray500/20 text-base font-semibold"
				>
					<p>{{ $t('gamestatus_page.FractureMap') }}</p>
					<p>71.4%</p>
					<p>5W - 2L</p>
				</div>
			</div>
			<div
				class="map-bg relative h-[134px] w-[97px] gap-2 rounded-xl"
				style="
					--bg-img: url('https://api.gamersverse.gg/api/StaticFiles/download?filePath=StaticFiles/valolotus.png');
				"
			>
				<div
					class="absolute flex h-full w-full flex-col items-center justify-center bg-Gray500/20 text-base font-semibold"
				>
					<p>{{ $t('gamestatus_page.LotusMap') }}</p>
					<p>71.4%</p>
					<p>5W - 2L</p>
				</div>
			</div>
			<div
				class="map-bg relative h-[134px] w-[97px] gap-2 rounded-xl"
				style="
					--bg-img: url('https://api.gamersverse.gg/api/StaticFiles/download?filePath=StaticFiles/valohaven.png');
				"
			>
				<div
					class="absolute flex h-full w-full flex-col items-center justify-center bg-Gray500/20 text-base font-semibold"
				>
					<p>{{ $t('gamestatus_page.HavenMap') }}</p>
					<p>71.4%</p>
					<p>5W - 2L</p>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.map-bg {
		overflow: hidden;
		background:
			var(--bg-img),
			lightgray 50% / cover no-repeat;
	}
</style>

<script setup>
	const colorMode = useColorMode();

	const data = {
		labels: [],
		datasets: [
			{
				label: 'HS%',
				backgroundColor: '#f87979',
				borderColor: colorMode.value == 'dark' ? '#fff' : '#000',
				borderWidth: 1,
				data: [],
			},
		],
	};

	for (let i = 0; i <= 10; i++) {
		data.labels.push(i);
		if (i % 2) {
			data.datasets[0].data.push(i * i + 20);
		}
		{
			data.datasets[0].data.push(i + 20);
		}
	}

	const options = {
		responsive: true,
		maintainAspectRatio: true,
	};
</script>

<template>
	<div
		class="text-DarkModeBackGround dark:bg-DarkModeFrameColor bg-LightModeFrameColor dark:text-LightModeFrameColor flex w-full flex-col rounded-xl p-4 font-montserrat"
	>
		<div class="mb-3 flex justify-between">
			<p class="text-xl font-semibold">
				{{ $t('gamestatus_page.Accuracy') }}
			</p>
			<p class="text-base font-semibold">
				{{ $t('gamestatus_page.LastWord') }} 10
				{{ $t('gamestatus_page.MatchesWord') }}
			</p>
		</div>
		<div class="flex items-center justify-end gap-5">
			<HumanBody />
			<div class="flex flex-col items-center gap-4">
				<div class="flex items-center gap-6">
					<p>{{ $t('gamestatus_page.HeadWord') }}</p>
					<p>11.0%</p>
					<p>
						133
						<span class="text-Gray500">{{
							$t('gamestatus_page.HitsWord')
						}}</span>
					</p>
				</div>
				<div class="flex items-center gap-6">
					<p>{{ $t('gamestatus_page.BodyWord') }}</p>
					<p class="text-SecondaryColor">76.0%</p>
					<p>
						916
						<span class="text-Gray500">{{
							$t('gamestatus_page.HitsWord')
						}}</span>
					</p>
				</div>
				<div class="flex items-center gap-6">
					<p>{{ $t('gamestatus_page.LegsWord') }}</p>
					<p>13.0%</p>
					<p>
						157
						<span class="text-Gray500">{{
							$t('gamestatus_page.HitsWord')
						}}</span>
					</p>
				</div>
			</div>
		</div>
		<div class="flex flex-col">
			<p class="text-base font-semibold">
				{{ $t('gamestatus_page.AVGHS') }}
			</p>
			<LineChart :data="data" :options="options" />
		</div>
	</div>
</template>

<style scoped></style>

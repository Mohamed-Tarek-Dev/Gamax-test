<script setup></script>

<template>
	<div
		class="flex w-full flex-col overflow-hidden rounded-xl bg-LightModeFrameColor pb-3 font-montserrat text-DarkModeBackGround dark:bg-DarkModeFrameColor dark:text-LightModeFrameColor"
	>
		<div class="mb-3 flex justify-between border-b border-Gray500 p-4">
			<p class="text-xl font-semibold">
				{{ $t('gamestatus_page.Roles') }}
			</p>
		</div>
		<div class="flex flex-col gap-4">
			<div
				class="flex w-full items-center justify-between border-b border-Gray500 p-4"
			>
				<div class="flex items-center gap-8">
					<div class="flex items-center gap-4">
						<BarSvg />
						<img
							src="@/assets/imgs/valoduelist.png"
							class="h-[34px] w-[34px] fill-black object-cover"
							loading="lazy"
							v-if="$colorMode.value == 'dark'"
						/>
						<img
							src="@/assets/imgs/valoduelistforlightmode.png"
							class="h-[34px] w-[34px] fill-black object-cover"
							loading="lazy"
							v-else
						/>
					</div>
					<div class="flex flex-col gap-1">
						<p class="text-sm font-medium">
							{{ $t('gamestatus_page.Duelist') }}
						</p>
						<p class="text-base font-semibold">
							{{ $t('gamestatus_page.WR') }} 62.0%
						</p>
						<p class="text-sm font-medium">31W - 17L</p>
					</div>
				</div>
				<div class="flex flex-col gap-2">
					<p class="text-base font-semibold">
						{{ $t('gamestatus_page.KDA') }} 0.88
					</p>
					<p class="text-sm font-medium">718 / 785 / 301</p>
				</div>
			</div>
			<div
				class="flex w-full items-center justify-between border-b border-Gray500 p-4"
			>
				<div class="flex items-center gap-8">
					<div class="flex items-center gap-4">
						<BarSvg />
						<img
							src="@/assets/imgs/valocontroller.png"
							class="h-[34px] w-[34px] object-cover"
							loading="lazy"
							v-if="$colorMode.value == 'dark'"
						/>
						<img
							src="@/assets/imgs/valocontrollerforlightmode.png"
							class="h-[34px] w-[34px] fill-black object-cover"
							v-else
						/>
					</div>
					<div class="flex flex-col gap-1">
						<p class="text-sm font-medium">
							{{ $t('gamestatus_page.Controller') }}
						</p>
						<p class="text-base font-semibold">
							{{ $t('gamestatus_page.WR') }} 33.3%
						</p>
						<p class="text-sm font-medium">1W - 2L</p>
					</div>
				</div>
				<div class="flex flex-col gap-2">
					<p class="text-base font-semibold">
						{{ $t('gamestatus_page.KDA') }} 0.71
					</p>
					<p class="text-sm font-medium">8 / 785 / 301</p>
				</div>
			</div>
			<div
				class="flex w-full items-center justify-between border-b border-Gray500 p-4"
			>
				<div class="flex items-center gap-8">
					<div class="flex items-center gap-4">
						<BarSvg />
						<img
							src="@/assets/imgs/valosentienel.png"
							class="h-[34px] w-[34px] object-cover"
							loading="lazy"
							v-if="$colorMode.value == 'dark'"
						/>
						<img
							src="@/assets/imgs/valosentienelforlightmode.png"
							class="h-[34px] w-[34px] object-cover"
							v-else
						/>
					</div>
					<div class="flex flex-col gap-1">
						<p class="text-sm font-medium">
							{{ $t('gamestatus_page.Sentinel') }}
						</p>
						<p class="text-base font-semibold">
							{{ $t('gamestatus_page.WR') }} 70.0%
						</p>
						<p class="text-sm font-medium">7W - 3L</p>
					</div>
				</div>
				<div class="flex flex-col gap-2">
					<p class="text-base font-semibold">
						{{ $t('gamestatus_page.KDA') }} 0.61
					</p>
					<p class="text-sm font-medium">8 / 285 / 311</p>
				</div>
			</div>
			<div
				class="flex w-full items-center justify-between border-b border-Gray500 p-4"
			>
				<div class="flex items-center gap-8">
					<div class="flex items-center gap-4">
						<BarSvg />
						<img
							src="@/assets/imgs/valoinitiator.png"
							class="h-[34px] w-[34px] object-cover"
							loading="lazy"
							v-if="$colorMode.value == 'dark'"
						/>
						<img
							src="@/assets/imgs/valoinitiatorforlightmode.png"
							class="h-[34px] w-[34px] object-cover"
							loading="lazy"
							v-else
						/>
					</div>
					<div class="flex flex-col gap-1">
						<p class="text-sm font-medium">
							{{ $t('gamestatus_page.Initiator') }}
						</p>
						<p class="text-base font-semibold">
							{{ $t('gamestatus_page.WR') }} 33.3%
						</p>
						<p class="text-sm font-medium">1W - 2L</p>
					</div>
				</div>
				<div class="flex flex-col gap-2">
					<p class="text-base font-semibold">
						{{ $t('gamestatus_page.KDA') }} 0.61
					</p>
					<p class="text-sm font-medium">8 / 285 / 311</p>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped></style>

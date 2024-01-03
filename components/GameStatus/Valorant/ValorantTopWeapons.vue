<script setup></script>

<template>
	<div
		class="flex w-full flex-col overflow-hidden rounded-xl bg-LightModeFrameColor pb-3 font-montserrat text-DarkModeBackGround dark:bg-DarkModeFrameColor dark:text-LightModeFrameColor"
	>
		<div class="mb-3 flex gap-4 border-b border-Gray500 p-4">
			<Icon name="fa6-solid:gun" size="39px" />
			<p class="text-xl font-semibold">
				{{ $t('gamestatus_page.TopWeapons') }}
			</p>
		</div>
		<div class="flex flex-col gap-4">
			<div
				class="flex items-center justify-center gap-6 border-b border-Gray500 p-4"
			>
				<div class="flex flex-col gap-2">
					<img
						src="@/assets/imgs/valovandal.png"
						class="w-[112px] object-cover"
						loading="lazy"
						v-if="$colorMode.value == 'dark'"
					/>
					<img
						src="@/assets/imgs/valovandalforlightmode.png"
						class="w-[112px] object-cover"
						loading="lazy"
						v-else
					/>
					<div class="flex flex-col items-center gap-1">
						<p class="text-base font-semibold">
							{{ $t('gamestatus_page.Vandal') }}
						</p>
						<p class="text-sm font-medium">
							{{ $t('gamestatus_page.AssaultRifle') }}
						</p>
					</div>
				</div>
				<div class="flex items-center gap-3">
					<HumanBody
						:bodycolor="
							$colorMode.value == 'dark' ? '#fff' : '#5C5C5C'
						"
						:width="50"
						:height="50"
					/>
					<div class="flex flex-col gap-1">
						<p>18%</p>
						<p>15%</p>
						<p>12%</p>
					</div>
				</div>
				<div class="flex flex-col gap-2">
					<p class="text-base font-semibold">
						{{ $t('gamestatus_page.Kills') }}
					</p>
					<p class="text=sm font-medium">278</p>
				</div>
			</div>
			<div
				class="flex items-center justify-center gap-6 border-b border-Gray500 p-4"
			>
				<div class="flex flex-col gap-2">
					<img
						src="@/assets/imgs/valophantom.png"
						class="w-[112px] object-cover"
						loading="lazy"
						v-if="$colorMode.value == 'dark'"
					/>
					<img
						src="@/assets/imgs/valophantomforlightmode.png"
						class="w-[112px] object-cover"
						loading="lazy"
						v-else
					/>
					<div class="flex flex-col items-center gap-1">
						<p class="text-base font-semibold">
							{{ $t('gamestatus_page.Phantom') }}
						</p>
						<p class="text-sm font-medium">
							{{ $t('gamestatus_page.AssaultRifle') }}
						</p>
					</div>
				</div>
				<div class="flex items-center gap-3">
					<HumanBody
						:bodycolor="
							$colorMode.value == 'dark' ? '#fff' : '#5C5C5C'
						"
						:width="50"
						:height="50"
					/>
					<div class="flex flex-col gap-1">
						<p>18%</p>
						<p>15%</p>
						<p>12%</p>
					</div>
				</div>
				<div class="flex flex-col gap-2">
					<p class="text-base font-semibold">
						{{ $t('gamestatus_page.Kills') }}
					</p>
					<p class="text=sm font-medium">278</p>
				</div>
			</div>
			<div
				class="flex items-center justify-center gap-6 border-b border-Gray500 p-4"
			>
				<div class="flex flex-col gap-2">
					<img
						src="@/assets/imgs/valoghost.png"
						class="w-[112px] object-cover"
						loading="lazy"
						v-if="$colorMode.value == 'dark'"
					/>
					<img
						src="@/assets/imgs/valoghostforlightmode.png"
						class="w-[112px] object-cover"
						loading="lazy"
						v-else
					/>
					<div class="flex flex-col items-center gap-1">
						<p class="text-base font-semibold">
							{{ $t('gamestatus_page.Ghost') }}
						</p>
						<p class="text-sm font-medium">
							{{ $t('gamestatus_page.SideArms') }}
						</p>
					</div>
				</div>
				<div class="flex items-center gap-3">
					<HumanBody
						:bodycolor="
							$colorMode.value == 'dark' ? '#fff' : '#5C5C5C'
						"
						:width="50"
						:height="50"
					/>
					<div class="flex flex-col gap-1">
						<p>18%</p>
						<p>15%</p>
						<p>12%</p>
					</div>
				</div>
				<div class="flex flex-col gap-2">
					<p class="text-base font-semibold">
						{{ $t('gamestatus_page.Kills') }}
					</p>
					<p class="text=sm font-medium">278</p>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped></style>

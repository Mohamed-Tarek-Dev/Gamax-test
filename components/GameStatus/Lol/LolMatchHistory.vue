<script setup>
	const SelectingRole = ref(false);
	const SelectingChampion = ref(false);
	const Role = ref('');
	const SelectRole = () => {
		SelectingRole.value = !SelectingRole.value;
	};
	const SetRole = (role) => {
		Role.value = role;
		SelectingRole.value = false;
	};

	const SelectChamp = () => {
		SelectingChampion.value = !SelectingChampion.value;
	};
</script>

<template>
	<div
		class="flex max-h-[800px] w-full flex-col gap-5 bg-LightModeFrameColor pb-3 font-montserrat text-DarkModeBackGround dark:bg-DarkModeFrameColor dark:text-LightModeFrameColor"
	>
		<div
			class="flex items-center justify-between gap-2 p-8 text-xl font-semibold"
		>
			<div class="flex items-center gap-2">
				<img src="@/assets/imgs/lolmatchhistory.png" loading="lazy" />
				<p>Last 25 Matches</p>
			</div>
			<div class="text-base">View All Matches</div>
		</div>
		<div class="flex items-center justify-center gap-4 px-12">
			<div class="max-w-1/3 flex w-1/3 flex-col gap-4">
				<p>Select Role</p>
				<div
					class="relative flex flex-col rounded-md bg-LightModeBackGround p-2 text-DarkModeBackGround dark:bg-Gray500 dark:text-LightModeFrameColor"
				>
					<div
						class="flex cursor-pointer items-center justify-between gap-2"
						:class="{
							'mb-2': SelectingRole,
						}"
						@click="SelectRole"
					>
						<p class="capitalize">{{ Role || 'Select Role' }}</p>
						<Icon
							name="ep:arrow-down-bold"
							class="transition-base"
							:class="{ 'rotate-180': SelectingRole }"
						/>
					</div>
					<div
						class="absolute -bottom-0 left-0 w-full overflow-hidden rounded-md bg-LightModeBackGround dark:bg-Gray500"
						v-if="SelectingRole"
						v-click-outside="
							() => {
								SelectingRole = false;
							}
						"
					>
						<div
							class="transition-base flex cursor-pointer items-center gap-2 px-4 py-2 hover:bg-Gray400 dark:hover:bg-Gray400"
							@click="SetRole('Top')"
							v-if="SelectingRole"
						>
							<div class="rounded-full bg-SecondaryColor p-1">
								<img
									src="@/assets/imgs/TopRole.png"
									class="h-[30px] w-[30px] object-contain"
									loading="lazy"
								/>
							</div>
							<p>Top</p>
							<Icon
								name="mingcute:check-2-fill"
								v-if="Role == 'Top'"
							/>
						</div>
						<div
							class="transition-base flex cursor-pointer items-center gap-2 px-4 py-2 hover:bg-Gray400 dark:hover:bg-Gray400"
							@click="SetRole('Jungle')"
							v-if="SelectingRole"
						>
							<div class="rounded-full bg-SecondaryColor p-1">
								<img
									src="@/assets/imgs/JungleRole.png"
									class="h-[30px] w-[30px] object-contain"
									loading="lazy"
								/>
							</div>
							<p>Jungle</p>
							<Icon
								name="mingcute:check-2-fill"
								v-if="Role == 'Jungle'"
							/>
						</div>
						<div
							class="transition-base flex cursor-pointer items-center gap-2 px-4 py-2 hover:bg-Gray400 dark:hover:bg-Gray400"
							@click="SetRole('Middle')"
							v-if="SelectingRole"
						>
							<div class="rounded-full bg-SecondaryColor p-1">
								<img
									src="@/assets/imgs/MiddleRole.png"
									class="h-[30px] w-[30px] object-contain"
									loading="lazy"
								/>
							</div>
							<p>Middle</p>
							<Icon
								name="mingcute:check-2-fill"
								v-if="Role == 'Middle'"
							/>
						</div>
						<div
							class="transition-base flex cursor-pointer items-center gap-2 px-4 py-2 hover:bg-Gray400 dark:hover:bg-Gray400"
							@click="SetRole('Bottom')"
							v-if="SelectingRole"
						>
							<div class="rounded-full bg-SecondaryColor p-1">
								<img
									src="@/assets/imgs/BottomRole.png"
									class="h-[30px] w-[30px] object-contain"
									loading="lazy"
								/>
							</div>
							<p>Bottom</p>
							<Icon
								name="mingcute:check-2-fill"
								v-if="Role == 'Bottom'"
							/>
						</div>
						<div
							class="transition-base flex cursor-pointer items-center gap-2 px-4 py-2 hover:bg-Gray400 dark:hover:bg-Gray400"
							@click="SetRole('Support')"
							v-if="SelectingRole"
						>
							<div class="rounded-full bg-SecondaryColor p-1">
								<img
									src="@/assets/imgs/SupportRole.png"
									class="h-[30px] w-[30px] object-contain"
									loading="lazy"
								/>
							</div>
							<p>Support</p>
							<Icon
								name="mingcute:check-2-fill"
								v-if="Role == 'Support'"
							/>
						</div>
					</div>
				</div>
			</div>
			<div class="max-w-1/3 flex w-1/3 flex-col gap-4">
				<p>Select Champion</p>
				<div
					class="relative flex flex-col rounded-md bg-LightModeBackGround p-2 text-DarkModeBackGround dark:bg-Gray500 dark:text-LightModeFrameColor"
				>
					<div
						class="flex cursor-pointer items-center justify-between gap-2"
						:class="{
							'mb-2': SelectingChampion,
						}"
						@click="SelectChamp"
					>
						<p class="capitalize">
							{{ Role || 'Select Champion' }}
						</p>
						<Icon
							name="ep:arrow-down-bold"
							class="transition-base"
							:class="{ 'rotate-180': SelectingChampion }"
						/>
					</div>
					<div
						class="absolute -bottom-0 left-0 w-full overflow-hidden rounded-md bg-LightModeBackGround dark:bg-Gray500"
						v-if="SelectingChampion"
						v-click-outside="
							() => {
								SelectingChampion = false;
							}
						"
					>
						<div
							class="transition-base flex cursor-pointer items-center gap-2 px-4 py-2 hover:bg-Gray400 dark:hover:bg-Gray400"
							@click="SetRole('Top')"
							v-if="SelectingChampion"
						>
							<div class="rounded-full bg-SecondaryColor p-1">
								<img
									src="@/assets/imgs/TopRole.png"
									class="h-[30px] w-[30px] object-contain"
									loading="lazy"
								/>
							</div>
							<p>Top</p>
							<Icon
								name="mingcute:check-2-fill"
								v-if="Role == 'Top'"
							/>
						</div>
						<div
							class="transition-base flex cursor-pointer items-center gap-2 px-4 py-2 hover:bg-Gray400 dark:hover:bg-Gray400"
							@click="SetRole('Jungle')"
							v-if="SelectingChampion"
						>
							<div class="rounded-full bg-SecondaryColor p-1">
								<img
									src="@/assets/imgs/JungleRole.png"
									class="h-[30px] w-[30px] object-contain"
									loading="lazy"
								/>
							</div>
							<p>Jungle</p>
							<Icon
								name="mingcute:check-2-fill"
								v-if="Role == 'Jungle'"
							/>
						</div>
						<div
							class="transition-base flex cursor-pointer items-center gap-2 px-4 py-2 hover:bg-Gray400 dark:hover:bg-Gray400"
							@click="SetRole('Middle')"
							v-if="SelectingChampion"
						>
							<div class="rounded-full bg-SecondaryColor p-1">
								<img
									src="@/assets/imgs/MiddleRole.png"
									class="h-[30px] w-[30px] object-contain"
									loading="lazy"
								/>
							</div>
							<p>Middle</p>
							<Icon
								name="mingcute:check-2-fill"
								v-if="Role == 'Middle'"
							/>
						</div>
						<div
							class="transition-base flex cursor-pointer items-center gap-2 px-4 py-2 hover:bg-Gray400 dark:hover:bg-Gray400"
							@click="SetRole('Bottom')"
							v-if="SelectingChampion"
						>
							<div class="rounded-full bg-SecondaryColor p-1">
								<img
									src="@/assets/imgs/BottomRole.png"
									class="h-[30px] w-[30px] object-contain"
									loading="lazy"
								/>
							</div>
							<p>Bottom</p>
							<Icon
								name="mingcute:check-2-fill"
								v-if="Role == 'Bottom'"
							/>
						</div>
						<div
							class="transition-base flex cursor-pointer items-center gap-2 px-4 py-2 hover:bg-Gray400 dark:hover:bg-Gray400"
							@click="SetRole('Support')"
							v-if="SelectingChampion"
						>
							<div class="rounded-full bg-SecondaryColor p-1">
								<img
									src="@/assets/imgs/SupportRole.png"
									class="h-[30px] w-[30px] object-contain"
									loading="lazy"
								/>
							</div>
							<p>Support</p>
							<Icon
								name="mingcute:check-2-fill"
								v-if="Role == 'Support'"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="flex flex-col items-center gap-2 overflow-y-auto">
			<div
				class="flex w-full flex-col gap-5 p-4"
				v-for="i in 20"
				:class="{
					' bg-SuccessColor/70 ':
						i == 1 ||
						i == 3 ||
						i == 4 ||
						i == 6 ||
						i == 8 ||
						i == 12,
					' bg-DangerColor/70':
						i != 1 &&
						i != 3 &&
						i != 4 &&
						i != 6 &&
						i != 8 &&
						i != 12,
				}"
			>
				<div class="flex items-center justify-between gap-1">
					<p>Sep 08</p>
					<div
						class="flex items-center justify-center gap-4 xl:gap-8"
					>
						<div
							class="flex items-center gap-1 border-l border-l-SecondaryColor"
						>
							<img
								src="@/assets/imgs/kayleimg.png"
								class="h-[30px] w-[30px] object-contain"
								loading="lazy"
							/>
							<img
								src="@/assets/imgs/Belveth.png"
								class="h-[30px] w-[30px] object-contain"
								loading="lazy"
							/>
							<img
								src="@/assets/imgs/lissandra.png"
								class="h-[30px] w-[30px] object-contain"
								loading="lazy"
							/>
							<img
								src="@/assets/imgs/xayah.png"
								class="h-[30px] w-[30px] object-contain"
								loading="lazy"
							/>
							<img
								src="@/assets/imgs/pantheon.png"
								class="h-[30px] w-[30px] object-contain"
								loading="lazy"
							/>
						</div>
						<div
							class="border-l-AllColorsPrimaryColor flex items-center gap-1 border-l"
						>
							<img
								src="@/assets/imgs/ornn.png"
								class="h-[30px] w-[30px] object-contain"
								loading="lazy"
							/>
							<img
								src="@/assets/imgs/kayn.png"
								class="h-[30px] w-[30px] object-contain"
								loading="lazy"
							/>
							<img
								src="@/assets/imgs/ahri.png"
								class="h-[30px] w-[30px] object-contain"
								loading="lazy"
							/>
							<img
								src="@/assets/imgs/luccian.png"
								class="h-[30px] w-[30px] object-contain"
								loading="lazy"
							/>
							<img
								src="@/assets/imgs/nami.png"
								class="h-[30px] w-[30px] object-contain"
								loading="lazy"
							/>
						</div>
					</div>
				</div>
				<div class="flex flex-wrap items-center gap-4">
					<div class="flex flex-wrap items-center">
						<div class="mr-5 flex flex-col gap-1">
							<img
								src="@/assets/imgs/lolchallenger.png"
								class="h-[35px] w-[35px] object-contain"
								loading="lazy"
							/>
							<p class="text-xs font-medium text-Gray400">
								CH
								<span class="text-WhiteColor">+2015 LP</span>
							</p>
						</div>
						<div class="mr-4 flex items-center gap-3">
							<div class="flex flex-col gap-1">
								<p class="text-xs font-medium text-Gray400">
									3d ago • 20m 50s
								</p>
								<p class="font-semibold">Ranked Solo</p>
								<p
									class="flex items-center gap-1 text-xs font-medium text-Gray400"
								>
									Victory<span class="text-WhiteColor"
										><Icon
											name="solar:ranking-bold-duotone"
											size="13px"
										/>
										1st
									</span>
								</p>
							</div>
						</div>
						<div class="relative mr-4">
							<img
								src="@/assets/imgs/Belveth.png"
								class="h-[65px] w-[65px] object-contain"
								loading="lazy"
							/>
							<div
								class="absolute bottom-0 left-0 rounded-t-md rounded-br-md bg-SecondaryColor p-1"
							>
								<img
									src="@/assets/imgs/JungleRole.png"
									class="h-[15px] w-[15px] object-contain"
									loading="lazy"
								/>
							</div>
							<div
								class="absolute bottom-0 right-0 rounded-md bg-DarkModeBackGround/80 p-1 text-xs"
							>
								14
							</div>
						</div>
						<div class="mr-1 flex flex-col gap-1">
							<img
								src="@/assets/imgs/lolflash.png"
								class="h-[25px] w-[25px] object-contain"
								loading="lazy"
							/>
							<img
								src="@/assets/imgs/lolsmite.png"
								class="h-[25px] w-[25px] object-contain"
								loading="lazy"
							/>
						</div>
						<div class="mr-4 flex flex-col gap-1">
							<img
								src="@/assets/imgs/lolconq.png"
								class="h-[25px] w-[25px] object-contain"
								loading="lazy"
							/>
							<img
								src="@/assets/imgs/loldomin.png"
								class="h-[25px] w-[25px] object-contain"
								loading="lazy"
							/>
						</div>
						<div
							class="mx-auto my-2 flex items-center gap-1 xl:mx-0 xl:my-0"
						>
							<div class="flex flex-col gap-1">
								<div class="flex items-center gap-1">
									<img
										src="@/assets/imgs/lollongsword.png"
										class="h-[25px] w-[25px] rounded object-contain"
										loading="lazy"
									/>
									<img
										src="@/assets/imgs/lolkraken.png"
										class="h-[25px] w-[25px] rounded object-contain"
										loading="lazy"
									/>
									<img
										src="@/assets/imgs/lolmercth.png"
										class="h-[25px] w-[25px] rounded object-contain"
										loading="lazy"
									/>
								</div>
								<div class="flex items-center gap-1">
									<img
										src="@/assets/imgs/lolstride.png"
										class="h-[25px] w-[25px] rounded object-contain"
										loading="lazy"
									/>
									<img
										src="@/assets/imgs/lolwitsend.png"
										class="h-[25px] w-[25px] rounded object-contain"
										loading="lazy"
									/>
									<div
										class="h-[25px] w-[25px] rounded bg-DarkModeFrameColor object-contain"
									></div>
								</div>
							</div>
							<img
								src="@/assets/imgs/loloracle.png"
								class="h-[25px] w-[25px] rounded object-contain"
								loading="lazy"
							/>
						</div>
					</div>
					<div class="mx-auto flex items-center gap-5 xl:mx-0">
						<div class="flex flex-col gap-1">
							<p class="text-sm font-medium">16 / 1 / 5</p>
							<p class="text-WhiteColor">21.00 KDA</p>
						</div>
						<div class="flex flex-col gap-1">
							<p class="text-sm font-medium">CS/min</p>
							<p class="text-WhiteColor">7.6</p>
						</div>
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

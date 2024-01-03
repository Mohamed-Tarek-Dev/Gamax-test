<script setup>
	const Config = useRuntimeConfig();

	definePageMeta({
		middleware: 'require-auth',
		layout: 'edit-profile',
	});
</script>

<template>
	<div
		class="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-2xl bg-LightModeFrameColor p-4 font-montserrat text-DarkModeBackGround dark:bg-DarkModeFrameColor dark:text-LightModeFrameColor"
	>
		<div
			class="mt-8 flex h-full w-[99%] flex-col items-center justify-between gap-14 sm:w-[600px]"
		>
			<div
				class="flex h-[90%] w-full flex-col items-center gap-8 overflow-hidden"
			>
				<div class="w-full justify-start">
					<p class="text-xl font-semibold">Gaming Accounts</p>
				</div>
				<div
					class="flex h-[90%] w-full flex-col justify-center gap-4 overflow-hidden overflow-y-auto"
				>
					<div class="flex items-center gap-4">
						<img
							src="@/assets/imgs/valologo.svg"
							class="block h-[70px] w-[70px] object-cover dark:hidden"
							loading="lazy"
						/>
						<img
							src="@/assets/imgs/valorantlogo.svg"
							class="hidden h-[70px] w-[70px] object-cover dark:block"
						/>
						<div
							class="flex flex-grow items-center justify-between rounded-md bg-LightModeBackGround p-6 dark:bg-DarkModeBackGround"
						>
							<p
								class="flex items-center gap-4 text-sm font-medium"
							>
								mahmoudarabby
								<Icon
									name="material-symbols:verified"
									class="text-lg text-SecondaryColor"
								/>
							</p>
							<Icon
								name="ph:link"
								class="cursor-pointer text-2xl text-Gray400"
							/>
						</div>
					</div>
					<div class="flex items-center gap-4">
						<img
							src="@/assets/imgs/lolwhite.svg"
							class="block w-[70px] object-cover dark:hidden"
							loading="lazy"
						/>
						<img
							src="@/assets/imgs/lol.svg"
							class="hidden w-[70px] object-cover dark:block"
							loading="lazy"
						/>
						<div
							class="flex flex-grow items-center justify-between rounded-md bg-LightModeBackGround p-6 dark:bg-DarkModeBackGround"
						>
							<p
								class="flex items-center gap-4 text-sm font-medium"
							>
								Link Your Account Now
							</p>
							<Icon
								name="ph:link"
								class="cursor-pointer text-2xl text-Gray400"
							/>
						</div>
					</div>
				</div>
			</div>
			<div class="text-center text-xs">
				<sup>*</sup>Disclaimer : When You Link Your Account You Agree On
				Making Your Game Status Public To All Site Visitors
			</div>
		</div>
	</div>
</template>

<style scoped></style>

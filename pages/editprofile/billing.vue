<script setup>
	const Config = useRuntimeConfig();

	definePageMeta({
		middleware: 'require-auth',
		layout: 'edit-profile',
	});

	const EnterNewPaymentMethod = ref(false);
	const EnterNewCreditCardDetails = ref(false);

	const CardNumber = ref('');
	const ExpiryDate = ref('');
	const CVV = ref('');
	const CardHolderName = ref('');
	const disabled = ref(false);

	watch(CardNumber, (newval) => {
		newval = newval.replace(/\D/g, '');

		if (newval.length > 16) {
			newval = newval.slice(0, 16);
		}

		if (newval.length > 0) {
			newval = newval.match(new RegExp('.{1,4}', 'g')).join(' ');
		}
		CardNumber.value = newval;
	});

	watch(ExpiryDate, (newval) => {
		newval = newval.replace(/\D/g, '');

		if (newval.length > 4) {
			newval = newval.slice(0, 4);
		}
		if (newval.length > 0 && parseInt(newval[0]) > 1) {
			newval = '0' + newval;
		}
		if (newval.length > 2) {
			newval = newval.slice(0, 2) + '/' + newval.slice(2);
		}
		ExpiryDate.value = newval;
	});

	watch(CVV, (newval) => {
		newval = newval.replace(/\D/g, '');

		if (newval.length > 3) {
			newval = newval.slice(0, 3);
		}
		CVV.value = newval;
	});

	const OpenCreditCardMenu = () => {
		EnterNewCreditCardDetails.value = true;
		EnterNewPaymentMethod.value = false;
	};

	const AddNewCard = (e) => {
		e.preventDefault();
		console.log('here');
	};
</script>

<template>
	<Teleport to="body">
		<div
			v-if="EnterNewPaymentMethod"
			class="fixed left-0 top-0 z-20 flex h-[100dvh] w-screen items-center justify-center bg-DarkModeFrameColor/60"
			@click.self="EnterNewPaymentMethod = false"
		>
			<div
				class="flex w-[400px] flex-col gap-4 rounded-md p-5 dark:bg-DarkModeBackGround"
			>
				<div
					class="flex cursor-pointer items-center gap-4 rounded-md bg-LightModeFrameColor p-4 dark:bg-DarkModeFrameColor"
					@click="OpenCreditCardMenu"
				>
					<Icon
						name="bi:credit-card-fill"
						class="text-2xl text-SecondaryColor"
					/>
					<p class="text-sm text-Gray500">Credit or Debit card</p>
				</div>
				<div
					class="flex cursor-pointer items-center gap-4 rounded-md bg-LightModeFrameColor p-4 dark:bg-DarkModeFrameColor"
				>
					<Icon name="logos:paypal" class="text-2xl" />
					<p class="text-sm text-Gray500">Paypal</p>
				</div>
			</div>
		</div>
	</Teleport>
	<Teleport to="body">
		<div
			v-if="EnterNewCreditCardDetails"
			class="fixed left-0 top-0 z-20 flex h-[100dvh] w-screen items-center justify-center bg-DarkModeFrameColor/60"
			@click.self="EnterNewCreditCardDetails = false"
		>
			<form
				class="flex w-[400px] flex-col gap-4 rounded-md p-5 dark:bg-DarkModeBackGround"
				@submit="AddNewCard"
			>
				<div
					class="relative flex items-center gap-4 rounded-md bg-LightModeFrameColor pl-6 dark:bg-DarkModeFrameColor"
				>
					<input
						:disabled="disabled"
						placeholder="Card Number"
						v-model="CardNumber"
						type="text"
						class="w-full rounded-md bg-transparent p-4 text-Gray500 focus:outline-none disabled:opacity-30"
					/>
					<Icon
						name="bi:credit-card-fill"
						class="absolute left-[10px] top-1/2 -translate-y-1/2 text-2xl text-Gray500"
					/>
				</div>
				<div class="flex items-center gap-4">
					<div
						class="relative flex w-1/2 items-center gap-4 rounded-md bg-LightModeFrameColor pl-6 dark:bg-DarkModeFrameColor"
					>
						<input
							:disabled="disabled"
							placeholder="MM/YY"
							v-model="ExpiryDate"
							type="text"
							class="w-full rounded-md bg-transparent p-4 text-Gray500 focus:outline-none disabled:opacity-30"
						/>
						<Icon
							name="mdi:calendar"
							class="absolute left-[10px] top-1/2 -translate-y-1/2 text-2xl text-Gray500"
						/>
					</div>
					<div
						class="relative flex w-1/2 items-center gap-4 rounded-md bg-LightModeFrameColor pl-6 dark:bg-DarkModeFrameColor"
					>
						<input
							:disabled="disabled"
							placeholder="CVV"
							v-model="CVV"
							type="text"
							class="w-full rounded-md bg-transparent p-4 text-Gray500 focus:outline-none disabled:opacity-30"
						/>
						<Icon
							name="material-symbols:lock"
							class="absolute left-[10px] top-1/2 -translate-y-1/2 text-2xl text-Gray500"
						/>
					</div>
				</div>
				<div
					class="relative flex items-center gap-4 rounded-md bg-LightModeFrameColor pl-6 dark:bg-DarkModeFrameColor"
				>
					<input
						:disabled="disabled"
						placeholder="Card Holder Name"
						v-model="CardHolderName"
						type="text"
						class="w-full rounded-md bg-transparent p-4 text-Gray500 focus:outline-none disabled:opacity-30"
					/>
					<Icon
						name="mdi:user"
						class="absolute left-[10px] top-1/2 -translate-y-1/2 text-2xl text-Gray500"
					/>
				</div>
				<button
					type="submit"
					class="transition-base flex cursor-pointer items-center justify-center gap-4 rounded-md bg-Gray500 p-4 hover:bg-SecondaryColor dark:hover:bg-SecondaryColor"
				>
					<p class="font-semibold text-WhiteColor">
						Proceed To Add Card
					</p>
				</button>
			</form>
		</div>
	</Teleport>
	<div
		class="relative flex min-h-[80vh] w-full flex-col items-center justify-center overflow-hidden rounded-2xl font-poppins sm:bg-LightModeFrameColor sm:dark:bg-DarkModeFrameColor"
	>
		<div
			class="flex h-2/3 w-[99%] flex-col items-center justify-center gap-14 sm:w-[600px]"
		>
			<div class="flex w-full items-center justify-end">
				<div
					class="cursor-pointer rounded-lg bg-PrimaryColor p-4 text-WhiteColor"
					@click="EnterNewPaymentMethod = true"
				>
					New Payment
				</div>
			</div>
			<div
				class="max-h-2/3 flex h-full w-full flex-grow flex-col gap-4 overflow-hidden overflow-y-auto"
			>
				<div
					class="flex items-center justify-between gap-4 rounded-md bg-LightModeBackGround p-4 dark:bg-DarkModeBackGround"
				>
					<div class="flex items-center gap-4">
						<img
							src="@/assets/imgs/mastercardlogo.png"
							class="h-[50px] w-[80px] object-contain"
							loading="lazy"
						/>
						<p class="text-xl font-medium">•••• •••• •••• 2332</p>
					</div>
					<Icon
						name="material-symbols:delete"
						class="cursor-pointer text-2xl text-Gray400"
					/>
				</div>
				<div
					class="flex items-center justify-between gap-4 rounded-md bg-LightModeBackGround p-4 dark:bg-DarkModeBackGround"
				>
					<div class="flex items-center gap-4">
						<img
							src="@/assets/imgs/Visa.png"
							class="h-[50px] w-[80px] object-contain"
							loading="lazy"
						/>
						<p class="text-xl font-medium">•••• •••• •••• 2332</p>
					</div>
					<Icon
						name="material-symbols:delete"
						class="cursor-pointer text-2xl text-Gray400"
					/>
				</div>
			</div>
			<div class="flex w-full items-center justify-center gap-4">
				<div
					class="w-1/3 cursor-pointer rounded-md bg-Gray400 p-4 text-center text-DarkModeBackGround"
				>
					Cancel
				</div>
				<div
					class="w-1/3 cursor-pointer rounded-md bg-SecondaryColor p-4 text-center"
				>
					Save
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped></style>

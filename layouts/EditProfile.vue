<script setup>
const ActiveSideBar = ref(false);
</script>

<template>
	<div class="flex flex-col font-poppins">
		<NavBar class="hidden lg:flex" />
		<MobileNavBar class="lg:hidden" />
		<MobileNavBarTwo class="lg:hidden" />

		<div
		class="mt-4 flex min-h-[100dvh] w-full justify-center gap-4 bg-LightModeBackGround dark:bg-DarkModeBackGround lg:justify-between">
			<div class="relative hidden h-full opacity-0 lg:block lg:w-[64px] xl:w-[96px] desktop:w-[150px]"></div>
			<ProfileSideBar class="hidden lg:block" />

			<div class="thecontainer flex h-full flex-col gap-8 text-DarkModeBackGround dark:text-white lg:flex-row">
				<EditProfileSideBar class="hidden lg:flex" />
				<div class="flex w-1/2 items-center justify-between pl-3 lg:hidden">
					<Icon name="ci:hamburger-lg" size="30px" @click="ActiveSideBar = true" />
					<p>Profile</p>
				</div>
				<Transition name="slide-from-down">
					<EditProfilePhoneSideBar v-if="ActiveSideBar" @CloseSideBar="ActiveSideBar = false" />
				</Transition>
				<slot />
			</div>

			<div class="relative hidden h-full opacity-0 lg:block lg:w-[64px] xl:w-[96px] desktop:w-[320px]"></div>
			<ChatBar class="hidden lg:block" />
		</div>
	</div>
</template>

<style scoped>
.slide-from-down-enter-active,
.slide-from-down-leave-active {
	transition: all 0.3s;
}

.slide-from-down-enter-from,
.slide-from-down-leave-to {
	opacity: 0;
	transform: translateY(100%);
}
</style>

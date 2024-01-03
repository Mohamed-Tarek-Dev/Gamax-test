<script setup>
	// const { locale, setLocale } = useI18n()
</script>

<template>
	<div class="flex flex-col font-poppins">
		<NavBar class="hidden md:flex" />
		<MobileNavBar class="md:hidden" />
		<MobileNavBarTwo class="md:hidden" />
		<div
			class="mt-4 flex min-h-screen w-full justify-center gap-4 bg-LightModeBackGround dark:bg-DarkModeBackGround md:justify-between"
		>
			<div
				class="relative hidden min-h-screen opacity-0 md:block lg:w-[64px] xl:w-[96px] desktop:w-[150px]"
			></div>
			<SideBar class="hidden md:block" />
			<slot />
			<div
				class="relative hidden min-h-screen opacity-0 md:block lg:w-[64px] xl:w-[96px] desktop:w-[320px]"
			></div>
			<ChatBar class="hidden md:block" />
		</div>
	</div>
</template>

<style scoped></style>

<script setup>
// const { locale, setLocale } = useI18n()
</script>

<template>
	<div class="flex flex-col font-poppins">
		<NavBar class="hidden md:flex" />
		<MobileNavBar class="md:hidden" />
		<MobileNavBarTwo class="md:hidden" />

		<div
		class="dark:bg-DarkModeBackGround bg-LightModeBackGround mt-4 flex min-h-screen w-full justify-center gap-4 md:justify-between">
			<div class="relative hidden min-h-screen opacity-0 md:block lg:w-[64px] xl:w-[96px] desktop:w-[150px]"></div>
			<SideBar class="hidden md:block" />
			<slot />
		</div>
	</div>
</template>

<style scoped></style>

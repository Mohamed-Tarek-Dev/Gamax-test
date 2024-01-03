<script setup></script>

<template>
	<div
		class="relative flex h-full w-1/4 flex-col gap-10 overflow-hidden rounded-[20px] bg-LightModeFrameColor py-16 font-montserrat text-2xl font-semibold text-Gray500 dark:bg-DarkModeFrameColor lg:w-[30%]"
	>
		<div
			class="absolute left-0 top-0 hidden h-full w-[15px] bg-Gray500 lg:block"
		></div>
		<router-link to="/editprofile" class="should-active relative py-2 pl-8"
			>Profile</router-link
		>
		<router-link
			to="/editprofile/security"
			class="should-active relative py-2 pl-8"
			>Security</router-link
		>
		<router-link to="/comingsoon" class="relative py-2 pl-8"
			>Social</router-link
		>
		<router-link to="/comingsoon" class="relative py-2 pl-8"
			>Games</router-link
		>
		<router-link to="/comingsoon" class="relative py-2 pl-8"
			>Devices</router-link
		>
		<router-link to="/comingsoon" class="relative py-2 pl-8"
			>Blocked Accounts</router-link
		>
		<router-link to="/comingsoon" class="relative py-2 pl-8"
			>Payment Methods</router-link
		>
	</div>
</template>

<style scoped>
	.should-active.router-link-exact-active {
		@apply text-SecondaryColor;
	}

	.should-active.router-link-exact-active::before {
		content: '';
		width: 15px;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 5;
		border-radius: 15px;
		@apply bg-SecondaryColor;
	}
</style>

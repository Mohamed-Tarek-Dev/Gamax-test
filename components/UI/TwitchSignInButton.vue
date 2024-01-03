<template>
	<button class="twitch-sign-in-button flex gap-3">
		<img src="~/assets/imgs/brands/twitch.svg" alt="Twitch" />
		<span>Sign in with Twitch</span>
	</button>
</template>

<script setup></script>

<style lang="scss" scoped>
/* Add button styling here */
.twitch-sign-in-button {
	background-color: #fff;
	/* Twitch color */
	color: #000;
	border: none;
	border-radius: 4px;
	padding: 8px 20px;
	cursor: pointer;
	font-size: 16px;
	font-weight: bold;
	text-transform: uppercase;
}

.twitch-sign-in-button:hover {
	background-color: #472e75;
	color: #fff;

	svg {
		fill: #fff;
	}
}
</style>

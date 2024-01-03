<template>
	<div class="loader">
		<img src="~/assets/imgs/Logo/loading-logo.png" loading="lazy" />
		<div class="waves">
			<div class="wave-1"></div>
			<div class="wave-2"></div>
			<div class="wave-3"></div>
			<div class="wave-4"></div>
			<div class="wave-5"></div>
			<div class="wave-6"></div>
		</div>
	</div>
</template>

<script setup></script>

<style lang="scss" scoped>
	.loader {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;

		img {
			width: 300px;
		}

		.waves {
			position: absolute;
			top: 54%;
			left: 41%;
		}

		.wave-1,
		.wave-2,
		.wave-3,
		.wave-4,
		.wave-5,
		.wave-6 {
			display: inline-block;
			height: 15px;
			width: 15px;
			border-radius: 50%;
			position: absolute;
			top: 0;
			left: 0;
			z-index: -1;
			transition: all 0.4s;
			background-color: transparent;
			border: 1px solid #fff;
			animation: waveEffect 3s infinite;
		}

		// .wave-1 {
		//     animation-delay: 0.3s;
		// }

		.wave-2 {
			animation-delay: 0.3s;
		}

		.wave-3 {
			animation-delay: 0.6s;
		}

		.wave-4 {
			animation-delay: 0.9s;
		}

		.wave-5 {
			animation-delay: 1.2s;
		}

		.wave-5 {
			animation-delay: 1.4s;
		}
	}

	@keyframes waveEffect {
		0% {
			transform: scale(1);
		}

		100% {
			transform: scale(10);
			opacity: 0;
		}
	}
</style>

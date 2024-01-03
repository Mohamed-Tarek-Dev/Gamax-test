<script setup>
	const GoBack = () => {
		const Router = useRouter();
		Router.back();
	};
	definePageMeta({
		layout: 'default',
		middleware: 'require-auth',
	});
</script>

<template>
	<div
		class="fixed left-0 top-0 z-40 flex h-[100dvh] w-screen flex-col items-center justify-center overflow-hidden bg-LightModeBackGround font-poppins text-DarkModeBackGround dark:bg-DarkModeBackGround dark:text-LightModeFrameColor"
	>
		<div class="lines">
			<div class="line first"></div>
			<!-- <div class="line second hidden md:block"></div> -->
			<div class="line third"></div>
		</div>

		<img
			src="@/assets/imgs/whitelogo.png"
			class="mb-8 max-w-[400px] object-contain"
			loading="lazy"
		/>
		<div
			class="flex max-w-[300px] flex-col items-center justify-center gap-12 md:max-w-[760px]"
		>
			<p class="text-center text-3xl font-medium">WE ARE COMING SOON!!</p>
			<p class="text-center text-2xl font-medium">
				We are sorry for the interruption of the service, this page is
				still under development
			</p>
		</div>
		<div
			class="mt-10 flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-SecondaryColor px-14 py-4 text-LightModeFrameColor"
			@click="GoBack"
		>
			<Icon name="material-symbols:arrow-back-ios-rounded" size="20px" />
			<p>Back</p>
		</div>
	</div>
</template>

<style scoped>
	.lines {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 150vh;
		margin: auto;
		width: 100vw;
		z-index: -1;
	}

	.line {
		position: absolute;
		width: 3px;
		height: 150vh;
		top: -50vh;
		overflow: hidden;
		rotate: 45deg;
		@apply bg-SecondaryColor/10;
	}
	.line::after {
		content: '';
		display: block;
		position: absolute;
		height: 15vh;
		width: 100%;
		top: -50%;
		left: 0;
		background: linear-gradient(
			to bottom,
			rgba(255, 255, 255, 0) 0%,
			rgb(60, 153, 192) 75%,
			rgb(60, 153, 192) 100%
		);

		animation: drop 7s 0s infinite;
		animation-fill-mode: forwards;
		animation-timing-function: cubic-bezier(0.4, 0.26, 0, 0.97);
	}
	.line.first {
		left: 15%;
	}
	.line.first::after {
		animation-delay: 2s;
	}
	.line.second {
		height: 200vh;
		left: 50%;
	}
	.line.third {
		right: 0;
		height: 200vh;
	}
	.line.third::after {
		animation-delay: 2.5s;
	}

	@keyframes drop {
		0% {
			top: -50%;
		}
		100% {
			top: 110%;
		}
	}
</style>

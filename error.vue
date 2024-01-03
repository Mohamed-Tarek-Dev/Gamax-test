<script setup>
	import { useBreakpoints, breakpointsTailwind } from '@vueuse/core';

	const breakpoints = useBreakpoints(breakpointsTailwind);

	const GoBack = () => {
		const Router = useRouter();
		Router.back();
	};

	const GetAnimationDelay = (i) => {
		let delay;
		console.log(breakpoints.greaterOrEqual('sm').value);
		breakpoints.greaterOrEqual('sm').value ? (delay = i / 2) : (delay = i);
		return delay;
	};
</script>

<template>
	<NuxtLayout name="default">
		<ClientOnly>
			<div
				class="flex min-h-[100dvh] w-full flex-col items-center justify-around gap-6 overflow-hidden font-montserrat md:justify-center"
			>
				<div
					class="flex items-center justify-center text-[100px] font-medium text-SecondaryColor sm:text-[200px] md:gap-8 xl:text-[400px]"
				>
					<p>4</p>
					<!-- if i need the logo so i need to make the w and h to 400px -->
					<div
						class="relative flex h-[200px] w-[200px] items-center justify-center overflow-hidden sm:h-[400px] sm:w-[400px]"
					>
						<div
							v-for="i in 6"
							class="circle h-[100px] w-[100px] border-4 border-SecondaryColor opacity-0 sm:h-[200px] sm:w-[200px]"
							:style="{
								'--anim-delay': `${GetAnimationDelay(i)}s`,
							}"
						></div>
						<div
							class="z-[5] rounded-full border-4 border-SecondaryColor bg-LightModeBackGround dark:bg-DarkModeBackGround"
						>
							<img
								src="@/assets/imgs/whitelogo.png"
								class="h-[150px] w-[150px] object-contain sm:h-[230px] sm:w-[230px]"
								loading="lazy"
							/>
						</div>
					</div>
					<p>4</p>
				</div>
				<div
					@click="GoBack"
					class="transition-base flex h-[115px] w-[115px] cursor-pointer items-center justify-center rounded-full border-4 border-SecondaryColor px-5 py-7 text-xl font-semibold text-DarkModeBackGround hover:bg-PrimaryColor dark:text-LightModeBackGround"
				>
					Back
				</div>
			</div>
		</ClientOnly>
	</NuxtLayout>
</template>

<style scoped>
	@keyframes circle {
		from {
			transform: scale(0);
			opacity: 1;
		}
		to {
			transform: scale(2);
			opacity: 0;
		}
	}
	.circle {
		/*   margin: 0 auto; */
		/* width: 150px; */
		/* width: 200px; */
		/* height: 150px; */
		/* height: 200px; */
		border-radius: 50%;
		position: absolute;

		box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
		animation: circle 3s infinite linear forwards;
		animation-delay: var(--anim-delay);
	}

	.circle-1 {
		animation: circle 3s 1s infinite linear forwards;
	}

	.circle-2 {
		animation: circle 3s 0.5s infinite linear forwards;
	}

	.circle-3 {
		animation: circle 3s 0s infinite linear forwards;
	}
</style>

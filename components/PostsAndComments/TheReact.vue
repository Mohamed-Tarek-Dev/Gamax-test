<script setup>
	const Config = useRuntimeConfig();

	const Emits = defineEmits(['AddTheReact', 'IsUserReacted']);

	const Props = defineProps({
		show: {
			type: Boolean,
			required: true,
		},
	});

	const AddReact = async (react) => {
		Emits('AddTheReact', react);
	};
</script>

<template>
	<Transition name="fade">
		<div v-if="show" class="absolute -top-20 left-0 w-fit pb-16">
			<div
				class="relative ml-8 flex w-fit gap-4 rounded-3xl bg-LightModeBackGround px-12 py-4 dark:bg-DarkModeBackGround"
			>
				<Icon name="bxs:up-arrow" class="cust-cursor" />
				<div
					v-for="react in Config.public.Reacts"
					@click="AddReact(react.id)"
					class="transition-base h-[40px] w-[75px] cursor-pointer rounded-xl px-4 hover:bg-LightModeFrameColor/20"
				>
					<img
						:src="`${react.img}`"
						loading="lazy"
						class="h-[40px] w-[40px] object-cover"
					/>
				</div>
			</div>
		</div>
	</Transition>
</template>

<style scoped>
	.cust-cursor {
		@apply absolute -bottom-4 -left-3 rotate-[225deg] text-5xl text-LightModeBackGround dark:text-DarkModeBackGround;
	}

	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.5s ease;
	}

	.fade-enter-from,
	.fade-leave-to {
		opacity: 0;
	}
</style>

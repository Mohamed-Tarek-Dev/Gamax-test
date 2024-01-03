<template>
	<div>
		<h2 class="my-10 text-3xl text-white">{{ $t('interests.select_device') }}</h2>
		<div class="progress">
			<div class="progress__bar relative">
				<div class="progress__bar--white"></div>
				<div class="progress__bar--blue" :class="stepsProgress"></div>
			</div>
		</div>
		<div class="steps">
			<div class="steps__step">
				<div class="steps__step--number">{{ $t('interests.step_one') }}</div>
				<div class="steps__step--text">{{ $t('interests.console') }}</div>
				<button class="steps__step--button" :class="{ current: step == 1 }" @click="edit(1)">
					{{ $t('interests.edit') }}
				</button>
			</div>
			<div class="steps__step">
				<div class="steps__step--number">{{ $t('interests.step_two') }}</div>
				<div class="steps__step--text">{{ $t('interests.games') }}</div>
				<button class="steps__step--button" :class="{ current: step == 2 }" @click="edit(2)"
				:disabled="interestsStore.selectedGames == 0">
					{{ $t('interests.edit') }}
				</button>
			</div>
			<div class="steps__step">
				<div class="steps__step--number">{{ $t('interests.step_three') }}</div>
				<div class="steps__step--text">{{ $t('interests.interests') }}</div>
				<button class="steps__step--button" :class="{ current: step == 3 }" @click="edit(3)"
				:disabled="interestsStore.selectedInterests == 0">
					{{ $t('interests.edit') }}
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useInterestsStore } from '@/stores/interests';

const interestsStore = useInterestsStore();
const props = defineProps(['step']);
const emit = defineEmits(['edit']);

const stepsProgress = computed(() => {
	if (props.step == 1) {
		return 'step1';
	} else if (props.step == 2) {
		return 'step2';
	} else if (props.step == 3) {
		return 'step3';
	}
});

const edit = (step) => {
	emit('edit', step);
};
</script>

<style lang="scss" scoped>
.progress {
	&__bar {
		@apply relative h-[8px] w-full;

		&--white {
			@apply absolute left-0 top-0 h-full w-full rounded-[10px] bg-white;
		}

		&--blue {
			@apply absolute left-0 top-0 h-full rounded-[10px] bg-SecondaryColor transition-all duration-300 ease-in-out;

			&.step1 {
				@apply w-[8%];
			}

			&.step2 {
				@apply w-[50%];
			}

			&.step3 {
				@apply w-[92%];
			}
		}
	}
}

.steps {
	@apply mt-10 flex justify-between;

	&__step {
		@apply flex flex-col items-center;

		&--number {
			@apply text-base text-[#D1D1D1];
		}

		&--text {
			@apply text-2xl font-medium text-white;
		}

		&--button {
			@apply mt-2 rounded-[10px] border-[1px] border-white px-[20px] py-[5px] text-sm text-white transition-all duration-300 ease-in-out;

			&:hover,
			&:focus {
				@apply border-SecondaryColor bg-SecondaryColor;
			}
		}
	}

	.current {
		@apply border-SecondaryColor bg-SecondaryColor;
	}
}
</style>

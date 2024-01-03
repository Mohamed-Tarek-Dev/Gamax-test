<template>
	<div class="interests mx-auto flex max-w-[1200px] flex-col py-10 font-montserrat">
		<InterestsProgress :step="currentComponent" @edit="editButton"></InterestsProgress>

		<KeepAlive>
			<component :is="ChangeComponent" />
		</KeepAlive>

		<div class="interests__tabs mt-16 flex items-center justify-between">
			<button @click="back" class="interests__tabs--back invisible opacity-0"
			:class="{ '!visible !opacity-100': currentComponent > 1 }">
				<Icon name="ic:baseline-chevron-left" />
				<span>Back</span>
			</button>

			<button v-if="currentComponent != 3" @click="next" class="interests__next" :class="{ disabled: isNextDisabled }"
			:disabled="isNextDisabled">
				<span>Next</span>
				<Icon name="ic:baseline-chevron-right" />
			</button>

			<button v-if="currentComponent == 3" @click="finish" class="interests__finish"
			:class="{ disabled: isNextDisabled }" :disabled="isNextDisabled">
				Finish
			</button>
		</div>
	</div>
</template>

<script setup>
import { useInterestsStore } from '@/stores/interests';
definePageMeta({
	middleware: ['require-auth'],
});

const interestsStore = useInterestsStore();
const step1 = resolveComponent('SelectDevice');
const step2 = resolveComponent('SelectGames');
const step3 = resolveComponent('SelectInterests');
let currentComponent = ref(1);

const back = () => {
	if (currentComponent.value > 1) {
		currentComponent.value--;
	}
};

const next = () => {
	if (currentComponent.value >= 1 && currentComponent.value < 3) {
		currentComponent.value++;
	}
};

const finish = async () => {
	// await interestsStore.addProfileInterestData();
	navigateTo('/home');
};

const ChangeComponent = computed(() => {
	if (currentComponent.value == 1) {
		return step1;
	} else if (currentComponent.value == 2) {
		return step2;
	} else if (currentComponent.value == 3) {
		return step3;
	}
});

const isNextDisabled = computed(() => {
	switch (currentComponent.value) {
		case 1:
			return interestsStore.selectedConsoles.length === 0;
		case 2:
			return interestsStore.selectedGames.length === 0;
		case 3:
			return interestsStore.selectedInterests.length === 0;
		default:
			return false;
	}
});

const editButton = (step) => {
	currentComponent.value = step;
};
</script>

<style lang="scss" scoped>
.interests {
	&__tabs {
		&--back {
			@apply flex items-center rounded-[10px] border-[1px] border-white px-[20px] py-[5px] text-xl text-white transition-all duration-300 ease-in-out;

			svg {
				@apply relative top-0.5 text-3xl;
			}

			&:hover {
				@apply border-white bg-[#FF4655];
			}
		}
	}

	&__next,
	&__finish {
		@apply flex items-center justify-center rounded-[9px] bg-SecondaryColor px-[30px] py-[8px] text-white;

		svg {
			@apply text-3xl;
		}

		&:hover {
			@apply bg-[#62c1e9];
		}
	}
}

.disabled {
	@apply opacity-50 cursor-not-allowed pointer-events-none;
}
</style>

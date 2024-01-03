<template>
	<div class="interests mt-24">
		<ul class="interests__selection">
			<li class="interests__selection--interest" :class="{ selected: interestsStore.clickedInterests[index] }"
			v-for="(interest, index) in interestsStore.getInterests" @click="interestsStore.toggleIcon(index)">
				<Icon :name="interestsStore.clickedInterests[index]
					? 'ic:round-minus'
					: 'ic:round-plus'
					" />
				<span>{{ interest }}</span>
			</li>
		</ul>
	</div>
</template>

<script setup>
import { useInterestsStore } from '@/stores/interests';

const interestsStore = useInterestsStore();
</script>

<style lang="scss" scoped>
.interests {
	&__selection {
		@apply mx-auto flex w-[70%] flex-wrap justify-center gap-2;

		&--interest {
			@apply cursor-pointer rounded-[10px] border-[1px] border-transparent bg-white px-4 py-6 font-medium text-black;

			&:hover {
				@apply border-[1px] border-white bg-[#FF4655] text-white;
			}

			&.selected {
				@apply border-[1px] border-white bg-[#FF4655] text-white;
			}
		}
	}
}
</style>

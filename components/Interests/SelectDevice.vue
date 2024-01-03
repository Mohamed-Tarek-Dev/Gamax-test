<template>
	<div class="mt-28">
		<ul class="devices flex justify-center gap-7">
			<li class="devices__device" @click="interestsStore.selectConsoles('playstation')"
			:class="{ selected: interestsStore.isSelected('playstation') }">
				<div class="img">
					<NuxtImg src="/images/Interests/devices/ps.svg" alt="Playstation" loading="lazy" width="212px" />
				</div>
				<p>Playstation</p>
			</li>
			<li class="devices__device" @click="interestsStore.selectConsoles('xbox')"
			:class="{ selected: interestsStore.isSelected('xbox') }">
				<div class="img">
					<NuxtImg src="/images/Interests/devices/xbox.svg" alt="XBOX" loading="lazy" width="212px" />
				</div>
				<p>XBOX</p>
			</li>
			<li class="devices__device" @click="interestsStore.selectConsoles('mobile')"
			:class="{ selected: interestsStore.isSelected('mobile') }">
				<div class="img">
					<NuxtImg src="/images/Interests/devices/android.svg" alt="MOBILE" loading="lazy" width="212px" />
				</div>
				<p>MOBILE</p>
			</li>
			<li class="devices__device" @click="interestsStore.selectConsoles('pc')"
			:class="{ selected: interestsStore.isSelected('pc') }">
				<div class="img">
					<NuxtImg src="/images/Interests/devices/pc.svg" alt="PC" loading="lazy" width="212px" />
				</div>
				<p>PC</p>
			</li>
		</ul>
	</div>
</template>

<script setup>
import { useInterestsStore } from '@/stores/interests';

const interestsStore = useInterestsStore();
</script>

<style lang="scss" scoped>
.devices {
	&__device {
		@apply flex cursor-pointer flex-col items-center gap-2;

		.img {
			@apply rounded-[20px] bg-white px-7 py-16 transition-all duration-300 ease-in-out;

			img {
				@apply h-[123px] w-[123px];
			}
		}

		&:hover,
		&:focus {
			.img {
				@apply bg-[#3C99C0];
			}
		}

		&.selected {
			.img {
				@apply bg-[#3C99C0];
			}
		}

		p {
			@apply mt-10 text-2xl font-medium text-white;
		}
	}
}
</style>

<script setup>
	const Props = defineProps(['SearchResult', 'SearchQuery']);

	const Config = useRuntimeConfig();
</script>

<template>
	<div
		class="absolute left-0 z-20 mt-3 flex max-h-[600px] w-full cursor-auto flex-col gap-4 overflow-hidden overflow-y-auto rounded-2xl bg-LightModeBackGround pt-4 text-DarkModeBackGround shadow-xl dark:bg-DarkModeFrameColor dark:text-LightModeFrameColor"
	>
		<!-- <div class="p-6 pb-3 font-montserrat text-xl font-semibold text-white">
			<p>Friend Requests</p>
		</div> -->
		<template v-if="SearchResult?.length > 0">
			<div class="flex flex-col gap-4">
				<NuxtLink
					v-for="Result in SearchResult"
					:to="`/profile?id=${Result.id}`"
					class="transition-base flex items-center gap-3 p-4 hover:bg-PrimaryColor/20"
				>
					<img
						:src="`${Config.public.ProfilePictureUrl}${Result.id}`"
						loading="lazy"
						class="h-[50px] w-[50px] rounded-full"
					/>
					<div class="flex flex-col gap-3">
						<p>{{ Result.firstName }} {{ Result.lastName }}</p>
					</div>
				</NuxtLink>
				<div class="flex items-center gap-4 px-4 pb-2">
					<div
						class="flex items-center justify-center rounded-full bg-SecondaryColor p-2"
					>
						<Icon name="ic:twotone-search" size="24px" />
					</div>
					Results Matches Your Query ( {{ SearchQuery }} )
				</div>
			</div>
		</template>
		<p
			v-else
			class="pb-8 text-center font-montserrat text-lg font-semibold"
		>
			No Results Matches Your Query ( {{ SearchQuery }} )
		</p>
	</div>
</template>

<style scoped>
	/* width */
	::-webkit-scrollbar {
		width: 5px;
	}

	/* Handle */
	::-webkit-scrollbar-thumb {
		background: #888;
		border-radius: 10px;
	}

	/* Handle on hover */
	::-webkit-scrollbar-thumb:hover {
		background: #555;
	}
</style>

<script setup>
	import { storeToRefs } from 'pinia';
	import { usePostStore } from '@/stores/posts';
	const PostStore = usePostStore();
	const Config = useRuntimeConfig();
	const { ActiveReactsList } = storeToRefs(PostStore);

	const ReactFilter = ref(false);

	const CurrentReacts = computed(() => {
		if (!ReactFilter.value) return ActiveReactsList.value;
		return ActiveReactsList.value.filter(
			(react) => react.react == ReactFilter.value
		);
	});

	const GetReactCountForId = (reactid) => {
		return ActiveReactsList.value.filter((react) => react.react == reactid)
			.length;
	};

	const GoToOtherPage = (uuid) => {
		PostStore.SetActiveReactList(false);
		navigateTo(`/profile?id=${uuid}`);
	};
</script>

<template>
	<Teleport to="body">
		<div
			v-if="!!ActiveReactsList"
			class="bg-AllColorsBlackColor/20 fixed left-0 top-0 z-30 flex h-screen w-screen items-center justify-center dark:bg-LightModeFrameColor/20"
			@click.self="PostStore.SetActiveReactList(false)"
		>
			<div
				class="relative z-20 mb-24 flex h-[300px] flex-col gap-4 overflow-y-auto rounded-xl bg-LightModeBackGround pt-12 text-DarkModeBackGround dark:bg-DarkModeBackGround dark:text-LightModeFrameColor md:h-[600px]"
			>
				<Icon
					name="ic:round-close"
					size="30px"
					@click="PostStore.SetActiveReactList(false)"
					class="transition-base absolute right-2 top-2 cursor-pointer hover:text-SecondaryColor dark:text-Gray500 dark:hover:text-SecondaryColor"
				/>
				<div
					class="flex items-end justify-between border-b border-b-Gray500 font-montserrat text-base font-semibold md:gap-8"
				>
					<p
						:class="{ active: !ReactFilter }"
						@click="ReactFilter = false"
						class="relative cursor-pointer p-3"
					>
						{{ $t('react_page.AllWord') }}
					</p>
					<div
						v-for="react in Config.public.Reacts"
						:class="{ active: ReactFilter == react.id }"
						class="relative flex cursor-pointer items-center gap-3 p-3"
						@click="ReactFilter = react.id"
					>
						<img :src="react.img" loading="lazy" />
						<p>{{ GetReactCountForId(react.id) }}</p>
					</div>
				</div>
				<div class="flex flex-col gap-8 p-5">
					<div
						v-for="react in CurrentReacts"
						class="flex items-center justify-between"
					>
						<div class="flex items-center gap-1">
							<img
								:src="`${Config.public.ProfilePictureUrl}${react.userId}`"
								loading="lazy"
								class="h-[50px] w-[50px] rounded-full object-cover"
							/>
							<p>
								{{ react.userFirstName }}
								{{ react.userLastName }}
							</p>
						</div>
						<div class="flex items-center gap-4 text-Gray500">
							<Icon
								@click="GoToOtherPage(react.userId)"
								name="healthicons:ui-user-profile"
								size="30px"
								class="cursor-pointer"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</Teleport>
</template>

<style scoped>
	.active::before {
		content: '';
		@apply absolute -bottom-0 left-0 h-[2px] w-full bg-LightModeFrameColor;
	}
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

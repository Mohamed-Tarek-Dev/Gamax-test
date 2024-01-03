<script setup>
	import { storeToRefs } from 'pinia';
	import { usePostStore } from '@/stores/posts';

	definePageMeta({
		middleware: 'require-auth',
		layout: 'main',
	});
	const CanLoadMorePosts = ref(true);
	const Store = usePostStore();
	const Loading = ref(false);

	const { AllPosts } = storeToRefs(Store);
	const Config = useRuntimeConfig();
	onBeforeMount(async () => {
		Store.ResetAllPosts();
		Loading.value = true;
		const { data, pending: Mounted } = await useApi(
			'Get-All-Posts',
			`${Config.public.ApiUrl}/Posts/GetAllPostTypes?PostTime=${Store.AllPostsTime.PostTime}&QuestionTime=${Store.AllPostsTime.QuestionTime}`,
			'POST'
		);
		if (!Mounted.value) {
			Loading.value = false;
			if (data.value && data.value.length > 0) {
				Store.SetAllPosts(data.value);
			} else {
				CanLoadMorePosts.value = false;
			}
		} else {
			watch(Mounted, (newval) => {
				if (!newval) {
					Loading.value = false;
					if (data.value && data.value.length > 0) {
						Store.SetAllPosts(data.value);
					} else {
						CanLoadMorePosts.value = false;
					}
				}
			});
		}

		window.addEventListener('scrollend', onScrollFunc);
	});
	const onScrollFunc = async (e) => {
		const offset = document.documentElement.scrollTop + window.innerHeight;
		if (
			offset == document.documentElement.offsetHeight &&
			CanLoadMorePosts.value
		) {
			Loading.value = true;
			const { data, error, pending } = await useApi(
				'Get-All-Posts',
				`${Config.public.ApiUrl}/Posts/GetAllPostTypes?PostTime=${Store.AllPostsTime.PostTime}&QuestionTime=${Store.AllPostsTime.QuestionTime}`,
				'POST'
			);
			Loading.value = false;
			if (data.value && data.value.length > 0) {
				Store.SetAllPosts(data.value);
			} else {
				CanLoadMorePosts.value = false;
			}
		}
	};
	onUnmounted(() => {
		window.removeEventListener('scrollend', onScrollFunc);
	});
</script>

<template>
	<div
		class="thecontainer relative flex flex-col items-center gap-8 text-DarkModeBackGround dark:text-white md:flex-row md:items-start"
	>
		<div class="order-2 flex w-full flex-col gap-6 md:w-[66%]">
			<TheReactsList />
			<EditThePost />
			<EditTheComment />
			<CreatePost />
			<template v-for="Post in AllPosts" :key="Post.id">
				<ThePost :Post="Post" />
			</template>
			<ClientOnly>
				<ThePostSkeletonLoader v-if="Loading" />
				<ThePostSkeletonLoader v-if="Loading" />
				<ThePostSkeletonLoader v-if="Loading" />
			</ClientOnly>
		</div>
		<div
			class="top-[70px] order-1 flex w-full flex-col bg-LightModeFrameColor dark:bg-DarkModeFrameColor md:sticky md:order-3 md:w-[33%] md:rounded-xl"
		>
			<ValoStatus />
		</div>
	</div>
</template>

<style scoped></style>

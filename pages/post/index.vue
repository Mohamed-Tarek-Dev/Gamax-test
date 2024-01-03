<script setup>
	import { usePostStore } from '@/stores/posts';
	import { useMainStore } from '@/stores/index';
	import { storeToRefs } from 'pinia';

	definePageMeta({
		middleware: 'require-auth',
		layout: 'main',
	});

	const PostStore = usePostStore();
	const MainStore = useMainStore();

	const { ActivePost } = storeToRefs(PostStore);

	const Config = useRuntimeConfig();

	const Route = useRoute();
	const Loading = ref(true);

	watch(
		() => Route.query,
		async () => {
			if (!Route.query?.id || !Route.query?.type) {
				navigateTo('/home');
			} else {
				let Endpoint = `${Config.public.ApiUrl}/Posts/GetPostByID?id=${Route.query?.id}`;
				if (Route.query?.type == 1) {
					Endpoint = `${Config.public.ApiUrl}/Posts/GetQuestionByID?id=${Route.query?.id}`;
				}
				Loading.value = true;
				const { data, pending, error } = await useApi(
					'GetPostWithId',
					Endpoint,
					'POST'
				);
				Loading.value = false;
				if (error.value) {
					navigateTo('/home');
				}
				if (data.value) {
					PostStore.SetActivePost(data.value, Route.query.type);
				}
			}
		}
	);
	onBeforeMount(async () => {
		if (process.client) {
			if (!Route.query?.id || !Route.query?.type) {
				navigateTo('/home');
			} else {
				let Endpoint = `${Config.public.ApiUrl}/Posts/GetPostByID?id=${Route.query?.id}`;
				if (Route.query?.type == 1) {
					Endpoint = `${Config.public.ApiUrl}/Posts/GetQuestionByID?id=${Route.query?.id}`;
				}
				const { data, pending, error } = await useApi(
					'GetPostWithId',
					Endpoint,
					'POST'
				);
				if (pending.value) {
					watch(pending, (newval) => {
						if (!newval) {
							Loading.value = false;
							if (data.value && !error.value) {
								PostStore.SetActivePost(
									data.value,
									Route.query.type
								);
							} else if (error.value) {
								navigateTo('/home');
							}
						}
					});
				} else {
					Loading.value = false;
					if (data.value && !error.value) {
						PostStore.SetActivePost(data.value, Route.query.type);
					} else if (error.value) {
						navigateTo('/home');
					}
				}
			}
		}
	});
	onUnmounted(() => {
		PostStore.ResetActivePost();
	});
</script>

<template>
	<div class="thecontainer mt-7 flex flex-col gap-8 text-white">
		<TheReactsList />
		<EditThePost
			v-if="
				ActivePost && ActivePost?.userId == MainStore.PersonalData?.id
			"
		/>
		<EditTheComment
			v-if="
				ActivePost && ActivePost?.userId == MainStore.PersonalData?.id
			"
		/>
		<ThePost :Post="ActivePost" :IsActivePost="true" v-if="ActivePost" />
		<ThePostSkeletonLoader v-if="Loading" />
	</div>
</template>

<style scoped></style>

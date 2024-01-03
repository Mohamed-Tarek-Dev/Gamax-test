<template>
	<div class="thecontainer flex flex-col items-center gap-8 text-white">
		<ClientOnly>
			<Header :PersonData="GetPersonData" />
		</ClientOnly>
		<PostFilter @SetFilter="SetCurrentFilter" :activefilter="Filter" />
		<div class="flex w-full flex-col items-center justify-center gap-8 sm:flex-row sm:items-start">
			<div class="order-2 flex w-full flex-col gap-6 sm:w-[64%]">
				<TheReactsList />
				<EditThePost />
				<EditTheComment />
				<CreatePost :isPersonal="true" v-if="(Route.query?.id &&
					Route.query?.id == MainStore.PersonalData?.id) ||
					!Route.query?.id
					" />
				<template v-for="Post in CurrentPosts" :key="Post.id">
					<ThePost :Post="Post" :IsPersonal="true" />
				</template>
				<ClientOnly>
					<ThePostSkeletonLoader v-if="Loading" />
					<ThePostSkeletonLoader v-if="Loading" />
					<ThePostSkeletonLoader v-if="Loading" />
				</ClientOnly>
			</div>
			<div class="order-1 flex w-full flex-col gap-8 sm:order-3 sm:w-[36%]">
				<AboutMe :PersonData="GetPersonData" />
				<Friends />
				<Interests />
			</div>
		</div>
	</div>
</template>


<script setup>
import { storeToRefs } from 'pinia';
import { usePostStore } from '@/stores/posts';
import { useMainStore } from '@/stores/index';
// we moved all the requests to be uin the init-profile-page and check-id middlewares
definePageMeta({
	middleware: ['require-auth', 'check-id', 'init-profile-page'],
	layout: 'main',
});

const { t } = useI18n();
const MainStore = useMainStore();
const Store = usePostStore();

const { PersonalPosts } = storeToRefs(Store);
const CanLoadMorePosts = ref(true);
const Config = useRuntimeConfig();

const Loading = ref(false);

const Route = useRoute();

const Filter = ref(t('filter_page.AllWord'));

const GetPersonData = computed(() => {
	if (MainStore.OtherPersonalData) {
		return MainStore.OtherPersonalData;
	}
	return MainStore.PersonalData;
});

const CurrentPosts = computed(() => {
	if (Filter.value == t('filter_page.AllWord'))
		return PersonalPosts.value;
	else if (Filter.value == t('filter_page.VideoWord'))
		return PersonalPosts.value.filter(
			(post) => post.videos.length >= 1
		);
	else if (Filter.value == t('filter_page.PhotosWord'))
		return PersonalPosts.value.filter(
			(post) => post.photos.length >= 1
		);
	else if (Filter.value == t('filter_page.PostsWord'))
		return PersonalPosts.value.filter(
			(post) => post.photos.length < 1 && post.videos.length < 1
		);
});

const FetchMorePosts = async () => {
	if (Loading.value) return;
	Loading.value = true;
	const { data, error, pending } = await useApi(
		'Get-All-User-Posts',
		`${Config.public.ApiUrl}/Posts/GetAllPersonalPostTypes?PostTime=${Store.PersonalPostsTime.PostTime
		}&QuestionTime=${Store.PersonalPostsTime.QuestionTime}&userId=${Route.query?.id || MainStore.PersonalData?.id
		}`,
		'POST'
	);
	if (!pending.value) {
		Loading.value = false;
		if (data.value && data.value.length > 0) {
			Store.SetPersonalPosts(data.value);
		} else {
			CanLoadMorePosts.value = false;
		}
	}
};

const onScrollFunc = async (e) => {
	const offset = document.documentElement.scrollTop + window.innerHeight;
	if (
		offset == document.documentElement.offsetHeight &&
		CanLoadMorePosts.value
	) {
		await FetchMorePosts();
	}
};

const SetCurrentFilter = (filter) => {
	Filter.value = filter;
};

onMounted(async () => {
	if (Store.PersonalPosts.length <= 0) CanLoadMorePosts.value = false;
	window.addEventListener('scroll', onScrollFunc);
});

onUnmounted(() => {
	Store.ResetPersonalPosts();
	window.removeEventListener('scroll', onScrollFunc);
});
</script>


<style scoped></style>

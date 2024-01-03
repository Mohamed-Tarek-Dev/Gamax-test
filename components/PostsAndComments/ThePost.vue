<script setup>
	import { Swiper, SwiperSlide } from 'swiper/vue';
	import { Grid, Pagination } from 'swiper/modules';

	import { usePostStore } from '@/stores/posts';
	import { useMainStore } from '@/stores/index';
	import 'swiper/css';

	import 'swiper/css/grid';
	import 'swiper/css/pagination';

	const PostStore = usePostStore();
	const MainStore = useMainStore();

	const props = defineProps(['Post', 'IsPersonal', 'IsActivePost']);

	const Config = useRuntimeConfig();

	const Files = ref([]);
	const modules = [Grid, Pagination];
	const ActiveImgSource = ref(false);

	const ConfirmDeletePost = ref(false);

	const PostDescription = ref('');
	const ShowComment = ref(false);

	const ShowPostReact = ref(false);

	const CanReact = ref(true);
	const IsUserReactedToThis = computed(() => {
		let isReacted = false;
		let reactId = null;
		let myReactType = null;
		props.Post.reacts.forEach((react) => {
			if (react.userId == MainStore.PersonalData?.id) {
				isReacted = true;
				reactId = react.id;
				myReactType = react.react;
			}
		});
		return { isReacted, reactId, myReactType };
	});

	const ReactedImgPath = computed(() => {
		const { myReactType } = IsUserReactedToThis.value;

		if (myReactType) {
			return Object.values(Config.public.Reacts).find(
				(react) => react.id == myReactType
			).img;
		}
		return '';
	});

	onMounted(() => {
		props.Post.photos.forEach((photo) =>
			Files.value.push({ type: 'image', photo })
		);
		props.Post.videos.forEach((vid) =>
			Files.value.push({ type: 'video', vid })
		);
		PostDescription.value = props.Post.description || props.Post.question;
	});

	watch(props, (newVal) => {
		Files.value = [];
		newVal.Post.photos.forEach((photo) =>
			Files.value.push({ type: 'image', photo })
		);
		newVal.Post.videos.forEach((vid) =>
			Files.value.push({ type: 'video', vid })
		);
		PostDescription.value = newVal.Post.description || newVal.Post.question;
	});

	const GetFileType = (path) => {
		const type = 'video/';
		return type + path.split('.')[path.split('.').length - 1];
	};

	const RemovePost = async () => {
		const ThePostId = props.Post.id;
		let Endpoint = `${Config.public.ApiUrl}/Posts/DeletePost?id=${ThePostId}`;
		if (props.Post.type == 1) {
			Endpoint = `${Config.public.ApiUrl}/Posts/DeleteQuestionPost?id=${ThePostId}`;
		}
		const { data, pending, error } = await useApi(
			'Remove-Post',
			Endpoint,
			'POST'
		);

		if (data.value) {
			PostStore.RemovePostWithId(ThePostId);
			if (props.IsActivePost) {
				navigateTo('/home');
				PostStore.SetActivePost(false);
			}
		}
	};

	const LoadMoreComments = async () => {
		const ThePostId = props.Post.id;
		let Endpoint = `${
			Config.public.ApiUrl
		}/Comment/GetPostComments?postId=${ThePostId}&Time=${
			props.Post.comments[props.Post.comments.length - 1]?.time || ''
		}`;
		if (props.Post.type == 1) {
			Endpoint = `${
				Config.public.ApiUrl
			}/Comment/GetQuestionComments?postId=${ThePostId}&Time=${
				props.Post.comments[props.Post.comments.length - 1]?.time || ''
			}`;
		}
		const { data, pending, error } = await useApi(
			'Get-More-Comments',
			Endpoint,
			'POST'
		);
		if (data.value) {
			PostStore.GetMorePostComments(
				ThePostId,
				data.value,
				props.IsPersonal,
				props.IsActivePost
			);
		}
	};

	const AddReact = async (react) => {
		if (!CanReact.value) return;
		CanReact.value = false;
		let isDelete = null;
		let isUpdate = null;
		let Endpoint = `${Config.public.ApiUrl}/React/AddReactOnPost`;

		if (props.Post.type == 1) {
			Endpoint = `${Config.public.ApiUrl}/React/AddReactOnQuestionPost`;
		}

		let body = {
			objectId: props.Post.id,
			reactType: react,
		};

		const { isReacted, reactId, myReactType } = IsUserReactedToThis.value;

		if (isReacted) {
			if (myReactType == react && props.Post.type == 1) {
				Endpoint = `${Config.public.ApiUrl}/React/DeleteQuestionPostReact?reactId=${reactId}`;
				isDelete = true;
			} else if (myReactType == react && props.Post.type == 0) {
				Endpoint = `${Config.public.ApiUrl}/React/DeletePostReact?reactId=${reactId}`;
				isDelete = true;
			} else if (myReactType != react && props.Post.type == 1) {
				Endpoint = `${Config.public.ApiUrl}/React/UpdateQuestionReact`;
				body = {
					objectId: props.Post.id,
					reactId: reactId,
					reactType: react,
				};
				isUpdate = true;
			} else {
				Endpoint = `${Config.public.ApiUrl}/React/UpdatePostReact`;
				body = {
					objectId: props.Post.id,
					reactId: reactId,
					reactType: react,
				};
				isUpdate = true;
			}
		}

		const { data, error } = await useApi(
			'Add-Update-React-Post',
			Endpoint,
			'POST',
			body
		);
		if (data.value || !error.value) {
			if (isDelete) {
				PostStore.RemoveReactFromPost(
					reactId,
					props.Post.id,
					props.IsPersonal,
					props.IsActivePost
				);
			}
			if (isUpdate) {
				PostStore.UpdatePostReact(
					reactId,
					props.Post.id,
					props.IsPersonal,
					props.IsActivePost,
					react
				);
			}
			if (!isUpdate && !isDelete) {
				PostStore.AddReactToPost(
					props.Post.id,
					props.IsPersonal,
					props.IsActivePost,
					data.value
				);
			}
		}
		CanReact.value = true;
	};

	const ShowReactsList = async () => {
		let Endpoint = `${Config.public.ApiUrl}/React/GetPostReacts?postId=${props.Post.id}`;

		if (props.Post.type == 1) {
			Endpoint = `${Config.public.ApiUrl}/React/GetQuestionPostReacts?postId=${props.Post.id}`;
		}
		const { data, error } = await useApi(
			'Add-Update-React-Post',
			Endpoint,
			'POST'
		);
		if (data.value || !error.value) {
			PostStore.SetActiveReactList(data.value);
		}
	};

	const SendFriendRequest = async (id) => {
		const { data, error } = await useApi(
			'Send-New-Friend-Request',
			`${Config.public.ApiUrl}/Friends/SendFriendRequest?userId=${id}`,
			'POST'
		);
	};
</script>

<template>
	<Teleport to="body" v-if="!!ActiveImgSource">
		<div
			class="fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center overflow-hidden bg-LightModeTextColor/20"
			@click="ActiveImgSource = false"
		>
			<div
				class="relative flex h-[90%] items-center justify-center overflow-hidden rounded-xl bg-LightModeFrameColor p-8 text-PrimaryColor dark:bg-DarkModeFrameColor dark:text-WhiteColor"
			>
				<Icon
					name="ic:round-close"
					size="30px"
					@click="ActiveImgSource = false"
					class="transition-base absolute right-2 top-2 cursor-pointer text-Gray500 hover:text-DangerColor"
				/>
				<img
					:src="ActiveImgSource"
					class="h-[90%] object-contain"
					loading="lazy"
				/>
			</div>
		</div>
	</Teleport>
	<Teleport to="body" v-if="ConfirmDeletePost">
		<div
			class="fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center overflow-hidden bg-LightModeTextColor/20 dark:bg-LightModeFrameColor/20"
			@click.self="ConfirmDeletePost = false"
		>
			<div
				class="absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-6 overflow-hidden rounded-xl bg-LightModeFrameColor p-8 text-DarkModeBackGround dark:bg-DarkModeFrameColor dark:text-WhiteColor"
			>
				<Icon
					name="ic:round-close"
					size="30px"
					@click="ConfirmDeletePost = false"
					class="transition-base absolute right-2 top-2 cursor-pointer text-Gray500 hover:text-DangerColor"
				/>
				<p
					class="mt-2 font-montserrat font-semibold text-DarkModeBackGround dark:text-LightModeFrameColor"
				>
					{{ $t('post_page.ConfirmDeletePost') }}
				</p>
				<div class="flex w-full items-center justify-end gap-8">
					<button
						class="rounded-xl bg-DangerColor px-6 py-3 text-LightModeFrameColor hover:bg-DangerColor/60"
						@click="RemovePost"
					>
						{{ $t('post_page.ConfirmWord') }}
					</button>
					<button
						class="rounded-xl bg-SecondaryColor px-6 py-3 text-LightModeFrameColor hover:bg-SecondaryColor/60"
						@click="ConfirmDeletePost = false"
					>
						{{ $t('post_page.DeclineWord') }}
					</button>
				</div>
			</div>
		</div>
	</Teleport>
	<div
		class="flex w-full flex-col gap-4 bg-LightModeFrameColor text-DarkModeBackGround dark:bg-DarkModeFrameColor dark:text-LightModeFrameColor md:rounded-xl"
	>
		<div class="flex flex-col p-3 pb-0 sm:p-6 sm:pb-0">
			<div class="flex items-center gap-4">
				<img
					:src="`${Config.public.ProfilePictureUrl}${Post.userId}`"
					loading="lazy"
					class="h-[50px] w-[50px] min-w-[50px] rounded-full object-cover"
				/>
				<div class="flex w-full flex-col">
					<div class="flex items-center justify-between gap-2">
						<div class="flex items-center gap-2">
							<NuxtLink
								:to="`/profile?id=${Post.userId}`"
								class="font-semibold hover:underline md:text-xl"
							>
								{{
									Post.userFirstName + ' ' + Post.userLastName
								}}
							</NuxtLink>
						</div>
						<div class="flex gap-2">
							<Icon
								name="akar-icons:edit"
								class="transition-base cursor-pointer text-xl text-Gray500 hover:text-SuccessColor/80 dark:hover:text-SuccessColor/80 md:text-2xl"
								@click="
									PostStore.InitEditPost(
										Post,
										Files,
										IsPersonal,
										IsActivePost
									)
								"
								v-if="Post.userId == MainStore.PersonalData?.id"
							/>
							<Icon
								name="mingcute:delete-fill"
								class="transition-base cursor-pointer text-xl text-Gray500 hover:text-DangerColor md:text-2xl"
								@click="ConfirmDeletePost = true"
								v-if="Post.userId == MainStore.PersonalData?.id"
							/>
						</div>
					</div>
					<div
						class="text-LightModePrimaryColorTwo flex items-center gap-1 dark:text-Gray500"
					>
						<p class="font-semibold md:text-xl">
							{{ props.Post.timeCreated }}
						</p>
						<Icon name="game-icons:world" size="15px" />
					</div>
				</div>
			</div>
			<p class="mt-4 text-xs font-semibold md:text-base">
				{{ Post.description || Post.question }}
			</p>
			<div
				class="relative mt-2 overflow-hidden"
				:class="{ 'max-h-[400px]': Files && Files.length > 4 }"
				v-if="Files && Files.length > 0"
			>
				<div
					class="flex w-full flex-col gap-2"
					v-if="Files.length <= 2"
				>
					<template v-for="File in Files">
						<img
							@click="
								ActiveImgSource = `${Config.public.FileApiUrl}${File.photo.photoPath}`
							"
							v-if="File.type == 'image'"
							loading="lazy"
							:src="`${Config.public.FileApiUrl}${File.photo.photoPath}`"
							class="max-h-[306px] cursor-pointer rounded bg-DarkModeBackGround object-contain"
						/>
						<video
							v-if="File.type == 'video'"
							controls
							class="max-h-[306px] cursor-pointer rounded bg-DarkModeBackGround object-cover"
						>
							<source
								:src="`${Config.public.FileApiUrl}${File.vid.vedioPath}`"
								:type="GetFileType(File.vid.vedioPath)"
							/>
							Your browser does not support the video tag.
						</video>
					</template>
				</div>
				<div
					class="flex flex-wrap justify-center gap-2"
					v-else-if="Files.length == 3"
				>
					<template v-for="(File, index) in Files">
						<img
							@click="
								ActiveImgSource = `${Config.public.FileApiUrl}${File.photo.photoPath}`
							"
							v-if="File.type == 'image'"
							:src="`${Config.public.FileApiUrl}${File.photo.photoPath}`"
							class="max-h-[306px] cursor-pointer rounded bg-DarkModeBackGround object-contain"
							:class="{
								'max-w-[49%]': index != 0,
								'max-w-full ': index == 0,
							}"
							loading="lazy"
						/>
						<video
							v-if="File.type == 'video'"
							controls
							class="max-h-[306px] max-w-full rounded bg-DarkModeBackGround object-contain"
							:class="{ 'max-w-[49%]': index != 0 }"
						>
							<source
								:src="`${Config.public.FileApiUrl}${File.vid.vedioPath}`"
								:type="GetFileType(File.vid.vedioPath)"
							/>
							Your browser does not support the video tag.
						</video>
					</template>
				</div>
				<div
					class="flex flex-wrap justify-center gap-2"
					v-else-if="Files.length == 4"
				>
					<template v-for="(File, index) in Files">
						<img
							@click="
								ActiveImgSource = `${Config.public.FileApiUrl}${File.photo.photoPath}`
							"
							v-if="File.type == 'image'"
							:src="`${Config.public.FileApiUrl}${File.photo.photoPath}`"
							loading="lazy"
							class="max-h-[306px] max-w-[49%] cursor-pointer rounded bg-DarkModeBackGround object-contain"
						/>
						<video
							v-if="File.type == 'video'"
							controls
							class="max-h-[306px] max-w-[49%] rounded bg-DarkModeBackGround object-contain"
						>
							<source
								:src="`${Config.public.FileApiUrl}${File.vid.vedioPath}`"
								:type="GetFileType(File.vid.vedioPath)"
							/>
							Your browser does not support the video tag.
						</video>
					</template>
				</div>
				<swiper
					:slidesPerView="2"
					:grid="{
						rows: 2,
					}"
					:spaceBetween="30"
					:pagination="{
						clickable: true,
					}"
					:modules="modules"
					class="mySwiper"
					v-else-if="Files.length > 4"
				>
					<swiper-slide v-for="File in Files">
						<img
							@click="
								ActiveImgSource = `${Config.public.FileApiUrl}${File.photo.photoPath}`
							"
							loading="lazy"
							v-if="File.type == 'image'"
							:src="`${Config.public.FileApiUrl}${File.photo.photoPath}`"
							class="h-[200px] w-full cursor-pointer rounded bg-DarkModeBackGround object-contain"
						/>
						<video
							v-if="File.type == 'video'"
							controls
							class="max-h-[306px] rounded bg-DarkModeBackGround object-contain"
						>
							<source
								:src="`${Config.public.FileApiUrl}${File.vid.vedioPath}`"
								:type="GetFileType(File.vid.vedioPath)"
							/>
							Your browser does not support the video tag.
						</video>
					</swiper-slide>
				</swiper>
			</div>
			<div class="mt-2 flex items-center justify-between sm:px-4">
				<div class="flex flex-grow items-center">
					<p
						class="ml-2 cursor-pointer text-xs font-medium hover:underline md:text-base"
						@click="ShowReactsList"
					>
						{{ Post.reacts.length }}
						{{
							Post.reacts.length > 1
								? $t('post_page.ReactsWord')
								: $t('post_page.ReactWord')
						}}
					</p>
				</div>
				<div
					class="flex cursor-pointer items-center gap-4 text-xs font-semibold hover:underline md:text-base"
					@click="ShowComment = !ShowComment"
				>
					<p>
						{{ Post.commentsCount }}
						{{
							Post.type && Post.type == 1
								? $t('post_page.AnswerWord')
								: $t('post_page.CommentWord')
						}}
					</p>
				</div>
			</div>
		</div>
		<div
			class="border-LightModePrimaryColorTwo border-t dark:border-Gray500"
		>
			<div class="relative flex w-full items-center justify-between">
				<div
					class="transition-base hover:bg-LightModePrimaryColorTwo/20 flex w-1/2 cursor-pointer items-center justify-center gap-2 rounded-xl rounded-t-none p-4 text-Gray500 dark:hover:bg-LightModeFrameColor/20"
					@mouseover="ShowPostReact = true"
					@mouseleave="ShowPostReact = false"
				>
					<Icon
						name="mdi:emoji-outline"
						class="text-xl text-Gray500 md:text-3xl"
						v-if="!IsUserReactedToThis.isReacted"
					/>
					<img
						:src="ReactedImgPath"
						class="h-[20px] w-[20px] object-contain"
						loading="lazy"
						v-else
					/>
					<p
						class="text-xs md:text-base"
						:class="{
							' text-SecondaryColor':
								IsUserReactedToThis.isReacted,
						}"
					>
						{{ $t('post_page.ReactWord') }}
					</p>
					<TheReact
						:show="ShowPostReact"
						@add-the-react="AddReact"
						@mouseover.native="ShowPostReact = true"
					/>
				</div>
				<div
					class="transition-base hover:bg-LightModePrimaryColorTwo/20 flex w-1/2 cursor-pointer items-center justify-center gap-2 rounded-xl rounded-t-none p-4 text-Gray500 dark:hover:bg-LightModeFrameColor/20"
					@click="ShowComment = !ShowComment"
				>
					<Icon
						name="iconamoon:comment-dots"
						class="text-xl text-Gray500 md:text-3xl"
					/>
					<p class="text-xs md:text-base">
						{{
							Post.type == 1
								? $t('post_page.AnswerWord')
								: $t('post_page.CommentWord')
						}}
					</p>
				</div>
			</div>
		</div>
		<div class="flex flex-col gap-2 px-4 pb-2" v-if="ShowComment">
			<TheComment
				v-for="Comment in Post.comments"
				:Comment="Comment"
				:type="Post.type"
				:postId="Post.id"
				:isPersonal="IsPersonal"
				:IsActivePost="IsActivePost"
			/>
			<p
				class="w-fit cursor-pointer px-4 text-xs hover:underline dark:text-Gray500"
				v-if="Post.comments.length < Post.commentsCount"
				@click="LoadMoreComments"
			>
				{{ $t('post_page.LoadMoreWord') }}
				{{
					Post.type && Post.type == 1
						? $t('post_page.AnswerWord')
						: $t('post_page.CommentWord')
				}}
			</p>
			<AddComment
				:id="Post.id"
				:type="Post.type"
				:isPersonal="IsPersonal"
				:IsActivePost="IsActivePost"
			/>
		</div>
	</div>
</template>

<style scoped>
	.swiper {
		width: 100%;
		height: 100%;
		margin-left: auto;
		margin-right: auto;
	}

	.swiper-slide {
		text-align: center;
		height: calc((100% - 30px) / 2) !important;

		/* Center slide text vertically */
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.fullscreen {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
	video:fullscreen {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
</style>

<template>
	<Teleport to="body" v-if="ConfirmDeleteComment">
		<div
		class="bg-AllColorsBlackColor/20 fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center overflow-hidden dark:bg-LightModeFrameColor/20"
		@click.self="ConfirmDeleteComment = false">
			<div
			class="bg-LightModePrimaryColor absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-6 overflow-hidden rounded-xl p-8 text-DarkModeBackGround dark:bg-DarkModeFrameColor">
				<Icon name="ic:round-close" size="30px" @click="ConfirmDeleteComment = false"
				class="transition-base absolute right-2 top-2 cursor-pointer hover:text-SecondaryColor dark:text-Gray500 dark:hover:text-SecondaryColor" />
				<p class="mt-2 font-montserrat font-semibold dark:text-LightModeFrameColor">
					Are You Sure You Want To Remove This Post ?
				</p>
				<div class="flex w-full items-center justify-end gap-8">
					<button class="rounded-xl bg-PrimaryColor px-6 py-3 text-LightModeFrameColor" @click="RemoveComment">
						Confirm
					</button>
					<button class="rounded-xl bg-SecondaryColor px-6 py-3 text-LightModeFrameColor"
					@click="ConfirmDeleteComment = false">
						Cancel
					</button>
				</div>
			</div>
		</div>
	</Teleport>
	<div class="mb-2 flex flex-col gap-2">
		<div
		class="relative flex w-full justify-between gap-4 rounded-xl bg-LightModeBackGround p-4 font-montserrat text-DarkModeBackGround dark:bg-DarkModeBackGround dark:text-LightModeFrameColor">
			<div
			class="transition-base hover:bg-LightModePrimaryColor absolute -bottom-3 -right-2 cursor-pointer rounded-full bg-LightModeBackGround p-2 dark:bg-DarkModeBackGround dark:hover:bg-PrimaryColor"
			@click="ShowReactsList" v-if="type != 1">
				<p class="text-xs font-medium">
					{{ Comment.commentReacts.length }}
					{{ $t('post_page.ReactWord') }}
				</p>
			</div>
			<div>
				<img :src="`${Config.public.ProfilePictureUrl}${Comment.userId}`" loading="lazy"
				class="h-[50px] w-[50px] rounded-full" />
			</div>
			<div class="flex w-[78%] flex-col gap-2">
				<div class="flex align-center gap-3">
					<p class="text-base font-semibold">
						<NuxtLink :to="`/profile?id=${Comment.userId}`" class="font-semibold hover:underline md:text-xl">
							{{
								Comment.userFirstName +
								' ' +
								Comment.userLastName
							}}
						</NuxtLink>
					</p>
					<div class="flex items-center gap-1">
						<p class="text-xs font-semibold">{{ Comment.date }}</p>
						<Icon name="game-icons:world" size="15px" />
					</div>
				</div>
				<div class="flex flex-col gap-4 text-base font-medium">
					<p class="dark:text-LightModeFrameColor">
						{{ Comment.comment }}
					</p>
					<img :src="`${Config.public.FileApiUrl}${Comment.commentPhoto.photoPath}`" loading="lazy"
					v-if="Comment.commentPhoto" class="max-w-full rounded-xl object-cover" />
					<video v-if="Comment.commentVedio" controls>
						<source :src="`${Config.public.FileApiUrl}${Comment.commentVedio}`"
						:type="GetFileType(Comment.commentVedio.vedioPath)" />
						Your browser does not support the video tag.
					</video>
				</div>
				<button class="replay-btn flex mt-3 w-fit hover:text-[#3C99C0]" @click="toggleReplay = !toggleReplay">
					Replay
				</button>
				<AddComment class="!bg-[#303436]" :id="postId" :type="type" :isPersonal="isPersonal"
				:IsActivePost="IsActivePost" v-if="toggleReplay" />
			</div>
			<div class="flex flex-col gap-4">
				<div class="flex gap-2">
					<Icon name="akar-icons:edit"
					class="transition-base cursor-pointer hover:text-SuccessColor/80 dark:text-Gray500 hover:dark:text-SuccessColor/80"
					size="25px" @click="EditTheComment" v-if="Comment.userId == MainStore.PersonalData?.id" />
					<Icon name="mingcute:delete-fill"
					class="transition-base cursor-pointer hover:text-SecondaryColor dark:text-Gray500 hover:dark:text-SecondaryColor"
					size="25px" v-if="Comment.userId == MainStore.PersonalData?.id" @click="ConfirmDeleteComment = true" />
				</div>
				<div class="flex flex-col items-center gap-4" v-if="type == 1">
					<button @click="
						AddCommentReact(
							Config.public.QuestionReacts['up'].id
						)
						" :disabled="!CanReact" class="disabled:opacity-30">
						<Icon name="ep:arrow-up-bold" size="20px" class="cursor-pointer text-SuccessColor/70" />
					</button>
					<span :class="{
						'text-DangerColor/70': IsVotedDown,
						'text-SuccessColor/70': IsVotedUp,
					}">{{ GetAnswerCount() }}</span>
					<button @click="
						AddCommentReact(
							Config.public.QuestionReacts['down'].id
						)
						" :disabled="!CanReact" class="disabled:opacity-30">
						<Icon name="ep:arrow-up-bold" size="20px" class="rotate-180 cursor-pointer text-DangerColor/70" />
					</button>
				</div>
			</div>
		</div>

		<div class="relative flex w-fit items-center gap-4 px-8" v-if="type != 1" @mouseover="ShowCommentReact = true"
		@mouseleave="ShowCommentReact = false">
			<p class="cursor-pointer text-xs capitalize" :class="{
				' text-SecondaryColor': IsUserReactedToThis.isReacted,
			}">
				{{ $t('post_page.ReactWord') }}
			</p>
			<TheReact :show="ShowCommentReact" @add-the-react="AddCommentReact" @mouseover="ShowCommentReact = true" />
		</div>
	</div>
</template>



<script setup>
import { useMainStore } from '@/stores/index';
import { usePostStore } from '@/stores/posts';

const MainStore = useMainStore();
const PostStore = usePostStore();
const Props = defineProps([
	'Comment',
	'type',
	'postId',
	'isPersonal',
	'IsActivePost',
]);
const Config = useRuntimeConfig();

const ConfirmDeleteComment = ref(false);

const CanReact = ref(true);

const ShowCommentReact = ref(false);

const IsUserReactedToThis = computed(() => {
	let isReacted = false;
	let reactId = null;
	let myReactType = null;
	Props.Comment.commentReacts.forEach((react) => {
		if (react.userId == MainStore.PersonalData?.id) {
			isReacted = true;
			reactId = react.id;
			myReactType = react.react;
		}
	});
	return { isReacted, reactId, myReactType };
});

const GetFileType = (path) => {
	const type = 'video/';
	return type + path.split('.')[path.split('.').length - 1];
};

const GetAnswerCount = () => {
	let count = 0;
	Props.Comment.commentReacts.forEach((react) => {
		if (react.react == 0) {
			count++;
		} else if (react.react == 1) {
			count--;
		}
	});
	return count;
};

const EditTheComment = () => {
	const Files = [];
	if (Props.Comment.commentPhoto) {
		Files.push({ type: 'image', photo: Props.Comment.commentPhoto });
	}
	if (Props.Comment.commentVedio) {
		Files.push({ type: 'video', vid: Props.Comment.commentVedio });
	}
	PostStore.InitEditComment(
		Props.Comment,
		Files,
		Props.isPersonal,
		Props.IsActivePost,
		Props.type,
		Props.postId
	);
};

const RemoveComment = async () => {
	const CommentId = Props.Comment.id;
	let Endpoint = `${Config.public.ApiUrl}/Comment/DeletePostComment?commentId=${CommentId}`;
	if (Props.type == 1) {
		Endpoint = `${Config.public.ApiUrl}/Comment/DeleteQuestionComment?commentId=${CommentId}`;
	}
	const { data, pending, error } = await useApi(
		'Remove-Comment',
		Endpoint,
		'POST'
	);
	if (data.value || !error.value) {
		PostStore.RemoveCommentIdFromPost(
			CommentId,
			Props.postId,
			Props.isPersonal,
			Props.IsActivePost
		);
	}
};

const AddCommentReact = async (react) => {
	if (!CanReact.value) return;
	CanReact.value = false;
	const CommentId = Props.Comment.id;
	let Endpoint = `${Config.public.ApiUrl}/React/AddReactOnPostComment`;
	let isDelete = false;
	let isUpdate = false;

	if (Props.type == 1) {
		Endpoint = `${Config.public.ApiUrl}/React/AddReactOnQuestionPostComment`;
	}

	let body = {
		objectId: CommentId,
		reactType: react,
	};

	const { isReacted, reactId, myReactType } = IsUserReactedToThis.value;
	if (isReacted) {
		if (myReactType == react && Props.type == 1) {
			Endpoint = `${Config.public.ApiUrl}/React/DeleteCommentQuestionReact?reactId=${reactId}`;
			isDelete = true;
		} else if (myReactType == react && Props.type == 0) {
			Endpoint = `${Config.public.ApiUrl}/React/DeleteCommentPostReact?reactId=${reactId}`;
			isDelete = true;
		} else if (myReactType != react && Props.type == 1) {
			Endpoint = `${Config.public.ApiUrl}/React/UpdateQuestionCommentReact`;
			body = {
				objectId: CommentId,
				reactId: reactId,
				reactType: react,
			};
			isUpdate = true;
		} else {
			Endpoint = `${Config.public.ApiUrl}/React/UpdatePostCommentReact`;
			body = {
				objectId: CommentId,
				reactId: reactId,
				reactType: react,
			};
			isUpdate = true;
		}
	}
	const { data, error } = await useApi(
		'Add-Update-React-Comment',
		Endpoint,
		'POST',
		body
	);
	if (data.value || !error.value) {
		if (isDelete) {
			PostStore.RemoveReactFromComment(
				reactId,
				CommentId,
				Props.isPersonal,
				Props.IsActivePost,
				Props.postId
			);
		}
		if (isUpdate) {
			PostStore.UpdateReactComment(
				reactId,
				CommentId,
				Props.isPersonal,
				Props.IsActivePost,
				Props.postId,
				react
			);
		}
		if (!isUpdate && !isDelete) {
			PostStore.AddReactToComment(
				CommentId,
				Props.isPersonal,
				Props.IsActivePost,
				Props.postId,
				data.value
			);
		}
	}
	CanReact.value = true;
};

const IsVotedDown = computed(() => {
	let votedDown = false;
	Props.Comment.commentReacts.forEach((react) => {
		if (react.userId == MainStore.PersonalData?.id) {
			if (react.react == 1) {
				votedDown = true;
			}
		}
	});
	return votedDown;
});

const IsVotedUp = computed(() => {
	let votedUp = false;
	Props.Comment.commentReacts.forEach((react) => {
		if (react.userId == MainStore.PersonalData?.id) {
			if (react.react == 0) {
				votedUp = true;
			}
		}
	});
	return votedUp;
});

const ShowReactsList = async () => {
	let Endpoint = `${Config.public.ApiUrl}/React/GetPostCommentReacts?CommentId=${Props.Comment.id}`;

	if (Props.type == 1) {
		Endpoint = `${Config.public.ApiUrl}/React/GetQuestionCommentReacts?CommentId=${Props.Comment.id}`;
	}
	const { data, error } = await useApi(
		'Get-Comment-Reacts',
		Endpoint,
		'POST'
	);
	if (data.value || !error.value) {
		PostStore.SetActiveReactList(data.value);
	}
};
//=========

const toggleReplay = ref(false);

// const { AllPosts } = storeToRefs(Store);
// const replayComment = ref(null)

// AllPosts.value.forEach((post) => {
// 	return replayComment.value = post;
// });

</script>


<style scoped></style>

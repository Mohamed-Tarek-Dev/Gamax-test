<script setup>
	import EmojiPicker from 'vue3-emoji-picker';
	import { useMainStore } from '@/stores/index';
	import { usePostStore } from '@/stores/posts';
	// import css
	import 'vue3-emoji-picker/css';

	const Props = defineProps(['isPersonal']);
	const { t } = useI18n();

	const MainStore = useMainStore();
	const PostStore = usePostStore();

	const Config = useRuntimeConfig();
	const PostTypes = ref({
		post: 0,
		question: 1,
	});
	const PostType = ref('post');
	const ChoosePostType = ref(false);
	const SelectEmoji = ref(false);
	const PostText = ref('');
	const { Files, FilePreviews, handleFileUpload } = useFileUpload();

	const Disabled = ref(false);
	const SetPostType = (type) => {
		PostType.value = type;
		ChoosePostType.value = false;
	};
	const onSelectEmoji = (emoji) => {
		PostText.value += emoji.i;
	};

	const Publish = async () => {
		if (Disabled.value) return;
		Disabled.value = true;
		const TheFormData = new FormData();
		Object.keys(Files.value).forEach((key, index) => {
			if (Files.value[key].type.includes('image')) {
				TheFormData.append('Photos', Files.value[key]);
			} else if (Files.value[key].type.includes('video')) {
				TheFormData.append('videos', Files.value[key]);
			}
		});
		TheFormData.append('Type', PostTypes.value[PostType.value]);
		let Endpoint = `${Config.public.ApiUrl}/Posts/AddPost`;

		if (PostType.value == 'post') {
			TheFormData.append('Description', PostText.value);
		} else {
			Endpoint = `${Config.public.ApiUrl}/Posts/AddQuestionPost`;
			TheFormData.append('question', PostText.value);
			TheFormData.append('answer', '');
		}

		const { data, pending, error } = await useApi(
			'Add-New-Post',
			Endpoint,
			'POST',
			TheFormData
		);

		Disabled.value = false;
		if (data.value || !error.value) {
			PostStore.AddNewPost(
				data.value,
				Props.isPersonal,
				PostTypes.value[PostType.value]
			);
			PostText.value = '';
			Files.value = [];
			FilePreviews.value = [];
		}
	};

	const RemoveFile = (index) => {
		Files.value = Files.value.filter((val, theindex) => theindex != index);
		FilePreviews.value = FilePreviews.value.filter(
			(val, theindex) => theindex != index
		);
	};
</script>

<template>
	<div
		class="relative flex w-full flex-col gap-4 bg-LightModeFrameColor p-3 dark:bg-DarkModeFrameColor md:rounded-3xl lg:p-6"
	>
		<div>
			<!-- Just in case we want the 3 dots-->
			<h2
				class="text-lg font-semibold capitalize text-DarkModeBackGround dark:text-LightModeFrameColor lg:text-2xl"
			>
				{{ $t('post_page.NewWord') }} {{ PostType }}
			</h2>
		</div>
		<div class="flex h-full gap-2">
			<img
				v-if="
					MainStore &&
					MainStore.PersonalData &&
					MainStore.PersonalData.id
				"
				:src="`${Config.public.ProfilePictureUrl}${MainStore.PersonalData.id}`"
				loading="lazy"
				class="h-[49px] w-[49px] min-w-[49px] rounded-full object-cover"
			/>
			<MyTextArea
				:placeholder="$t('post_page.WriteAnything')"
				:model-value="PostText"
				@update:model-value="PostText = $event"
				:disabled="Disabled"
				text-color="text-WhiteColor"
			/>
		</div>
		<div
			class="border-LightModePrimaryColorTwo flex flex-col border-t px-4 pb-2 pt-6 dark:border-LightModeFrameColor"
		>
			<div
				class="flex flex-wrap items-center gap-4"
				v-if="Files && Files.length > 0"
			>
				<div
					class="relative"
					v-for="(File, index) in FilePreviews"
					:key="File"
				>
					<img
						:src="File.file"
						class="max-h-[100px] max-w-[100px] object-contain"
						loading="lazy"
						v-if="File.type.includes('image')"
					/>
					<video
						width="200"
						height="200"
						controls
						class="max-h-[200px] max-w-[200px] object-contain"
						v-else-if="File.type.includes('video')"
					>
						<source :type="File.type" :src="File.file" />
						Your browser does not support the video tag.
					</video>
					<Icon
						name="ph:x-bold"
						size="30px"
						class="transition-base dark:bg-AllColorsTextColorPrimary/40 dark:hover:bg-AllColorsTextColorPrimary/60 absolute right-1 top-1 cursor-pointer rounded-full p-2 dark:text-LightModeFrameColor dark:hover:text-LightModeFrameColor/80"
						@click="RemoveFile(index)"
					/>
				</div>
			</div>
			<div class="flex items-center justify-between">
				<!-- <div class="mr-3 flex items-center justify-between lg:mr-12">
					<div
						class="dark:text-AllColorsBlackColor relative flex flex-col overflow-hidden rounded-[4px] bg-LightModeBackGround text-xs font-medium text-DarkModeBackGround dark:bg-LightModeFrameColor md:rounded-lg"
					>
						<div
							class="flex cursor-pointer items-center justify-center gap-2 p-2 md:px-3 md:py-2"
							:class="{ 'mb-2': ChoosePostType }"
							@click="ChoosePostType = !ChoosePostType"
						>
							<p class="capitalize">{{ PostType }}</p>
							<Icon
								name="ep:arrow-down-bold"
								class="transition-base"
								:class="{ 'rotate-180': ChoosePostType }"
							/>
						</div>
						<div
							class="transition-base dark:hover:bg-AllColorsStrokeColor flex cursor-pointer items-center justify-center gap-2 border-b p-2 md:px-3 md:py-2"
							@click="SetPostType('post')"
							v-if="ChoosePostType"
						>
							<p>{{ $t('post_page.PostWord') }}</p>
							<Icon
								name="mingcute:check-2-fill"
								v-if="PostType == 'post'"
							/>
						</div>
						<div
							class="transition-base dark:hover:bg-AllColorsStrokeColor flex cursor-pointer items-center justify-center gap-2 border-t p-2 md:px-3 md:py-2"
							@click="SetPostType('question')"
							v-if="ChoosePostType"
						>
							<p>{{ $t('post_page.QuestionWord') }}</p>
							<Icon
								name="mingcute:check-2-fill"
								v-if="PostType == 'question'"
							/>
						</div>
					</div>
				</div> -->
				<div class="relative flex items-center gap-2">
					<div class="relative">
						<Icon
							name="iconoir:emoji"
							size="20px"
							class="transition-base z-10 cursor-pointer text-DarkModeBackGround dark:text-Gray500 dark:hover:text-Gray500/80"
							@click="SelectEmoji = !SelectEmoji"
						/>
						<div
							class="absolute -bottom-[340px] left-1/2 z-10 -translate-x-1/2"
							v-if="SelectEmoji"
						>
							<EmojiPicker
								:native="true"
								:disable-skin-tones="true"
								:theme="$colorMode.value"
								@select="onSelectEmoji"
								v-click-outside="
									() => {
										SelectEmoji = false;
									}
								"
							/>
						</div>
					</div>
					<label for="upload-items">
						<Icon
							name="carbon:attachment"
							size="20px"
							class="transition-base cursor-pointer text-DarkModeBackGround dark:text-Gray500 dark:hover:text-Gray500/80"
						/>
					</label>
					<input
						type="file"
						id="upload-items"
						class="hidden"
						multiple
						@input="handleFileUpload"
						accept="image/*, video/*"
					/>
				</div>

				<button
					class="transition-base hover:bg-LightModePrimaryColor flex cursor-pointer items-center justify-center gap-2 rounded-[4px] bg-LightModeBackGround p-2 text-xs font-semibold text-DarkModeBackGround disabled:opacity-30 dark:bg-LightModeFrameColor dark:hover:bg-PrimaryColor dark:hover:text-LightModeFrameColor md:rounded-lg md:px-3 md:py-2 lg:px-4 lg:py-3"
					@click="Publish"
					:disabled="Disabled"
				>
					<p>{{ $t('post_page.PublishWord') }}</p>
					<Icon name="cil:send" size="14px" />
				</button>
			</div>
		</div>
	</div>
</template>

<style scoped></style>

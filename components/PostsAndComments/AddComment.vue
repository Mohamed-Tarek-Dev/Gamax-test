<script setup>
	import EmojiPicker from 'vue3-emoji-picker';

	// import css
	import 'vue3-emoji-picker/css';
	import { useMainStore } from '@/stores/index';
	import { usePostStore } from '@/stores/posts';

	const MainStore = useMainStore();

	const PostStore = usePostStore();

	const Config = useRuntimeConfig();

	const Props = defineProps(['id', 'type', 'isPersonal', 'IsActivePost']);

	const SelectEmoji = ref(false);
	const CommentDescription = ref('');
	const { Files, FilePreviews, handleFileUpload } = useFileUpload();

	const Disabled = ref(false);

	const onSelectEmoji = (emoji) => {
		CommentDescription.value += emoji.i;
	};

	const RemoveFile = (index) => {
		Files.value = Files.value.filter((val, theindex) => theindex != index);
		FilePreviews.value = FilePreviews.value.filter(
			(val, theindex) => theindex != index
		);
	};

	const Publish = async () => {
		console.log(Props.type, Props.id);
		if (Disabled.value) return;
		Disabled.value = true;
		const TheFormData = new FormData();
		Object.keys(Files.value).forEach((key, index) => {
			if (Files.value[key].type.includes('image')) {
				TheFormData.append('photo', Files.value[key]);
			} else if (Files.value[key].type.includes('video')) {
				TheFormData.append('vedio', Files.value[key]);
			}
		});
		TheFormData.append('postsType', Props.type);
		TheFormData.append('postId', Props.id);
		let Endpoint = `${Config.public.ApiUrl}/Comment/AddPostComment`;
		TheFormData.append('comment', CommentDescription.value);
		if (Props.type == 1) {
			Endpoint = `${Config.public.ApiUrl}/Comment/AddQuestionComment`;
		}

		const { data, pending, error } = await useApi(
			'Add-New-Post-Comment',
			Endpoint,
			'POST',
			TheFormData
		);
		Disabled.value = false;
		if (data.value || !error.value) {
			CommentDescription.value = '';
			Files.value = [];
			FilePreviews.value = [];
			PostStore.AddNewPostComment(
				Props.id,
				data.value,
				Props.isPersonal,
				Props.IsActivePost
			);
		}
	};
</script>

<template>
	<div
		class="bg-LightModePrimaryColor relative mt-2 flex w-full flex-col gap-2 rounded-lg bg-LightModeBackGround p-4 pb-2 text-DarkModeBackGround dark:bg-DarkModeBackGround dark:text-LightModeFrameColor sm:rounded-3xl"
	>
		<div class="flex h-full gap-2">
			<img
				:src="`${Config.public.ProfilePictureUrl}${MainStore.PersonalData.id}`"
				class="h-[49px] w-[49px] rounded-full"
				loading="lazy"
				v-if="MainStore.PersonalData && MainStore.PersonalData.id"
			/>
			<MyTextArea
				text-color="text-MainPagePg"
				:placeholder="$t('post_page.WriteAnything')"
				:model-value="CommentDescription"
				@update:model-value="CommentDescription = $event"
				:disabled="Disabled"
				min-height="min-h-[30px]"
			/>
		</div>
		<div class="flex flex-col gap-2 sm:px-4">
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
						class="tranistion-base dark:bg-AllColorsTextColorPrimary/40 dark:hover:bg-AllColorsTextColorPrimary/60 absolute right-1 top-1 cursor-pointer rounded-full p-2 dark:text-LightModeFrameColor dark:hover:text-LightModeFrameColor/80"
						@click="RemoveFile(index)"
					/>
				</div>
			</div>
			<div class="flex w-full items-center justify-between">
				<div
					class="flex items-center justify-between sm:mr-12 sm:flex-grow"
				>
					<div class="relative flex items-center gap-2">
						<div class="relative">
							<Icon
								name="iconoir:emoji"
								size="20px"
								class="transition-base z-10 cursor-pointer dark:text-Gray500 dark:hover:text-Gray500/80"
								@click="SelectEmoji = !SelectEmoji"
							/>
							<div
								class="absolute -top-[340px] left-1/2 z-0 -translate-x-1/2"
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
						<label for="upload-items-for-comment">
							<Icon
								name="carbon:attachment"
								size="20px"
								class="transition-base cursor-pointer dark:text-Gray500 dark:hover:text-Gray500/80"
							/>
						</label>
						<input
							type="file"
							id="upload-items-for-comment"
							class="hidden"
							@input="handleFileUpload"
							accept="image/*, video/*"
						/>
					</div>
				</div>

				<button
					class="transition-base hover:bg-LightModePrimaryColor flex cursor-pointer items-center justify-center gap-2 rounded-[4px] bg-LightModeBackGround p-2 text-xs font-semibold text-DarkModeBackGround disabled:opacity-30 dark:bg-LightModeFrameColor dark:hover:bg-PrimaryColor dark:hover:text-LightModeFrameColor md:rounded-lg md:px-3 md:py-2 lg:px-4 lg:py-3"
					@click="Publish"
					:disabled="Disabled"
				>
					<p>
						{{
							type == 0
								? $t('post_page.CommentWord')
								: $t('post_page.AnswerWord')
						}}
					</p>
					<Icon name="cil:send" size="20px" />
				</button>
			</div>
		</div>
	</div>
</template>

<style scoped></style>

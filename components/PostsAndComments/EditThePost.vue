<script setup>
	import { storeToRefs } from 'pinia';

	import { usePostStore } from '@/stores/posts';

	import EmojiPicker from 'vue3-emoji-picker';

	// import css
	import 'vue3-emoji-picker/css';

	const Config = useRuntimeConfig();

	const PostStore = usePostStore();

	const { EditingPost } = storeToRefs(PostStore);

	const {
		Files: NewFiles,
		FilePreviews: NewFilesPreview,
		handleFileUpload,
	} = useFileUpload();

	const RemovedPics = ref([]);
	const RemovedVids = ref([]);

	const SelectEmoji = ref(false);
	const onSelectEmoji = (emoji) => {
		EditingPost.value.PostDescription += emoji.i;
	};

	const GetFileType = (path) => {
		const type = 'video/';
		return type + path.split('.')[path.split('.').length - 1];
	};

	const RemoveOldFile = (type, file) => {
		if (type == 'image') {
			RemovedPics.value.push(file);
			EditingPost.value.Files = EditingPost.value.Files.filter(
				(e) => e.photo?.id != file.photo.id
			);
		} else {
			RemovedVids.value.push(file);
			EditingPost.value.Files = EditingPost.value.Files.filter(
				(e) => e.vid?.id != file.vid.id
			);
		}
	};
	const RemoveNewFile = (index) => {
		NewFiles.value = NewFiles.value.filter(
			(val, theindex) => theindex != index
		);
		NewFilesPreview.value = NewFilesPreview.value.filter(
			(val, theindex) => theindex != index
		);
	};

	const Publish = async () => {
		const TheFormData = new FormData();
		Object.keys(NewFiles.value).forEach((key, index) => {
			if (NewFiles.value[key].type.includes('image')) {
				TheFormData.append('Photos', NewFiles.value[key]);
			} else if (NewFiles.value[key].type.includes('video')) {
				TheFormData.append('videos', NewFiles.value[key]);
			}
		});

		let Endpoint = `${Config.public.ApiUrl}/Posts/UpdatePost`;

		if (EditingPost.value.type == 1) {
			Endpoint = `${Config.public.ApiUrl}/Posts/UpdateQuestion`;
			TheFormData.append('Question', EditingPost.value.PostDescription);
		} else {
			TheFormData.append(
				'Description',
				EditingPost.value.PostDescription
			);
		}
		TheFormData.append('id', EditingPost.value.id);
		RemovedPics.value.forEach((pic) => {
			TheFormData.append('deletedPhotoIds', pic.photo.id);
		});
		RemovedVids.value.forEach((vid) => {
			TheFormData.append('deletedVedioIds', vid.vid.id);
		});
		// TheFormData.append("deletedVedioIds", RemovedVids.value)

		const { data, pending, error, refresh } = await useApi(
			'Edit-Post',
			Endpoint,
			'POST',
			TheFormData
		);
		if (data.value && !error.value) {
			PostStore.EditPostWithId(
				EditingPost.value.id,
				data.value,
				EditingPost.value.IsPersonal,
				EditingPost.value.IsActivePost
			);
			EditingPost.value = false;
			NewFiles.value = [];
			NewFilesPreview.value = [];
			RemovedPics.value = [];
			RemovedVids.value = [];
		}
	};
</script>

<template>
	<Teleport to="body">
		<div
			v-if="!!EditingPost"
			class="fixed left-0 top-0 z-30 flex h-screen w-screen items-center justify-center bg-LightModeTextColor/20 dark:bg-LightModeFrameColor/20"
		>
			<div
				class="relative z-20 mb-24 flex w-[80%] flex-col gap-4 rounded-xl bg-LightModeFrameColor p-8 text-DarkModeBackGround dark:bg-DarkModeBackGround dark:text-LightModeFrameColor"
			>
				<Icon
					name="ic:round-close"
					size="30px"
					@click="PostStore.CancelEditingPost"
					class="transition-base absolute right-2 top-2 cursor-pointer hover:text-DangerColor dark:text-Gray500 dark:hover:text-DangerColor"
				/>
				<div>
					<!-- Just in case we want the 3 dots-->
					<h2 class="text-2xl font-semibold capitalize">
						{{ $t('post_page.EditWord') }}
						{{
							EditingPost.type == 1
								? $t('post_page.QuestionWord')
								: $t('post_page.PostWord')
						}}
					</h2>
				</div>
				<div class="flex h-full gap-2">
					<img
						:src="`${Config.public.ProfilePictureUrl}${EditingPost.userId}`"
						loading="lazy"
						class="h-[49px] w-[49px] rounded-full"
					/>
					<MyTextArea
						:placeholder="$t('post_page.WriteAnything')"
						text-color="text-DarkModeBackGround dark:text-LightModeFrameColor"
						:model-value="EditingPost.PostDescription"
						@update:model-value="
							EditingPost.PostDescription = $event
						"
					/>
				</div>
				<div
					class="flex flex-col border-t px-4 pb-2 pt-6 dark:border-LightModeFrameColor"
				>
					<div class="flex flex-wrap gap-4">
						<div
							class="flex flex-wrap items-center gap-4"
							v-if="
								EditingPost.Files &&
								EditingPost.Files.length > 0
							"
						>
							<div
								class="relative"
								v-for="(File, index) in EditingPost.Files"
								:key="File"
							>
								<img
									:src="`${Config.public.FileApiUrl}${File.photo.photoPath}`"
									class="max-h-[100px] max-w-[100px] object-contain"
									loading="lazy"
									v-if="File.type == 'image'"
								/>
								<video
									width="200"
									height="200"
									controls
									class="max-h-[200px] max-w-[200px] object-contain"
									v-else-if="File.type == 'video'"
								>
									<source
										:type="GetFileType(File.vid.vedioPath)"
										:src="`${Config.public.FileApiUrl}${File.vid.vedioPath}`"
									/>
									Your browser does not support the video tag.
								</video>
								<Icon
									name="ph:x-bold"
									size="30px"
									class="tranistion-base dark:bg-AllColorsTextColorPrimary/40 dark:hover:bg-AllColorsTextColorPrimary/60 absolute right-1 top-1 cursor-pointer rounded-full p-2 text-LightModeFrameColor dark:hover:text-LightModeFrameColor/80"
									@click="RemoveOldFile(File.type, File)"
								/>
							</div>
						</div>

						<div
							class="flex flex-wrap items-center gap-4"
							v-if="NewFiles && NewFiles.length > 0"
						>
							<div
								class="relative"
								v-for="(File, index) in NewFilesPreview"
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
									<source
										:type="File.type"
										:src="File.file"
									/>
									Your browser does not support the video tag.
								</video>
								<Icon
									name="ph:x-bold"
									size="30px"
									class="tranistion-base dark:bg-AllColorsTextColorPrimary/40 dark:hover:bg-AllColorsTextColorPrimary/60 absolute right-1 top-1 cursor-pointer rounded-full p-2 dark:text-LightModeFrameColor dark:hover:text-LightModeFrameColor/80"
									@click="RemoveNewFile(index)"
								/>
							</div>
						</div>
					</div>

					<div class="flex items-center justify-between">
						<div
							class="mr-12 flex flex-grow items-center justify-between"
						>
							<div
								class="dark:text-AllColorsBlackColor relative flex flex-col overflow-hidden rounded-xl text-sm font-medium dark:bg-LightModeFrameColor"
							></div>

							<div class="relative flex items-center gap-2">
								<div class="relative">
									<Icon
										name="iconoir:emoji"
										size="20px"
										class="transition-base z-10 cursor-pointer hover:text-Gray500/80 dark:text-Gray500"
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
								<label for="upload-new-items">
									<Icon
										name="carbon:attachment"
										size="20px"
										class="transition-base cursor-pointer hover:text-Gray500/80 dark:text-Gray500"
									/>
								</label>
								<input
									type="file"
									id="upload-new-items"
									class="hidden"
									multiple
									@input="handleFileUpload"
									accept="image/*, video/*"
								/>
							</div>
						</div>

						<div
							class="transition-base text-AllColorsBlackColor flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-LightModeBackGround px-4 py-3 text-base font-semibold dark:bg-LightModeFrameColor dark:text-LightModeTextColor dark:hover:bg-PrimaryColor dark:hover:text-LightModeFrameColor"
							@click="Publish"
						>
							<p>{{ $t('post_page.PublishWord') }}</p>
							<Icon name="cil:send" size="20px" />
						</div>
					</div>
				</div>
			</div>
		</div>
	</Teleport>
</template>

<style scoped></style>

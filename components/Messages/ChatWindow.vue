<script setup>
	import EmojiPicker from 'vue3-emoji-picker';

	import { useChatStore } from '@/stores/chatstore';

	import { useMainStore } from '@/stores/index';

	import 'vue3-emoji-picker/css';
	import { storeToRefs } from 'pinia';

	const MainStore = useMainStore();
	const Config = useRuntimeConfig();
	const MsgContainer = ref();
	const Expanded = ref(false);

	const ChatStore = useChatStore();

	const { ActiveChatPage } = storeToRefs(ChatStore);
	const SelectEmoji = ref(false);

	const MessageText = ref('');

	const Disabled = ref(false);

	const { Files, FilePreviews, handleFileUpload } = useFileUpload();

	const onSelectEmoji = (emoji) => {
		MessageText.value += emoji.i;
	};

	const RemoveFile = (index) => {
		Files.value = Files.value.filter((val, theindex) => theindex != index);
		FilePreviews.value = FilePreviews.value.filter(
			(val, theindex) => theindex != index
		);
	};

	const AddNewChatMessage = async () => {
		if (Disabled.value) return;
		Disabled.value = true;
		const TheFormData = new FormData();
		Object.keys(Files.value).forEach((key, index) => {
			if (Files.value[key].type.includes('image')) {
				TheFormData.append('photos', Files.value[key]);
			} else if (Files.value[key].type.includes('video')) {
				TheFormData.append('videos', Files.value[key]);
			}
		});
		TheFormData.append('message', MessageText.value);
		TheFormData.append('senderId', MainStore.PersonalData.id);
		TheFormData.append('reciveId', ActiveChatPage.value.userId);

		const { data, error, pending } = await useApi(
			'Send-New-Message',
			`${Config.public.ApiUrl}/Chat/SendPrivateMessage`,
			'POST',
			TheFormData
		);
		Disabled.value = false;
		if (data.value && !error.value) {
			MessageText.value = '';
			Files.value = [];
			FilePreviews.value = [];
			await ChatStore.AddNewMessage(data.value);
			MsgContainer.value
				? (MsgContainer.value.scrollTop =
						MsgContainer.value.scrollHeight)
				: '';
		}
	};

	watch(ActiveChatPage, (newval) => {
		if (newval.messages) {
			setTimeout(() => {
				if (MsgContainer.value) {
					MsgContainer.value.scrollTop =
						MsgContainer.value.scrollHeight;
				}
			}, 300);
		}
	});
</script>

<template>
	<div
		class="mb-10 flex h-[89vh] w-full flex-col justify-between gap-6"
		v-if="ActiveChatPage"
	>
		<div
			class="flex w-full items-center justify-between gap-5 rounded-2xl bg-transparent px-4 py-2 md:bg-LightModeFrameColor md:px-14 md:pr-10 md:dark:bg-DarkModeFrameColor"
		>
			<div
				class="block cursor-pointer md:hidden"
				@click="ChatStore.RemoveActiveChat"
			>
				<Icon
					name="material-symbols:arrow-back-ios-rounded"
					size="24px"
				/>
			</div>

			<div class="pointer-events-none relative min-w-[50px]">
				<img
					:src="`${Config.public.ProfilePictureUrl}${ActiveChatPage.userId}`"
					class="h-[50px] w-[50px] rounded-full object-cover"
					loading="lazy"
				/>
				<div
					class="absolute bottom-0 right-0 z-[5] h-[15px] w-[15px] rounded-full border-2 border-LightModeFrameColor dark:border-DarkModeFrameColor"
					:class="{
						'bg-SuccessColor': ActiveChatPage.online,
						'bg-Gray500': !ActiveChatPage.online,
					}"
				></div>
			</div>
			<div class="flex flex-grow flex-col gap-3 font-montserrat">
				<NuxtLink
					:to="`/profile?id=${ActiveChatPage.userId}`"
					class="cursor-pointer text-xl font-semibold hover:underline"
				>
					<p>
						{{ ActiveChatPage.firstName }}
						{{ ActiveChatPage.lastName }}
					</p>
				</NuxtLink>
				<p
					class="text-sm font-medium text-Gray500"
					v-if="ActiveChatPage.online"
				>
					Active Now
				</p>
			</div>
			<!-- <div
				class="hidden items-center gap-4 text-LightModeFrameColor md:flex"
			>
				<div
					class="flex items-center justify-center rounded-full bg-DarkModeBackGround p-3"
				>
					<Icon name="fluent:call-20-filled" size="20px" />
				</div>
				<div
					class="flex items-center justify-center rounded-full bg-DarkModeBackGround p-3"
				>
					<Icon name="typcn:video" size="20px" />
				</div>
			</div>
			<div class="relative md:hidden">
				<Icon name="tabler:dots" size="20px" @click="Expanded = true" />
				<div
					class="absolute right-full top-full gap-4 overflow-hidden rounded-xl bg-LightModePrimaryColor p-4 dark:bg-DarkModeFrameColor"
					:class="{ 'flex flex-col': Expanded, ' hidden': !Expanded }"
					v-click-outside="
						() => {
							Expanded = false;
						}
					"
				>
					<div class="flex items-center gap-2">
						<Icon name="fluent:call-20-filled" size="20px" />
						<p>Call</p>
					</div>
					<div class="flex items-center gap-2">
						<Icon name="typcn:video" size="20px" />
						<p>Video</p>
					</div>
				</div>
			</div> -->
		</div>

		<div
			class="flex max-h-[90%] w-full flex-grow flex-col-reverse gap-6 overflow-y-auto pr-2 md:pr-10"
			ref="MsgContainer"
		>
			<ChatMessage
				v-for="Message in ActiveChatPage.messages"
				:message="Message"
			/>
		</div>
		<div
			class="w-full rounded-xl bg-LightModeFrameColor p-4 pr-2 dark:bg-DarkModeFrameColor md:pr-10"
		>
			<div
				class="flex flex-col justify-between rounded-xl bg-LightModeBackGround p-4 dark:bg-DarkModeBackGround"
			>
				<div class="flex w-full items-center justify-between">
					<div class="flex-grow">
						<MyTextArea
							placeholder="Write Anything"
							min-height="min-h-[30px]"
							class="h-[35px]"
							:model-value="MessageText"
							@update:model-value="MessageText = $event"
							:disabled="Disabled"
							@SubmitForm="AddNewChatMessage"
						/>
					</div>
					<div class="flex items-center gap-4">
						<div class="relative">
							<Icon
								name="iconoir:emoji"
								size="20px"
								class="transition-base z-10 cursor-pointer text-DarkModeBackGround dark:text-Gray500 dark:hover:text-Gray500/80"
								@click="SelectEmoji = !SelectEmoji"
							/>
							<div
								class="absolute -top-[340px] left-0 z-0 -translate-x-1/2"
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
						<div>
							<label for="upload-chat-items">
								<Icon
									name="carbon:attachment"
									size="20px"
									class="transition-base cursor-pointer text-DarkModeBackGround dark:text-Gray500 dark:hover:text-Gray500/80"
								/>
							</label>
							<input
								type="file"
								id="upload-chat-items"
								class="hidden"
								multiple
								@input="handleFileUpload"
								accept="image/*, video/*"
							/>
						</div>
						<div
							class="flex cursor-pointer items-center justify-center rounded-full p-2 text-PrimaryColor dark:bg-PrimaryColor dark:text-LightModeFrameColor"
							@click="AddNewChatMessage"
						>
							<Icon name="fa:send" size="12px" />
						</div>
					</div>
				</div>
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
							v-if="File.type.includes('image')"
							loading="lazy"
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
			</div>
		</div>
	</div>
	<div
		class="mb-10 flex h-screen flex-col items-center justify-center gap-6 overflow-hidden"
		v-else
	>
		<p class="flex items-center gap-4 text-lg">
			<Icon name="ep:arrow-left-bold" size="24px" />Please Select Chat
			From The SideBar
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

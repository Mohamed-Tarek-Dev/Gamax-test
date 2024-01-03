<script setup>
	import { useMainStore } from '@/stores/index';
	import { useChatStore } from '@/stores/chatstore';
	const Config = useRuntimeConfig();
	const ChatStore = useChatStore();
	const MainStore = useMainStore();
	const Props = defineProps(['message']);
	const ConfirmDeleteMessage = ref(false);

	const GetFileType = (path) => {
		const type = 'video/';
		return type + path.split('.')[path.split('.').length - 1];
	};

	const fromOther = computed(() => {
		return Props.message.senderId != MainStore.PersonalData?.id;
	});

	const EditTheMessage = () => {
		const Files = [];
		if (Props.message.photos) {
			Props.message.photos.forEach((item) => {
				Files.push({ type: 'image', photo: item });
			});
		}
		if (Props.message.videos) {
			Props.message.videos.forEach((item) => {
				Files.push({ type: 'video', vid: item });
			});
		}
		ChatStore.InitEditMessage(Props.message, Files);
	};

	const RemoveMessage = async () => {
		const MessageId = Props.message.id;
		let Endpoint = `${Config.public.ApiUrl}/Chat/DeleteChat?chatId=${MessageId}`;
		const { data, pending, error } = await useApi(
			'Remove-Message',
			Endpoint,
			'POST'
		);
		if (data.value || !error.value) {
			ConfirmDeleteMessage.value = false;
			ChatStore.RemoveMessage(MessageId);
		}
	};

	onMounted(() => {
		// console.log(Props.message);
	});
</script>

<template>
	<Teleport to="body" v-if="ConfirmDeleteMessage">
		<div
			class="bg-AllColorsBlackColor/20 fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center overflow-hidden dark:bg-LightModeFrameColor/20"
			@click.self="ConfirmDeleteMessage = false"
		>
			<div
				class="bg-LightModePrimaryColor absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-6 overflow-hidden rounded-xl p-8 text-DarkModeBackGround dark:bg-DarkModeFrameColor"
			>
				<Icon
					name="ic:round-close"
					size="30px"
					@click="ConfirmDeleteMessage = false"
					class="transition-base absolute right-2 top-2 cursor-pointer hover:text-SecondaryColor dark:text-Gray500 dark:hover:text-SecondaryColor"
				/>
				<p
					class="mt-2 font-montserrat font-semibold dark:text-LightModeFrameColor"
				>
					Are You Sure You Want To Remove This Message ?
				</p>
				<div class="flex w-full items-center justify-end gap-8">
					<button
						class="rounded-xl bg-PrimaryColor px-6 py-3 text-LightModeFrameColor"
						@click="RemoveMessage"
					>
						Confirm
					</button>
					<button
						class="rounded-xl bg-SecondaryColor px-6 py-3 text-LightModeFrameColor"
						@click="ConfirmDeleteMessage = false"
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	</Teleport>
	<div
		class="flex w-[95%] items-start gap-4 rounded-xl p-4 text-DarkModeBackGround dark:text-WhiteColor md:w-[80%]"
		:class="{
			'self-end bg-SecondaryColor': fromOther,
			'bg-LightModeFrameColor dark:bg-DarkModeFrameColor': !fromOther,
		}"
	>
		<div class="pointer-events-none relative min-w-[50px]">
			<img
				:src="`${Config.public.ProfilePictureUrl}${message.senderId}`"
				class="h-[50px] w-[50px] rounded-full object-cover"
				loading="lazy"
			/>
			<div
				class="absolute bottom-0 right-0 z-[5] h-[15px] w-[15px] rounded-full border-2"
				:class="{
					'border-SecondaryColor': fromOther,
					'border-LightModePrimaryColor': !fromOther,
					'bg-SuccessColor': ChatStore.ActiveChatPage.online,
					'bg-Gray500': !ChatStore.ActiveChatPage.online,
				}"
			></div>
		</div>
		<div class="flex w-full flex-col gap-2 p-4">
			<div class="flex w-full items-center justify-between gap-3">
				<p
					class="font-montserrat text-xs font-extralight"
					:class="{
						'text-Gray500': !fromOther,
						' text-LightModeFrameColor': fromOther,
					}"
				>
					{{ message.timeCreated }}
				</p>
				<div class="flex items-center gap-2">
					<Icon
						name="akar-icons:edit"
						class="transition-base cursor-pointer hover:text-SuccessColor/80 dark:text-Gray500 hover:dark:text-SuccessColor/80"
						size="12px"
						@click="EditTheMessage"
						v-if="message.senderId == MainStore.PersonalData?.id"
					/>
					<Icon
						name="mingcute:delete-fill"
						class="transition-base cursor-pointer hover:text-DangerColor/80 dark:text-Gray500 hover:dark:text-DangerColor/80"
						size="12px"
						v-if="message.senderId == MainStore.PersonalData?.id"
						@click="ConfirmDeleteMessage = true"
					/>
				</div>
			</div>

			<p
				class="text-sm"
				:class="{ ' text-LightModeFrameColor': fromOther }"
			>
				{{ message.message }}
			</p>

			<img
				v-for="photo in message.photos"
				:src="`${Config.public.FileApiUrl}${photo.photoPath}`"
				loading="lazy"
			/>
			<video v-for="video in message.videos" controls>
				<source
					:src="`${Config.public.FileApiUrl}${video.vedioPath}`"
					:type="GetFileType(video.vedioPath)"
				/>
				Your browser does not support the video tag.
			</video>
		</div>
	</div>
</template>

<style scoped></style>

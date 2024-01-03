export const useChatStore = defineStore('chatstore', {
	state: () => ({
		UserChats: [],
		ActiveChatPage: false,
		EditingMessage: false,
	}),
	getters: {},
	actions: {
		async GetUserChats() {
			const Config = useRuntimeConfig();
			const { data, error, pending } = await useApi(
				'Get-User-Friends-With-Last-Message',
				`${Config.public.ApiUrl}/Chat/GetFriendsWithLastMessage`,
				'POST'
			);
			if (!pending.value) {
				this.UserChats = data.value;
			} else {
				watch(pending, async (newval) => {
					if (!newval) {
						const Route = useRoute();
						this.UserChats = data.value;
						// if (Route.query?.id) {
						// 	await this.SetActiveChat(Route.query.id);
						// }
					}
				});
			}
		},
		async MarkUserChatAsRead(id) {
			const Config = useRuntimeConfig();
			const { data, error, pending } = await useApi(
				'Get-Friend-Chat',
				`${Config.public.ApiUrl}/Chat/MarkUserChatAsRead?secoundUserId=${id}`,
				'POST'
			);
		},
		async SetActiveChat(id) {
			const TheUser = this.UserChats.find((user) => user.userId == id);
			console.log(this.UserChats);
			console.log(TheUser + ' ' + id);
			if (!TheUser) return;
			const Config = useRuntimeConfig();
			const { data, error, pending } = await useApi(
				'Get-Friend-Chat',
				`${Config.public.ApiUrl}/Chat/GetUserChat?secoundUserId=${id}`,
				'POST'
			);
			this.ActiveChatPage = {};
			this.ActiveChatPage.userId = id;
			this.ActiveChatPage.online = TheUser.online;
			if (!pending.value) {
				this.ActiveChatPage.messages = data.value;
				this.ActiveChatPage.firstName = TheUser.firstName;
				this.ActiveChatPage.lastName = TheUser.lastName;
				await this.MarkUserChatAsRead(id);
			} else {
				watch(pending, async (newval) => {
					if (!newval) {
						this.ActiveChatPage.messages = data.value;
						this.ActiveChatPage.firstName = TheUser.firstName;
						this.ActiveChatPage.lastName = TheUser.lastName;
						await this.MarkUserChatAsRead(id);
					}
				});
			}
		},
		RemoveActiveChat() {
			this.ActiveChatPage = false;
		},
		async AddNewMessage(message) {
			this.ActiveChatPage.messages?.unshift(message);
			let index = this.UserChats.findIndex(
				(val) => val.userId == this.ActiveChatPage.userId
			);
			if (index == -1) return;
			this.UserChats[index].message = message.message;
			this.UserChats[index].timeCreated = message.timeCreated;
			this.UserChats[index].photos = message.photos;
			this.UserChats[index].videos = message.videos;
			this.UserChats[index].read = false;
		},
		InitEditMessage(message, Files) {
			this.EditingMessage = {
				id: message.id,
				Files: Files,
				message: message.message,
				senderId: message.senderId,
				reciveId: message.reciveId,
			};
		},
		CancelEditMessage() {
			this.EditingMessage = false;
		},
		EditMessage(message) {
			let index = this.ActiveChatPage.messages?.findIndex(
				(val) => val.id == message.id
			);
			if (index == -1) return;
			this.ActiveChatPage.messages[index] = message;
		},
		RemoveMessage(id) {
			if (this.ActiveChatPage) {
				this.ActiveChatPage.messages =
					this.ActiveChatPage.messages?.filter((val) => val.id != id);
			}
			let index = this.UserChats.findIndex(
				(val) => val.lastMessageId == id
			);
			if (index == -1) return;
			this.UserChats[index].message = null;
			this.UserChats[index].timeCreated = '';
			this.UserChats[index].photos = [];
			this.UserChats[index].videos = [];
		},
	},
});

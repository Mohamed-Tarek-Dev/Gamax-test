export const useNotifStore = defineStore('notifstore', {
	state: () => ({
		GeneralNotifs: [],
		FriendReqNotifs: [],
		ActiveNotifs: [],
		ActiveNotifId: 1,
	}),
	getters: {},
	actions: {
		AddActiveNotif(Notif) {
			console.log(Notif);
			let id = this.ActiveNotifId;
			this.ActiveNotifId++;
			this.ActiveNotifs.push({ id, Notif });
			setTimeout(() => {
				this.ActiveNotifs = this.ActiveNotifs.filter(
					(thenotif) => thenotif.id != id
				);
			}, 5000);
		},
		AddGeneralNotif(Notif) {
			this.GeneralNotifs.unshift(Notif);
			this.AddActiveNotif(Notif);
		},
		AddFriendReqNotif(Notif, Accepted) {
			if (!Accepted) {
				this.FriendReqNotifs.unshift(Notif);
			}
			this.AddActiveNotif({
				...Notif,
				isFriendRequest: true,
				TextType: Accepted
					? 'ApprovedFriendRequest'
					: 'SendFriendRequest',
				Accepted: Accepted,
			});
		},
		RemoveFriendReqNotif(id) {
			this.FriendReqNotifs = this.FriendReqNotifs.filter(
				(thenotif) => thenotif.requestId != id
			);
		},
		async GetGeneralNotifications() {
			const NotificatinTypes = [
				'AddPost',
				'AddQuestion',
				'AddComment',
				'AddAnswer',
				'AddReactOnComment',
				'AddReactOnAnswer',
				'AddReactOnPost',
				'AddReactOnQuestion',
			];

			const Config = useRuntimeConfig();
			const { data, pending, error } = await useApi(
				'Get-All-User-Notifications',
				`${Config.public.ApiUrl}/Notification/GetUserNotifications`,
				'POST'
			);

			watch(pending, (newval) => {
				if (!newval) {
					if (data.value) {
						data.value.forEach((entry) => {
							entry.seen = false;
							entry.TextType =
								NotificatinTypes[entry.notificatinType];
						});
						this.GeneralNotifs = data.value || [];
					}
				}
			});
		},
		async GetFriendReqNotifications() {
			const Config = useRuntimeConfig();
			const { data, pending, error } = await useApi(
				'Get-All-User-Friends-Requests',
				`${Config.public.ApiUrl}/Friends/GetPendingFriendRequest`,
				'POST'
			);

			watch(pending, (newval) => {
				if (!newval) {
					if (data.value) {
						data.value.forEach((entry) => {
							entry.seen = false;
						});
						this.FriendReqNotifs = data.value || [];
					}
				}
			});
		},
		async SetGeneralNotifsAsRead() {
			const Config = useRuntimeConfig();
			this.GeneralNotifs.forEach((notif) => {
				notif.seen = true;
			});

			const { data, error } = await useApi(
				'Mark-Notifs-As-Read',
				`${Config.public.ApiUrl}/Notification/MarkUserNotificationsAsRead`,
				'POST'
			);
		},
		async SetFriendReqNotifsAsRead() {
			this.FriendReqNotifs.forEach((notif) => {
				notif.seen = true;
			});
		},
	},
});

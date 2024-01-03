export const useFriendsStore = defineStore('friendsstore', {
	state: () => ({
		CurrentUserFriends: false,
		OtherUserFriends: false,
	}),
	getters: {},
	actions: {
		async GetUserFriends(userid, otheruser) {
			const Config = useRuntimeConfig();
			const { data, error, pending } = await useApi(
				'Get-User-Friends',
				`${Config.public.ApiUrl}/Friends/GetAllUserFriends?userID=${userid}`,
				'POST'
			);
			if (!pending.value) {
				if (!otheruser) {
					this.CurrentUserFriends = data.value;
					this.OtherUserFriends = false;
				} else {
					this.OtherUserFriends = data.value;
					this.CurrentUserFriends = false;
				}
			} else {
				watch(pending, (newval) => {
					if (!newval) {
						if (!otheruser) {
							this.CurrentUserFriends = data.value;
							this.OtherUserFriends = false;
						} else {
							this.OtherUserFriends = data.value;
							this.CurrentUserFriends = false;
						}
					}
				});
			}
		},
	},
});

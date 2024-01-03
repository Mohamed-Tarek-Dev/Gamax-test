import { useMainStore } from '@/stores/index';

export default defineNuxtRouteMiddleware(async (to) => {
	// skip middleware on server
	if (process.server) return;
	const Config = useRuntimeConfig();
	const Store = useMainStore();
	if (to.query?.id && to.query.id != Store.PersonalData?.id) {
		const { data, pending, error } = await useApi(
			'Get-Other-Profile-Data',
			`${Config.public.ApiUrl}/Accounts/GetProfileAcountData?userId=${to.query.id}`,
			'POST'
		);
		if (data.value && !pending.value && !error.value) {
			Store.SetOtherPersonData(data.value);
		}
		const {
			data: FriendState,
			error: FriendStateError,
			pending: FriendStatePending,
		} = await useApi(
			'Get-Friend-State',
			`${Config.public.ApiUrl}/Friends/GetUserFriendRelation?SecondUserId=${to.query.id}`,
			'POST'
		);
		console.log(FriendState.value);
		if (
			FriendState.value &&
			!FriendStatePending.value &&
			!FriendStateError.value
		) {
			Store.SetOtherPersonData({
				...Store.OtherPersonalData,
				FriendState: FriendState.value,
			});
		}

		return;
	} else {
		Store.SetOtherPersonData(false);
		return;
	}
	return;
});

import { usePostStore } from '@/stores/posts';
import { useMainStore } from '@/stores/index';
import { useFriendsStore } from '@/stores/friends';

export default defineNuxtRouteMiddleware(async (to) => {
	// skip middleware on server
	if (process.server) return;
	const Config = useRuntimeConfig();
	const Store = useMainStore();
	const PostStore = usePostStore();
	const FriendsStore = useFriendsStore();
	PostStore.ResetPersonalPosts();

	if (to.query?.id) {
		FriendsStore.GetUserFriends(to.query.id, true);
	} else {
		FriendsStore.GetUserFriends(Store.PersonalData?.id, false);
	}

	const { data, error, pending } = await useApi(
		'Get-All-User-Posts',
		`${Config.public.ApiUrl}/Posts/GetAllPersonalPostTypes?PostTime=${
			PostStore.PersonalPostsTime.PostTime
		}&QuestionTime=${PostStore.PersonalPostsTime.QuestionTime}&userId=${
			to.query?.id || Store.PersonalData?.id
		}`,
		'POST'
	);

	if (data.value && !pending.value && !error.value) {
		PostStore.SetPersonalPosts(data.value);
	}

	return;
});

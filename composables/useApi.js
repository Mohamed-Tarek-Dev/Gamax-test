import { useMainStore } from '@/stores/index';

export const useApi = async (key, endpoint, method, body = null) => {
	const Config = useRuntimeConfig();
	const Store = useMainStore();

	const firstResp = await useAsyncData(
		key,
		() =>
			$fetch(endpoint, {
				//making our first response
				method,
				body,
				credentials: 'include',
			}),
		{ server: false }
	);

	if (
		firstResp.error.value &&
		firstResp.error.value.data &&
		firstResp.error.value.data.message ==
			'Access Token is invalid or Expired'
	) {
		// here u specify the condition of unAuth response with code and for message u can use `firstResp.error.value.statusText` to check for the message
		const { data, pending, error, refresh } = await useAsyncData(
			'GetAccessToken',
			() =>
				$fetch(`${Config.public.ApiUrl}/Auth/token`, {
					//Get another accessToken from the backend using th refresh token that is saved in cookies
					method: 'POST',
					credentials: 'include',
				}),
			{ server: false }
		);
		if (!data.error) {
			//if it return the token
			Store.SetAccessToken(data.value.token, data.value.expiresOn); //set it in the accessToken
			return await useAsyncData(
				key,
				() =>
					$fetch(endpoint, {
						//making our first response
						method,
						body,
						credentials: 'include',
					}),
				{ server: false }
			);
		} else {
			// if no token
			// Store.Logout() //logout
			return firstResp; //return the first resp just in case
		}
	}
	return firstResp; // if no error return the first resp
};

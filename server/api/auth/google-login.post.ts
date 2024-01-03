import { OAuth2Client } from 'google-auth-library';
const config = useRuntimeConfig();

// Create Google Client
const googleClientId = config.public.googleClientId;
const client = new OAuth2Client(googleClientId);

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const token = body.token;

	const user = verify(token).catch(console.error);

	return user;
});

async function verify(token: string) {
	const ticket = await client.verifyIdToken({
		idToken: token,
		audience: googleClientId,
	});
	const payload = ticket.getPayload();

	return payload;
}

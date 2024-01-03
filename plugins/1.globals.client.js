import { EncryptStorage } from 'encrypt-storage';

export default defineNuxtPlugin(() => {
	const encryptStorage = new EncryptStorage('hash-123-amoz');

	return {
		provide: {
			encryptStorage,
		},
	};
});

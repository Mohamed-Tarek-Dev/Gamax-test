export const checkFileSize = (file) => {
	const maxFileSize = 8 * 1024 * 1024; // 8MB in bytes
	const fileSize = file.size;

	if (fileSize > maxFileSize) {
		return false;
	}
	return true;
};

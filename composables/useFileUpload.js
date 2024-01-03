export const useFileUpload = () => {
	const FilePreviews = ref([]);
	const Files = ref([]);

	function handleFileUpload(event) {
		const files = event.target.files;
		for (let i = 0; i < files.length; i++) {
			Files.value.push(files[i]);
			const file = files[i];
			if (checkFileSize(file)) {
				const reader = new FileReader();
				reader.onloadend = function () {
					FilePreviews.value.push({
						type: file.type,
						file: reader.result,
					});
				};
				reader.readAsDataURL(file);
			} else {
				window.alert(
					'File size is too large! Please choose a smaller file.'
				);
			}
		}
		event.target.value = '';
	}

	return { Files, FilePreviews, handleFileUpload };
};

// const Files = ref([]);
// const FilePreviews = ref([]);
// const FilesUploaded = (e) => {
// 	for (let i = 0; i < e.target.files.length; i++) {
// 		if (checkFileSize(e.target.files[i])) {
// 			Files.value.push(e.target.files[i]);
// 			let file = e.target.files[i],
// 				reader = new FileReader();
// 			reader.onloadend = function () {
// 				FilePreviews.value.push({
// 					type: file.type,
// 					file: reader.result,
// 				});
// 			};
// 			reader.readAsDataURL(file);
// 		} else {
// 			alert(
// 				'File size exceeds the limit (8MB). Please choose a smaller file.'
// 			);
// 		}
// 	}
// 	e.target.value = ''; // to make sure the change event will fire again
// };

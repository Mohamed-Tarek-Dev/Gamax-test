<script setup>
	const emit = defineEmits(['update:modelValue', 'SubmitForm']);
	const TextArea = ref();

	const props = defineProps({
		modelValue: String,
		placeholder: String,
		disabled: {
			type: Boolean,
			required: false,
			default: false,
		},
		bg: {
			type: String,
			required: false,
			default: 'bg-transparent',
		},
		minHeight: {
			type: String,
			required: false,
			default: 'min-h-[60px]',
		},
		textColor: {
			type: String,
			required: false,
			default: 'text-Gray500',
		},
	});
	const ResizeTextArea = () => {
		let minh = props.minHeight.split('[')[1].replace(']', '');
		if (TextArea.value.scrollHeight > minh.replace('px', '')) {
			TextArea.value.style.height = 'auto';
			TextArea.value.style.height = TextArea.value.scrollHeight + 'px';
		} else {
			TextArea.value.style.height = minh;
		}
	};

	const thevalue = computed({
		get() {
			return props.modelValue;
		},
		set(newValue) {
			emit('update:modelValue', newValue);
		},
	});

	onMounted(() => {
		TextArea.value.addEventListener('keydown', function (event) {
			if (event.key === 'Enter') {
				event.preventDefault(); // Prevent the default Enter key behavior
				emit('SubmitForm');
			}
		});
	});
</script>

<template>
	<textarea
		:disabled="disabled"
		@input="ResizeTextArea"
		ref="TextArea"
		v-model="thevalue"
		class="w-full resize-none p-1 outline-none placeholder:text-current disabled:opacity-30"
		rows="1"
		:class="[bg, minHeight, textColor]"
		:placeholder="placeholder"
	></textarea>
</template>

<style scoped></style>

<script setup>
	const Props = defineProps({
		placeholder: {
			type: String,
			required: false,
			default: 'Search For Player',
		},
		bgcolor: {
			type: String,
			required: false,
			default: 'bg-DarkModeFrameColor',
		},
		modelValue: String,
	});

	const emits = defineEmits(['update:modelValue', 'SearchFunction']);

	const thevalue = computed({
		get() {
			return Props.modelValue;
		},
		set(newValue) {
			emits('update:modelValue', newValue);
		},
	});
	const SubmitForm = (e) => {
		e.preventDefault();
		emits('SearchFunction');
	};
</script>

<template>
	<form @submit="SubmitForm">
		<div
			class="text-Gray500 relative w-full rounded-2xl p-4"
			:class="[bgcolor]"
		>
			<Icon
				name="ic:twotone-search"
				size="24px"
				class="absolute left-3 top-1/2 -translate-y-1/2"
			/>
			<input
				v-model="thevalue"
				type="text"
				:placeholder="placeholder"
				class="w-full bg-transparent pl-6 focus:outline-none"
			/>
		</div>
	</form>
</template>

<style scoped></style>

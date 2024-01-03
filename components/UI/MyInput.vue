<script setup>
	const emit = defineEmits(['update:modelValue']);

	// const props = defineProps(['modelValue', 'id', 'type', 'error', 'label', 'placeholder', 'isPassword'])
	const props = defineProps({
		modelValue: String,
		id: String,
		type: String,
		error: String,
		label: String,
		placeholder: String,
		isPassword: {
			type: Boolean,
			required: false,
			default: false,
		},
		bg: {
			type: String,
			required: false,
			default: 'bg-white',
		},
		border: {
			type: String,
			required: false,
			default: 'border-AllColorsStrokeColor',
		},
		labelcolor: {
			type: String,
			required: false,
			default: 'text-AllColorsTextColorPrimary',
		},
		disabled: {
			type: Boolean,
			required: false,
			default: false,
		},
	});
	const thevalue = computed({
		get() {
			return props.modelValue;
		},
		set(newValue) {
			emit('update:modelValue', newValue);
		},
	});

	const IsVisible = ref(false);

	const GetType = computed(() => {
		if (!props.isPassword) {
			return props.type;
		} else {
			if (IsVisible.value) {
				return 'text';
			} else {
				return 'password';
			}
		}
	});
</script>

<template>
	<div class="relative flex w-full flex-col gap-2">
		<label :for="id" class="text-sm font-medium" :class="[labelcolor]">{{
			label
		}}</label>
		<div class="relative w-full">
			<input
				:disabled="disabled"
				:type="GetType"
				:id="id"
				:placeholder="placeholder"
				v-model="thevalue"
				class="w-full rounded-md border p-4 focus:outline-none disabled:opacity-30"
				:class="[
					!!error ? 'border-DangerColor outline-DangerColor' : '',
					bg,
					border,
				]"
			/>
			<Icon
				v-if="isPassword && !IsVisible"
				name="ph:eye"
				@click="IsVisible = !IsVisible"
				class="absolute right-[10px] top-1/2 -translate-y-1/2 cursor-pointer"
				size="24px"
			/>
			<Icon
				v-if="isPassword && IsVisible"
				name="ph:eye-slash-light"
				@click="IsVisible = !IsVisible"
				class="absolute right-[10px] top-1/2 -translate-y-1/2 cursor-pointer"
				size="24px"
			/>
		</div>
		<p class="text-xs text-DangerColor" v-if="!!error">{{ error }}</p>
	</div>
</template>

<style scoped></style>

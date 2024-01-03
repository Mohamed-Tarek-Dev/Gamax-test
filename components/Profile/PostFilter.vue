<script setup>
	const Props = defineProps(['activefilter']);

	const emits = defineEmits(['SetFilter']);

	const Filters = ref([
		{
			name: 'all',
			icon: 'ci:check-all',
		},
		{
			name: 'video',
			icon: 'ph:video',
		},
		{
			name: 'photos',
			icon: 'material-symbols:imagesmode-rounded',
		},
		{
			name: 'posts',
			icon: 'file-icons:postscript',
		},
	]);

	const SetFilter = (filter) => {
		emits('SetFilter', filter);
	};
</script>

<template>
	<div
		class="text-DarkModeBackGround dark:bg-DarkModeFrameColor bg-LightModeFrameColor dark:text-LightModeFrameColor relative flex w-full items-center justify-between overflow-hidden rounded-b-[37px] px-6 font-montserrat lg:px-24"
	>
		<div
			class="flex cursor-pointer items-center gap-3 p-2 font-medium lg:gap-5 lg:p-4"
			v-for="Filter in Filters"
			:class="{
				'border-b-2 border-SecondaryColor text-SecondaryColor':
					activefilter == Filter.name,
			}"
			@click="SetFilter(Filter.name)"
		>
			<Icon :name="Filter.icon" size="30px" />
			<p class="hidden capitalize lg:block">
				{{
					$t(
						`filter_page.${Filter.name
							.charAt(0)
							.toUpperCase()}${Filter.name.slice(1)}Word`
					)
				}}
			</p>
		</div>
	</div>
</template>

<style scoped></style>

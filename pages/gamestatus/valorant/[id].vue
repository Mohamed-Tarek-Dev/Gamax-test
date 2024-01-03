<script setup>
	definePageMeta({
		middleware: 'require-auth',
		layout: 'main',
	});
	const Route = useRoute();
	const SearchBarValue = ref();
	SearchBarValue.value = Route.params.id || '';
	// Route.params.id
</script>

<template>
	<div
		class="thecontainer relative flex flex-col justify-between md:mt-7 lg:flex-row"
	>
		<div class="flex w-full flex-col gap-4 lg:w-[30%]">
			<SearchBar
				:modelValue="SearchBarValue"
				:bgcolor="`dark:bg-DarkModeFrameColor bg-LightModeFrameColor`"
				@update:model-value="SearchBarValue = $event"
				@SearchFunction="SearchForPlayer"
			/>
			<ValorantCurrentRanking />
			<ValorantAccuracy />
			<ValorantRoles />
			<ValorantTopWeapons />
			<ValorantTopMaps />
		</div>
		<div class="flex w-full flex-col gap-5 lg:w-[64%]">
			<ValorantMainSection />
			<ValorantSlidesSection />
			<ValorantTopAgents />
			<ValorantMatchHistory />
		</div>
	</div>
</template>

<style scoped></style>

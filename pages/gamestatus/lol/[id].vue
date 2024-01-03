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
	<div class="thecontainer relative flex flex-col gap-4 md:mt-7">
		<SearchBar
			:modelValue="SearchBarValue"
			:bgcolor="`dark:bg-DarkModeFrameColor bg-LightModeFrameColor`"
			@update:model-value="SearchBarValue = $event"
			@SearchFunction="SearchForPlayer"
			class="w-full sm:w-1/3"
		/>
		<LolHero />
		<div class="flex flex-col justify-between lg:flex-row">
			<div class="flex w-full flex-col gap-4 lg:w-[30%]">
				<LolCurrentRanking />
				<LolTopChampions />
				<LolRoles />
			</div>
			<div class="flex w-full flex-col gap-5 lg:w-[64%]">
				<LolMainSection />
				<LolSlidesSection />
				<LolMatchHistory />
			</div>
		</div>
	</div>
</template>

<style scoped></style>

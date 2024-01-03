<script setup>
	const { locale, setLocale } = useI18n();
</script>

<template>
	<div>
		<div class="flex min-h-screen items-center justify-center">
			<slot />
			<div
				class="bg-DarkBgColor hidden h-full w-[52%] items-center justify-center lg:flex"
			>
				<div class="flex flex-col items-center justify-center">
					<img
						src="@/assets/imgs/whitelogo.png"
						alt="Gamax Word Logo"
						class="max-h-[400px] max-w-[400px] object-contain"
						loading="lazy"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped></style>

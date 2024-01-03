<script setup>
	const Props = defineProps({
		width: {
			type: Number,
			required: false,
			default: 54,
		},
		height: {
			type: Number,
			required: false,
			default: 54,
		},

		FillColor: {
			type: String,
			required: false,
			default: '#FFF',
		},
	});

	console.log(Props.FillColor);
</script>

<template>
	<svg
		:width="width"
		:height="height"
		viewBox="0 0 54 54"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<g id="Group">
			<g id="Clip path group">
				<mask
					id="mask0_100_456"
					style="mask-type: luminance"
					maskUnits="userSpaceOnUse"
					x="9"
					y="8"
					:width="width"
					:height="height"
				>
					<g id="SVGID_2_">
						<path
							id="Vector"
							d="M44.1875 8H9V45.5333H44.1875V8Z"
							:fill="FillColor"
						/>
					</g>
				</mask>
				<g mask="url(#mask0_100_456)">
					<g id="Group_2">
						<path
							id="Vector_2"
							d="M11.119 19.4359C9.76843 21.8835 9 24.6864 9 27.667C9 30.6476 9.76843 33.4531 11.119 35.9007V19.4359Z"
							:fill="FillColor"
						/>
						<path
							id="Vector_3"
							d="M26.5936 10.3717C25.1662 10.3717 23.7812 10.5442 22.4521 10.8573V13.5791C23.7682 13.2083 25.1559 13.0047 26.5936 13.0047C34.8299 13.0047 41.5077 19.5489 41.5077 27.6231C41.5077 31.2591 40.1494 34.5847 37.9079 37.1427L37.4827 38.6347L36.5418 41.937C41.1593 38.8201 44.1899 33.5929 44.1899 27.6714C44.1873 18.1147 36.3107 10.3717 26.5936 10.3717Z"
							:fill="FillColor"
						/>
						<path
							id="Vector_4"
							d="M22.4521 36.6433H35.9467H36.2417C38.5254 34.2974 39.9321 31.1211 39.9321 27.623C39.9321 20.4027 33.9614 14.551 26.5944 14.551C25.1481 14.551 23.7579 14.7813 22.453 15.1961V36.6433H22.4521Z"
							:fill="FillColor"
						/>
						<path
							id="Vector_5"
							d="M20.8569 8H10.8181L12.7138 11.8689V41.667L10.8181 45.5333H33.8564L35.9461 38.2112H20.8569V8Z"
							:fill="FillColor"
						/>
					</g>
				</g>
			</g>
		</g>
	</svg>
</template>

<style scoped></style>

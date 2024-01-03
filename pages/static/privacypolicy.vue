<script setup>
	const GoBack = () => {
		const Router = useRouter();
		Router.back();
	};
	definePageMeta({
		layout: 'default',
	});
</script>

<template>
	<div
		class="flex h-[100dvh] flex-col justify-between gap-10 bg-LightModeBackGround p-4 font-montserrat text-LightModeTextColor dark:bg-DarkModeBackGround dark:text-WhiteColor md:p-10"
	>
		<div class="flex items-center gap-3">
			<img
				src="@/assets/imgs/whitelogo.png"
				class="h-[40px] w-[40px] object-contain"
				loading="lazy"
			/>
			<p class="pl-4 text-2xl font-semibold">
				GamersVerse terms of service
			</p>
		</div>
		<div
			class="text-container h-[90%] flex-grow overflow-y-auto pr-2 font-medium dark:text-Gray400"
		>
			<p>
				PLEASE READ THIS PRIVACY POLICY CAREFULLY BEFORE USING
				GAMERSVERSE. BY ACCESSING OR USING THE SERVICE, YOU ACKNOWLEDGE
				THAT YOU HAVE READ, UNDERSTAND, AND AGREE TO BE BOUND BY ALL THE
				TERMS OF THIS PRIVACY POLICY AND OUR TERMS OF SERVICE. IF YOU DO
				NOT AGREE TO SUCH TERMS, EXIT THIS PAGE AND DO NOT ACCESS OR USE
				THE SERVICE.
			</p>
			<p>
				This privacy policy applies to your use of GamersVerse Service,
				and it explains what information we collect from you and what we
				do with this information. <br />
				By using GamersVerse Service, your consent to the collection,
				transfer, processing, storage, disclosure and other uses of
				information about you in the manners described in this policy
				and elsewhere in our Terms. <br />
				We follow generally accepted standards to protect, and are
				committed to maintain, the confidentiality of any information
				about you. <br />
			</p>
			<div>
				<h3 class="my-4 text-lg font-bold dark:text-WhiteColor">
					How information is collected
				</h3>
				<div class="whitespace-pre-line font-montserrat">
					We generally collect information in two ways: <br />
					<div class="my-3 ml-3">
						1- That you voluntarily provide to us such as by
						registering, creating an account, or signing up for
						email alters; <br />
						2- That we automatically collect when you use
						GamersVerse Service such as thorough cookies or our
						software. <br />
					</div>
					The type of information that we collect is described in more
					detail below, and some of it may qualify as personal data on
					a case by case basis.
				</div>
			</div>
			<div>
				<h3 class="my-4 text-lg font-bold dark:text-WhiteColor">
					Information we may collect about you
				</h3>
				<div class="whitespace-pre-line font-montserrat">
					We collect and process the following information which may
					include your personal data. Personally identifiable
					information may include, but is not limited to:
					<br />
					<div class="my-3 ml-3">
						1- Registration and access information. In order to
						access restricted sections of GamersVerse Service, you
						are required to provide information including but not
						limited to username, email, password, country, date of
						birth, first name, last name, and mobile number. When
						you register or login to GamersVerse Service, we collect
						information including but not limited to type of device
						used, IP address, geolocation details including region,
						country, state, city, type of browser used, and
						identifiers associated with your devices. <br />
						2- Optional information. If you wish, following
						registration you may add the following information to
						your GamersVerse profile by using your GamersVerse
						account settings: full address, time zone, avatar
						picture, Twitch account, Facebook profile, Twitter
						profile, YouTube profile, Discord profile, Google
						profile, gaming preference, game platform, game genre,
						preferred content type, short personal biography,
						marital status, and parental status. <br />
						3- Third party platforms information. You are also able
						to connect your GamersVerse account to third party
						platforms Steam, XBOX, and PSN, in which case we may
						collect information in respect of each third-party
						platform including but not limited to username/nickname,
						user ID, an access token, to allow us to connect to your
						third-party account and to ensure we are connecting to
						the correct third-party account, and a refresh token,
						which allows us to request additional access tokens, and
						therefore re-connect to third party accounts, until the
						refresh token is withdrawn (if, for example, you decide
						to disconnect your account from the third-party
						platform). <br />
						4- Games information. If you choose to link a game to
						your GamersVerse account, we may collect the following
						information in respect of each game including but not
						limited to nickname, ID, rank/skill level/Elo, which is
						based on your previous performance in games, basic
						profile statistics, bans information, and list of
						friends. Likewise, when you play a game we may collect
						certain information including but not limited to match
						statistics, match results, match replays, and event
						logs, which relate to your in-game behavior. If you have
						installed anti-cheat software, we may also collect
						anti-cheat logs. This privacy policy should be read in
						conjunction with any other terms or notices applied to
						anti-cheat software.<br />
						5- Attribution and contact information. When you
						register, we may record the web page from which you have
						accessed GamersVerse Service. Likewise, when you contact
						us or use the support center, we may ask you for, or you
						may submit, certain contact information to us whenever
						you contact us through the support center. This may
						include but not limited to your email address, your
						phone number, and your name. <br />
						6- Analytics information and usage data. We may collect
						technical information about your use of GamersVerse
						Service through the use of tracking technologies and
						analytics. Information we may collect includes, but not
						limited to, how many times you visit GamersVerse
						Service, which pages you go to, traffic data, your IP
						and MAC address, your location, your internet service
						provider, your console ID, your device operating system
						and version, your device brand and model, information
						from your device’s phone book, pictures and other
						information from your devices camera and photo library,
						game play attempts, progression and results, session
						client time start, end and duration, the country of your
						device, and identification of crashes and defects.<br />
						7- Mailing list information. We may ask you for, or you
						may submit, certain contact information to us whenever
						you register to our mailing list. This may include, but
						not limited to your email address and your name.<br />
						8- Payment information. When you buy services through
						GamersVerse Service, you will be asked to submit
						information to our payment processors including but not
						limited name and surname, email address, date of birth
						(if required), billing information.<br />
					</div>
				</div>
			</div>
			<div>
				<h3 class="my-4 text-lg font-bold dark:text-WhiteColor">
					How we use and share information
				</h3>
				<div class="whitespace-pre-line font-montserrat">
					We use and share the information we collect about you
					(either individually or in combination with other
					information as described in this policy) to help us
					implement, provide, improve, customize, analyze, and market
					GamersVerse Service where we have a lawful basis to do so
					and, in certain cases, to provide assistance to law
					enforcement and governmental or regulatory authorities for
					compliance with the laws of the The Egyptian Arabic
					Republic, court orders, or any other applicable laws. <br />
					We (or third party data processor acting on our behalf) may
					use information about you for the following purposes:
					<br />

					<div class="my-3 ml-3">
						- To provide and maintain the GamersVerse Service,
						including <br />
						monitoring the usage of the GamersVerse Service; <br />
						providing, maintaining, developing and improving your
						experience of GamersVerse Service; <br />
						improving and developing the GamersVerse Service and the
						content offered on it;<br />
						personalizing GamersVerse Service based on your usage;
						<br />
						to manage your account; <br />
						providing relevant updates and upgrades; <br />
						identifying, monitoring and improving technical issues
						with GamersVerse Service; <br />
						identifying any attempted circumvention of device
						security and taking action to stop such circumvention;
						<br />
						protecting intellectual property rights; <br />
						providing technical support; <br />
						. <br />
						- Aggregated reporting and analysis; <br />
						- Providing device data to our affiliate internet
						service providers for inventory management, content
						optimisation, connection checking, remote customer
						support and account management purposes <br />
						- Providing third parties with aggregated information
						(which does not contain any personal data) for the
						development and/or promotion of their products or
						services; <br />
						- Responding to and managing your requests via our
						support centers. <br />
						- To contact you by email, telephone calls, SMS, or
						other equivalent forms of electronic communication, such
						as a mobile application's push notifications regarding
						updates or informative communications related to the
						functionalities, products or contracted services,
						including the security updates, when necessary or
						reasonable for their implementation. <br />
						- To provide you with special offers and information
						about other services, goods, or events similar to what
						you already purchased or have indicated interest in. -
						To attend to an manage your requests to us; <br />
						- We may use your information to evaluate or conduct a
						merger, divestiture, restructuring, reorganization,
						dissolution, or other sale or transfer of some or all of
						our assets, whether as a going concern or as part of
						bankruptcy, liquidation, or similar proceeding, in which
						personal data held by us about the GamersVerse Service
						users is among the assets transferred. <br />
						- We may use your information for other purposes, such
						as data analysis, identifying usage trends, determining
						the effectiveness of our promotional campaigns and to
						evaluate and improve the GamersVerse Service, products,
						services, marketing and your experience, and to comply
						with applicable laws and requests of governmental
						authorities. <br />
					</div>

					We will use and store information about you as set out in
					this policy for so long as you use GamersVerse Service and
					for as long as is necessary for the purposes set out here
					after you cease using GamersVerse Service. <br />
					We may share information about you with third parties in the
					following situations: <br />
					<div class="my-3 ml-3">
						1- Affiliates, group members, personnel, suppliers or
						subcontractors. We may disclose information about you to
						any member of our group (which means our affiliates,
						parent company, branches, subsidiaries, our ultimate
						holding company and its subsidiaries), our personnel,
						suppliers or subcontractors insofar as it is reasonably
						necessary for the purposes set out in this policy.
						However, this is on the basis that they have agreed to
						safeguard it. <br />
						2- Service providers. We may share information about you
						with service providers that we have engaged to help
						support GamersVerse Service by performing certain
						services on our behalf and under our instructions. We
						will only share your personal data to the extent this is
						necessary to enable those service providers to provide
						their services to us and under a strict duty of
						confidence. These third parties are not authorized by us
						to use or disclose personal information except as
						necessary to perform the services on our behalf or
						comply with legal requirements. <br />
						3- Business partners. We may information about you with
						our business partners to offer you certain products,
						services or promotions. <br />
						4- Other users. The personal information you share when
						using the GamersVerse Service or when you interact in
						the public areas with other users may be viewed by all
						users and may be publicly distributed outside. Others
						users will also be able to communicate with you, and
						view your profile and descriptions of your activity.
						<br />
						5- Merger or acquisition. If we are involved in a
						merger, acquisition, or sale of all or a portion of its
						assets, you will be notified via, account message and/or
						a prominent notice on our website of any change in
						ownership or uses of this information, as well as any
						choices you may have regarding this information. <br />
						6- With Your consent. We may disclose your personal
						information for any other purpose with your consent.
						<br />
						7- Required by law. In addition, we may disclose
						information about you to the extent that we are required
						to do so by law (which may include to government bodies
						and law enforcement agencies); in connection with any
						legal proceedings or prospective legal proceedings; and
						in order to establish, exercise or defend our legal
						rights (including providing information to others for
						the purposes of fraud prevention). <br />
						8- Enforcement. We may also disclose information about
						you to third parties in order to enforce or apply the
						terms of agreements, to investigate potential breaches,
						or to protect the rights, property or safety of us, our
						customers, or others. <br />
						9- Social features. We may share, or provide you with
						opportunities to share, information about you with other
						users of GamersVerse Service. We also provide services
						that allow our users to communicate with GamersVerse and
						each other, in which case personal information may be
						shared and account IDs may be displayed. For example, we
						may share information about you with your social
						contacts when you and they use the same social features
						of our games and applications.<br />
					</div>
				</div>
			</div>
			<div>
				<h3 class="my-4 text-lg font-bold dark:text-WhiteColor">
					Consumer control and opt-out options
				</h3>
				<p class="whitespace-pre-line font-montserrat">
					If you do not wish to receive promotional or other marketing
					material from us or third parties then you can opt-out by
					clicking unsubscribe in any of our communications, changing
					your account settings in GamersVerse Service at any time.
					Alternatively, you can contact us via
					unsubscribe@gamersverse.gg and let us know that you no
					longer wish to receive promotional or other marketing
					material from us or third parties.
				</p>
			</div>
			<div>
				<h3 class="my-4 text-lg font-bold dark:text-WhiteColor">
					User rights in relation to personal data which we process
					related to you
				</h3>
				<div class="whitespace-pre-line font-montserrat">
					You have the following rights over the way we process
					personal data relating to you. We aim to comply without
					undue delay, and within one month at the latest. To make a
					request, please let us know by sending an email to
					<a
						href="support@gamersverse.gg"
						class="text-underline font-semibold text-SecondaryColor"
						>support@gamersverse.gg</a
					>. <br />
					<div class="my-3 ml-3">
						1- Ask for a copy of the personal data we are processing
						about you and have inaccuracies corrected: we will use
						reasonable efforts to the extent required by law to
						supply, correct or delete personal information held
						about you on our files (and with any third parties to
						whom it has been disclosed to). <br />
						2-Object to our processing of personal data related to
						you: you can ask us to restrict, stop processing, or to
						delete your personal data if:
					</div>
					you consented to our processing the personal data, and have
					withdrawn that consent; we no longer need to process that
					personal data for the reason it was collected. <br />
					we are processing that personal data because it is in the
					public interest or it is in order to pursue a legitimate
					interest of ours or a third party, you don’t agree with that
					processing, and there is no overriding legitimate interest
					for us to continue processing it. <br />
					the personal data was unlawfully processed <br />
					you need the personal data to be deleted in order to comply
					with legal obligations or the personal data is processed in
					relation to offering a service to a child.
				</div>
			</div>
			<div>
				<h3 class="my-4 text-lg font-bold dark:text-WhiteColor">
					Cookies
				</h3>
				<div class="whitespace-pre-line font-montserrat">
					We use cookies and other online tracking devices such as web
					beacons, and flash object storage to deliver, improve and
					monitor GamersVerse Service, including in the following
					ways: <br />
					<div class="my-3 ml-3">
						1- Authentication: to log you into GamersVerse Service
						and keep you logged in. <br />
						2- Preferences: to remember information about you such
						as your preferred language and configuration. <br />
						3- Analytics: to help us understand how you use
						GamersVerse Service, and how often, so we can improve it
						to deliver a better experience for our users.<br />
					</div>
				</div>
			</div>
			<div>
				<h3 class="my-4 text-lg font-bold dark:text-WhiteColor">
					Data retention
				</h3>
				<p class="whitespace-pre-line font-montserrat">
					We will retain and hold information about you for as long as
					is necessary for the purposes set out in this Privacy Policy
					and to the extent necessary to comply with our legal
					obligations, enforce our legal agreements and policies, and
					resolve disputes.
				</p>
			</div>
			<div>
				<h3 class="my-4 text-lg font-bold dark:text-WhiteColor">
					Transfer of Your Personal Data
				</h3>
				<p class="whitespace-pre-line font-montserrat">
					Your information, including personal data, is processed at
					the Company's operating locations and the places where the
					parties involved in the processing are located, and thus
					this information may be transferred to — and maintained on —
					computers located outside of your state, province, country
					or other governmental jurisdiction where the data protection
					laws may differ from those in your jurisdiction. Your
					consent to this Privacy Policy and your submission of such
					information represents that you agree to such transfer.
				</p>
			</div>
			<div>
				<h3 class="my-4 text-lg font-bold dark:text-WhiteColor">
					Children
				</h3>
				<p class="whitespace-pre-line font-montserrat">
					We do not offer or provide GamersVerse Service to knowingly
					solicit information from or market to children under the age
					of 18. Our Terms prohibit users aged under 18 years from
					accessing GamersVerse Service unless they have obtained
					consent from their parents or legal guardians. In the event
					we learn that we have collected personal information from a
					child under 10 years of age or under 18 years of age without
					permission we will be entitled to remove that information.
					If you believe that we might have any information from or
					about a child in contradiction with this provision please
					contact us at
					<a
						href="support@gamersverse.gg"
						class="text-underline font-semibold text-SecondaryColor"
						>support@gamersverse.gg</a
					>.
				</p>
			</div>
			<div>
				<h3 class="my-4 text-lg font-bold dark:text-WhiteColor">
					Information protection and security
				</h3>
				<p class="whitespace-pre-line font-montserrat">
					In order to prevent data access by unauthorized parties,
					maintain data accuracy and ensure proper use of information,
					we are committed to safeguard the security by using
					physical, electronic and managerial procedures to protect
					the information we hold. We cannot guarantee absolute
					security, as no method of electronic transmission is 100%
					secure, but we endeavor to use commercially reasonable means
					to protect the your personal data.
					<br />
				</p>
			</div>
			<div>
				<h3 class="my-4 text-lg font-bold dark:text-WhiteColor">
					Compliance with legal processes
				</h3>
				<div class="whitespace-pre-line font-montserrat">
					We can disclose personal information about you if ordered by
					law or it is considered that such a step is necessary to:
					<br />
					<div class="my-3 ml-3">
						1-comply with the law or court process. <br />
						2- protect and defend our copyright and property rights.
						<br />
						3- protect against abuse or unauthorized use of
						GamersVerse Service. <br />
						4- protect personal or property security against our
						users or the public (among other things, this means that
						if you provide false information or pretend to be
						someone else, we can convey information about you as
						part of an investigation into your actions)
					</div>
					Other information: this policy can be changed or added any
					time. Any changes will be displayed on this page. Therefore,
					we encourage you to access this page periodically to find
					about the changes (if any). This policy is made in English,
					in the event of differences in interpretation and/or
					dispute, the English language will take precedence. If you
					have any questions or comments about this policy, please
					contact us at
					<a
						href="support@gamersverse.gg"
						class="text-underline font-semibold text-SecondaryColor"
						>support@gamersverse.gg</a
					>.
					<br />
				</div>
			</div>
			<div>
				<h3 class="my-4 text-lg font-bold dark:text-WhiteColor">
					Changes to this Privacy Policy
				</h3>
				<p class="whitespace-pre-line font-montserrat">
					We reserve the right, at our sole discretion, to modify or
					replace these Terms at any time. If a revision is material
					we will make reasonable efforts to provide you with notice
					via email and/or by prominent notice on the GamersVerse
					Service. What constitutes a material change will be
					determined at our sole discretion.
					<br />
					Changes to these Terms are effective when they are posted on
					this page. By continuing to access or use the GamersVerse
					Service after those revisions become effective, you agree to
					be bound by the revised terms. If you do not agree to the
					new terms, in whole or in part, please stop using the
					Website and the GamersVerse Service.
					<br />
				</p>
			</div>
			<div>
				<h3 class="my-4 text-lg font-bold dark:text-WhiteColor">
					Contact Us
				</h3>
				<p class="whitespace-pre-line font-montserrat">
					For information and/or questions about this Privacy Policy,
					you can contact us at
					<a
						href="support@gamersverse.gg"
						class="text-underline font-semibold text-SecondaryColor"
						>support@gamersverse.gg</a
					>.
				</p>
			</div>
			<p>Last Update 21 September 2023</p>
		</div>
		<div class="flex items-center justify-center">
			<NuxtLink
				to="/home"
				class="transition-base flex w-[280px] items-center justify-center rounded-lg bg-Gray500 p-4 text-center text-WhiteColor hover:bg-SecondaryColor"
			>
				Accept
			</NuxtLink>
		</div>
	</div>
</template>

<style scoped>
	/* width */
	.text-container::-webkit-scrollbar {
		width: 5px;
		background: #d1d1d1;
	}

	/* Handle */
	.text-container::-webkit-scrollbar-thumb {
		background: #3c99c0;
		border-radius: 10px;
	}

	/* Handle on hover */
	.text-container::-webkit-scrollbar-thumb:hover {
		background: #3586a8;
	}
</style>

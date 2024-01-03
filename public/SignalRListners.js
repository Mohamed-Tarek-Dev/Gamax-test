import { hubConnection } from './SignalR';
import { useNotifStore } from '@/stores/notifications';
import { useMainStore } from '@/stores/index';

import { useChatStore } from '@/stores/chatstore';

const NotificatinTypes = [
	'AddPost',
	'AddQuestion',
	'AddComment',
	'AddAnswer',
	'AddReactOnComment',
	'AddReactOnAnswer',
	'AddReactOnPost',
	'AddReactOnQuestion',
];

hubConnection.on('OnSendFriendRequest', (AccountData) => {
	const NotifStore = useNotifStore();
	NotifStore.AddFriendReqNotif(AccountData, false);
});

hubConnection.on('OnApproveFriendRequest', async (AccountData) => {
	const NotifStore = useNotifStore();
	const ChatStore = useChatStore();
	NotifStore.RemoveFriendReqNotif(AccountData);

	NotifStore.AddFriendReqNotif(AccountData, true);
	await ChatStore.GetUserChats();
	window.location.reload();
});

hubConnection.on('OnAddingPostOrQuestion', (NotifDto) => {
	const MainStore = useMainStore();
	if (MainStore.PersonalData?.id == NotifDto.actionedUserId) return;
	const NotifStore = useNotifStore();
	const correctedObject = {
		...NotifDto,
		TextType: NotificatinTypes[NotifDto?.notificatinType],
		PostId: NotifDto?.itemId,
		seen: false,
	};
	NotifStore.AddGeneralNotif(correctedObject);
});

hubConnection.on('OnAddingComment', (CommentNotifObj) => {
	const MainStore = useMainStore();
	if (MainStore.PersonalData?.id == CommentNotifObj.actionedUserId) return;
	const NotifStore = useNotifStore();
	const correctedObject = {
		...CommentNotifObj,
		TextType: NotificatinTypes[CommentNotifObj?.notificatinType],
		seen: false,
	};

	NotifStore.AddGeneralNotif(correctedObject);
});

hubConnection.on('OnAddingReactOnPost', (ReactNotifObj) => {
	const MainStore = useMainStore();
	if (MainStore.PersonalData?.id == ReactNotifObj.actionedUserId) return;
	const NotifStore = useNotifStore();
	const correctedObject = {
		...ReactNotifObj,
		TextType: NotificatinTypes[ReactNotifObj?.notificatinType],
		seen: false,
	};

	NotifStore.AddGeneralNotif(correctedObject);
});

hubConnection.on('OnAddingReactOnComment', (ReactNotifObj) => {
	const MainStore = useMainStore();
	if (MainStore.PersonalData?.id == ReactNotifObj.actionedUserId) return;
	const NotifStore = useNotifStore();
	const correctedObject = {
		...ReactNotifObj,
		TextType: NotificatinTypes[ReactNotifObj?.notificatinType],
		seen: false,
	};

	NotifStore.AddGeneralNotif(correctedObject);
});

hubConnection.on('ReceiveMessage', (MessageObj) => {
	const ChatStore = useChatStore();
	const NotifStore = useNotifStore();
	NotifStore.AddActiveNotif({ ...MessageObj, isMessage: true });
	ChatStore.AddNewMessage(MessageObj);
});

hubConnection.on('UpdateMessage', (MessageObj) => {
	const ChatStore = useChatStore();
	ChatStore.EditMessage(MessageObj);
});

hubConnection.on('DeleteMessage', (MessageObj) => {
	const ChatStore = useChatStore();
	ChatStore.RemoveMessage(MessageObj.id);
});

import { HubConnectionBuilder } from '@microsoft/signalr';

// Your code here
export const hubConnection = new HubConnectionBuilder()
	.withUrl('https://api.gamersverse.gg/SingalRHub') // Replace with your actual hub URL
	// .withUrl('http://localhost:5285/SingalRHub') // Replace with your actual hub URL
	.withAutomaticReconnect()
	.build();

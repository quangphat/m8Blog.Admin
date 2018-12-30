import { HubConnectionBuilder } from '@aspnet/signalr';
import * as Utils from './Utils'
export const hubConnection = new HubConnectionBuilder()
    .withUrl(`/notification?personId=${Utils.GetAccount().personId}`)
    .build();
export const createHubConnection = () => {
    hubConnection.start();
}

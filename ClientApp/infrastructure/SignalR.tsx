import { HubConnectionBuilder } from '@aspnet/signalr';
import * as Utils from './Utils'
export const hubConnection = new HubConnectionBuilder()
    .withUrl(`/notification?personId=${Utils.GetAccount().PersonId}`)
    .build();
export const createHubConnection = () => {
    hubConnection.start();
}

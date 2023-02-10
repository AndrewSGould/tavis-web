import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr"
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  constructor() {
    this.syncSignal = new BehaviorSubject(this.syncSignals);
  }
  
  private syncSignals = '';
  syncSignal: BehaviorSubject<string>;

  private hubConnection!: signalR.HubConnection;

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
                          .withUrl(environment.api.base + 'datasync')
                          .build();
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }
    
  public addSyncDataListener = () => {
    this.hubConnection!.on('SyncSignal', (data) => {
      this.syncSignal.next(data);
    });
  }
}

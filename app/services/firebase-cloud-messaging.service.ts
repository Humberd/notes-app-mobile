import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/internal/operators';

const firebase = require('nativescript-plugin-firebase');

@Injectable({
  providedIn: 'root',
})
export class FirebaseCloudMessagingService {
  private readonly _token$ = new BehaviorSubject('')

  token$ = this._token$
      .pipe(filter(token => Boolean(token)))

  constructor(private ngZone: NgZone) {
    firebase.addOnPushTokenReceivedCallback((token: string) => {
      this.ngZone.run(() => {
        this._token$.next(token)
      })
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { FirebaseCloudMessagingService } from './services/firebase-cloud-messaging.service';

const firebase = require('nativescript-plugin-firebase');

@Component({
  selector: 'app-root',
  template: `
    <page-router-outlet></page-router-outlet>`,
})
export class AppComponent implements OnInit {

  constructor(private firebaseCloudMessagingService: FirebaseCloudMessagingService) {
  }

  ngOnInit() {
    firebase.init({
      showNotifications: true,
      showNotificationsWhenInForeground: true
    }).then(
        () => {
          console.log('firebase.init done');
        },
        error => {
          console.log(`firebase.init error: ${error}`);
        },
    );

    console.log('test2');
  }
}

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'my-car-wiki',
    appId: '1:680251454150:web:aefa3f1f9fed7da59d9dc7',
    storageBucket: 'my-car-wiki.appspot.com',
    apiKey: 'AIzaSyCTZlShVTtv8S4NSImdCxbBT3-tkDZGGEE',
    authDomain: 'my-car-wiki.firebaseapp.com',
    messagingSenderId: '680251454150',
  },
  production: false,
  api: "http://localhost:5001/my-car-wiki/us-central1/api",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

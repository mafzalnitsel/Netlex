// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: "",
  // serviceURL: 'http://ec2-54-93-32-54.eu-central-1.compute.amazonaws.com/userPortal/userApi/',

  //================= Live ===================
  // serviceURL: 'https://server.netlex.se:3000/',
  // adminserviceURL:'https://server.netlex.se:30000/',
  // contactToBookLawyerUrl: 'https://netlex.se/scheduler',
  // accountSettingUrl: 'https://server.netlex.se:3000/accountSettings',

  serviceURL: "https://api.netlex.se/",
  adminserviceURL: "https://admin-api.netlex.se/",
  contactToBookLawyerUrl: "https://netlex.se/scheduler",
  accountSettingUrl: "https://api.netlex.se/accountSettings",

  //================= Local ===================y
  // adminserviceURL: "http://localhost:30000/",
  // serviceURL: "http://localhost:3000/",
  // contactToBookLawyerUrl: "http://localhost:4200/scheduler",
  // accountSettingUrl: "http://localhost:3000/accountSettings",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

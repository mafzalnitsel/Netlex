// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
// git test...
export const environment = {
  // 'https://server.netlex.se:30000/',//'http://server.netlex.se:30000/', Old

  production: false,
  ckEditorLicense:
    "DB6fb10J0GBFI2tDi99AAvEXXU0Yqqw7zg76nfUs+7zO6OH8a6/ftQy2RA==",

  //============= Localhost =============
  // mailserviceURL: "http://localhost:3000/",
  // serviceURL: "http://localhost:30000/",
  // webURL: "http://localhost:4200/",

  //=============== Live ===============
  mailserviceURL: 'https://api.netlex.se/',
  serviceURL: 'https://admin-api.netlex.se/',
  webURL:'https://netlex.se/',
  // mailserviceURL: 'https://server.netlex.se:3000/',
  // serviceURL: 'https://server.netlex.se:30000/',
  // webURL:'https://netlex.se/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

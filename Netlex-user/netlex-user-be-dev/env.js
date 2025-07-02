module.exports = {
  // Test
  // SERVER_URL:'http://localhost:30000/',
  // Live
  // SERVER_URL:'https://server.netlex.se:30000/',
  SERVER_URL: "https://admin-api.netlex.se/",

  // KLARNA_PAYMENT_URL: process.env.KLARNA_PAYMENT_URL || 'https://api.playground.klarna.com',
  KLARNA_PAYMENT_URL:
    process.env.KLARNA_PAYMENT_URL || "https://api.klarna.com",
  // KLARNA_USERNAME: process.env.KLARNA_USERNAME || 'PK42314_b3b2a2416c29',
  // KLARNA_PASSWORD: process.env.KLARNA_PASSWORD || '3z6crshjBxHNTfNS',
  // KLARNA_PASSWORD: process.env.KLARNA_PASSWORD || 'x7LbUXG3jPPRAdr9',

  // KLARNA_CONFIRM_URL: process.env.KLARNA_CONFIRM_URL ||  'https://webhook.site/f1a9bf70-ace8-4935-ba9b-f3578e5d4402',
  // KLARNA_USERNAME: process.env.KLARNA_USERNAME || 'PK42314_b3b2a2416c29',
  // KLARNA_PASSWORD: process.env.KLARNA_PASSWORD || '3z6crshjBxHNTfNS',

  KLARNA_CONFIRM_URL: process.env.KLARNA_CONFIRM_URL || "https://webhook.site/",

  // KLARNA_USERNAME: process.env.KLARNA_USERNAME || '52410_82d78c5eca89',
  // REDIRECT_HOST_URL: process.env.REDIRECT_HOST_URL || 'http://localhost:4200', /*11-02-2023Nadeem*/
  REDIRECT_HOST_URL: process.env.REDIRECT_HOST_URL || "https://netlex.se/",
  // CONTACT_TO_BOOK_LAWYER_URL: 'http://localhost:3000/scheduler',
  // ACCOUNT_SETTING_URL: 'http://localhost:3000/accountSettings',
  CONTACT_TO_BOOK_LAWYER_URL: "https://netlex.se/scheduler",
  ACCOUNT_SETTING_URL: "https://netlex.se/accountSettings",

  // Live
  // REDIRECT_HOST_URL: process.env.REDIRECT_HOST_URL || 'https://netlex.se/',
  // CONTACT_TO_BOOK_LAWYER_URL: 'http://localhost:3000/scheduler',
  // ACCOUNT_SETTING_URL: 'http://localhost:3000/accountSettings',

  BANK_ID_AUTH:
    process.env.BANK_ID_AUTH || "https://appapi2.test.bankid.com/rp/v5.1/auth",
  BANK_ID_COLLECT:
    process.env.BANK_ID_COLLECT ||
    "https://appapi2.test.bankid.com/rp/v5.1/collect",
  // BANK_ID_AUTH: process.env.BANK_ID_AUTH || 'https://appapi2.bankid.com/rp/v5.1/auth',
  // BANK_ID_COLLECT: process.env.BANK_ID_COLLECT || 'https://appapi2.bankid.com/rp/v5.1/collect',

  //========================== For TEST =========================
  BANK_ID_AUTH_BY_IDKOLLEN:
    process.env.BANK_ID_AUTH_BY_IDKOLLEN ||
    "https://stgapi.idkollen.se/v2/069c8741-bfe1-11ec-af31-067d45a106d8/auth",
  BANK_ID_COLLECT_BY_IDKOLLEN:
    process.env.BANK_ID_COLLECT_BY_IDKOLLEN ||
    "https://stgapi.idkollen.se/v2/069c8741-bfe1-11ec-af31-067d45a106d8/collect/",
  // BANK_ID_AUTH_BY_IDKOLLEN: process.env.BANK_ID_AUTH_BY_IDKOLLEN || 'https://stgapi.idkollen.se/v2/',
  // BANK_ID_COLLECT_BY_IDKOLLEN: process.env.BANK_ID_COLLECT_BY_IDKOLLEN || 'https://stgapi.idkollen.se/v2/',
  // IDKOLLEN_IP: process.env.IDKOLLEN_IP || '13.53.56.116',
  // API_KEY: process.env.API_KEY || '069c8741-bfe1-11ec-af31-067d45a106d8',
  // SECRET_KEY: process.env.SECRET_KEY || '123456',
  //========================== For Production ===================
  // BANK_ID_AUTH_BY_IDKOLLEN: process.env.BANK_ID_AUTH_BY_IDKOLLEN || 'https://api.idkollen.se/v2/b9e0d775-d5da-11ec-8f01-0abc84d866f6/auth',
  // BANK_ID_COLLECT_BY_IDKOLLEN: process.env.BANK_ID_COLLECT_BY_IDKOLLEN || 'https://api.idkollen.se/v2/b9e0d775-d5da-11ec-8f01-0abc84d866f6/collect/',
  // BANK_ID_AUTH_BY_IDKOLLEN: process.env.BANK_ID_AUTH_BY_IDKOLLEN || 'https://api.idkollen.se/v2/b9e0d775-d5da-11ec-8f01-0abc84d866f6/auth',
  // BANK_ID_COLLECT_BY_IDKOLLEN: process.env.BANK_ID_COLLECT_BY_IDKOLLEN || 'https://api.idkollen.se/v2/b9e0d775-d5da-11ec-8f01-0abc84d866f6/collect/',
  // IDKOLLEN_IP: process.env.IDKOLLEN_IP || '13.53.114.219',
  // API_KEY: process.env.API_KEY || 'b9e0d775-d5da-11ec-8f01-0abc84d866f6',
  // SECRET_KEY: process.env.SECRET_KEY || '9zp3!4KuAhGr',

  // BANK_ID_FPT_CERTIFICATE: process.env.BANK_ID_FPT_CERTIFICATE || './certificate/FPTestcert3_20200618.p12',
  BANK_ID_FPT_CERTIFICATE:
    process.env.BANK_ID_FPT_CERTIFICATE ||
    "./certificate/FPTestcert4_20220818.p12",
  BANK_ID_CERTIFICATE:
    process.env.BANK_ID_CERTIFICATE || "./certificate/BankID.cer",
  // BANK_ID_CERTIFICATE: process.env.BANK_ID_CERTIFICATE || './certificate/BankIdd.cer',
  LISTEN_PORT: 3000,

  // SWISH_PEM_CERT: process.env.SWISH_PEM_CERT || `./certificate/Swish_Merchant_TestCertificate_1234679304.pem`,
  // SWISH_KEY_CERT: process.env.SWISH_KEY_CERT || `./certificate/Swish_Merchant_TestCertificate_1234679304.key`,
  // SWISH_PEM_ROOT: process.env.SWISH_PEM_ROOT || `./certificate/Swish_TLS_RootCA.pem`,

  SWISH_QR_HOST:
    process.env.SWISH_QR_HOST || "https://mpc.getswish.net/qrg-swish",
  SWISH_HOST:
    process.env.SWISH_HOST || "https://mss.cpc.getswish.net/swish-cpcapi",
  // SWISH_PASSPHRASE: process.env.SWISH_PASSPHRASE || 'swish',

  //Test Redirect /*11-02-2023Nadeem*/
  // SWISH_SALE_CALLBACK_URL: process.env.SWISH_SALE_CALLBACK_URL || 'https://localhost:4200/swishsale/success',
  // SWISH_CALLBACK_URL: process.env.SWISH_CALLBACK_URL || 'https://localhost:4200/swish/success',

  //Live Redirect /*11-02-2023Nadeem*/
  SWISH_SALE_CALLBACK_URL:
    process.env.SWISH_SALE_CALLBACK_URL ||
    "https://netlex.se/swishsale/success",
  SWISH_CALLBACK_URL:
    process.env.SWISH_CALLBACK_URL || "https://netlex.se/swish/success",

  STRIPE_SECRET_KEY:
    process.env.STRIPE_SECRET_KEY ||
    "sk_test_51JHrXZHywbedMZZKzcGEUPz0SKH14eEK5GM4ecIa5PGhtVgg3VCkCfr8bxxHVHBT59VjN2cv1UoNfQDoIzsvMxmv007Cmdt5oR",

  //Test Redirect /*11-02-2023Nadeem*/
  // STRIPE_SUCCESS_URL: process.env.STRIPE_SUCCESS_URL || 'http://localhost:4200/stripe/success',
  // STRIPE_SALE_SUCCESS_URL: process.env.STRIPE_SALE_SUCCESS_URL || 'http://localhost:4200/stripesale/success',
  // STRIPE_CANCEL_URL: process.env.STRIPE_CANCEL_URL || 'http://localhost:4200/stripe/cancel',

  //Live Redirect /*11-02-2023Nadeem*/
  STRIPE_SUCCESS_URL:
    process.env.STRIPE_SUCCESS_URL || "https://netlex.se/stripe/success",
  STRIPE_SALE_SUCCESS_URL:
    process.env.STRIPE_SALE_SUCCESS_URL ||
    "https://netlex.se/stripesale/success",
  STRIPE_CANCEL_URL:
    process.env.STRIPE_CANCEL_URL || "https://netlex.se/stripe/cancel",

  // Outlook Calendar params
  OAUTH_CLIENT_ID:
    process.env.OAUTH_CLEINT_ID || "c2e3a18a-9ddb-4f42-abb5-618d7169c9ca",
  OAUTH_CLIENT_SECRET:
    process.env.OAUTH_CLIENT_SECRET ||
    "Cx28Q~Edr6WbzNZpYdmeO_trcY2yDzOVZ1emEbcp",
  // OAUTH_REDIRECT_URI: process.env.OAUTH_REDIRECT_URI || 'http://localhost:3000/auth/callback',
  OAUTH_REDIRECT_URI:
    process.env.OAUTH_REDIRECT_URI || "https://api.netlex.se/auth/callback",
  OAUTH_SCOPES:
    process.env.OAUTH_SCOPES ||
    "user.read,calendars.readwrite,mailboxsettings.read",
  OAUTH_AUTHORITY:
    process.env.OAUTH_AUTHORITY || "https://login.microsoftonline.com/",
  OAUTH_GRAPH_ENDPOINT:
    process.env.OAUTH_GRAPH_ENDPOINT || "https://graph.microsoft.com/",
  GRAPH_SCHEDULE_URI: process.env.GRAPH_SCHEDULE_URI || "v1.0/users/",
  GRAPH_TEAMS_MEET_URI: process.env.GRAPH_TEAMS_MEET_URI || "v1.0/users/",
  GRAPH_EVENT_URI: process.env.GRAPH_EVENT_URI || "v1.0/users/",
  GRAPH_SEND_EMAIL_URI: process.env.GRAPH_SEND_EMAIL_URI || "v1.0/users/",
  //  GRAPH_TIME_ZONE: process.env.GRAPH_TIME_ZONE || 'UTC'
  GRAPH_TIME_ZONE: process.env.GRAPH_TIME_ZONE || "Europe/Berlin",
};

//Application (client) ID:95cf061a-edbf-4d21-b07e-b87350e0dc3a
//Object ID:62de527d-57c3-4417-ae1b-f163ec8d3c7b
//Directory (tenant) ID:2edec554-2c0c-4e29-8812-b8756ee5c66d
//5c2a83d8-67e0-42fb-9209-9f8a7434f00a
//YXo7Q~NEW~hJhemNNlB8Om9amckhMw1CwsbOZ

//Swish Test
// module.exports = {
//     SWISH_PEM_CERT: process.env.SWISH_PEM_CERT || `./certificate/Swish_Merchant_Certificate.pem`,
//     SWISH_KEY_CERT: process.env.SWISH_KEY_CERT || `./certificate/Swish_Merchant_Certificate.key`,
//     SWISH_PEM_ROOT: process.env.SWISH_PEM_ROOT || `./certificate/Swish_TLS_RootCA.pem`,
//     SWISH_QR_HOST: process.env.SWISH_QR_HOST || 'https://mpc.getswish.net/qrg-swish',
//     SWISH_HOST: process.env.SWISH_HOST || 'https://mss.cpc.getswish.net/swish-cpcapi',
//     SWISH_PASSPHRASE: process.env.SWISH_PASSPHRASE || 'swish',
//     SWISH_CALLBACK_URL: process.env.SWISH_CALLBACK_URL || 'https://localhost:4200/swish/success'
// }

//Swish Production
// module.exports = {
//     SWISH_PEM_CERT: process.env.SWISH_PEM_CERT || `./certificate/Swish_Merchant_Certificate.pem`,
//     SWISH_KEY_CERT: process.env.SWISH_KEY_CERT || `./certificate/Swish_Merchant_Certificate.key`,
//     SWISH_PEM_ROOT: process.env.SWISH_PEM_ROOT || `./certificate/Swish_TLS_RootCA.pem`,
//     SWISH_QR_HOST: process.env.SWISH_QR_HOST || 'https://cpc.getswish.net/qrg-swish',
//     SWISH_HOST: process.env.SWISH_HOST || 'https://cpc.getswish.net/swish-cpcapi',
//     SWISH_PASSPHRASE: process.env.SWISH_PASSPHRASE || 'swish',
//     SWISH_CALLBACK_URL: process.env.SWISH_CALLBACK_URL || 'https://localhost:4200/swish/success'
// }

//Stripe Test
// module.exports = {
//     STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || 'sk_test_51J81KgSCWbJXBcu6iGILGSw8lIYDc2d1SjzIyi2OqERqNpxRHfWa3QDRhkM6BsTX0AJJGL5T90HI9Sc2hdvssoBZ00GRhe9KrA',
//     STRIPE_SUCCESS_URL: process.env.STRIPE_SUCCESS_URL || 'http://localhost:4200/stripe/success',
//     STRIPE_CANCEL_URL: process.env.STRIPE_CANCEL_URL || 'http://localhost:4200/stripe/cancel',
// }

//Stripe Production

// module.exports = {
//     KLARNA_PAYMENT_URL: process.env.KLARNA_PAYMENT_URL || 'https://api.playground.klarna.com',
//     KLARNA_USERNAME: process.env.KLARNA_USERNAME || 'PK42314_b3b2a2416c29',
//     KLARNA_PASSWORD: process.env.KLARNA_PASSWORD || '3z6crshjBxHNTfNS',
//     KLARNA_CONFIRM_URL: process.env.KLARNA_CONFIRM_URL ||  'https://webhook.site/f1a9bf70-ace8-4935-ba9b-f3578e5d4402',
//     REDIRECT_HOST_URL: process.env.REDIRECT_HOST_URL || 'http://localhost:4200',
//     CONTACT_TO_BOOK_LAWYER_URL: 'http://localhost:3000/scheduler',
//     ACCOUNT_SETTING_URL: 'http://localhost:3000/accountSettings',

//     BANK_ID_AUTH: process.env.BANK_ID_AUTH || 'https://appapi2.test.bankid.com/rp/v5.1/auth',
//     BANK_ID_COLLECT: process.env.BANK_ID_COLLECT || 'https://appapi2.test.bankid.com/rp/v5.1/collect',
//     BANK_ID_FPT_CERTIFICATE: process.env.BANK_ID_FPT_CERTIFICATE || './certificate/FPTestcert3_20200618.p12',
//     BANK_ID_CERTIFICATE: process.env.BANK_ID_CERTIFICATE || './certificate/BankID.cer',
//     LISTEN_PORT: 3000,

//     SWISH_PEM_CERT: process.env.SWISH_PEM_CERT || `./certificate/Swish_Merchant_TestCertificate_1234679304.pem`,
//     SWISH_KEY_CERT: process.env.SWISH_KEY_CERT || `./certificate/Swish_Merchant_TestCertificate_1234679304.key`,
//     SWISH_PEM_ROOT: process.env.SWISH_PEM_ROOT || `./certificate/Swish_TLS_RootCA.pem`,
//     SWISH_QR_HOST: process.env.SWISH_QR_HOST || 'https://mpc.getswish.net/qrg-swish',
//     SWISH_HOST: process.env.SWISH_HOST || 'https://mss.cpc.getswish.net/swish-cpcapi',
//     SWISH_PASSPHRASE: process.env.SWISH_PASSPHRASE || 'swish',
//     SWISH_CALLBACK_URL: process.env.SWISH_CALLBACK_URL || 'https://localhost:4200/swish/success',

//     STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || 'sk_test_51JHrXZHywbedMZZKzcGEUPz0SKH14eEK5GM4ecIa5PGhtVgg3VCkCfr8bxxHVHBT59VjN2cv1UoNfQDoIzsvMxmv007Cmdt5oR',
//     STRIPE_SUCCESS_URL: process.env.STRIPE_SUCCESS_URL || 'http://localhost:4200/stripe/success',
//     STRIPE_CANCEL_URL: process.env.STRIPE_CANCEL_URL || 'http://localhost:4200/stripe/cancel',

//     // Outlook Calendar params
//     OAUTH_CLIENT_ID: process.env.OAUTH_CLEINT_ID || '07bfc6fb-75cb-46e7-ac82-12f80f6a884f',
//     OAUTH_CLIENT_SECRET: process.env.OAUTH_CLIENT_SECRET || '2_DX3k-0WEBXPBKDQ5-ziTOSKX-5pnJxlg',
//     OAUTH_REDIRECT_URI: process.env.OAUTH_REDIRECT_URI || 'http://localhost:3000/auth/callback',
//     OAUTH_SCOPES: process.env.OAUTH_SCOPES || 'user.read,calendars.readwrite,mailboxsettings.read',
//     OAUTH_AUTHORITY: process.env.OAUTH_AUTHORITY || 'https://login.microsoftonline.com/9c1141f2-7d64-4c6f-acfd-30fb7a94374c',
//     OAUTH_GRAPH_ENDPOINT: process.env.OAUTH_GRAPH_ENDPOINT || 'https://graph.microsoft.com/',

//     GRAPH_SCHEDULE_URI: process.env.GRAPH_SCHEDULE_URI || 'v1.0/users/e8c4abe9-3463-4798-ab4c-b477d9e782c7/calendar/getSchedule',
//     GRAPH_TEAMS_MEET_URI: process.env.GRAPH_TEAMS_MEET_URI || 'v1.0/users/e8c4abe9-3463-4798-ab4c-b477d9e782c7/onlineMeetings',
//     GRAPH_EVENT_URI: process.env.GRAPH_EVENT_URI || 'v1.0/users/e8c4abe9-3463-4798-ab4c-b477d9e782c7/calendar/events',
//     GRAPH_SEND_EMAIL_URI: process.env.GRAPH_SEND_EMAIL_URI || 'v1.0/users/e8c4abe9-3463-4798-ab4c-b477d9e782c7/sendMail',

//     GRAPH_TIME_ZONE: process.env.GRAPH_TIME_ZONE || 'Europe/Berlin'
// }

module.exports = {
  KLARNA_PAYMENT_URL:
    process.env.KLARNA_PAYMENT_URL || "https://api.playground.klarna.com",
  KLARNA_USERNAME: process.env.KLARNA_USERNAME || "PK42314_b3b2a2416c29",
  KLARNA_PASSWORD: process.env.KLARNA_PASSWORD || "3z6crshjBxHNTfNS",
  KLARNA_CONFIRM_URL:
    process.env.KLARNA_CONFIRM_URL ||
    "https://webhook.site/f1a9bf70-ace8-4935-ba9b-f3578e5d4402",
  REDIRECT_HOST_URL: process.env.REDIRECT_HOST_URL || "http://localhost:4200",
  CONTACT_TO_BOOK_LAWYER_URL: "http://localhost:3000/scheduler",
  ACCOUNT_SETTING_URL: "http://localhost:3000/accountSettings",

  BANK_ID_AUTH:
    process.env.BANK_ID_AUTH || "https://appapi2.test.bankid.com/rp/v5.1/auth",
  BANK_ID_COLLECT:
    process.env.BANK_ID_COLLECT ||
    "https://appapi2.test.bankid.com/rp/v5.1/collect",
  BANK_ID_FPT_CERTIFICATE:
    process.env.BANK_ID_FPT_CERTIFICATE ||
    "./certificate/FPTestcert3_20200618.p12",
  BANK_ID_CERTIFICATE:
    process.env.BANK_ID_CERTIFICATE || "./certificate/BankID.cer",
  LISTEN_PORT: 3000,

  SWISH_PEM_CERT:
    process.env.SWISH_PEM_CERT ||
    `./certificate/Swish_Merchant_TestCertificate_1234679304.pem`,
  SWISH_KEY_CERT:
    process.env.SWISH_KEY_CERT ||
    `./certificate/Swish_Merchant_TestCertificate_1234679304.key`,
  SWISH_PEM_ROOT:
    process.env.SWISH_PEM_ROOT || `./certificate/Swish_TLS_RootCA.pem`,
  SWISH_QR_HOST:
    process.env.SWISH_QR_HOST || "https://mpc.getswish.net/qrg-swish",
  SWISH_HOST:
    process.env.SWISH_HOST || "https://mss.cpc.getswish.net/swish-cpcapi",
  SWISH_PASSPHRASE: process.env.SWISH_PASSPHRASE || "swish",
  SWISH_CALLBACK_URL:
    process.env.SWISH_CALLBACK_URL || "https://localhost:4200/swish/success",

  STRIPE_SECRET_KEY:
    process.env.STRIPE_SECRET_KEY ||
    "sk_test_51JHrXZHywbedMZZKzcGEUPz0SKH14eEK5GM4ecIa5PGhtVgg3VCkCfr8bxxHVHBT59VjN2cv1UoNfQDoIzsvMxmv007Cmdt5oR",
  STRIPE_SUCCESS_URL:
    process.env.STRIPE_SUCCESS_URL || "http://localhost:4200/stripe/success",
  STRIPE_SALE_SUCCESS_URL:
    process.env.STRIPE_SALE_SUCCESS_URL ||
    "http://localhost:4200/stripesale/success",
  STRIPE_CANCEL_URL:
    process.env.STRIPE_CANCEL_URL || "http://localhost:4200/stripe/cancel",

  // Outlook Calendar params
  OAUTH_CLIENT_ID:
    process.env.OAUTH_CLEINT_ID || "de82fc64-28c6-45ba-a1e2-3c5b13c3d686",
  OAUTH_CLIENT_SECRET:
    process.env.OAUTH_CLIENT_SECRET || "VVS7Q~v8Pqa1IPXtt__Lq36GrseCRP9nsyYX_",
  // OAUTH_REDIRECT_URI: process.env.OAUTH_REDIRECT_URI || 'http://localhost:3000/auth/callback',
  OAUTH_REDIRECT_URI:
    process.env.OAUTH_REDIRECT_URI || "https://api.netlex.se/auth/callback",
  OAUTH_SCOPES:
    process.env.OAUTH_SCOPES ||
    "user.read,calendars.readwrite,mailboxsettings.read",
  OAUTH_AUTHORITY:
    process.env.OAUTH_AUTHORITY ||
    "https://login.microsoftonline.com/2edec554-2c0c-4e29-8812-b8756ee5c66d",
  OAUTH_GRAPH_ENDPOINT:
    process.env.OAUTH_GRAPH_ENDPOINT || "https://graph.microsoft.com/",

  GRAPH_SCHEDULE_URI:
    process.env.GRAPH_SCHEDULE_URI ||
    "v1.0/users/e8c4abe9-3463-4798-ab4c-b477d9e782c7/calendar/getSchedule",
  GRAPH_TEAMS_MEET_URI:
    process.env.GRAPH_TEAMS_MEET_URI ||
    "v1.0/users/e8c4abe9-3463-4798-ab4c-b477d9e782c7/onlineMeetings",
  GRAPH_EVENT_URI:
    process.env.GRAPH_EVENT_URI ||
    "v1.0/users/e8c4abe9-3463-4798-ab4c-b477d9e782c7/calendar/events",
  GRAPH_SEND_EMAIL_URI:
    process.env.GRAPH_SEND_EMAIL_URI ||
    "v1.0/users/e8c4abe9-3463-4798-ab4c-b477d9e782c7/sendMail",

  GRAPH_TIME_ZONE: process.env.GRAPH_TIME_ZONE || "Europe/Berlin",
};

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

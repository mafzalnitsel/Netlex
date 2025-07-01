// module.exports = {
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
     // Outlook Calendar params
     OAUTH_CLIENT_ID: process.env.OAUTH_CLEINT_ID || 'c2e3a18a-9ddb-4f42-abb5-618d7169c9ca',
     OAUTH_CLIENT_SECRET: process.env.OAUTH_CLIENT_SECRET || 'Cx28Q~Edr6WbzNZpYdmeO_trcY2yDzOVZ1emEbcp',
      // OAUTH_REDIRECT_URI: process.env.OAUTH_REDIRECT_URI || 'http://localhost:30000/auth/callback',
      OAUTH_REDIRECT_URI: process.env.OAUTH_REDIRECT_URI || 'https://admin-api.netlex.se/auth/callback',
     OAUTH_SCOPES: process.env.OAUTH_SCOPES || 'user.read,calendars.readwrite,mailboxsettings.read',
    OAUTH_AUTHORITY: process.env.OAUTH_AUTHORITY || 'https://login.microsoftonline.com/',
    OAUTH_GRAPH_ENDPOINT: process.env.OAUTH_GRAPH_ENDPOINT || 'https://graph.microsoft.com/',
    GRAPH_SCHEDULE_URI: process.env.GRAPH_SCHEDULE_URI || 'v1.0/users/',
    GRAPH_TEAMS_MEET_URI: process.env.GRAPH_TEAMS_MEET_URI || 'v1.0/users/',
    GRAPH_EVENT_URI: process.env.GRAPH_EVENT_URI || 'v1.0/users/',
    GRAPH_SEND_EMAIL_URI: process.env.GRAPH_SEND_EMAIL_URI || 'v1.0/users/', 
   //   GRAPH_TIME_ZONE: process.env.GRAPH_TIME_ZONE || 'UTC',
   //   GRAPH_TIME_ZONE: process.env.GRAPH_TIME_ZONE || '(UTC+01:00)',
        GRAPH_TIME_ZONE: process.env.GRAPH_TIME_ZONE || 'Europe/Berlin',

 //==============================================================
    //For google calendar events
    CALENDAR_CLIENT_ID : '1022422898994-p7nvrgvr6qsh9fir0badha98bue7ukrk.apps.googleusercontent.com',
    CALENDAR_CLEINT_SECRET : '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',
    CALENDAR_REDIRECT_URI : 'https://developers.google.com/oauthplayground',
    CALENDAR_REFRESH_TOKEN : '1//04Xt3jVUM5W86CgYIARAAGAQSNwF-L9IrdxR5qDjpX97fpirh0sftIEm0u2nNQAtHxtis6tPTKozLPq-PWwJEsEjfGFXviM3k2Kg',
    //For send mail to gmail
    Gmail_CLIENT_ID : '1022422898994-p7nvrgvr6qsh9fir0badha98bue7ukrk.apps.googleusercontent.com',
    Gmail_CLEINT_SECRET : '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',
    Gmail_REDIRECT_URI : 'https://developers.google.com/oauthplayground',
    Gmail_REFRESH_TOKEN : '1//042okpwPsJ5LwCgYIARAAGAQSNwF-L9IrMvsJY9RSsu-u-UjUKM5cUyGHkNqvTTxIBKuQ2od_HYeU5YdbwDep4U13-97TzYOMEy4',
 //==============================================================

}

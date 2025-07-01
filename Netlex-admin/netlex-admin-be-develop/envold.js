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

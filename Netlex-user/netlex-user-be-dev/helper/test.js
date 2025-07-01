const { Client } = require('@microsoft/microsoft-graph-client');

// Set your credentials and Graph API endpoint
const clientId = '<Your_Client_Id>';
const clientSecret = '<Your_Client_Secret>';
const tenantId = '<Your_Tenant_Id>';
const scopes = ['https://graph.microsoft.com/.default'];
const graphApiEndpoint = 'https://graph.microsoft.com/v1.0';

// Create a new instance of the Graph API client with the provided credentials
const client = Client.init({
  authProvider: (done) => {
    const msalClient = require('@azure/msal-node').PublicClientApplication;
    const msalConfig = {
      auth: {
        clientId,
        clientSecret,
        authority: `https://login.microsoftonline.com/${tenantId}`,
      },
    };
    const pca = new msalClient(msalConfig);
    pca.acquireTokenSilent({ scopes, account: null }).then((tokenResponse) => {
      done(null, tokenResponse.accessToken);
    }).catch((error) => {
      console.log(error);
      done(error, null);
    });
  },
  defaultVersion: 'beta'
});

// Set the start and end times for the meeting
const startTime = new Date();
const endTime = new Date(startTime.getTime() + 60 * 60 * 1000); // 1 hour later

// Set the meeting details
const meetingDetails = {
  subject: 'My Teams Meeting',
  startDateTime: {
    dateTime: startTime.toISOString(),
    timeZone: 'UTC',
  },
  endDateTime: {
    dateTime: endTime.toISOString(),
    timeZone: 'UTC',
  },
  attendees: [
    {
      emailAddress: {
        address: '<email_address>',
        name: '<attendee_name>',
      },
      type: 'Required',
    },
  ],
  location: {
    displayName: 'Online Meeting',
  },
  isOnlineMeeting: true,
  onlineMeetingProvider: 'teamsForBusiness',
};

// Create the Teams meeting using the Graph API
client
  .api('/me/events')
  .post(meetingDetails)
  .then((result) => {
    console.log('Teams Meeting created: ', result);
  })
  .catch((error) => {
    console.log(error);
  });

const LawyerBusyTime = require("../models/lawyerBusyTime");
bcrypt = require("bcryptjs");
const EmailConfiguration = require("../models/emailConfiguration");
const environment = require("../env");
const uuid = require("uuid");
const fetch = require("../helper/fetch");
const Lawyer = require('../models/lawyer');
const auth = require("../controllers/auth");
const fetchHttp = require("node-fetch");
const axios = require("axios");

exports.getAllLawyerBusyTimes = function (req, res) {
  // console.log('req.query',req.query);
  let lawyerId = req.query.lawyerId;
  LawyerBusyTime.find({ lawyerId }).exec(function (err, doc) {
    if (err) {
      console.log("Error in finding LawyerBusyTime from DB");
      return res.status(500).json({ err });
    } else {
      // console.log("LawyerBusyTime get request call from DB Successfully", doc);
      return res.status(200).json({ doc });
    }
  });
};

// To Show List LawyerBusyTime
// exports.list = function (req, res) {
//   try {
//     const query = {};
//     const page = +(req.query.page || 1);
//     const limit = +(req.query.limit || 10);
//     const options = {
//       page: page,
//       limit: limit,
//     };

//     LawyerBusyTime.paginate(query, options).then(function (result) {
//       // console.log('result', result);
//       res.json(result);
//     });
//   } catch (error) {
//     res.status(404).json({ error: "Please try again" });
//   }
// };

// To Save New LawyerBusyTime

exports.save = async function (req, res) {
  // console.log('req.body',req.body);
  console.log("req.body.lawyerBusyTime", req.body.lawyerBusyTime);
  let { lawyerId, date, times, eventSubject, eventDescContent } = req.body.lawyerBusyTime;
  if (!lawyerId || !date || !times || !eventSubject || !eventDescContent) {
    res.status(404).json({ error: "MissingParameters" });
    return;
  }
  let lawyerBusyTimeExist = await LawyerBusyTime.find({ lawyerId, date });
  console.log('lawyerBusyTimeExist', lawyerBusyTimeExist);
  if (lawyerBusyTimeExist.length > 0) {
    index = 0;
    lawyerBusyTimeExist.forEach((element, i) => {
      oldRecordTimes = element.times;
      oldRecordTimes.forEach((ele) => {
        times.forEach((e) => {
          if (ele == e && index != 1) {
            index = 1;
            console.log('duplicate');
            return res.status(404).json({ msg: "lawyerBusyTimeAlreadyExist" });
          }
        })
      })
      if (i == (lawyerBusyTimeExist.length - 1) && index != 1) {
        continueSaveProcess(res, lawyerId, date, times, eventSubject, eventDescContent)
      }
    })

  }
  else {
    const authResponse = await auth.getToken();

    let lawyerBusyTime = new LawyerBusyTime();
    lawyerBusyTime.lawyerId = lawyerId;
    lawyerBusyTime.date = date;
    lawyerBusyTime.times = times;
    lawyerBusyTime.eventSubject = eventSubject;
    lawyerBusyTime.eventDescContent = eventDescContent;
    let createCalendarEvent = await generateCalendarEvent(date, times, eventSubject, eventDescContent, authResponse, lawyerId);
    console.log('createCalendarEvent.id', createCalendarEvent.id);
    if (createCalendarEvent) {
      // console.log('Saved=========================');
      lawyerBusyTime.calendarEventId = createCalendarEvent.id;
      lawyerBusyTime.save((err, savedData) => {
        if (err) {
          console.log("err", err);
          return res.status(404).json({ error: "ErrorWhileSavingColorTryAgain" });
        }
        console.log("savedData", savedData)
        res.status(200).json(savedData);
      });
    }
  }


};

exports.show = function (req, res) {
  console.log('req.params', req.params);
  LawyerBusyTime.findById(req.params.id).exec(function (err, doc) {
    if (err || doc === null) {
      res.status(404).json({ error: "LawyerBusyTimeNotFound" });
    } else {
      res.json(doc);
    }
  });
};

exports.delete = async (req, res) => {
  // console.log("req.params.id", req.params.id);
  const authResponse = await auth.getToken();

  const lawyerBusyTimeFound = await LawyerBusyTime.findById(req.params.id);
  // console.log('lawyerBusyTimeFound', lawyerBusyTimeFound);

  if (lawyerBusyTimeFound) {
    // let selectedDate = lawyerBusyTimeFound.date;
    // let times = lawyerBusyTimeFound.times;
    let eventId = lawyerBusyTimeFound.calendarEventId
    // let deleteCalendarEventCall = await deleteCalendarEvent(selectedDate, times, authResponse, eventId)
    let deleteCalendarEventCall = await deleteCalendarEvent(authResponse, eventId)
    // console.log('deleteCalendarEventCall',deleteCalendarEventCall);
    // if(deleteCalendarEventCall==204){}
    LawyerBusyTime.findByIdAndDelete(req.params.id).exec(function (err) {
      console.log('deleting');
      if (err) {
        console.error(err);
        res.status(404).json({ error: "ColorNotFound" });
        console.log("error", err);
      } else {
        res.status(200).json({ success: "ColorDeleted" });
      }
    });
  }
};

exports.update = async function (req, res) {
  const _id = req.params.id;
  // console.log('coming',req.body.lawyerBusyTime[0])
  // console.log('coming req.body', req.body);
  let data = req.body.lawyerBusyTime[0];
  let date = data.date;
  let times = data.times;
  let lawyerId = data.lawyerId;
  const authResponse = await auth.getToken();
  const lawyerBusyTimeFound = await LawyerBusyTime.findById(req.params.id);
  console.log('lawyerBusyTimeFound', lawyerBusyTimeFound);
  // if (lawyerBusyTimeFound) {
  //   let eventId = lawyerBusyTimeFound.calendarEventId
  //   let updateCalendarEventCall = await updateCalendarEvent(date, times, authResponse, eventId, lawyerId)
  //   // console.log('updateCalendarEventCall', updateCalendarEventCall);
  //   LawyerBusyTime.findByIdAndUpdate(_id, req.body.lawyerBusyTime[0], {
  //     useFindAndModify: false,
  //     new: true,
  //   })
  //     .then((data) => {
  //       if (!data) {
  //         res.status(404).send({
  //           message: `Cannot update LawyerBusyTime with id=${_id}. Maybe LawyerBusyTime was not found!`,
  //         });
  //       } else {
  //         // console.log('data',data)
  //         res.send({ message: "LawyerBusyTime was updated successfully." });
  //       }
  //     })
  //     .catch((err) => {
  //       res.status(500).send({
  //         message: "Error updating LawyerBusyTime with id=" + _id,
  //       });
  //     });
  // }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  // if (lawyerBusyTimeFound) {
  //   index = 0;
  //   // lawyerBusyTimeFound.forEach((element, i) => {
  //   oldRecordTimes = lawyerBusyTimeFound.times;
  //   oldRecordTimes.forEach((ele, i) => {
  //     times.forEach((e) => {
  //       if (ele == e && index!=1) {
  //         index = 1;
  //         console.log('duplicate');
  //         return res.status(404).json({ msg: "lawyerBusyTimeAlreadyExist" });
  //       }
  //     })
  //     if (i == (oldRecordTimes.length - 1) && index != 1) {
  //       continueUpdateProcess(req,res, lawyerBusyTimeFound, date, times,authResponse,lawyerId)
  //     }
  //   })

  //   // })

  // }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  let lawyerBusyTimeExist = await LawyerBusyTime.find({ lawyerId, date, _id: { $ne: req.params.id } });
  console.log('lawyerBusyTimeExist', lawyerBusyTimeExist);
  if (lawyerBusyTimeExist.length > 0) {
    index = 0;
    lawyerBusyTimeExist.forEach((element, i) => {
      oldRecordTimes = element.times;
      oldRecordTimes.forEach((ele) => {
        times.forEach((e) => {
          if (ele == e && index != 1) {
            index = 1;
            console.log('duplicate');
            return res.status(404).json({ msg: "lawyerBusyTimeAlreadyExist" });
          }
        })
      })
      if (i == (lawyerBusyTimeExist.length - 1) && index != 1) {
        continueUpdateProcess(req, res, _id, lawyerBusyTimeFound, date, times, authResponse, lawyerId)
      }
    })

  }
  else {
    let eventId = lawyerBusyTimeFound.calendarEventId
    let updateCalendarEventCall = await updateCalendarEvent(date, times, authResponse, eventId, lawyerId)
    // console.log('updateCalendarEventCall', updateCalendarEventCall);
    LawyerBusyTime.findByIdAndUpdate(_id, req.body.lawyerBusyTime[0], {
      useFindAndModify: false,
      new: true,
    })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update LawyerBusyTime with id=${_id}. Maybe LawyerBusyTime was not found!`,
          });
        } else {
          // console.log('data',data)
          res.send({ message: "LawyerBusyTime was updated successfully." });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating LawyerBusyTime with id=" + _id,
        });
      });
  }

};
async function continueSaveProcess(res, lawyerId, date, times, eventSubject, eventDescContent) {
  const authResponse = await auth.getToken();

  let lawyerBusyTime = new LawyerBusyTime();
  lawyerBusyTime.lawyerId = lawyerId;
  lawyerBusyTime.date = date;
  lawyerBusyTime.times = times;
  lawyerBusyTime.eventSubject = eventSubject;
  lawyerBusyTime.eventDescContent = eventDescContent;
  let createCalendarEvent = await generateCalendarEvent(date, times, eventSubject, eventDescContent, authResponse, lawyerId);
  console.log('createCalendarEvent.id', createCalendarEvent.id);
  if (createCalendarEvent) {
    // console.log('Saved=========================');
    lawyerBusyTime.calendarEventId = createCalendarEvent.id;
    lawyerBusyTime.save((err, savedData) => {
      if (err) {
        console.log("err", err);
        return res.status(404).json({ error: "ErrorWhileSavingColorTryAgain" });
      }
      console.log("savedData", savedData)
      res.status(200).json(savedData);
    });
  }
}
async function continueUpdateProcess(req, res, _id, lawyerBusyTimeFound, date, times, authResponse, lawyerId) {
  let eventId = lawyerBusyTimeFound.calendarEventId
  let updateCalendarEventCall = await updateCalendarEvent(date, times, authResponse, eventId, lawyerId)
  // console.log('updateCalendarEventCall', updateCalendarEventCall);
  LawyerBusyTime.findByIdAndUpdate(_id, req.body.lawyerBusyTime[0], {
    useFindAndModify: false,
    new: true,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update LawyerBusyTime with id=${_id}. Maybe LawyerBusyTime was not found!`,
        });
      } else {
        // console.log('data',data)
        res.send({ message: "LawyerBusyTime was updated successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating LawyerBusyTime with id=" + _id,
      });
    });
}
async function generateCalendarEvent(
  selectedDate, selectedTime, eventSubject, eventDescContent,
  authResponse, lawyerId
) {
  // console.log('eventSubject',eventSubject);
  // console.log('eventDescContent',eventDescContent);
  // console.log('selectedDate', selectedDate);
  // console.log('selectedTime', selectedTime);
  let startTime = selectedTime[0].split(' - ')[0];
  let endTime = selectedTime[selectedTime.length - 1].split(' - ')[1];

  // console.log('startTime',startTime);
  // console.log('endTime',endTime);
  // console.log('authResponse', authResponse);
  let lawyer = await Lawyer.findById({ _id: lawyerId });
  // console.log('lawyer', lawyer);

  //Fetch EmailConfiguration
  let emailConfiguration = await EmailConfiguration.find({
    name: "emailConfiguration",
  });
  // console.log("EmailConfiguration", emailConfiguration[0]);

  const startDateTime = selectedDate + "T" + startTime;
  const endDateTime = selectedDate + "T" + endTime;


  // console.log("startDateTime" + startDateTime);
  // console.log("endDateTime" + endDateTime);
  const body = {
    innerBody: {

      // subject: "Busy time Lawyer - " + lawyer.firstName + " " + lawyer.lastName,
      subject: eventSubject,
      start: {
        dateTime: startDateTime,
        timeZone: environment.GRAPH_TIME_ZONE,
      },
      end: {
        dateTime: endDateTime,
        timeZone: environment.GRAPH_TIME_ZONE,
      },
      location: {
        // displayName: "Not available for Meeting",
        displayName: eventDescContent,
      },
      attendees: [
        {
          emailAddress: {
            address: lawyer.email,
            name: lawyer.firstName + " " + lawyer.lastName,
          },
          type: "required",
        },
      ],
      allowNewTimeProposals: "true",
      transactionId: uuid.v4(),
      isOnlineMeeting: false,
      onlineMeetingProvider: "teamsForBusiness",
    }
  };

  const calendarEvent = await fetch.postApi(
    environment.OAUTH_GRAPH_ENDPOINT +
    //  environment.GRAPH_EVENT_URI,
    environment.GRAPH_EVENT_URI +
    emailConfiguration[0].user_id +
    "/calendar/events",
    authResponse.accessToken,
    body
  );
  // console.log("calendarEvent",calendarEvent)
  return calendarEvent;
  // return calendarEvent.id;
}

async function deleteCalendarEvent(
  authResponse,
  eventCalendarId,
) {

  //Fetch EmailConfiguration
  let emailConfiguration = await EmailConfiguration.find({
    name: "emailConfiguration",
  });
  // console.log("EmailConfiguration", emailConfiguration[0]);

  const deleteEventResponse = await fetch.deleteCalendarEventAPI(
    environment.OAUTH_GRAPH_ENDPOINT +
    environment.GRAPH_EVENT_URI +
    emailConfiguration[0].user_id +
    "/events/" + eventCalendarId,
    authResponse.accessToken
  );
  return deleteEventResponse;
}

async function updateCalendarEvent(
  selectedDate,
  selectedTime,
  authResponse,
  eventCalendarId,
  lawyerId
) {
  let startTime = selectedTime[0].split(' - ')[0];
  let endTime = selectedTime[selectedTime.length - 1].split(' - ')[1];

  const startDateTime = selectedDate + "T" + startTime;
  const endDateTime = selectedDate + "T" + endTime;
  // console.log('startDateTime', startDateTime);
  // console.log('endDateTime', endDateTime);
  // console.log('eventCalendarId', eventCalendarId);

  //Fetch EmailConfiguration
  let emailConfiguration = await EmailConfiguration.find({
    name: "emailConfiguration",
  });
  // console.log("EmailConfiguration", emailConfiguration[0]);
  let lawyer = await Lawyer.findById({ _id: lawyerId });
  // console.log('lawyer', lawyer);

  const body = {
    innerBody: {

      subject: "Busy time Lawyer - " + lawyer.firstName + " " + lawyer.lastName,
      start: {
        dateTime: startDateTime,
        timeZone: environment.GRAPH_TIME_ZONE,
      },
      end: {
        dateTime: endDateTime,
        timeZone: environment.GRAPH_TIME_ZONE,
      },
      attendees: [
        {
          emailAddress: {
            address: lawyer.email,
            name: lawyer.firstName + " " + lawyer.lastName,
          },
          type: "required",
        },
      ],
    }
  };

  const updateEventResponse = await fetch.updateEventResponseAPI(
    environment.OAUTH_GRAPH_ENDPOINT +
    //  environment.GRAPH_EVENT_URI,
    environment.GRAPH_EVENT_URI +
    emailConfiguration[0].user_id +
    "/events/" + eventCalendarId,
    authResponse.accessToken,
    body
  );
  return updateEventResponse;
}

// async function getCalendarEventId(
//   selectedDate,
//   selectedTime,
//   authResponse,
//   // lawyerId,
//   // meetingDetails
// ) {
//   let startTime = selectedTime[0].split(' - ')[0];
//   let endTime = selectedTime[selectedTime.length - 1].split(' - ')[1];

//   const startDateTime = selectedDate + "T" + startTime;
//   const endDateTime = selectedDate + "T" + endTime;
//   // console.log('startDateTime', startDateTime);
//   // console.log('endDateTime', endDateTime);

//   //Fetch EmailConfiguration
//   let emailConfiguration = await EmailConfiguration.find({
//     name: "emailConfiguration",
//   });
//   // console.log("EmailConfiguration", emailConfiguration[0]);

//   const callAPI = await fetch.getCalenderEventId(
//     environment.OAUTH_GRAPH_ENDPOINT +
//     environment.GRAPH_EVENT_URI +
//     emailConfiguration[0].user_id +
//     "/calendarView/delta?startDateTime=" + startDateTime +
//     "&endDateTime=" + endDateTime,
//     authResponse.accessToken
//   );
//   eventData = callAPI.value[0];
//   // console.log('eventData', eventData);
//   console.log('eventData.id', eventData.id);
//   // /users/{id | userPrincipalName}/calendar/events/{id}
// }
const lawyerService = require("../services/lawyer-service");
const Lawyer = require("../models/lawyer");
const res = require("express");
const Schedule = require("../models/schedule");

// Get active Lawyers
exports.getActiveLawyers = async (req, res, next) => {
  const lawyers = await lawyerService.getActiveLawyers();
  return res.json({ lawyers });
};
// post data
exports.save = function (req, res) {
  // save and update document
  let { firstName, lastName, email, status, totalMeetingAssigned } = req.body;

  if (!Lawyer) {
    res.status(404).json({ error: "MissingParameter" });
    return;
  }

  let doc = new Lawyer();

  doc.firstName = firstName;
  doc.lastName = lastName;
  doc.email = email;
  doc.status = status;
  doc.totalMeetingAssigned = totalMeetingAssigned;

  doc.save((err, savedLaywer) => {
    console.log("lawyer post data");

    // sending err msg
    if (err) {
      console.error(err);
      res.status(404).json({ error: "ErrorWhileSavingDoc", message: err });
      return;
    }
    res.status(200).json(savedLaywer);
  });
};

////////////////////////////////////////////---Old---///////////////////////////////////////////////////////
// Get Lawyer's availability for meeting schedule //(Commented on 01-12-2022) (Old provides all available lawyer but not working as want)
// exports.getLawyersWithAvailability = async(req, res, next)=> {
//     return await lawyerService.getLawyersWithAvailability(req, res);
//     // return res.json({lawyerAvailability});
// };

//||||||||||||||||||||||||||||||||||||-----New (Commented 06-04-2023)---||||||||||||||||||||||||||||||||||||||||||||||||||

// Get Lawyer's availability for meeting schedule  //New (Created on 01-12-2022) (New provides selected lawyer available times by lawyer id and on selected date)
// exports.getLawyersWithAvailability = async (req, res, next) => {
//   timesOptions = [
//     { value: "09:00:00 - 09:30:00", checked: false },
//     { value: "09:30:00 - 10:00:00", checked: false },
//     { value: "10:00:00 - 10:30:00", checked: false },
//     { value: "10:30:00 - 11:00:00", checked: false },
//     { value: "11:00:00 - 11:30:00", checked: false },
//     { value: "11:30:00 - 12:00:00", checked: false },
//     { value: "12:00:00 - 12:30:00", checked: false },
//     { value: "12:30:00 - 13:00:00", checked: false },
//     { value: "13:00:00 - 13:30:00", checked: false },
//     { value: "13:30:00 - 14:00:00", checked: false },
//     { value: "14:00:00 - 14:30:00", checked: false },
//     { value: "14:30:00 - 15:00:00", checked: false },
//     { value: "15:00:00 - 15:30:00", checked: false },
//     { value: "15:30:00 - 16:00:00", checked: false },
//     { value: "16:00:00 - 16:30:00", checked: false },
//     { value: "16:30:00 - 17:00:00", checked: false },
//     { value: "17:00:00 - 17:30:00", checked: false },
//     { value: "17:30:00 - 18:00:00", checked: false },
//     { value: "18:00:00 - 18:30:00", checked: false },
//     { value: "18:30:00 - 19:00:00", checked: false },
//   ];

//   let { selectedDate, lawyerId } = req.query;
//   console.log("req.query", req.query);
//   console.log("Reached in node on date selection", req.params);
//   // res.send(req.query);
//   Schedule.find(
//     { dateOf: selectedDate, lawyerId: lawyerId },
//     function (err, result) {
//       if (err) {
//         // return res
//         //   .status(404)
//         //   .json({ error: "Can't update the job. Please try again" });
//         console.log("err", err);
//       }
//       if (result.length > 0) {
//         // console.log("result", result);
//         //Loop of founded meetings with this lawyer on selected date
//         for (let i = 0; i < result.length; i++) {
//           //Remove time which is not available
//           timesOptions = timesOptions.filter((element) => {
//             return element.value !== result[i].time;
//           });
//         }
//         // console.log("timesOptions", timesOptions);
//         res.send(timesOptions);

//       } else {
//         // console.log("no result");
//         res.send(timesOptions);

//       }
//       // res.send(req.query);

//       // res.status(200).json(result);
//     }
//   );
//   // const { selectedDate } = req.query;
//   // return await lawyerService.getLawyersWithAvailability(req, res);
//   // return res.json({lawyerAvailability});
// };

/////////////////////////////////////////////////---New---/////////////////////////////////////////////////////

exports.getLawyersWithAvailability = async (req, res, next) => {
  await lawyerService.getLawyersWithAvailability(req, res);
}
//////////////////////////////////////////////////---New---////////////////////////////////////////////////////

exports.getActiveshowLawyerToUser = function (req, res) {
  console.log("req.params.name", req.params.name);
  Lawyer.find({ showLawyerToUser: true }).exec(function (err, doc) {
    if (err) {
      console.log("Error in finding Lawyer from DB");
      return res.status(500).json({ err });
    } else {
      console.log("Lawyer get request call from DB Successfully");

      return res.status(200).json({ doc });
    }
  });
};

exports.getActiveshowLawyerToUserList = function (req, res) {
  try {
    const query = {};
    const page = +(req.query.page || 1);
    const limit = +(req.query.limit || 10);
    const options = {
      page: page,
      limit: limit,
    };

    Lawyer.paginate(query, options).then(function (result) {
      res.json(result);
    });
  } catch (error) {
    res.status(404).json({ error: "Error in get sales list" + error });
  }
};

exports.show = function (req, res) {
  // console.log("req.params.id:"+ req.params.id);
  Lawyer.findById(req.params.id).exec(function (err, doc) {
    if (err || doc === null) {
      res.status(404).json({ error: "UserNotFound" });
    } else {
      res.json(doc);
    }
  });
};

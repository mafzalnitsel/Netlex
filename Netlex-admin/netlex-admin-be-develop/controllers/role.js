const mongoose = require("mongoose");
const Role = require("../models/role");
bcrypt = require("bcryptjs");
const RoleAction = require("../models/RoleAction");
const menuaction = require("../models/menuaction");

exports.getActiveRole = function (req, res) {
  Role.find().exec(function (err, doc) {
    if (err) {
      console.log("Error in finding BusinessType from DB");
      return res.status(500).json({ err });
    } else {
      console.log("BusinessType get request call from DB Successfully");

      return res.status(200).json({ doc });
    }
  });
};

// To Show List Role
exports.list = function (req, res) {
  try {
    const query = {};
    const page = +(req.query.page || 1);
    const limit = +(req.query.limit || 10);
    const options = {
      page: page,
      limit: limit,
    };

    Role.paginate(query, options).then(function (result) {
      // console.log('result', result);
      res.json(result);
    });
  } catch (error) {
    res.status(404).json({ error: "Please try again" });
  }
};

// To Save New Role
exports.save = function (req, res) {
  //console.log("req.body.role",req.body.role)
  let { name } = req.body.role;
  if (!name) {
    res.status(404).json({ error: "MissingParameters" });
    return;
  }
  let role = new Role();
  role.name = name;

  role.save((err, savedData) => {
    if (err) {
      console.log("err", err);
      return res.status(404).json({ error: "ErrorWhileSaveTryAgain" });
    }
    res.status(200).json(savedData);
  });
};

// Get an individual Role's public information
exports.show = function (req, res) {
  Role.findById(req.params.id).exec(function (err, doc) {
    if (err || doc === null) {
      res.status(404).json({ error: "RoleNotFound" });
    } else {
      res.json(doc);
    }
  });
};
exports.delete = async (req, res) => {
  const role = await Role.findById(req.params.id);
  if (role) {
    Role.findByIdAndDelete(req.params.id).exec(function (err) {
      if (err) {
        console.error(err);
        res.status(404).json({ error: "RoleNotFound" });
      } else {
        res.status(200).json({ success: "RoleDeleted" });
      }
    });
  }
};

// ----------To delete Role if not found RoleAction-------

// exports.delete = async (req, res) => {
//   let __id = req.params.id;

//   const role = await Role.findById(__id);
//   if (role) {
//     RoleAction.distinct(
//       "roleID",
//       { roleID: __id },
//       function (err, doc) {
//         if (err) {
//           console.log("Error in finding RoleAction from DB", err);
//         } else {
//           // console.log("Role in RoleAction",doc)
//           if (!__id == doc) {
//             // console.log("Not Matched", doc);
//             Role.findByIdAndDelete(req.params.id).exec(function (err) {
//               if (err) {
//                 res.status(404).json({ error: "RoleNotFound" });
//               } else {
//                 res.status(200).json({ success: "RoleDeleted" });
//               }
//             });
//           } else {
//             // console.log("Matched", doc);
//             res.status(404).json({ error: "RoleCannotBeDeleted" });
//           }
//         }
//       }
//     );
//   }
// };

exports.update = function (req, res) {
  const _id = req.params.id;
  //console.log('coming',req.body.role[0])
  Role.findByIdAndUpdate(_id, req.body.role[0], {
    useFindAndModify: false,
    new: true,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Role with id=${_id}. Maybe Role was not found!`,
        });
      } else {
        //console.log('data',data)
        res.send({ message: "Role was updated successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Role with id=" + _id,
      });
    });
};

exports.GetUserRoleAction = function (req, res) {
  const _id = req.params.id;
  let normal_appointments = [];

  RoleAction.aggregate([
    { $match: { roleID: _id } },
    {
      $lookup: {
        from: "menuactions",
        localField: "roleactionID",
        foreignField: "MAId",
        as: "menuactions",
      },
    },
    { $unwind: "$menuactions" },
    {
      $project: {
        menuactions_id: "$menuactions._id",
        menuactionsName: "$menuactions.Name",
        menuactionsUrl: "$menuactions.Url",
      },
    },
  ]).then((results) => {
    results.map((app) => {
      normal_appointments.push(app);
    });

    res.status(200).json({
      menuactionslist: normal_appointments,
    });
  });
};

exports.GetRoleActionByRoleIdRoleActionId = function (req, res) {
  const roleID = req.params.id;
  const roleactionID = req.params.roleactionID;
  let normal_appointments = [];

  RoleAction.aggregate([
    { $match: { roleID: roleID } },
    { $match: { roleactionID: roleactionID } },
    {
      $lookup: {
        from: "menuactions",
        localField: "roleactionID",
        foreignField: "MAId",
        as: "menuactions",
      },
    },
    { $unwind: "$menuactions" },
    {
      $project: {
        menuactions_id: "$menuactions._id",
        menuactionsName: "$menuactions.Name",
        menuactionsUrl: "$menuactions.Url",
      },
    },
  ]).then((results) => {
    //console.log(results);
    results.map((app) => {
      normal_appointments.push(app);
    });

    res.status(200).json({
      menuactionslist: normal_appointments,
    });
  });
};

// ----------To update Role if not found RoleAction-------

// exports.update = async (req, res) => {
//   let __id = req.params.id;

//   const role = await Role.findById(__id);
//   if (role) {
//     RoleAction.distinct(
//       "roleID",
//       { roleID: __id },
//       function (err, doc) {
//         if (err) {
//           console.log("Error in finding RoleAction from DB", err);
//         } else {
//           if (!__id == doc) {
//             Role.findByIdAndUpdate(__id, req.body.role[0], {
//               useFindAndModify: false, new:true
//             })
//             .then((data) => {
//                 if (!data) {
//                   res.status(404).send({
//                     message: `Cannot update Role with id=${__id}. Maybe Role was not found!`,
//                   });
//                 } else {
//                   console.log('data',data)
//                   res.send({ message: "Role was updated successfully." });
//                 }
//               })
//               .catch((err) => {
//                 res.status(500).send({
//                   message: "Error updating Role with id=" + __id,
//                 });
//               });
//           } else {
//             // console.log("Matched", doc);
//             res.status(404).json({ error: "RoleCannotBeUpdated" });
//           }
//         }
//       }
//     );
//   }
// };

// const seedMenuActions = async (req, res) => {
//   try {
//     const menuActions = [
//       {
//         Name: "Upptagen tidskalender",
//         Url: "/profile/busyCalendar",
//         MAId: "busyCalendar",
//       },
//       {
//         Name: "Schemalägg möte",
//         Url: "/meeting/schedule",
//         MAId: "scheduleMeeting",
//       },
//       { Name: "Jävskontroll", Url: "/conflict-check", MAId: "conflictCheck" },
//       { Name: "Tid App", Url: "/time-app", MAId: "timeApp" },
//       { Name: "Användare", Url: "/users", MAId: "users" },
//       { Name: "Advokat", Url: "/lawyers", MAId: "lawyers" },
//       { Name: "Innehållssidor", Url: "/content-pages", MAId: "contentPages" },
//       { Name: "Roll-handling", Url: "/roles", MAId: "roleHandling" },
//       { Name: "Affärs Typ", Url: "/business-type", MAId: "businessType" },
//       { Name: "Nytt Avtal", Url: "/agreement/new", MAId: "newAgreement" },
//       {
//         Name: "Ändra i Bef. avtal",
//         Url: "/agreement/edit",
//         MAId: "editAgreement",
//       },
//       {
//         Name: "Utkast av avtal",
//         Url: "/agreement/drafts",
//         MAId: "draftAgreement",
//       },
//       {
//         Name: "Dokumentera Kolla",
//         Url: "/agreement/verify",
//         MAId: "documentCheck",
//       },
//       {
//         Name: "Företag Avtal Lista",
//         Url: "/business-agreement/list",
//         MAId: "businessAgreementList",
//       },
//       {
//         Name: "Utkast Företag Avtal",
//         Url: "/business-agreement/drafts",
//         MAId: "businessDraftAgreement",
//       },
//       {
//         Name: "Konfigurationer",
//         Url: "/settings/config",
//         MAId: "configurations",
//       },
//       {
//         Name: "Misslyckade e-postloggar",
//         Url: "/logs/email-failures",
//         MAId: "emailLogs",
//       },
//       { Name: "Säljshistora", Url: "/sales/history", MAId: "salesHistory" },
//     ];

//     const inserted = await menuaction.insertMany(menuActions);
//     console.log("✅ Menu actions inserted.");

//     // Create Admin Role (if not exists)
//     let role = await Role.findOne({ name: "Admin" });
//     if (!role) {
//       role = new Role({ name: "Admin" });
//       await role.save();
//     }

//     // Map all menu actions to Admin role
//     const roleActions = inserted.map((ma) => ({
//       roleID: role._id,
//       roleactionID: ma.MAId,
//     }));

//     await RoleAction.insertMany(roleActions);
//     console.log("✅ RoleActions mapped to Admin role.");

//     // res.status(200).json({
//     //   success: true,
//     //   message: "Seed data created successfully.",
//     // });
//   } catch (err) {
//     console.error("❌ Error seeding menuactions:", err);
//     // res.status(500).json({ error: "Error while seeding data." });
//   }
// };
// seedMenuActions();

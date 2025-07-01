const RoleAction = require("../models/RoleAction");
const MenuAction = require("../models/menuaction");

const Role = require("../models/role");
const res = require("express");
bcrypt = require("bcryptjs");

// exports.list = function (req, res) {
//   console.log("req: " + req);
//   console.log("res: " + res);
//   try {
//     const query = {};
//     const page = +(req.query.page || 1);
//     const limit = +(req.query.limit || 10);
//     const options = {
//       page: page,
//       limit: limit,
//     };

//     RoleAction.paginate(query, options).then(function (result) {
//       // console.log('result', result);
//       res.json(result);
//     });
//   } catch (error) {
//     console.log("err", error);
//     res.status(404).json({ error: "Please try again" });
//   }
// };

exports.getActiveRoleAction = function (req, res) {
  RoleAction.find().exec(function (err, doc) {
    if (err) {
      console.log("Error in finding Role from DB");
      return res.status(500).json({ err });
    } else {
      console.log("Role get request call from DB Successfully");

      return res.status(200).json({ doc });
    }
  });
};

exports.getAllRoleData = function (req, res) {
  // console.log('req.params.id',req.params.id)

  let __id = req.params.id;
  let Role_List = [];
  let MenuAction_ListFalse = [];
  let MenuAction_ListTrue = [];
  let RoleAction_List = [];
  Role.find({ _id: __id }).then((results) => {
    //console.log(results);
    results.map((app) => {
      Role_List.push(app);
    });
    MenuAction.find({ useForLawyer: "false" }).then((results) => {
      //console.log(results);
      results.map((app) => {
        MenuAction_ListFalse.push(app);
      });
      MenuAction.find({ useForLawyer: "true" }).then((results) => {
        //console.log(results);
        results.map((app) => {
          MenuAction_ListTrue.push(app);
        });
        RoleAction.find({ roleID: __id }).then((results) => {
          results.map((oapp) => {
            RoleAction_List.push(oapp);
          });
          res.status(200).json({
            Role_List: Role_List,
            MenuAction_ListFalse: MenuAction_ListFalse,
            MenuAction_ListTrue: MenuAction_ListTrue,
            RoleAction_List: RoleAction_List,
          });
        });
      });
    });
  });
};

exports.saveRoleAction = function (req, res) {
  // console.log("req.body",req.body);

  // console.log('11111',req.body.roleActionData.name);
  // console.log("req.body.role",req.body);
  let { name, menuActionID, useForLawyerData } = req.body.roleActionData;
  //let menuActionID  = req.body.roleActionData.menuActionID;
  // console.log('=====req.body.roleActionData.roleID : '+ req.body.roleActionData.roleID)
  //   if (!menuActionID) {
  //     res.status(404).json({error: "MissingParameter"});
  //     return;
  // }

  //this.menuActionID[index].roleID = savedrole._id
  //  console.log('menuActionID'+menuActionID)
  let role = new Role();
  role.name = name;
  if (useForLawyerData != undefined) {
    role.useForLawyer = useForLawyerData;
  } else {
    role.useForLawyer = false;
  }

  let idrol = "0";
  //console.log('useForLawyerData'+ useForLawyerData);
  role.save((err, savedRole) => {
    //console.log('savedrole sav'+ savedRole);
    for (let i = 0; i < menuActionID.length; ++i) {
      menuActionID[i].roleID = savedRole._id;
      menuActionID[i].name = role.name;
      // menuActionID[i].useForLawyer = useForLawyer;
      //console.log('savedrole sav'+ JSON.stringify(savedRole))

      //  console.log('savedrole savedrole._id'+ JSON.stringify(savedrole._id))
    }
    // console.log('savedrole'+ JSON.stringify(savedrole._id))
    //res.status(200).json(savedrole)) ;
    // console.log('roleActionData.menuActionID '+JSON.stringify(menuActionID) )
    // role.amount = amount;
    // idrol=savedrole._id;
    let roleActionData = new RoleAction();
    roleActionData.name = name;
    // roleActionData.roleID = savedrole._id;
    roleActionData.menuActionID = menuActionID;
    // roleActionData.useForLawyer = useForLawyer;
    // console.log('roleActionData.menuActionID '+JSON.stringify(roleActionData.menuActionID) )
    // role.amount = amount;
    // role.vat = vat;
    RoleAction.insertMany(
      roleActionData.menuActionID,
      function (err, returnData) {
        if (err) {
          res.status(404).json({ err: "Err", msg: err });
        } else {
          res.status(200).json(returnData);
        }
      }
    );
  });
};

// exports.save = function (req, res) {
//   let { name, roleID, menuActionID, useForLawyerData } =
//     req.body.roleActionData;
//   if (!name) {
//     res.status(404).json({ error: "MissingParameter" });
//     return;
//   }
//   let roleActionData = new RoleAction();
//   roleActionData.name = name;
//   roleActionData.roleID = roleID;
//   roleActionData.menuActionID = menuActionID;

//   if (roleID) {
//     RoleAction.deleteMany({ roleID: roleID }).exec(function (err, answer) {
//       if (err) {
//         return res.status(500).json({ err });
//       }

//       //  console.log("req.body.roleActionData",req.body.roleActionData);
//       // console.log("req.body.roleActionData.roleID",req.body.roleActionData.name );
//       // console.log("req.body.roleActionData.roleID",req.body.roleActionDatauseForLawyerData// );
//       //  console.log("req.body.roleActionData.roleID",req.body.roleActionData.roleID);

//       // let role = Role();
//       let array = [];
//       array.push({
//         name: req.body.roleActionData.name,
//         useForLawyer: req.body.roleActionData.useForLawyerData,
//       });
//       // console.log('arrayy',array[0])
//       const _id = req.body.roleActionData.roleID;
//       Role.findByIdAndUpdate(_id, array[0], {
//         useFindAndModify: false,
//         new: true,
//       })
//         .then((data) => {
//           if (!data) {
//             res.status(404).send({
//               message: `Cannot update role with id=${_id}. Maybe action was not found!`,
//             });
//           } else res.send({ message: "role was updated successfully.", data });
//         })
//         .catch((err) => {
//           res.status(500).send({
//             message: "Error updating role with id=" + _id,
//           });
//         });
//     });

//     RoleAction.insertMany(
//       roleActionData.menuActionID,
//       function (err, returnData) {
//         if (err) {
//           res.status(404).json({ err: "Err", msg: err });
//         } else {
//           res.status(200).json(returnData);
//         }
//       }
//     );
//   }
// };

//update


exports.save = async function (req, res) {
  let { name, roleID, menuActionID, useForLawyerData } = req.body.roleActionData;

  if (!name) {
    return res.status(404).json({ error: "MissingParameter" });
  }

  try {
    await RoleAction.deleteMany({ roleID });

    const updatedRole = await Role.findByIdAndUpdate(
      roleID,
      {
        name,
        useForLawyer: useForLawyerData,
      },
      {
        useFindAndModify: false,
        new: true,
      }
    );

    if (!updatedRole) {
      return res.status(404).json({ message: `Cannot update role with id=${roleID}` });
    }

    const returnData = await RoleAction.insertMany(menuActionID);

    return res.status(200).json({
      message: "Role updated and actions inserted successfully.",
      role: updatedRole,
      roleActions: returnData,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "InternalServerError", details: err });
  }
};


exports.updateAction = function (req, res) {
  const _id = req.params.id;
  Action.findByIdAndUpdate(_id, req.body, {
    useFindAndModify: false,
    new: true,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update action with id=${_id}. Maybe action was not found!`,
        });
      } else res.send({ message: "action was updated successfully.", data });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating action with id=" + _id,
      });
    });
};

exports.delete = async (req, res) => {
  //console.log("req.params.id", req.params.id);

  const rolee = await RoleAction.find({ roleID: req.params.id });
  if (rolee) {
    RoleAction.deleteMany({ roleID: req.params.id }).exec(function (err) {
      if (err) {
        console.error(err);
        res.status(404).json({ error: "RoleNotFound" });
      } else {
        res.status(200).json({ success: "RoleDeleted" });
      }
    });
  }
};

//Action List
exports.getActiveActionList = function (req, res) {
  RoleAction.find().exec(function (err, action) {
    if (err) {
      return res.status(500).json({ err });
    } else {
      return res.status(200).json({ action });
    }
  });
};
exports.show = function (req, res) {
  RoleAction.findById(req.params.id).exec(function (err, doc) {
    if (err || doc === null) {
      res.status(404).json({ error: "RoleActionNotFound" });
    } else {
      res.json(doc);
    }
  });
};
exports.getRoleActionByRoleId = function (req, res) {
  //console.log("req.params.idd", req.params.idd);
  MenuAction.find({ roleID: req.params.idd }).exec(function (err, doc) {
    if (err) {
      console.log("Error in finding Action from DB");
      return res.status(500).json({ err });
    } else {
      console.log("Action get request call from DB Successfully");

      return res.status(200).json({ doc });
    }
  });
};
exports.getallroleaction = function (req, res) {
  //console.log("req.params.roleID:" + req.params.roleID);
  RoleAction.find({ roleID: req.params.roleID }).exec(function (
    err,
    roleactionlist
  ) {
    if (err) {
      return res.status(500).json({ err });
    } else {
      return res.status(200).json({ roleactionlist });
    }
  });
};

// details.deleteMany({}, function(err, result) {
//   if (err) {
//     res.send(err);
//   } else {
//     res.send(result);
//   }
// });

// exports.deleteManyByid = function (req, res) {

//   console.log('req.params.roleID:'+req.params.roleID);
//   RoleAction.deleteMany({roleID: req.params.roleID})
//           .exec(function (err, roleactionlist) {
//               if (err) {
//                   return res.status(500).json({err})
//               } else {
//                   return res.status(200).json({roleactionlist})
//               }
//           });
//   };

exports.deletemanylist = function (req, res) {
  let roleID = req.params.id;
  if (!roleID) {
    res.status(404).json({ error: "MissingParameter" });
    return;
  }
  RoleAction.deleteMany({ roleID: roleID }).exec(function (err, answer) {
    if (err) {
      return res.status(500).json({ err });
    } else {
      return res.status(200).json({ answer });
    }
  });
};

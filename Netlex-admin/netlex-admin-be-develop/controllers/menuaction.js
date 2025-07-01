
const { modelNames } = require("mongoose");
const MenuAction = require("../models/menuaction");
bcrypt = require("bcryptjs");


exports.getActiveMenuAction = function (req, res) {
    MenuAction.find().exec(function (err, doc) {
        if (err) {
          console.log("Error in finding MenuAction from DB");
          return res.status(500).json({ err });
        } else {
          console.log("MenuAction get request call from DB Successfully");
    
          return res.status(200).json({ doc });
        }
      });
    };

    exports.getRoleActionByValue = function (req, res) {
        // console.log('req.params.name',req.params.name)
      MenuAction.find({useForLawyer : req.params.name}).exec(function (err, doc) {
          if (err) {
            console.log("Error in finding Action from DB");
            return res.status(500).json({ err });
          } else {
            console.log("Action get request call from DB Successfully");
      
            return res.status(200).json({ doc });
          }
        });
      };

      // exports.getRoleActionByValue = function (req, res) {
        // Role.find({name : req.params.name}).exec(function (err, doc) {
        //   if (err) {
        //     console.log("Error in finding ContentPage from DB");
        //     return res.status(500).json({ err });
        //   } else {
        //     console.log("ContentPage get request call from DB Successfully");
      
        //     return res.status(200).json({ doc });
        //   }
        // });
      // };

// To Save New Role
exports.save = function (req, res) {
  // console.log("req.body.menuaction",req.body)
  let { Name, Url } = req.body;
  if (!modelNames) {
    res.status(404).json({ error: "MissingParameters" });
    return;
  }
  let menuaction = new MenuAction();
  menuaction.Name = Name;
  menuaction.Url = Url;

  
  // role.amount = amount;
  // role.vat = vat;

  menuaction.save((err, savedData) => {
    if (err) {
      console.log("err", err);
      return res.status(404).json({ error: "ErrorWhileSaveTryAgain" });
    }
    res.status(200).json(savedData);
  });
};
// Get an individual Role's public information
exports.show = function (req, res) {
    MenuAction.findById(req.params.id).exec(function (err, doc) {
    if (err || doc === null) {
      res.status(404).json({ error: "RoleNotFound" });
    } else {
      res.json(doc);
    }
  });
};
// ----------To delete Role if not found in Salesmodel-------

// exports.delete = async (req, res) => {
//   let __id = req.params.id;
//   // let x = 0;
//   const role = await Role.findById(__id);
//   if (role) {
//     SalesModel.distinct(
//       "businessType",
//       { businessType: __id },
//       function (err, doc) {
//         if (err) {
//           console.log("Error in finding Sales from DB", err);
//         } else {
//           // console.log("Role in Sales",doc)
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



//-------------------Role Delete----------------


exports.delete = async (req, res) => {
  const role = await MenuAction.findById(req.params.id);
  // console.log('role',role)
  if(role) {
    Role.findByIdAndDelete(req.params.id)
          .exec(function (err) {
              if (err) {
                  console.error(err);
                  res.status(404).json({error: 'RoleNotFound'});
              } else {
                  
                  res.status(200).json({success: 'RoleDeleted'});
              }
          });
  }
};
exports.update = function (req, res) {
  const _id = req.params.id;
  // console.log('coming',req.body.role[0])
  Role.findByIdAndUpdate(_id, req.body.role[0], {
    useFindAndModify: false, new:true
  })
  .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Role with id=${_id}. Maybe Role was not found!`,
        });
      } else {
        // console.log('data',data)
        res.send({ message: "Role was updated successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Role with id=" + _id,
      });
    });
};

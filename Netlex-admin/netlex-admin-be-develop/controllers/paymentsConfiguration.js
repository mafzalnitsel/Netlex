const PaymentsConfiguration = require("../models/paymentsConfiguration");
bcrypt = require("bcryptjs");
const formidable = require("formidable");
const mv = require("mv");
const path = require("path");

// Get PaymentsConfiguration
exports.getPaymentsConfiguration = function (req, res) {
  console.log("req.params.name", req.params.name);
  PaymentsConfiguration.find({ name: req.params.name }).exec(function (
    err,
    doc
  ) {
    if (err) {
      console.log("Error in finding PaymentsConfiguration from DB");
      return res.status(500).json({ err });
    } else {
      // console.log("PaymentsConfigurationData", doc);
      console.log(
        "PaymentsConfiguration get request call from DB Successfully"
      );

      return res.status(200).json({ doc });
    }
  });
};
// Update PaymentsConfiguration
exports.update = function (req, res) {
  const _id = req.params.id;
  // console.log("coming", req.body);
  console.log("coming", req.body.paymentsConfiguration[0]);
  PaymentsConfiguration.findByIdAndUpdate(
    _id,
    req.body.paymentsConfiguration[0],
    {
      useFindAndModify: false,
      new: true,
    }
  )
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update PaymentsConfiguration with id=${_id}. Maybe PaymentsConfiguration was not found!`,
        });
      } else {
        // console.log("data", data);
        res.send({ message: "PaymentsConfigurationUpdatedSuccessfully" });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating PaymentsConfiguration with id=" + _id,
      });
    });
};
//----------------Upload Swish Docs-------------
exports.uploadSwishPemCertFile = function (req, res) {
  let form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    // console.log("fields",fields)
    // console.log("files",files)
    if (fields.paymentsConfigurationId) {
      let oldpath = files.file.path;
      let newpath =
        "../../Netlex-user/netlex-user-be-dev/certificate/" +
        "Swish_Merchant_TestCertificate_" +
        // fields.paymentsConfigurationId +
        "_pem"+
        path.extname(files.file.name);
      console.log("newpath", newpath);

      mv(oldpath, newpath, function (err) {
        if (err) {
          console.error(err);
          res.status(404).json({ error: "swishFileNotUploaded" });
        } else {
          PaymentsConfiguration.findByIdAndUpdate(fields.paymentsConfigurationId, {swish_pem_cert: newpath}, function (err, result) {
                if (err) {
                    console.error(err);
                    return res.status(404).json({error: "swishFileNotUploaded"});
                }
            });
          res.status(200).json({ success: "swishFileUpdated" });
        }
      });
    }
  });
};
exports.uploadSwishKeyCertFile = function (req, res) {
  let form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    // console.log("fields",fields)
    // console.log("files",files)
    if (fields.paymentsConfigurationId) {
      let oldpath = files.file.path;
      let newpath =
        "../../Netlex-user/netlex-user-be-dev/certificate/" +
        "Swish_Merchant_TestCertificate_" +
        // fields.paymentsConfigurationId +
        "_key"+
        path.extname(files.file.name);
      console.log("newpath", newpath);

      mv(oldpath, newpath, function (err) {
        if (err) {
          console.error(err);
          res.status(404).json({ error: "swishFileNotUploaded" });
        } else {
          PaymentsConfiguration.findByIdAndUpdate(fields.paymentsConfigurationId, {swish_key_cert: newpath}, function (err, result) {
                if (err) {
                    console.error(err);
                    return res.status(404).json({error: "swishFileNotUploaded"});
                }
            });
          res.status(200).json({ success: "swishFileUpdated" });
        }
      });
    }
  });
};
exports.uploadSwishPemRootFile = function (req, res) {
  let form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    // console.log("fields",fields)
    // console.log("files",files)
    if (fields.paymentsConfigurationId) {
      let oldpath = files.file.path;
      let newpath =
        "../../Netlex-user/netlex-user-be-dev/certificate/" +
        "Swish_TLS_RootCA_" +
        // fields.paymentsConfigurationId +
         "_pem"+
        path.extname(files.file.name);
      console.log("newpath", newpath);

      mv(oldpath, newpath, function (err) {
        if (err) {
          console.error(err);
          res.status(404).json({ error: "swishFileNotUploaded" });
        } else {
          PaymentsConfiguration.findByIdAndUpdate(fields.paymentsConfigurationId, {swish_pem_root: newpath}, function (err, result) {
                if (err) {
                    console.error(err);
                    return res.status(404).json({error: "swishFileNotUploaded"});
                }
            });
          res.status(200).json({ success: "swishFileUpdated" });
        }
      });
    }
  });
};
// //for check
// exports.fetch = async function (){
//   //   //Fetch swishConfiguration
//   // let paymentsConfiguration = await PaymentsConfiguration.find({
//   //   name: "swishConfiguration",
//   // });
//   // console.log("PaymentsConfigurationSwish", paymentsConfiguration);
// }
// exports.getPaymentsConfiguration = function (req, res) {
//   PaymentsConfiguration.find().exec(function (err, doc) {
//     if (err) {
//       console.log("Error in finding PaymentsConfiguration from DB");
//       return res.status(500).json({ err });
//     } else {
//       console.log("PaymentsConfiguration get request call from DB Successfully");
//       return res.status(200).json({ doc });
//     }
//   });
// };

// //---for first time only---
// //To Save New KlarnaConfiguration
// exports.save = function (req, res) {
//   console.log("req.body.paymentsConfiguration", req.body);
//   let {  klarna_confirm_url, klarna_userName, klarna_password,name } =
//   req.body;
//   // req.body.paymentsConfiguration;

//   if (!klarna_confirm_url || !klarna_userName || !klarna_password ||!name) {
//     res.status(404).json({ error: "MissingParameters" });
//     return;
//   }
//   let paymentsConfiguration = new PaymentsConfiguration();

//   // paymentsConfiguration.klarna_payment_url = klarna_payment_url;
//   paymentsConfiguration.klarna_confirm_url = klarna_confirm_url;
//   paymentsConfiguration.klarna_userName = klarna_userName;
//   paymentsConfiguration.klarna_password = klarna_password;
//   paymentsConfiguration.name = name;

//   paymentsConfiguration.save((err, savedData) => {
//     if (err) {
//       console.log("err", err);
//       return res.status(404).json({ error: "ErrorWhileSaveTryAgain" });
//     }
//     res.status(200).json(savedData);
//   });
// };

// //To Save New SwishConfiguration
// exports.save = function (req, res) {
//   console.log("req.body.paymentsConfiguration", req.body);
//   let {
//     swish_pem_cert,
//     swish_key_cert,
//     swish_pem_root,
//     swish_passPhrase,
//     swish_payeeAlias,
//     swish_payeePaymentReference,
//     swish_payerAlias,
//     name,
//   } = req.body;
//   // req.body.paymentsConfiguration;

//   if (
//     !swish_pem_cert ||
//     !swish_key_cert ||
//     !swish_pem_root ||
//     !swish_passPhrase ||
//     !swish_payeeAlias ||
//     !swish_payeePaymentReference ||
//     !swish_payerAlias ||
//     !name
//   ) {
//     res.status(404).json({ error: "MissingParameters" });
//     return;
//   }
//   let paymentsConfiguration = new PaymentsConfiguration();

//   paymentsConfiguration.swish_pem_cert = swish_pem_cert;
//   paymentsConfiguration.swish_key_cert = swish_key_cert;
//   paymentsConfiguration.swish_pem_root = swish_pem_root;
//   paymentsConfiguration.swish_passPhrase = swish_passPhrase;
//   paymentsConfiguration.swish_payeeAlias = swish_payeeAlias;
//   paymentsConfiguration.swish_payeePaymentReference =
//     swish_payeePaymentReference;
//   paymentsConfiguration.swish_payerAlias = swish_payerAlias;
//   paymentsConfiguration.name = name;

//   paymentsConfiguration.save((err, savedData) => {
//     if (err) {
//       console.log("err", err);
//       return res.status(404).json({ error: "ErrorWhileSaveTryAgain" });
//     }
//     res.status(200).json(savedData);
//   });
// };

// //To Save New StripeConfiguration
// exports.save = function (req, res) {
//   console.log("req.body.paymentsConfiguration", req.body);
//   let {
//     stripe_secret_key,
//     // stripe_success_url,
//     // stripe_sale_success_url,
//     // stripe_cancel_url,
//     name,
//   } = req.body;
//   // req.body.paymentsConfiguration;

//   if (
//     !stripe_secret_key ||
//     // !stripe_success_url ||
//     // !stripe_sale_success_url ||
//     // !stripe_cancel_url ||
//     !name
//   ) {
//     res.status(404).json({ error: "MissingParameters" });
//     return;
//   }
//   let paymentsConfiguration = new PaymentsConfiguration();

//   paymentsConfiguration.stripe_secret_key = stripe_secret_key;
//   // paymentsConfiguration.stripe_success_url = stripe_success_url;
//   // paymentsConfiguration.stripe_sale_success_url = stripe_sale_success_url;
//   // paymentsConfiguration.stripe_cancel_url = stripe_cancel_url;
//   paymentsConfiguration.name = name;

//   paymentsConfiguration.save((err, savedData) => {
//     if (err) {
//       console.log("err", err);
//       return res.status(404).json({ error: "ErrorWhileSaveTryAgain" });
//     }
//     res.status(200).json(savedData);
//   });
// };

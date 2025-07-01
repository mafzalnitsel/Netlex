
const FindUs = require("../models/find-us");
bcrypt = require("bcryptjs");


exports.getActiveFindUs = function (req, res) {
  FindUs.find().exec(function (err, doc) {
    if (err) {
      console.log("Error in finding FindUs from DB");
      return res.status(500).json({ err });
    } else {
      console.log("FindUs get request call from DB Successfully");

      return res.status(200).json({ doc });
    }
  });
};

// To Show List FindUs
exports.list = function (req, res) {
  try {
    const query = {};
    const page = +(req.query.page || 1);
    const limit = +(req.query.limit || 10);
    const options = {
      page: page,
      limit: limit,
    };

    FindUs.paginate(query, options).then(function (result) {
      // console.log('result', result);
      res.json(result);
    });
  } catch (error) {
    res.status(404).json({ error: "Please try again" });
  }
};

// To Save New FindUs
exports.save = function (req, res) {
  console.log("req.body.findUs",req.body.findUs)
  let { office_Name , office_Address, office_Email, office_Contact } = req.body.findUs;
  // let { heading , description } = req.body;
  if (!office_Name || !office_Address || !office_Email || !office_Contact) {
    res.status(404).json({ error: "MissingParameters" });
    return;
  }
  let findUs = new FindUs();

  // office_Name: String,
  // office_Address: String,
  // office_Email: String,
  // office_Contact: String,

  //vvvvv  To add heading mark automatically with every data enter in heading field vvvvvv //
  // findUs.heading = `${heading}?`;

  findUs.office_Name = office_Name;
  findUs.office_Address = office_Address;
  findUs.office_Email = office_Email;
  findUs.office_Contact = office_Contact;

  findUs.save((err, savedData) => {
    if (err) {
      console.log("err", err);
      return res.status(404).json({ error: "ErrorWhileSaveTryAgain" });
    }
    res.status(200).json(savedData);
  });
};


exports.show = function (req, res) {
  FindUs.findById(req.params.id).exec(function (err, doc) {
    if (err || doc === null) {
      res.status(404).json({ error: "FindUsNotFound" });
    } else {
      res.json(doc);
    }
  });
};

exports.delete = async (req, res) => {
  console.log('req.params.id',req.params.id)

  const headingdescription = await FindUs.findById(req.params.id);
  if(headingdescription) {
    FindUs.findByIdAndDelete(req.params.id)
          .exec(function (err) {
              if (err) {
                  console.error(err);
                  res.status(404).json({error: 'UserNotFound'});
                  console.log('eeeeeeeeeeeeeerror',err)
              } else {
                  
                  res.status(200).json({success: 'FindUsDeleted'});
              }
          });
  }
};

exports.update = function (req, res) {
  const _id = req.params.id;
  console.log('coming',req.body.findUs[0])
  // console.log('coming222222 req.body',req.body)
  FindUs.findByIdAndUpdate(_id, req.body.findUs[0], {
    useFindAndModify: false, new:true
  })
  .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update FindUs with id=${_id}. Maybe FindUs was not found!`,
        });
      } else {
        console.log('data',data)
        res.send({ message: "FindUs was updated successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating FindUs with id=" + _id,
      });
    });
};

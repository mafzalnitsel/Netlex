
const AboutUs = require("../models/about-us");
bcrypt = require("bcryptjs");


exports.getActiveAboutUs = function (req, res) {
  AboutUs.find().exec(function (err, doc) {
    if (err) {
      console.log("Error in finding AboutUs from DB");
      return res.status(500).json({ err });
    } else {
      console.log("AboutUs get request call from DB Successfully");

      return res.status(200).json({ doc });
    }
  });
};

// To Show List AboutUs
exports.list = function (req, res) {
  try {
    const query = {};
    const page = +(req.query.page || 1);
    const limit = +(req.query.limit || 10);
    const options = {
      page: page,
      limit: limit,
    };

    AboutUs.paginate(query, options).then(function (result) {
      // console.log('result', result);
      res.json(result);
    });
  } catch (error) {
    res.status(404).json({ error: "Please try again" });
  }
};

// To Save New AboutUs
exports.save = function (req, res) {
  console.log("req.body.aboutUs",req.body.aboutUs)
  let { heading , description } = req.body.aboutUs;
  // let { heading , description } = req.body;
  if (!heading || !description) {
    res.status(404).json({ error: "MissingParameters" });
    return;
  }
  let aboutUs = new AboutUs();

  //vvvvv  To add heading mark automatically with every data enter in heading field vvvvvv //
  // aboutUs.heading = `${heading}?`;

  aboutUs.heading = heading;
  aboutUs.description = description;

  aboutUs.save((err, savedData) => {
    if (err) {
      console.log("err", err);
      return res.status(404).json({ error: "ErrorWhileSaveTryAgain" });
    }
    res.status(200).json(savedData);
  });
};


exports.show = function (req, res) {
  AboutUs.findById(req.params.id).exec(function (err, doc) {
    if (err || doc === null) {
      res.status(404).json({ error: "AboutUsNotFound" });
    } else {
      res.json(doc);
    }
  });
};

exports.delete = async (req, res) => {
  console.log('req.params.id',req.params.id)

  const headingdescription = await AboutUs.findById(req.params.id);
  if(headingdescription) {
    AboutUs.findByIdAndDelete(req.params.id)
          .exec(function (err) {
              if (err) {
                  console.error(err);
                  res.status(404).json({error: 'UserNotFound'});
                  console.log('eeeeeeeeeeeeeerror',err)
              } else {
                  
                  res.status(200).json({success: 'AboutUsDeleted'});
              }
          });
  }
};

exports.update = function (req, res) {
  const _id = req.params.id;
  console.log('coming',req.body.aboutUs[0])
  // console.log('coming222222 req.body',req.body)
  AboutUs.findByIdAndUpdate(_id, req.body.aboutUs[0], {
    useFindAndModify: false, new:true
  })
  .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update AboutUs with id=${_id}. Maybe AboutUs was not found!`,
        });
      } else {
        console.log('data',data)
        res.send({ message: "AboutUs was updated successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating AboutUs with id=" + _id,
      });
    });
};

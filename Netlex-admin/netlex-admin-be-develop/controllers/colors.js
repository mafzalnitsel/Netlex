const Colors = require("../models/colors");
bcrypt = require("bcryptjs");

exports.getColors = function (req, res) {
  Colors.find().exec(function (err, doc) {
    if (err) {
      console.log("Error in finding Colors from DB");
      return res.status(500).json({ err });
    } else {
      console.log("Colors get request call from DB Successfully");

      return res.status(200).json({ doc });
    }
  });
};

// To Show List Colors
exports.list = function (req, res) {
  try {
    const query = {};
    const page = +(req.query.page || 1);
    const limit = +(req.query.limit || 10);
    const options = {
      page: page,
      limit: limit,
    };

    Colors.paginate(query, options).then(function (result) {
      // console.log('result', result);
      res.json(result);
    });
  } catch (error) {
    res.status(404).json({ error: "Please try again" });
  }
};

// To Save New Colors
exports.save = function (req, res) {
  // console.log("req.body.colors", req.body.colors);
  let { colorName, colorCode } = req.body.colors;
  if (!colorName || !colorCode) {
    res.status(404).json({ error: "MissingParameters" });
    return;
  }
  // let colorsObj = {
  //   colorName: colorName,
  //   colorCode: colorCode,
  // };
  let colors = new Colors();
  // colors.color = colorsObj;
  colors.colorName = colorName;
  colors.colorCode = colorCode;

  colors.save((err, savedData) => {
    if (err) {
      console.log("err", err);
      return res.status(404).json({ error: "ErrorWhileSavingColorTryAgain" });
    }
    console.log("savedData",savedData)
    res.status(200).json(savedData);
  });
};

exports.show = function (req, res) {
  Colors.findById(req.params.id).exec(function (err, doc) {
    if (err || doc === null) {
      res.status(404).json({ error: "ColorsNotFound" });
    } else {
      res.json(doc);
    }
  });
};

exports.delete = async (req, res) => {
  console.log("req.params.id", req.params.id);

  const colorNameAnswer = await Colors.findById(req.params.id);
  if (colorNameAnswer) {
    Colors.findByIdAndDelete(req.params.id).exec(function (err) {
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

exports.update = function (req, res) {
  const _id = req.params.id;
  // console.log('coming',req.body.colors[0])
  // console.log('coming req.body',req.body)
  Colors.findByIdAndUpdate(_id, req.body.colors[0], {
    useFindAndModify: false,
    new: true,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Colors with id=${_id}. Maybe Colors was not found!`,
        });
      } else {
        // console.log('data',data)
        res.send({ message: "Colors was updated successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Colors with id=" + _id,
      });
    });
};

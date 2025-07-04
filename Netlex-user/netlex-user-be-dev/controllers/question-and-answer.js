const QuestionAndAnswer = require("../models/question-and-answer");
bcrypt = require("bcryptjs");

exports.getActiveQuestionAndAnswer = function (req, res) {
  QuestionAndAnswer.find().exec(function (err, doc) {
    console.log(doc);

    if (err) {
      console.log("Error in finding QuestionAndAnswer from DB");
      return res.status(500).json({ err });
    } else {
      console.log("QuestionAndAnswer get request call from DB Successfully");

      return res.status(200).json({ doc });
    }
  });
};

// To Show List QuestionAndAnswer
exports.list = function (req, res) {
  try {
    const query = {};
    const page = +(req.query.page || 1);
    const limit = +(req.query.limit || 10);
    const options = {
      page: page,
      limit: limit,
    };

    QuestionAndAnswer.paginate(query, options).then(function (result) {
      // console.log('result', result);
      res.json(result);
    });
  } catch (error) {
    res.status(404).json({ error: "Please try again" });
  }
};

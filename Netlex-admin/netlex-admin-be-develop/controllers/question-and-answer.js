
const QuestionAndAnswer = require("../models/question-and-answer");
bcrypt = require("bcryptjs");


exports.getActiveQuestionAndAnswer = function (req, res) {
  QuestionAndAnswer.find().exec(function (err, doc) {
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

// To Save New QuestionAndAnswer
exports.save = function (req, res) {
  console.log("req.body.questionAndAnswer",req.body.questionAndAnswer)
  let { question , answer , category} = req.body.questionAndAnswer;
  if (!question || !answer || !category) {
    res.status(404).json({ error: "MissingParameters" });
    return;
  }
  let questionAndAnswer = new QuestionAndAnswer();

  //vvvvv  To add question mark automatically with every data enter in question field vvvvvv //
  // questionAndAnswer.question = `${question}?`;

  questionAndAnswer.question = question;
  questionAndAnswer.answer = answer;
  questionAndAnswer.category = category;

  questionAndAnswer.save((err, savedData) => {
    if (err) {
      console.log("err", err);
      return res.status(404).json({ error: "ErrorWhileSaveTryAgain" });
    }
    res.status(200).json(savedData);
  });
};


exports.show = function (req, res) {
  QuestionAndAnswer.findById(req.params.id).exec(function (err, doc) {
    if (err || doc === null) {
      res.status(404).json({ error: "QuestionAndAnswerNotFound" });
    } else {
      res.json(doc);
    }
  });
};

exports.delete = async (req, res) => {
  console.log('req.params.id',req.params.id)

  const questionAnswer = await QuestionAndAnswer.findById(req.params.id);
  if(questionAnswer) {
    QuestionAndAnswer.findByIdAndDelete(req.params.id)
          .exec(function (err) {
              if (err) {
                  console.error(err);
                  res.status(404).json({error: 'UserNotFound'});
                  console.log('eeeeeeeeeeeeeerror',err)
              } else {
                  
                  res.status(200).json({success: 'QuestionAndAnswerDeleted'});
              }
          });
  }
};

exports.update = function (req, res) {
  const _id = req.params.id;
  // console.log('coming',req.body.questionAndAnswer[0])
  // console.log('coming req.body',req.body)
  QuestionAndAnswer.findByIdAndUpdate(_id, req.body.questionAndAnswer[0], {
    useFindAndModify: false, new:true
  })
  .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update QuestionAndAnswer with id=${_id}. Maybe QuestionAndAnswer was not found!`,
        });
      } else {
        // console.log('data',data)
        res.send({ message: "QuestionAndAnswer was updated successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating QuestionAndAnswer with id=" + _id,
      });
    });
};
exports.updateHeadingDesc = function (req, res) {
  const _id = req.params.id;
  // console.log('coming',req.body.questionAndAnswer[0])
  // console.log('coming req.body',req.body)
  QuestionAndAnswer.findByIdAndUpdate(_id, req.body.questionAndAnswer[0], {
    useFindAndModify: false, new:true
  })
  .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update QuestionAndAnswer with id=${_id}. Maybe QuestionAndAnswer was not found!`,
        });
      } else {
        // console.log('data',data)
        res.send({ message: "QuestionAndAnswer was updated successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating QuestionAndAnswer with id=" + _id,
      });
    });
};
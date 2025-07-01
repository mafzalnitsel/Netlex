const ClientsDetailsQuestion = require('../models/clientsDetailsQuestion.js');
// const User = require('../models/user.js');
const Userfe = require('../models/userfe.js');

exports.save = function (req, res) {
  console.log("req.body", req.body)

  let { question, placeholder, type } = req.body.questionDetails;
  // console.log('question', question);
  // console.log('placeholder', placeholder);
  // console.log('type', type);
  if (!question || !placeholder || !type) {
    res.status(404).json({ error: "MissingParameters" });
    return;
  }
  let clientsDetailsQuestion = new ClientsDetailsQuestion();
  clientsDetailsQuestion.question = question;
  clientsDetailsQuestion.placeholder = placeholder;
  clientsDetailsQuestion.type = type;
  // clientsDetailsQuestion.status = 'new';

  clientsDetailsQuestion.save((err, savedData) => {
    if (err) {
      console.log("Error while saving agreement requests", err);
      return res.status(404).json({ error: "ErrorWhileSaveTryAgain" });
    }
    // console.log('savedData', savedData);
    res.status(200).json(savedData);
  });
};

exports.getClientsDetailsQuestionById = function (req, res) {
  // console.log('req.params',req.params);
  // let { id } = req.query;
  ClientsDetailsQuestion.findById(req.params.id)
    .exec(function (err, data) {
      if (err) {
        return res.status(500).json({ err })
      } else {
        console.log('data', data);
        // return res.status(200).json({ data })
        return res.status(200).json(data)
      }
    });
};

exports.getList = function (req, res) {
  console.log('req.query ClientsDetailsQuestion', req.query);
  try {
    const query = {};
    const page = +(req.query.page || 1);
    const limit = +(req.query.limit || 10);
    // const status = req.query.status;
    const options = {
      page: page,
      limit: limit,
    };
    // if (status) {
    //   query.status = { $eq: status };
    // }
    ClientsDetailsQuestion.paginate(query, options).then(function (result) {
      // console.log('result', result);
      res.json(result);
    });
  } catch (error) {
    res.status(404).json({ error: "Please try again" });
  }
};

exports.delete = async (req, res) => {
  // console.log('req.params.id', req.params.id)

  const clientsDetailsQuestion = await ClientsDetailsQuestion.findById(req.params.id);
  if (clientsDetailsQuestion) {
    ClientsDetailsQuestion.findByIdAndDelete(req.params.id)
      .exec(function (err) {
        if (err) {
          console.error(err);
          res.status(404).json({ error: 'ClientsDetailsQuestionNotFound' });
          console.log('Error while updating ClientsDetailsQuestion', err)
        } else {

          res.status(200).json({ success: 'ClientsDetailsQuestionDeleted' });
        }
      });
  }
};

exports.update = function (req, res) {
  const _id = req.params.id;
  // console.log('coming',req.body.aboutUs[0])
  console.log('coming222222 req.body', req.body)
  ClientsDetailsQuestion.findByIdAndUpdate(_id, req.body.questionDetails, {
    useFindAndModify: false, new: true
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update ClientsDetailsQuestion with id=${_id}. Maybe ClientsDetailsQuestion was not found!`,
        });
      } else {
        console.log('data', data)
        res.send({ message: "ClientsDetailsQuestion was updated successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating ClientsDetailsQuestion with id=" + _id,
      });
    });
};

exports.getAll = function (req, res) {
  ClientsDetailsQuestion.find().exec(function (err, doc) {
    if (err) {
      console.log("Error in finding ClientsDetailsQuestion from DB");
      return res.status(500).json({ err });
    } else {
      // console.log('doc',doc);
      console.log("ClientsDetailsQuestion get request call from DB Successfully");
      return res.status(200).json({ doc });
    }
  });
};
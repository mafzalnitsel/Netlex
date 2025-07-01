const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
// Define the MongoDB schema for the Field collection
const fieldCoreSchema = new Schema({
  name: {type: String},
  question: String,
  answerType: String,
  placeHolder: String,
  questionMark: String,
  answerValue: [String],
});

const subQuestionSchema = new Schema({
  field: fieldCoreSchema,
  isFilled: String,
  conditionOperator: String,
  conditionValue: String
});

const fieldSchema = new Schema({
  field: fieldCoreSchema,
  subQuestion: subQuestionSchema,
  isGlobal: String,
  documentTemplateId: {type: String, default: ''}
});
const myDB = mongoose.connection.useDb('netlexadmin');

module.exports = myDB.model("Fields", fieldSchema);

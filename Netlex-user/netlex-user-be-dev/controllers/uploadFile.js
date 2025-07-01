const fs = require('fs');
const AWS = require('aws-sdk');
const ID = 'AKIA4ZIGVAGA4EJOOLYK';
const SECRET = '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';
const BUCKET_NAME = 'scheduleattachment';
  const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
  });

//s3 bucket
const uploadFile = (file, fileName) => {

    fileType = new Buffer(file.replace(/^data:pdf\/\w+;pdf,/, ""));

    const params = {
        Bucket: BUCKET_NAME,
        Key: fileName,
        Body: fileType,
        ContentEncoding: 'pdf',
        ContentType: 'file/pdf'
    };

     // Uploading files to the bucket
    s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    });
  };

exports.uploadFile = function (req,res){
    uploadFile(req.body.data,req.body.data);

  }

// exports.getProfilePic = function (req, res) {
//
//     const params = {
//         Bucket: BUCKET_NAME,
//         Key: req.body.userName,
//     };
//
//     s3.getObject(params, function(err, data) {
//         const json = JSON.stringify({ blob: data.Body.toString("base64") });
//         res.status(200).json({'msg': json})
//     });
// }

const fs = require('fs');
const AWS = require('aws-sdk');
const ID = 'AKIA4ZIGVAGARN32EPQK';
const SECRET = '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';
const BUCKET_NAME = 'netlexprofilepics';
const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});

const uploadFile = (file, fileName) => {

    bodayImage = new Buffer(file.replace(/^data:image\/\w+;base64,/, ""),'base64');

    const params = {
        Bucket: BUCKET_NAME,
        Key: fileName,
        Body: bodayImage,
        ContentEncoding: 'base64',
        ContentType: 'image/jpeg'
    };


    s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
    });
};

exports.uploadProfile = function (req,res){
    uploadFile(req.body.image,req.body.userName);

}

exports.getProfilePic = function (req, res) {

    const params = {
        Bucket: BUCKET_NAME,
        Key: req.body.userName,
    };

    s3.getObject(params, function(err, data) {
        const json = JSON.stringify({ blob: data.Body.toString("base64") });
        res.status(200).json({'msg': json})
    });
}

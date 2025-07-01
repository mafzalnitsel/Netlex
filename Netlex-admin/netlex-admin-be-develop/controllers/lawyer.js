
const Lawyer = require('../models/lawyer');
const res = require("express");
const formidable = require("formidable");
const mv = require("mv");
const path = require("path");
const lawyerService=require('../services/lawyer-service');
// Get active Lawyers
exports.getActiveLawyers = async(req, res, next)=> {
    const lawyers = await lawyerService.getActiveLawyers();
    return res.json({lawyers});
};
exports.getLawyersEmailWithAvailability = async(req, res, next)=> {
    return await   lawyerService.getLawyersEmailWithAvailability(req,res);
   // const lawyers = await lawyerService.getLawyersEmailWithAvailability(req);
   // return res.json({lawyers});
};
exports.getActiveLawyersList = function (req, res) {

    Lawyer.find()
        .exec(function (err, lawyer) {
            if (err) {
                return res.status(500).json({err})
            } else {
                return res.status(200).json({lawyer})
            }
        });
};
// post data
exports.save = function (req, res) { // save and update document
    let {firstName, lastName, email, status, totalMeetingAssigned ,
        phoneNumber, training, languages, activityArea, title, multipleLanguages,languagesOptions , lawyerPic,showLawyerToUser } = req.body.lawyer;
//    console.log("req.body in lawyer(Save)", req.body.lawyer);
    if (!email || !firstName || !lastName || !phoneNumber || !training || !languages || !activityArea || !title /*|| !multipleLanguages*/
         || !languagesOptions) {            
        res.status(404).json({error: "MissingParameter"});
        return;
    }
    
    let lawyer = new Lawyer();
    
    lawyer.firstName = firstName;
    lawyer.lastName = lastName;
    lawyer.email = email;
    lawyer.status = status;
    lawyer.totalMeetingAssigned = totalMeetingAssigned;
    lawyer.phoneNumber = phoneNumber;
    lawyer.training = training;
    lawyer.languages = languages;
    lawyer.activityArea = activityArea;
    lawyer.title = title;
    lawyer.multipleLanguages = multipleLanguages;
    lawyer.languagesOptions = languagesOptions;
    lawyer.lawyerPic = lawyerPic;
    lawyer.showLawyerToUser = showLawyerToUser;

   
    lawyer.save((err, savedLaywer) => {
            // console.log('lawyer post data');

            // sending err msg
            if (err) {
                console.error(err);
                res.status(404).json({error: "ErrorWhileSavingDoc", message: err});
                return;
            }
            res.status(200).json(savedLaywer);
        });
    };
    exports.show = function (req, res) {
        // console.log("req.params.id:"+ req.params.id);
        console.log('Lawer-showing-body-data-Foc-Check---',req.body);
        Lawyer.findById(req.params.id)
            .exec(function (err, doc) {
                if (err || doc === null) {
                    res.status(404).json({error: 'UserNotFound'});
                } else {
                    console.log('doc---',doc);
                    res.json(doc);
                }
            });
    };

    exports.list = function (req, res) {
        try {
            const query = {};
            const page = +(req.query.page || 1);
            const limit = +(req.query.limit || 10);
            const options = {
                page: page,
                limit: limit
            };
            if (req.user.roles === "Advokat") {
                query.roles = " ";
            } else if (req.user.roles === "Administration") {
                
                query.status = {$eq: 'Aktiv'}
            }
    
            Lawyer.paginate(query, options).then(function (result) {
                // console.log('result', result);
                res.json(result);
            });
        } catch (error) {
            res.status(404).json({error: 'Please try again'})
        }
    };

    exports.delete = async (req, res) => {
        const lawyer = await Lawyer.findById(req.params.id);
        if(lawyer) {
            Lawyer.findByIdAndDelete(req.params.id)
                .exec(function (err) {
                    if (err) {
                        console.error(err);
                        res.status(404).json({error: 'UserNotFound'});
                    } else {
                        
                        res.status(200).json({success: 'LawyerDeleted'});
                    }
                });
        }
    };
    exports.Lawyerupdate = function (req, res) {
        console.log('Lawer-updating-body-data-Foc-Check---',req.body);
        console.log("req.body.lawyer[0]",req.body.lawyer[0])
        const _id = req.params.id;
        
        Lawyer.findByIdAndUpdate(_id, req.body.lawyer[0],  { useFindAndModify: false })
            .then(data => {
                if (!data) {
                    res.status(404).send({
                        message: `Cannot update lawyer with id=${_id}. Maybe lawyer was not found!`
                    });
                } else res.send({ message: "lawyer was updated successfully." });
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error updating lawyer with id=" + _id
                });
            });
    
    }

    // exports.Lawyerupdate = function (req, res) { 
    //     if (!req.body) {
    //         res.status(404).json({error: "MissingParameter"});
    //         return;
    //     }
    
    
    //     Lawyer.findByIdAndUpdate(req.body._id, req.body, function (err, result) {
    //         if (err) {
    //             return res.status(404).json({error: "Can't update the job. Please try again"});
    //         }
    //         res.status(200).json(result);
    //     });
    // }


//----------------Upload Lawyer Pic-------------
    exports.uploadLawyerPic = function (req, res) {

        let form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
      
            if(fields.lawyerId) {
                let oldpath = files.file.path;
                let newpath = 'lawyerPics/Pic_' + fields.lawyerId + path.extname(files.file.name);
        console.log('newpath',newpath)
      
                mv(oldpath, 'uploadedFiles/' + newpath, function (err) {
                    if (err) {
                        console.error(err);
                        res.status(404).json({error: 'lawyerPicNotUploaded'});
                    } else {

                        Lawyer.findByIdAndUpdate(fields.lawyerId, {lawyerPic: newpath}, function (err, result) {
                            if (err) {
                                console.error(err);
                                return res.status(404).json({error: "lawyerPicNotUploaded"});
                            }
                        });
                        res.status(200).json({success: 'lawyerPicUpdated'});
                    }
                });
            }
        });
      };

// Get Lawyer's availability for meeting schedule
exports.getLawyersWithAvailability = async(req, res, next)=> {
    return await lawyerService.getLawyersWithAvailability(req, res);
    // return res.json({lawyerAvailability});
};

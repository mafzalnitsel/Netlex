
const ContentPage = require("../models/contentPage")
const Schedule = require('../models/schedule');
// const Utils = require("../helper/util");
const formidable = require("formidable");
const mv = require("mv");
const path = require("path");
bcrypt = require("bcryptjs");

// Get all Data
exports.getActiveContentPage = function (req, res) {
  // console.log('req.params.name',req.params.name)
  ContentPage.find({name : req.params.name}).exec(function (err, doc) {
    if (err) {
      console.log("Error in finding ContentPage from DB");
      return res.status(500).json({ err });
    } else {
      console.log("ContentPage get request call from DB Successfully");

      return res.status(200).json({ doc });
    }
  });
};

exports.update = function (req, res) {
  console.log("req.body",req.body.contentPages[0])
  const _id = req.params.id;
  ContentPage.findByIdAndUpdate(_id, req.body.contentPages[0], {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update ContentPage with id=${_id}. Maybe ContentPage was not found!`,
        });
      } else {
        res.send({ message: "ContentPage was updated successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating ContentPage with id=" + _id,
      });
    });
};
//Home Images Upload
exports.publishHeaderPics = (req, res) =>{
    // console.log("req.body",req.body)
    id = req.params.id;
    headerPic = req.body.publishData.headerPic;
    publish = req.body.publishData.publish;
    // console.log("id",id)
    // let agreementHeaderImgExist = fields.agreementHeaderImgExist=='true' ? true : false;
    ContentPage.findByIdAndUpdate(id, {[headerPic]: publish},{new: true}, function (err, result) {
        if (err) {
            console.error(err);
            return res.status(404).json({error: "HeaderImagePublishFailed"});
        }
        console.log("result",result)
    });
    res.status(200).json({success: 'HeaderImagePublishStatusChanges'});
}
exports.changeHomeHeaderPic = function (req, res) {
  let form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
  // console.log('fieldsddddddddd',fields)
  // console.log('filessssssssssss',files)

      if(fields.homePageId) {
          let oldpath = files.file.path;
          let newpath = 'homePagepics/homeHeaderPic_' + fields.homePageId  + path.extname(files.file.name);

          mv(oldpath, 'uploadedFiles/' + newpath, function (err) {
              if (err) {
                  console.error(err);
                  res.status(404).json({error: 'homeHeaderPicNotUploaded'});
              } else {
                ContentPage.findByIdAndUpdate(fields.homePageId, {homeHeaderPic: newpath}, function (err, result) {
                      if (err) {
                          console.error(err);
                          return res.status(404).json({error: "homeHeaderPicNotUploaded"});
                      }
                  });
                  res.status(200).json({success: 'homeHeaderPicUpdated'});
              }
          });
      }
  });
};
exports.changeHomeHeaderPicMob = function (req, res) {
  let form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
      if(fields.homePageId) {
          let oldpath = files.file.path;
          let newpath = 'homePagepics/homeHeaderMobPic_' + fields.homePageId + path.extname(files.file.name);

          mv(oldpath, 'uploadedFiles/' + newpath, function (err) {
              if (err) {
                  console.error(err);
                  res.status(404).json({error: 'homeHeaderPicMobNotUploaded'});
              } else {
                ContentPage.findByIdAndUpdate(fields.homePageId, {homeHeaderPicMob: newpath}, function (err, result) {
                      if (err) {
                          console.error(err);
                          return res.status(404).json({error: "homeHeaderPicMobNotUploaded"});
                      }
                  });
                  res.status(200).json({success: 'homeHeaderPicMobUpdated'});
              }
          });
      }
  });
};
//Services Image Upload
exports.changeIntroPic = function (req, res) {
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if(fields.homePageId) {
            let oldpath = files.file.path;
            let newpath = 'homePagepics/introPic_' + fields.homePageId + path.extname(files.file.name);
  
            mv(oldpath, 'uploadedFiles/' + newpath, function (err) {
                if (err) {
                    console.error(err);
                    res.status(404).json({error: 'IntroImgNotUploaded'});
                } else {
                  ContentPage.findByIdAndUpdate(fields.homePageId, {introImage: newpath}, function (err, result) {
                        if (err) {
                            console.error(err);
                            return res.status(404).json({error: "IntroImgNotUploaded"});
                        }
                    // console.log("result",result)
                  });
                    res.status(200).json({success: 'IntroImgUpdated'});
                }
            });
        }
    });
};
//Services Image Upload
exports.changeServicesBgPic = function (req, res) {
  let form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
      if(fields.homePageId) {
          let oldpath = files.file.path;
          let newpath = 'homePagepics/servicesBgPic_' + fields.homePageId + path.extname(files.file.name);

          mv(oldpath, 'uploadedFiles/' + newpath, function (err) {
              if (err) {
                  console.error(err);
                  res.status(404).json({error: 'servicesBgImgNotUploaded'});
              } else {
                ContentPage.findByIdAndUpdate(fields.homePageId, {servicesBgImage: newpath}, function (err, result) {
                      if (err) {
                          console.error(err);
                          return res.status(404).json({error: "servicesBgImgNotUploaded"});
                      }
                  });
                  res.status(200).json({success: 'servicesBgImgUpdated'});
              }
          });
      }
  });
};
//Footer Image Upload
exports.changeFooterBgPic = function (req, res) {
  let form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
      if(fields.homePageId) {
          let oldpath = files.file.path;
          let newpath = 'homePagepics/footerBgPic_' + fields.homePageId + path.extname(files.file.name);

          mv(oldpath, 'uploadedFiles/' + newpath, function (err) {
              if (err) {
                  console.error(err);
                  res.status(404).json({error: 'footerBgImgNotUploaded'});
              } else {
                ContentPage.findByIdAndUpdate(fields.homePageId, {footerBgImage: newpath}, function (err, result) {
                      if (err) {
                          console.error(err);
                          return res.status(404).json({error: "footerBgImgNotUploaded"});
                      }
                  console.log("result",result)
                });
                  res.status(200).json({success: 'footerBgImgUpdated'});
              }
          });
      }
  });
};
//--------|||||||--------All Pages Header Images Upload(Hero Banners)-------|||||||--------
//Agreement Header Image Upload
exports.uploadAgreementHeaderPic = function (req, res) {
  let form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    // console.log("fields",fields)
    // let agreementHeaderImgExist = fields.agreementHeaderImgExist=='true' ? true : false;
    // console.log("agreementHeaderImgExist",agreementHeaderImgExist)
      if(fields.headerImagesId) {
          let oldpath = files.file.path;
          let newpath = 'heroBanners/agreementHeaderPic_' + fields.headerImagesId + path.extname(files.file.name);

          mv(oldpath, 'uploadedFiles/' + newpath, function (err) {
              if (err) {
                  console.error(err);
                  res.status(404).json({error: 'agreementHeaderImgNotUploaded'});
              } else {
                ContentPage.findByIdAndUpdate(fields.headerImagesId, {agreementHeaderImg: newpath}, function (err, result) {
                      if (err) {
                          console.error(err);
                          return res.status(404).json({error: "agreementHeaderImgNotUploaded"});
                      }
                  });
                  res.status(200).json({success: 'agreementHeaderImgUpdated'});
              }
          });
      }
  });
};
//AgreementConfirm Header Image Upload
exports.uploadAgreementConfirmHeaderPic = function (req, res) {
  let form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
      if(fields.headerImagesId) {
          let oldpath = files.file.path;
          let newpath = 'heroBanners/agreementConfirmHeaderPic_' + fields.headerImagesId + path.extname(files.file.name);

          mv(oldpath, 'uploadedFiles/' + newpath, function (err) {
              if (err) {
                  console.error(err);
                  res.status(404).json({error: 'agreementConfirmHeaderImgNotUploaded'});
              } else {
                ContentPage.findByIdAndUpdate(fields.headerImagesId, {agreementConfirmHeaderImg: newpath}, function (err, result) {
                      if (err) {
                          console.error(err);
                          return res.status(404).json({error: "agreementConfirmHeaderImgNotUploaded"});
                      }
                  });
                  res.status(200).json({success: 'agreementConfirmHeaderImgUpdated'});
              }
          });
      }
  });
};
//Lawyer Header Image Upload
exports.uploadLawyerHeaderPic = function (req, res) {
  let form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
      if(fields.headerImagesId) {
          let oldpath = files.file.path;
          let newpath = 'heroBanners/lawyerHeaderPic_' + fields.headerImagesId + path.extname(files.file.name);
          mv(oldpath, 'uploadedFiles/' + newpath, function (err) {
              if (err) {
                  console.error(err);
                  res.status(404).json({error: 'lawyerHeaderImgNotUploaded'});
              } else {
                ContentPage.findByIdAndUpdate(fields.headerImagesId, {lawyersHeaderImg: newpath}, function (err, result) {
                      if (err) {
                          console.error(err);
                          return res.status(404).json({error: "lawyerHeaderImgNotUploaded"});
                      }
                  });
                  res.status(200).json({success: 'lawyerHeaderImgUpdated'});
              }
          });
      }
  });
};
//Scheduler Header Image Upload
exports.uploadSchedulerHeaderPic = function (req, res) {
  let form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
      if(fields.headerImagesId) {
          let oldpath = files.file.path;
          let newpath = 'heroBanners/schedulerHeaderPic_' + fields.headerImagesId + path.extname(files.file.name);

          mv(oldpath, 'uploadedFiles/' + newpath, function (err) {
              if (err) {
                  console.error(err);
                  res.status(404).json({error: 'schedulerHeaderImgNotUploaded'});
              } else {
                ContentPage.findByIdAndUpdate(fields.headerImagesId, {schedulerHeaderImg: newpath}, function (err, result) {
                      if (err) {
                          console.error(err);
                          return res.status(404).json({error: "schedulerHeaderImgNotUploaded"});
                      }
                  });
                  res.status(200).json({success: 'schedulerHeaderImgUpdated'});
              }
          });
      }
  });
};
//QuestionAnswer Header Image Upload
exports.uploadQuestionAnswerHeaderPic = function (req, res) {
  let form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
      if(fields.headerImagesId) {
          let oldpath = files.file.path;
          let newpath = 'heroBanners/questionAnswerHeaderPic_' + fields.headerImagesId + path.extname(files.file.name);

          mv(oldpath, 'uploadedFiles/' + newpath, function (err) {
              if (err) {
                  console.error(err);
                  res.status(404).json({error: 'questionAnswerHeaderImgNotUploaded'});
              } else {
                ContentPage.findByIdAndUpdate(fields.headerImagesId, {questionAnswerHeaderImg: newpath}, function (err, result) {
                      if (err) {
                          console.error(err);
                          return res.status(404).json({error: "questionAnswerHeaderImgNotUploaded"});
                      }
                  });
                  res.status(200).json({success: 'questionAnswerHeaderImgUpdated'});
              }
          });
      }
  });
};
//AboutUs Header Image Upload
exports.uploadAboutUsHeaderPic = function (req, res) {
  let form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
      if(fields.headerImagesId) {
          let oldpath = files.file.path;
          let newpath = 'heroBanners/aboutUsHeaderPic_' + fields.headerImagesId + path.extname(files.file.name);

          mv(oldpath, 'uploadedFiles/' + newpath, function (err) {
              if (err) {
                  console.error(err);
                  res.status(404).json({error: 'aboutUsHeaderImgNotUploaded'});
              } else {
                ContentPage.findByIdAndUpdate(fields.headerImagesId, {aboutUsHeaderImg: newpath}, function (err, result) {
                      if (err) {
                          console.error(err);
                          return res.status(404).json({error: "aboutUsHeaderImgNotUploaded"});
                      }
                  });
                  res.status(200).json({success: 'aboutUsHeaderImgUpdated'});
              }
          });
      }
  });
};
//FindUs Header Image Upload
exports.uploadFindUsHeaderPic = function (req, res) {
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if(fields.headerImagesId) {
            let oldpath = files.file.path;
            let newpath = 'heroBanners/findUsHeaderPic_' + fields.headerImagesId + path.extname(files.file.name);
  
            mv(oldpath, 'uploadedFiles/' + newpath, function (err) {
                if (err) {
                    console.error(err);
                    res.status(404).json({error: 'findUsHeaderImgNotUploaded'});
                } else {
                  ContentPage.findByIdAndUpdate(fields.headerImagesId, {findUsHeaderImg: newpath}, function (err, result) {
                        if (err) {
                            console.error(err);
                            return res.status(404).json({error: "findUsHeaderImgNotUploaded"});
                        }
                    });
                    res.status(200).json({success: 'findUsHeaderImgUpdated'});
                }
            });
        }
    });
  };
//Business Header Image Upload
exports.uploadBusinessHeaderPic = function (req, res) {
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if(fields.headerImagesId) {
            let oldpath = files.file.path;
            let newpath = 'heroBanners/businessHeaderPic_' + fields.headerImagesId + path.extname(files.file.name);
  
            mv(oldpath, 'uploadedFiles/' + newpath, function (err) {
                if (err) {
                    console.error(err);
                    res.status(404).json({error: 'businessHeaderImgNotUploaded'});
                } else {
                  ContentPage.findByIdAndUpdate(fields.headerImagesId, {businessHeaderImg: newpath}, function (err, result) {
                        if (err) {
                            console.error(err);
                            return res.status(404).json({error: "businessHeaderImgNotUploaded"});
                        }
                    });
                    res.status(200).json({success: 'businessHeaderImgUpdated'});
                }
            });
        }
    });
  };
//TermsConditions Header Image Upload
exports.uploadTermsConditionsHeaderPic = function (req, res) {
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if(fields.headerImagesId) {
            let oldpath = files.file.path;
            let newpath = 'heroBanners/termsConditionsHeaderPic_' + fields.headerImagesId + path.extname(files.file.name);
  
            mv(oldpath, 'uploadedFiles/' + newpath, function (err) {
                if (err) {
                    console.error(err);
                    res.status(404).json({error: 'termsConditionsHeaderImgNotUploaded'});
                } else {
                  ContentPage.findByIdAndUpdate(fields.headerImagesId, {termsConditionsHeaderImg: newpath}, function (err, result) {
                        if (err) {
                            console.error(err);
                            return res.status(404).json({error: "termsConditionsHeaderImgNotUploaded"});
                        }
                    });
                    res.status(200).json({success: 'termsConditionsHeaderImgUpdated'});
                }
            });
        }
    });
  };
  //PrivacyPolicy Header Image Upload
exports.uploadPrivacyPolicyHeaderPic = function (req, res) {
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if(fields.headerImagesId) {
            let oldpath = files.file.path;
            let newpath = 'heroBanners/privacyPolicyHeaderPic_' + fields.headerImagesId + path.extname(files.file.name);
  
            mv(oldpath, 'uploadedFiles/' + newpath, function (err) {
                if (err) {
                    console.error(err);
                    res.status(404).json({error: 'privacyPolicyHeaderImgNotUploaded'});
                } else {
                  ContentPage.findByIdAndUpdate(fields.headerImagesId, {privacyPolicyHeaderImg: newpath}, function (err, result) {
                        if (err) {
                            console.error(err);
                            return res.status(404).json({error: "privacyPolicyHeaderImgNotUploaded"});
                        }
                    });
                    res.status(200).json({success: 'privacyPolicyHeaderImgUpdated'});
                }
            });
        }
    });
  };

  exports.uploadMeetingAttachment = function (req, res) {
    console.log("redhfhhdhfjfhdj")
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
    console.log("fields.meetingId",fields.meetingId)
    console.log("fields",fields)
    console.log("files",files)
    console.log("files.file.name",files.file.name)
    if(fields.meetingId) {
    console.log("here")

            let oldpath = files.file.path;
            // let newpath = 'businessAgreements/pdfAttachment_' + fields.businessAgreementId + path.extname(files.file.name);
            let newpath = 'meetingAttachments/'+ files.file.name;
  
            mv(oldpath, 'uploadedFiles/' + newpath, function (err) {
                if (err) {
                    console.error('Error While Uploading Meeting Attachment',err);
                    // res.status(404).json({error: 'pdfAttachmentNotUploaded'});
                } else {
                    console.log('Meeting Attachment Uploaded');

                    Schedule.findByIdAndUpdate(fields.meetingId, {attachment: newpath}, function (err, result) {
                        if (err) {
                            console.error('Error While Updating Schedule',err);
                            return res.status(404).json({error: "AttachmentNotUploaded"});
                        }
                    console.log("result",result)
                  });
                    // res.status(200).json({success: 'pdfAttachmentUpdated'});
                }
            });
        }
    });
  };
// exports.changeSelectAgreementPic = function (req, res) {
//   let form = new formidable.IncomingForm();
//   form.parse(req, function (err, fields, files) {
//       if(fields.homePageId) {
//           let oldpath = files.file.path;
//           let newpath = 'homePagepics/selectAgreementPic_' + fields.homePageId + path.extname(files.file.name);

//           mv(oldpath, 'uploadedFiles/' + newpath, function (err) {
//               if (err) {
//                   console.error(err);
//                   res.status(404).json({error: 'selectAgreementImgNotUploaded'});
//               } else {
//                 ContentPage.findByIdAndUpdate(fields.homePageId, {selectAgreementImg: newpath}, function (err, result) {
//                       if (err) {
//                           console.error(err);
//                           return res.status(404).json({error: "selectAgreementImgNotUploaded"});
//                       }
//                   });
//                   res.status(200).json({success: 'selectAgreementImgUpdated'});
//               }
//           });
//       }
//   });
// };
// exports.changeFillAgreementPic = function (req, res) {
//   let form = new formidable.IncomingForm();
//   form.parse(req, function (err, fields, files) {
//       if(fields.homePageId) {
//           let oldpath = files.file.path;
//           let newpath = 'homePagepics/fillAgreementPic_' + fields.homePageId + path.extname(files.file.name);

//           mv(oldpath, 'uploadedFiles/' + newpath, function (err) {
//               if (err) {
//                   console.error(err);
//                   res.status(404).json({error: 'fillAgreementImgNotUploaded'});
//               } else {
//                 ContentPage.findByIdAndUpdate(fields.homePageId, {fillAgreementImg: newpath}, function (err, result) {
//                       if (err) {
//                           console.error(err);
//                           return res.status(404).json({error: "fillAgreementImgNotUploaded"});
//                       }
//                   });
//                   res.status(200).json({success: 'fillAgreementImgUpdated'});
//               }
//           });
//       }
//   });
// };
// exports.changePurchasePic = function (req, res) {
//   let form = new formidable.IncomingForm();
//   form.parse(req, function (err, fields, files) {
//       if(fields.homePageId) {
//           let oldpath = files.file.path;
//           let newpath = 'homePagepics/purchasePic_' + fields.homePageId + path.extname(files.file.name);

//           mv(oldpath, 'uploadedFiles/' + newpath, function (err) {
//               if (err) {
//                   console.error(err);
//                   res.status(404).json({error: 'purchaseImgNotUploaded'});
//               } else {
//                 ContentPage.findByIdAndUpdate(fields.homePageId, {purchaseImg: newpath}, function (err, result) {
//                       if (err) {
//                           console.error(err);
//                           return res.status(404).json({error: "purchaseImgNotUploaded"});
//                       }
//                   });
//                   res.status(200).json({success: 'purchaseImgUpdated'});
//               }
//           });
//       }
//   });
// };
// exports.changeAvailabilityPic = function (req, res) {
//   let form = new formidable.IncomingForm();
//   form.parse(req, function (err, fields, files) {
//       if(fields.homePageId) {
//           let oldpath = files.file.path;
//           let newpath = 'homePagepics/availabilityPic_' + fields.homePageId + path.extname(files.file.name);

//           mv(oldpath, 'uploadedFiles/' + newpath, function (err) {
//               if (err) {
//                   console.error(err);
//                   res.status(404).json({error: 'availabilityImgNotUploaded'});
//               } else {
//                 ContentPage.findByIdAndUpdate(fields.homePageId, {availabilityImg: newpath}, function (err, result) {
//                       if (err) {
//                           console.error(err);
//                           return res.status(404).json({error: "availabilityImgNotUploaded"});
//                       }
//                   });
//                   res.status(200).json({success: 'availabilityImgUpdated'});
//               }
//           });
//       }
//   });
// };

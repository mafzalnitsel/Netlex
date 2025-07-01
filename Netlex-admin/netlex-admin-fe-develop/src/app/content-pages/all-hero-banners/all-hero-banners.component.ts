import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ApiService } from "../../services/api.service";
// import {environment} from '../../../environments/environment.prod';
import { environment } from "../../../environments/environment";
import { MatSnackBar } from "@angular/material/snack-bar";
import { menuactionspagename } from "src/app/models/pagesnameandId";
import { AuthService } from "src/app/services/auth.service";
@Component({
  selector: "app-all-hero-banners",
  templateUrl: "./all-hero-banners.component.html",
  styleUrls: ["./all-hero-banners.component.scss"],
})
export class AllHeroBannersComponent implements OnInit {
  private sub: any;
  id: "";

  agreementConfirmHeaderImg: any;
  agreementHeaderImg: any;
  lawyersHeaderImg: any;
  schedulerHeaderImg: any;
  questionAnswerHeaderImg: any;
  aboutUsHeaderImg: any;
  //------------------------
  agreementConfirmHeaderFileSource: any;
  agreementHeaderFileSource: any;
  lawyersHeaderFileSource: any;
  schedulerHeaderFileSource: any;
  questionAnswerHeaderFileSource: any;
  aboutUsHeaderFileSource: any;
  findUsHeaderFileSource: any;
  businessHeaderFileSource: any;
  termsConditionHeaderFileSource: any;
  privacyPolicyHeaderFileSource: any;
  //------------------------
  imagePath: "";
  //------------------------
  agreementConfirmHeaderImgUrl: string | ArrayBuffer;
  agreementHeaderImgUrl: string | ArrayBuffer;
  lawyersHeaderImgUrl: string | ArrayBuffer;
  schedulerHeaderImgUrl: string | ArrayBuffer;
  questionAnswerHeaderImgUrl: string | ArrayBuffer;
  aboutUsHeaderImgUrl: string | ArrayBuffer;
  findUsHeaderImgUrl: any;
  businessHeaderImgUrl: any;
  termsConditionsHeaderImgUrl: string | ArrayBuffer;
  privacyPolicyHeaderImgUrl: string | ArrayBuffer;
  //------------------------

  //---------||||||||||||||||||---------------New--------------|||||||||||||||||||---------//
  total = "";
  showloading = false;
  alert: { success: boolean; text: string } = { success: true, text: "" };
  // dontPublishImages = {
  //     findUsHeaderImgExist: 'false',
  //     lawyersHeaderImgExist: 'false',
  //     aboutUsHeaderImgExist: 'false',
  //     businessHeaderImgExist: 'false',
  //     agreementHeaderImgExist: 'false',
  //     schedulerHeaderImgExist: 'false',
  //     privacyPolicyHeaderImgExist: 'false',
  //     questionAnswerHeaderImgExist: 'false',
  //     termsConditionsHeaderImgExist: 'false',
  //     agreementConfirmHeaderImgExist: 'false',

  // };
  publish: any;
  //---Check Texts Console---//
  servicesTextArrayCheck() {
    // console.log("heroBoxTexts",this.heroBoxTexts)
    // console.log("introTexts",this.introTexts)
    // console.log("servicesAllTexts",this.servicesAllTexts)
    // console.log("footerparagraphTexts",this.footerparagraphTexts)
  }
  //---------||||||||||||||||||---------------New--------------|||||||||||||||||||---------//

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // this.checkRoleAction();
    this.getAllHeadersFun("allHeaderImages");
  }

  getAllHeadersFun(name): any {
    console.log(name);
    this.api.getAllHeaders(name).subscribe((headersDate) => {
      let response = headersDate.doc[0];
      // console.log('response', response);
      // console.log('responseincludes', response.includes('Exist'))
      // let inc = Object.values(response).includes('Exist');
      // let publishData = {
      this.publish = {
        findUsHeaderImgExist: response.findUsHeaderImgExist,
        lawyersHeaderImgExist: response.lawyersHeaderImgExist,
        aboutUsHeaderImgExist: response.aboutUsHeaderImgExist,
        businessHeaderImgExist: response.businessHeaderImgExist,
        agreementHeaderImgExist: response.agreementHeaderImgExist,
        schedulerHeaderImgExist: response.schedulerHeaderImgExist,
        privacyPolicyHeaderImgExist: response.privacyPolicyHeaderImgExist,
        questionAnswerHeaderImgExist: response.questionAnswerHeaderImgExist,
        termsConditionsHeaderImgExist: response.termsConditionsHeaderImgExist,
        agreementConfirmHeaderImgExist: response.agreementConfirmHeaderImgExist,
      };

      // console.log('this.publish', this.publish)
      // if(response.includes)
      this.id = response._id;
      if (response.agreementHeaderImg) {
        this.agreementHeaderImgUrl =
          environment.serviceURL + response.agreementHeaderImg;
      }
      if (response.agreementConfirmHeaderImg) {
        this.agreementConfirmHeaderImgUrl =
          environment.serviceURL + response.agreementConfirmHeaderImg;
      }
      if (response.lawyersHeaderImg) {
        this.lawyersHeaderImgUrl =
          environment.serviceURL + response.lawyersHeaderImg;
      }
      if (response.schedulerHeaderImg) {
        this.schedulerHeaderImgUrl =
          environment.serviceURL + response.schedulerHeaderImg;
      }
      if (response.questionAnswerHeaderImg) {
        this.questionAnswerHeaderImgUrl =
          environment.serviceURL + response.questionAnswerHeaderImg;
      }
      if (response.findUsHeaderImg) {
        this.findUsHeaderImgUrl =
          environment.serviceURL + response.findUsHeaderImg;
      }
      if (response.businessHeaderImg) {
        this.businessHeaderImgUrl =
          environment.serviceURL + response.businessHeaderImg;
      }
      if (response.termsConditionsHeaderImg) {
        this.termsConditionsHeaderImgUrl =
          environment.serviceURL + response.termsConditionsHeaderImg;
      }
      if (response.privacyPolicyHeaderImg) {
        this.privacyPolicyHeaderImgUrl =
          environment.serviceURL + response.privacyPolicyHeaderImg;
      }
      if (response.aboutUsHeaderImg) {
        this.aboutUsHeaderImgUrl =
          environment.serviceURL + response.aboutUsHeaderImg;
      }
    });
  }

  publishImageHandler(value: any, name: any) {
    this.showloading = true;
    // console.log("value", value)
    // console.log("name", name)
    // if (name == 'findUsHeaderImgExist') {
    //     this.dontPublishImages.findUsHeaderImgExist = value ? 'true' : 'false';
    //     // this.publishHeaderPics(value, name);
    // }
    // if (name == 'lawyersHeaderImgExist') this.dontPublishImages.lawyersHeaderImgExist = value ? 'true' : 'false';
    // if (name == 'aboutUsHeaderImgExist') this.dontPublishImages.aboutUsHeaderImgExist = value ? 'true' : 'false';
    // if (name == 'businessHeaderImgExist') this.dontPublishImages.businessHeaderImgExist = value ? 'true' : 'false';
    // if (name == 'agreementHeaderImgExist') this.dontPublishImages.agreementHeaderImgExist = value ? 'true' : 'false';
    // if (name == 'schedulerHeaderImgExist') this.dontPublishImages.schedulerHeaderImgExist = value ? 'true' : 'false';
    // if (name == 'privacyPolicyHeaderImgExist') this.dontPublishImages.privacyPolicyHeaderImgExist = value ? 'true' : 'false';
    // if (name == 'questionAnswerHeaderImgExist') this.dontPublishImages.questionAnswerHeaderImgExist = value ? 'true' : 'false';
    // if (name == 'termsConditionsHeaderImgExist') this.dontPublishImages.termsConditionsHeaderImgExist = value ? 'true' : 'false';
    // if (name == 'agreementConfirmHeaderImgExist') this.dontPublishImages.agreementConfirmHeaderImgExist = value ? 'true' : 'false';

    // console.log("this.dontPublishImages", this.dontPublishImages)
    this.publishHeaderPics(value, name);
  }
  publishHeaderPics(value: any, name: any) {
    // this.showloading = true;
    // this.publish = [{
    //   'publishHeaderName': name,
    //   'publishHeaderPic': value,
    // }]
    let publish = {
      headerPic: name,
      publish: value,
    };
    this.api.publishHeaderPics(publish, this.id).subscribe(
      (res) => {
        setTimeout(() => {
          this.showloading = false;
          // this.snackBar.open('Publicera bildstatus ändrad', 'ok');
          value
            ? this.snackBar.open("Bild publicerad", "ok")
            : this.snackBar.open("Bilden har tagits bort", "ok");
        }, 1000);
        //   this.showloading = false;
        // console.log('this.colors',this.colors)
        //   this.redirect(3);
      },
      (err) => {
        this.showloading = false;
      }
    );
  }
  //--------------Upload Agreement Pic---------------
  onAgreementImageChange(event): any {
    if (event.target.files.length > 0) {
      this.previewAgreementImage(event.target.files);
      const file = event.target.files[0];
      this.agreementHeaderFileSource = file;
    }
  }
  previewAgreementImage(files): any {
    if (files.length === 0) {
      return;
    }
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      // this.message = 'Only images are supported.';
      return;
    }
    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (event) => {
      this.agreementHeaderImgUrl = reader.result;
    };
  }
  updateAgreementImage(): any {
    const formData = new FormData();
    formData.append("file", this.agreementHeaderFileSource);
    formData.append("headerImagesId", this.id);
    if (this.agreementHeaderFileSource != undefined) {
      this.api.uploadAgreementHeaderPic(formData).subscribe((res) => {
        this.snackBar.open("Avtal Header Bild har uppdaterats", "ok");
      });
    } else {
      this.snackBar.open("Bilden kan inte uppdateras (Välj först)", "ok");
    }
  }

  //--------------Upload AgreementConfirm Pic---------------
  onAgreementConfirmImageChange(event): any {
    if (event.target.files.length > 0) {
      this.previewAgreementConfirmImage(event.target.files);
      const file = event.target.files[0];
      this.agreementConfirmHeaderFileSource = file;
    }
  }
  previewAgreementConfirmImage(files): any {
    if (files.length === 0) {
      return;
    }
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      // this.message = 'Only images are supported.';
      return;
    }
    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (event) => {
      this.agreementConfirmHeaderImgUrl = reader.result;
    };
  }
  updateAgreementConfirmImage(): any {
    const formData = new FormData();
    formData.append("file", this.agreementConfirmHeaderFileSource);
    formData.append("headerImagesId", this.id);
    if (this.agreementConfirmHeaderFileSource != undefined) {
      this.api.uploadAgreementConfirmHeaderPic(formData).subscribe((res) => {
        this.snackBar.open("Avtal Confirm Header Bild har uppdaterats", "ok");
      });
    } else {
      this.snackBar.open("Bilden kan inte uppdateras (Välj först)", "ok");
    }
  }

  //--------------Upload Lawyer Pic---------------
  onLawyerImageChange(event): any {
    if (event.target.files.length > 0) {
      this.previewLawyerImage(event.target.files);
      const file = event.target.files[0];
      this.lawyersHeaderFileSource = file;
    }
  }
  previewLawyerImage(files): any {
    if (files.length === 0) {
      return;
    }
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      // this.message = 'Only images are supported.';
      return;
    }
    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (event) => {
      this.lawyersHeaderImgUrl = reader.result;
    };
  }
  updateLawyerImage(): any {
    const formData = new FormData();
    formData.append("file", this.lawyersHeaderFileSource);
    formData.append("headerImagesId", this.id);
    if (this.lawyersHeaderFileSource != undefined) {
      this.api.uploadLawyerHeaderPic(formData).subscribe((res) => {
        this.snackBar.open("Advokat Header Bild har uppdaterats", "ok");
      });
    } else {
      this.snackBar.open("Bilden kan inte uppdateras (Välj först)", "ok");
    }
  }

  //--------------Upload Scheduler Pic---------------
  onSchedulerImageChange(event): any {
    if (event.target.files.length > 0) {
      this.previewSchedulerImage(event.target.files);
      const file = event.target.files[0];
      this.schedulerHeaderFileSource = file;
    }
  }
  previewSchedulerImage(files): any {
    if (files.length === 0) {
      return;
    }
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      // this.message = 'Only images are supported.';
      return;
    }
    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (event) => {
      this.schedulerHeaderImgUrl = reader.result;
    };
  }
  updateSchedulerImage(): any {
    const formData = new FormData();
    formData.append("file", this.schedulerHeaderFileSource);
    formData.append("headerImagesId", this.id);
    if (this.schedulerHeaderFileSource != undefined) {
      this.api.uploadSchedulerHeaderPic(formData).subscribe((res) => {
        this.snackBar.open("Scheduler Header Bild har uppdaterats", "ok");
      });
    } else {
      this.snackBar.open("Bilden kan inte uppdateras (Välj först)", "ok");
    }
  }

  //--------------Upload QuestionAnswer Pic---------------
  onQuestionAnswerImageChange(event): any {
    if (event.target.files.length > 0) {
      this.previewQuestionAnswerImage(event.target.files);
      const file = event.target.files[0];
      this.questionAnswerHeaderFileSource = file;
    }
  }
  previewQuestionAnswerImage(files): any {
    if (files.length === 0) {
      return;
    }
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      // this.message = 'Only images are supported.';
      return;
    }
    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (event) => {
      this.questionAnswerHeaderImgUrl = reader.result;
    };
  }
  updateQuestionAnswerImage(): any {
    const formData = new FormData();
    formData.append("file", this.questionAnswerHeaderFileSource);
    formData.append("headerImagesId", this.id);
    if (this.questionAnswerHeaderFileSource != undefined) {
      this.api.uploadQuestionAnswerHeaderPic(formData).subscribe((res) => {
        this.snackBar.open("Frågor och svar Header Bild har uppdaterats", "ok");
      });
    } else {
      this.snackBar.open("Bilden kan inte uppdateras (Välj först)", "ok");
    }
  }

  //--------------Upload AboutUs Pic---------------
  onAboutUsImageChange(event): any {
    if (event.target.files.length > 0) {
      this.previewAboutUsImage(event.target.files);
      const file = event.target.files[0];
      this.aboutUsHeaderFileSource = file;
    }
  }
  previewAboutUsImage(files): any {
    if (files.length === 0) {
      return;
    }
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      // this.message = 'Only images are supported.';
      return;
    }
    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (event) => {
      this.aboutUsHeaderImgUrl = reader.result;
    };
  }
  updateAboutUsImage(): any {
    const formData = new FormData();
    formData.append("file", this.aboutUsHeaderFileSource);
    formData.append("headerImagesId", this.id);
    if (this.aboutUsHeaderFileSource != undefined) {
      this.api.uploadAboutUsHeaderPic(formData).subscribe((res) => {
        this.snackBar.open("Om oss Header Bild har uppdaterats", "ok");
      });
    } else {
      this.snackBar.open("Bilden kan inte uppdateras (Välj först)", "ok");
    }
  }

  //--------------Upload FindUs Header Pic---------------
  onFindUsImageChange(event): any {
    if (event.target.files.length > 0) {
      this.previewFindUsImage(event.target.files);
      const file = event.target.files[0];
      this.findUsHeaderFileSource = file;
    }
  }
  previewFindUsImage(files): any {
    if (files.length === 0) {
      return;
    }
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      // this.message = 'Only images are supported.';
      return;
    }
    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (event) => {
      this.findUsHeaderImgUrl = reader.result;
    };
  }
  updateFindUsImage(): any {
    const formData = new FormData();
    formData.append("file", this.findUsHeaderFileSource);
    formData.append("headerImagesId", this.id);
    if (this.findUsHeaderFileSource != undefined) {
      this.api.uploadFindUsHeaderPic(formData).subscribe((res) => {
        this.snackBar.open("Frågor och svar Header Bild har uppdaterats", "ok");
      });
    } else {
      this.snackBar.open("Bilden kan inte uppdateras (Välj först)", "ok");
    }
  }

  //--------------Upload Business Page Header Pic---------------
  onBusinessImageChange(event): any {
    if (event.target.files.length > 0) {
      this.previewBusinessImage(event.target.files);
      const file = event.target.files[0];
      this.businessHeaderFileSource = file;
    }
  }
  previewBusinessImage(files): any {
    if (files.length === 0) {
      return;
    }
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      // this.message = 'Only images are supported.';
      return;
    }
    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (event) => {
      this.businessHeaderImgUrl = reader.result;
    };
  }
  updateBusinessImage(): any {
    const formData = new FormData();
    formData.append("file", this.businessHeaderFileSource);
    formData.append("headerImagesId", this.id);
    if (this.businessHeaderFileSource != undefined) {
      this.api.uploadBusinessHeaderPic(formData).subscribe((res) => {
        this.snackBar.open("Frågor och svar Header Bild har uppdaterats", "ok");
      });
    } else {
      this.snackBar.open("Bilden kan inte uppdateras (Välj först)", "ok");
    }
  }

  //--------------Upload TermsConditions Pic---------------
  onTermsConditionsImageChange(event): any {
    if (event.target.files.length > 0) {
      this.previewTermsConditionsImage(event.target.files);
      const file = event.target.files[0];
      this.termsConditionHeaderFileSource = file;
    }
  }
  previewTermsConditionsImage(files): any {
    if (files.length === 0) {
      return;
    }
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      // this.message = 'Only images are supported.';
      return;
    }
    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (event) => {
      this.termsConditionsHeaderImgUrl = reader.result;
    };
  }
  updateTermsConditionsImage(): any {
    const formData = new FormData();
    formData.append("file", this.termsConditionHeaderFileSource);
    formData.append("headerImagesId", this.id);
    if (this.termsConditionHeaderFileSource != undefined) {
      this.api.uploadTermsConditionsHeaderPic(formData).subscribe((res) => {
        this.snackBar.open("Frågor och svar Header Bild har uppdaterats", "ok");
      });
    } else {
      this.snackBar.open("Bilden kan inte uppdateras (Välj först)", "ok");
    }
  }

  //--------------Upload PrivacyPolicy Pic---------------
  onPrivacyPolicyImageChange(event): any {
    if (event.target.files.length > 0) {
      this.previewPrivacyPolicyImage(event.target.files);
      const file = event.target.files[0];
      this.privacyPolicyHeaderFileSource = file;
    }
  }
  previewPrivacyPolicyImage(files): any {
    if (files.length === 0) {
      return;
    }
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      // this.message = 'Only images are supported.';
      return;
    }
    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (event) => {
      this.privacyPolicyHeaderImgUrl = reader.result;
    };
  }
  updatePrivacyPolicyImage(): any {
    const formData = new FormData();
    formData.append("file", this.privacyPolicyHeaderFileSource);
    formData.append("headerImagesId", this.id);
    if (this.privacyPolicyHeaderFileSource != undefined) {
      this.api.uploadPrivacyPolicyHeaderPic(formData).subscribe((res) => {
        this.snackBar.open("Frågor och svar Header Bild har uppdaterats", "ok");
      });
    } else {
      this.snackBar.open("Bilden kan inte uppdateras (Välj först)", "ok");
    }
  }

  checkRoleAction(): any {
    let RoleID = this.authService.getroleID();
    let roleactionID = menuactionspagename.content_pages.MAId;
    this.api.GetRoleActionByRoleIdRoleActionId(RoleID, roleactionID).subscribe(
      (res) => {
        if (res.menuactionslist.length == 0) {
          this.authService.logout();
        }
      },
      (err) => {}
    );
  }
}

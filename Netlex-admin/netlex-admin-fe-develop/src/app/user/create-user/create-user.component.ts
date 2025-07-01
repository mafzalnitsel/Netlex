import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LawyerService } from '../../services/lawyer.service';
import { Lawyer } from '../../models/lawyer.model';
import { Role } from 'src/app/models/role';
import { AnswerTypeModel } from '../../models/answerType.model';
import { AnswerTypeService } from '../../services/answerType.service';
import { menuactionspagename } from 'src/app/models/pagesnameandId';
import * as Editor from '../../../assets/ckeditor';
import { environment } from "../../../environments/environment";


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  // lawyer: Lawyer[];
  lawyer: Lawyer = { email: '', firstName: '', lastName: '', _id: '', totalMeetingAssigned: 0, status: '', lawyerPic: '', showLawyerToUser: false, phoneNumber: '', training: '', languages: '', multipleLanguages: false, activityArea: [], title: '', languagesOptions: [] };
  lawyerid: string;
  selectedLawyerId: string;
  lawyerDetails = { id: '', firstName: '', lastName: '' }
  answerType: AnswerTypeModel[];
  alert: { success: boolean, text: string } = { success: true, text: '' };
  user: User = { email: '', firstName: '', lastName: '', userName: '', roles: '', _id: '', profilePic: '', status: '', lawyerid: '', roleID: '', itsAdminUser: false, itsLawyerUser: false, };
  roles: string;
  showloading = false;
  userName: string;
  rolesValue = ['Administration', 'Advokat', 'Biträdande jurist'];
  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  role: Role[];
  roleId: string;
  selectedRoleId: string;
  // roleValue: any;

  lawyerAlreadyExisting: Boolean = false;
  lawyerRequired = false;
  roleRequired = false;
  profilePic: any;
  fileSource: any;
  imagePath: '';
  imgURL: string | ArrayBuffer;

  //New for email restrictions
  validUserList = [];

  //New for add lawyer details also (14-12-2022)
  itsAdminUser: Boolean = false;
  itsLawyerUser: Boolean = false;

  itsForLawyer: Boolean;
  multipleLanguages = false;
  languagesOptions = ['Svenska', 'Engelska', 'Arabiska', 'Persiska', 'Spanska', 'Franska ', 'Kurmandji', 'Sorani', 'Dari', 'Kurdiska', 'Tyska', 'Slovakiska', 'Tjeckiska', 'Ryska', 'Polska', 'Italienska', 'Svenskt teckenspråk', 'Bosniska', 'Serbiska', 'Kroatiska', 'Syrianska', 'Turkiska', 'Albanska', 'Azerbajdzjanska'];
  activityAreaOptions: any = ['Familjerätt', 'Brottmål', 'Tvistemål', /*'Migrationsrätt',*/ 'Notarius Publicus', 'Socialrätt', "Migrationsverket"];
  activityAreaOptionsId: '';
  selectedLanguages: any; 
  selectedActivityArea: any;
  moreLaws: any;
  removeLaws: any;

  // addMoreLanguages = false;
  moreLanguages: any;

  // removeMoreLanguages = false;
  removeLanguages: any;
  public editlanguagesRadios: any = [
    { label: 'Lägg till fler språk', value: 'add', checked: true },
    { label: 'Ta bort språk', value: 'remove', checked: false }
  ];
  public editLawsRadios: any = [
    { label: 'Lägg till fler aktivitetsområde', value: 'add', checked: true },
    { label: 'Ta bort aktivitetsområde', value: 'remove', checked: false }
  ];
  editLanguages = false;
  editLanguagesAction = 'add';

  editLaws = false;
  editLawsAction = 'add';
  contentPages: { activityAreaOptions: []; }[];

  checkNotCheck = 0;
  showLawyerToUser: Boolean = false;


  public ckEditor = Editor;
  editorConfig = {
    toolbar: {
      items: [
        // 'nextPage',
        // 'previousPage',
        'pageNavigation', '|',
        'alignment',
        'pageBreak',
        '|',
        'bold',
        'italic',
        'underline',
        'strikethrough',
        '|',
        'outdent',
        'indent',
        '|',
        'fontSize',
        'fontFamily',
        '|',
        'heading',
        '|',
        'fontColor',
        'fontBackgroundColor',
        '|',
        'numberedList',
        'bulletedList',
        '|',
        'todoList',
        'link',
        'blockQuote',
        'imageUpload',
        'insertTable',
        'mediaEmbed',
        '|',
        'undo',
        'redo',
        'findAndReplace',
        'highlight'
      ]
    },
    language: 'sv',
    image: {
      toolbar: [
        'imageTextAlternative',
        'imageStyle:inline',
        'imageStyle:block',
        'imageStyle:side'
      ]
    },
    table: {
      contentToolbar: [
        'tableColumn',
        'tableRow',
        'mergeTableCells',
        'tableCellProperties',
        'tableProperties'
      ]
    },
    pagination: {
      // A4
      pageWidth: '21cm',
      pageHeight: '29.7cm',

      pageMargins: {
        top: '20mm',
        bottom: '20mm',
        right: '12mm',
        left: '12mm'
      }
    },
    licenseKey: environment.ckEditorLicense
  };
  public onReady(editor) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }
  ///////////////////////////////////////////////////////////////////////
  constructor(
    private authService: AuthService,
    private lawyerService: LawyerService,
    private api: ApiService,
    private snackBar: MatSnackBar,
    private router: Router, private answerTypeService: AnswerTypeService,
  ) { }

  ngOnInit(): void {
    this.checkRoleAction();
    // this.getLawyer();
    this.getRole();
    this.getActivityAreaForLawyer("activityAreaOptions")
  }
  // getLawyer(): void {
  //   this.lawyerService.getActiveLawyersList().subscribe(res => {
  //     this.lawyer = res.lawyer;
  //   },
  //     err => {
  //       console.log('err', err);
  //     }
  //   );
  // }
  getRole(): void {
    this.api.getactiverole().subscribe(res => {
      this.role = res.doc;
      // console.log('this.role', this.role)
    },
      err => {
        console.log('err', err);
      }
    );
  }



  onChangeRole(event): void {
    // console.log('event', event)

    // this.role.forEach(ele => {
    //   if (event == ele._id) {
    // this.roleValue = event.useForLawyer,
    this.user.roleID = event._id;
    this.user.roles = event.name;
    // }
    // })

    // console.log("this.roleID", this.user.roleID)
    // console.log("this.roles", this.user.roles)
    this.roleRequired = false;
  }
  checkAlreadyExistingLawyer(value) {
    // console.log("value",value)
    this.lawyerAlreadyExisting = value;
  }
  existingLawyerHandler(event) {
    // console.log("event",event)
    this.lawyerRequired = false;
    this.user.firstName = event.firstName;
    this.user.lastName = event.lastName;
    this.user.userName = event.firstName.replace(/\s/g, '');
    this.user.email = event.email;

    // console.log("this.user.userName",this.user.userName)
    // let abc = this.user.userName;
    // let words = abc.match(/(\w+)/g).length;
    // console.log("words",words);


  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //User Type (Lawyer or Admin or both)
  userTypeHandler(value, user) {
    // console.log("value", value)
    // console.log("user", user)
    if (user === 'adminUser') {
      this.itsAdminUser = value;
    }
    if (user === 'lawyerUser') {
      this.itsLawyerUser = value;

    }
  }
  //Its for lawyer(mean user for lawyer) function
  itsForLawyerCheckHandler(value) {
    this.itsForLawyer = value;
    // console.log("this.itsForLawyer", this.itsForLawyer)
  }
  //Open Edit Section for more languages
  editLanguagesHandler() {
    this.editLanguages = !this.editLanguages;
    if (this.editLaws) {
      this.editLaws = false;
    }
  }
  //Open Edit Section for more laws
  editLawsHandler() {
    this.editLaws = !this.editLaws;
    if (this.editLanguages) {
      this.editLanguages = false;
    }
    // console.log(" this.editLanguages", this.editLanguages)
  }
  //-------------Edit type of languages----------
  checkForMoreLanguages(event) {
    // console.log("event", event)
    this.editLanguagesAction = event.value;
  }
  //-------------Edit  type of laws----------
  checkForMoreLaws(event) {
    // console.log("event", event)
    this.editLawsAction = event.value;

  }
  //-------------Add more languages into Langauges Selection Array----------
  addMoreLanguagesHandler() {
    // console.log("moreLanguages", this.moreLanguages)
    let newArray: any;
    if (this.selectedLanguages) {
      newArray = this.selectedLanguages;
    }
    else {
      newArray = [];
    }

    let more_Languages_Single_Or_Multiple = this.moreLanguages.includes(',');

    if (more_Languages_Single_Or_Multiple) {
      this.moreLanguages = this.moreLanguages.replace(/\s/g, '')
      this.moreLanguages = this.moreLanguages.split(",")
      // console.log("moreLanguages", this.moreLanguages)
      this.moreLanguages.forEach((ele) => {
        let languageAlreadyExist = this.languagesOptions.includes(ele);
        // console.log("laafdadsf", languageAlreadyExist)
        if (!languageAlreadyExist) {
          // console.log("ele", ele);
          this.languagesOptions.push(ele);
          newArray.push(ele)
          this.selectedLanguages = newArray;
          // console.log("this.selectedLanguages",this.selectedLanguages)
        }
      })
      this.moreLanguages = [];
    }
    else {
      let newArray: any;
      if (this.selectedLanguages) {
        newArray = this.selectedLanguages;
      }
      else {
        newArray = [];
      }
      let languageAlreadyExist = this.languagesOptions.includes(this.moreLanguages);
      // console.log("languageAlreadyExist", languageAlreadyExist)
      if (!languageAlreadyExist && this.moreLanguages.length !== 0) {
        this.languagesOptions.push(this.moreLanguages)
        newArray.push(this.moreLanguages)
        this.selectedLanguages = newArray;
      }
    }
  }
  //-------------Remove languages into Langauges Selection Array------------
  removeLanguagesHandler() {
    if (this.removeLanguages && this.removeLanguages.length > 0) {
      // console.log("this.removeLanguages",this.removeLanguages)
      this.removeLanguages.forEach((ele) => {
        // this.languagesOptions.includes(ele)
        this.languagesOptions = this.languagesOptions.filter((language) => language !== ele)
        this.selectedLanguages = this.selectedLanguages.filter((language) => language !== ele);
      })

    }
  }
  //-------------Add more laws into activity area Selection Array----------
  addMoreLawsHandler() {
    // console.log("moreLaws", this.moreLaws)
    let newArray: any;
    if (this.selectedActivityArea) {
      newArray = this.selectedActivityArea;
    }
    else {
      newArray = [];
    }

    let more_Laws_Single_Or_Multiple = this.moreLaws.includes(',');

    if (more_Laws_Single_Or_Multiple) {
      this.moreLaws = this.moreLaws.replace(/\s/g, '')
      this.moreLaws = this.moreLaws.split(",")
      // console.log("moreLaws", this.moreLaws)
      this.moreLaws.forEach((ele) => {
        let lawAlreadyExist = this.activityAreaOptions.includes(ele);
        // console.log("lawAlreadyExist", lawAlreadyExist)
        if (!lawAlreadyExist) {
          // console.log("ele", ele);
          this.activityAreaOptions.push(ele);
          newArray.push(ele)
          this.selectedActivityArea = newArray;
          // console.log("this.selectedActivityArea",this.selectedActivityArea)
        }
      })
      this.moreLaws = [];

    }
    else {
      let newArray: any;
      if (this.selectedActivityArea) {
        newArray = this.selectedActivityArea;
      }
      else {
        newArray = [];
      }
      // console.log("this.moreLaws", this.moreLaws)
      let lawsAlreadyExist = this.activityAreaOptions.includes(this.moreLaws);
      // console.log("lawsAlreadyExist", lawsAlreadyExist)
      if (!lawsAlreadyExist && this.moreLaws.length !== 0) {
        this.activityAreaOptions.push(this.moreLaws)
        newArray.push(this.moreLaws)
        this.selectedActivityArea = newArray;
        this.moreLaws = [];

      }
    }
  }
  //-------------Remove laws from activity area Selection Array------------
  removeLawsHandler() {
    if (this.removeLaws && this.removeLaws.length > 0) {
      // console.log("this.removeLaws",this.removeLaws)
      this.removeLaws.forEach((ele) => {
        // this.activityAreaOptions.includes(ele)
        this.activityAreaOptions = this.activityAreaOptions.filter((law) => law !== ele)
        this.selectedActivityArea = this.selectedActivityArea.filter((law) => law !== ele);

      })

    }
  }
  getActivityAreaForLawyer(name): any {
    this.api.getActivityAreaForLawyer(name).subscribe(data => {
      let response = data.doc[0];
      // console.log("response", response)
      this.activityAreaOptionsId = response._id;
      if (response.activityAreaOptions) {
        this.activityAreaOptions = response.activityAreaOptions;
      }
    });
  }
  updateActivityAreaOptions(): any {
    this.showloading = true;
    this.contentPages = [{
      'activityAreaOptions': this.activityAreaOptions,
    }]
    // console.log("contentPages", this.contentPages)
    this.api.updateActivityAreaForLawyer(this.contentPages, this.activityAreaOptionsId)
      .subscribe(
        res => {
          this.snackBar.open('Villkor och betingelser uppdaterades lyckades', 'ok');
          this.showloading = false;
          // console.log('this.id',this.id)
          // console.log('this.clientsDetails',this.clientsDetails)
        },
        err => {
          this.showloading = false;
        }
      );
  }
  showLawyerToUserHandler(value) {
    this.showLawyerToUser = value;
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  onsubmit(): void {
    if (this.lawyerAlreadyExisting === false) {
      this.lawyerRequired = false;
      this.clearLawyerField();
    }
    if (!this.user.roleID) {
      this.roleRequired = true;
    }
    // if (this.lawyerAlreadyExisting === true) {
    //   if (!this.user.lawyerid) {
    //     this.lawyerRequired = true;
    //     this.showloading = false;
    //     this.snackBar.open('Fyll i alla fält', 'Ok', {
    //       duration: 3000,
    //     });
    //     return;
    //   }
    // }
    this.lawyer.languagesOptions = this.languagesOptions;
    // console.log("lawyer.languages",this.lawyer.languages)
    if (this.selectedLanguages) {
      this.lawyer.languages = this.selectedLanguages;
    }
    if (this.selectedActivityArea) {
      this.lawyer.activityArea = this.selectedActivityArea;
    }
    if (this.lawyer.languages && this.lawyer.languages.length > 1) {
      this.lawyer.multipleLanguages = true;
      // console.log("lawyer.multipleLanguages",this.lawyer.multipleLanguages)
    }
    else {
      this.lawyer.multipleLanguages = false;
      // console.log("lawyer.multipleLanguages",this.lawyer.multipleLanguages)
    }

    if (!this.user.email || !this.user.firstName || !this.user.lastName || !this.user.roleID || (!this.itsAdminUser && !this.itsLawyerUser)) {
      this.showloading = false;

      this.snackBar.open('Fyll i alla fält', 'Ok', {
        duration: 3000,
      });
      return;
    }
    else {
      this.lawyer.email = this.user.email;
      this.lawyer.firstName = this.user.firstName;
      this.lawyer.lastName = this.user.lastName;
      this.lawyer.lastName = this.user.lastName;
      this.lawyer.showLawyerToUser = this.showLawyerToUser;

      //for user
      this.user.itsAdminUser = this.itsAdminUser;
      this.user.itsLawyerUser = this.itsLawyerUser;
    }

    if (this.itsForLawyer) {
      if (!this.lawyer.email || !this.lawyer.firstName || !this.lawyer.lastName || !this.lawyer.phoneNumber || !this.lawyer.training
        || !this.lawyer.languages || !this.lawyer.activityArea || !this.lawyer.title) {
        this.showloading = false;
        this.snackBar.open('Fyll i alla fält', 'Ok', {
          duration: 3000,
        });
        return;
      }

    }

    this.showloading = true;
    this.snackBar.open("Snälla vänta", '', {
      duration: 1500,
    });
    this.getLawyersEmailWithAvailability();
    // console.log("this.user",this.user)
    // console.log("this.lawyer",this.lawyer)

  }
  //New for email restrictions
  getLawyersEmailWithAvailability() {
    this.validUserList = [];
    if (this.user.email) {
      this.lawyerService.getLawyersEmailWithAvailability(this.user.email).subscribe(res => {
        // console.log('res:',res)
        this.validUserList = res.scheduleMap;
        // console.log("this.validUserList",this.validUserList);

        //New for email restrictions
        if (this.validUserList.length > 0) {
          if (this.validUserList[0] == "Error") {
            this.showloading = false;
            this.snackBar.open('Din e-postadress är ogiltig', 'ok');
            return;
          }
        }
        //------------------------------
        // else {
        if (this.itsForLawyer) {
          this.submitLawyerFirst();
        }
        else {
          this.submitUserData();
        }

        // }
      });
    }
  }
  //--------------------------------------
  submitLawyerFirst() {
    this.api.registerlawyer(this.lawyer)
      .subscribe(
        res => {
          // console.log("res",res);
          this.user.lawyerid = res._id;
          // this.showloading = false;
          // this.snackBar.open('Skapades framgångsrikt', 'ok');
          this.updateActivityAreaOptions();
          // this.redirect();
          // this.clearFields();
          this.submitUserData();
        },
        err => {
          this.showloading = false;
          console.log("err", err)
          // this.snackBar.open('Skapad misslyckad', 'ok');
          if (err.error.message && err.error.message.code && err.error.message.code === 11000) {
            this.snackBar.open('Advokat Användaren finns redan', 'ok');
          }

        }
      );
  }
  submitUserData() {
    this.api.registerUser(this.user)
      .subscribe(
        res => {
          // console.log("res of new user create",res);
          this.showloading = false;
          this.snackBar.open('Skapades framgångsrikt', 'ok');
          if(this.fileSource != undefined){
            this.changeProfile(res._id)
          }
          this.redirect();
          this.clearFields();
        },
        err => {
          this.snackBar.open('Skapad misslyckad', 'ok');
          this.showloading = false;
          console.log(err);
          if (err.error.error === 'UserAlreadyExist') {
            this.snackBar.open('Användaren finns redan', 'ok');
          }
        }
      );
  }
  clearFields(): void {
    this.user.firstName = '';
    this.user.lastName = '';
    this.user.email = '';
    // this.user.roles = '';
    this.user.roleID = '';

  }
  clearLawyerField(): void {
    this.user.lawyerid = '';
  }
  redirect(): void {
    this.router.navigate(['/user']);
  }

  //-----------Upload Image for User (+ or Lawyer)---------

  onFileChange(event): any {
    if (event.target.files.length > 0) {
        this.preview(event.target.files);
        const file = event.target.files[0];
        this.fileSource = file;
    }
    // console.log("this.fileSource ",this.fileSource )
    // this.fileSource = {
    //     lastModified: '',
    //     lastModifiedDate: '',
    //     name: 'image.jpg',
    //     size: '',
    //     type: 'image/jpg',
    //     webkitRelativePath:''
    // }
}
changeProfile(userId): any {
  // console.log("userId",userId);  
    const formData = new FormData();
    formData.append('file', this.fileSource);
    formData.append('userId', userId);
    if (this.user.lawyerid) {
        formData.append('lawyerId', this.user.lawyerid);
    }

    if (this.fileSource != undefined) {
        this.api.uploadProfilePic(formData)
            .subscribe(res => {
                this.snackBar.open('Profilbilden har uppdaterats', 'ok');
            });
    }
    else {
        this.snackBar.open('Profilbilden kan inte uppdateras(Välj bild igen)', 'ok');
    }

}

preview(files): any {
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
        this.imgURL = reader.result;
    };
}

  checkRoleAction(): any {
    let RoleID = this.authService.getroleID();
    let roleactionID = menuactionspagename.user.MAId;
    this.api.GetRoleActionByRoleIdRoleActionId(RoleID, roleactionID)
      .subscribe(
        res => {
          if (res.menuactionslist.length == 0) {
            this.authService.logout();
          }

        },
        err => { }
      );
  }
}

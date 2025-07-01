import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { environment } from '../../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { menuactionspagename } from 'src/app/models/pagesnameandId';
import { AuthService } from '../../services/auth.service';
import { LawyerService } from 'src/app/services/lawyer.service';
import * as Editor from '../../../assets/ckeditor';

@Component({
  selector: 'app-view-lawyer',
  templateUrl: './view-lawyer.component.html',
  styleUrls: ['./view-lawyer.component.scss']
})
export class ViewLawyerComponent implements OnInit {
  @ViewChild('ckEditorComp', { static: false }) ckEditorComp: any;

  private sub: any;
  id: '';
  firstName = '';
  lastName = '';
  email = '';
  totalMeetingAssigned = 0;
  status = '';
  phoneNumber: '';
  training = '';
  languages = '';
  multipleLanguages = false;
  languagesOptions = ['Svenska', 'Engelska', 'Arabiska', 'Persiska', 'Spanska', 'Franska ', 'Kurmandji', 'Sorani', 'Dari', 'Kurdiska', 'Tyska', 'Slovakiska', 'Tjeckiska', 'Ryska', 'Polska', 'Italienska', 'Svenskt teckenspråk', 'Bosniska', 'Serbiska', 'Kroatiska', 'Syrianska', 'Turkiska', 'Albanska', 'Azerbajdzjanska'];
  activityAreaOptions: any = ['Familjerätt', 'Brottmål', 'Tvistemål', 'Migrationsrätt', 'Notarius Publicus', 'Socialrätt', "Migrationsverket"];
  activityAreaOptionsId: '';

  // activityArea = '';
  activityArea = [];
  title = '';
  checkNotCheck = 0;

  showloading = false;
  alert: { success: boolean, text: string } = { success: true, text: '' };
  statusValue = ['Aktiv', 'Inaktiv'];
  lawyer: { firstName: string; lastName: string; totalMeetingAssigned: number; email: string; status: string; showLawyerToUser: string; phoneNumber: string; training: string; languages: any; multipleLanguages: Boolean; activityArea: any; title: string; languagesOptions: any }[];

  showLawyerToUser: any;
  lawyerPic: any;
  fileSource: any;
  imagePath: '';
  imgURL: string | ArrayBuffer;
  lawyerList = [];
  selectedLanguages: any;
  selectedActivityArea: any;
  moreLaws: any;
  removeLaws: any;

  editLanguages = false;
  editLanguagesAction = 'add';

  editLaws = false;
  editLawsAction = 'add';

  addMoreLanguages = false;
  moreLanguages: any;

  removeMoreLanguages = false;
  removeLanguages: any;

  public editlanguagesRadios: any = [
    { label: 'Lägg till fler språk', value: 'add', checked: true },
    { label: 'Ta bort språk', value: 'remove', checked: false }
  ];
  public editLawsRadios: any = [
    { label: 'Lägg till fler aktivitetsområde', value: 'add', checked: true },
    { label: 'Ta bort aktivitetsområde', value: 'remove', checked: false }
  ];
  contentPages: { activityAreaOptions: []; }[];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private _LawyerService: LawyerService
  ) {
  }

  ngOnInit(): void {

    this.checkRoleAction();
    this.sub = this.route.params.subscribe(params => {
      this.id = params.id;
      this.getUserDate();

    });
    this.getActivityAreaOptions("activityAreaOptions");
  }
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
  getUserDate(): any {

    this.api.getLawyer(this.id)

      .subscribe(
        res => {
          this.firstName = res.firstName;
          this.lastName = res.lastName;
          this.email = res.email;
          this.status = res.status;
          this.totalMeetingAssigned = res.totalMeetingAssigned;
          this.showLawyerToUser = res.showLawyerToUser;
          this.phoneNumber = res.phoneNumber;
          this.training = res.training;
          this.status = res.status;
          this.languages = res.languages;
          this.selectedLanguages = res.languages;
          this.multipleLanguages = res.multipleLanguages;
          if (res.languagesOptions && res.languagesOptions.length > 0) {
            // console.log("res.languagesOptions",res.languagesOptions)
            this.languagesOptions = res.languagesOptions;
          }
          // this.languages =['Svenska', 'Engelska',  'Arabiska', 'Persiska'];
          this.activityArea = res.activityArea;
          this.title = res.title;
          this.selectedActivityArea = res.activityArea;

          if (res.lawyerPic) {
            this.imgURL = environment.serviceURL + res.lawyerPic;
          }
          if (this.showLawyerToUser == true) {
            this.checkNotCheck = 1;
          }
          //commented 28-09-2022(may be no need)
          // this.getLawyersEmailWithAvailability();
          // console.log('this.checkNotCheck',this.checkNotCheck)

        },
        err => { }
      );
  }
  getActivityAreaOptions(name): any {

    this.api.getTermsAndConditions(name).subscribe(data => {
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
    this.api.updateTermsAndConditions(this.contentPages, this.activityAreaOptionsId)
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
  getLawyersEmailWithAvailability() {
    this.lawyerList = [];
    if (this.email) {
      this._LawyerService.getLawyersEmailWithAvailability(this.email).subscribe(res => {
        // console.log('res.lawyerListWithSchedule:',res.lawyerListWithSchedule)
        this.lawyerList = res.scheduleMap;
        // console.log("this.lawyerList",this.lawyerList);
        if (this.lawyerList.length > 0) {
          if (this.lawyerList[0] == "Error") {
            this.showloading = false;
            this.snackBar.open('Din e-postadress är ogiltig', 'ok');
            return false;
          }
        }
        this.api.updateLawyer(this.lawyer, this.id)
          .subscribe(
            res => {
              this.snackBar.open('Användaren uppdaterades lyckades', 'ok');
              this.showloading = false;
              this.updateActivityAreaOptions();
              this.redirect();
            },
            err => {
              this.showloading = false;
            }
          );

      });
    }
  }
  //Temporary (30-11-2022)
  makeLawyerWithoutRestrictions() {
    this.api.updateLawyer(this.lawyer, this.id)
      .subscribe(
        res => {
          this.snackBar.open('Användaren uppdaterades lyckades', 'ok');
          this.showloading = false;
          this.redirect();
        },
        err => {
          this.showloading = false;
        }
      );
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

  // //Remove languages check Function
  // checkForRemoveLanguages(event) {
  //   // console.log("event",event)
  //   this.removeMoreLanguages = event;

  //   if(event===true){
  //     this.addMoreLanguages = false;
  //   }
  // }

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
        this.languagesOptions = this.languagesOptions.filter((language) => language !== ele);
        this.selectedLanguages = this.selectedLanguages.filter((language) => language !== ele);
        // this.languagesOptions.filter((value, index) => index !== 2);
      })

    }
  }

  //-------------Add laws into activity area Selection Array----------
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
        this.activityAreaOptions = this.activityAreaOptions.filter((law) => law !== ele);
        this.selectedActivityArea = this.selectedActivityArea.filter((law) => law !== ele);
        // console.log("this.selectedActivityArea",this.selectedActivityArea)

        // this.activityAreaOptions.filter((value, index) => index !== 2);
      })

    }
  }
  update(): any {
    // console.log("this.showLawyerToUser" + this.showLawyerToUser);
    if (this.selectedLanguages) {
      this.languages = this.selectedLanguages;
    }
    if (this.selectedActivityArea) {
      this.activityArea = this.selectedActivityArea;
      // console.log("this.activityArea",this.activityArea)
    }
    // console.log("this.languages" + this.languages);
    if (this.languages && this.languages.length > 1) {
      this.multipleLanguages = true;
      // console.log(this.multipleLanguages",this.multipleLanguages)
    }
    else {
      this.multipleLanguages = false;
      // console.log(.multipleLanguages",this.multipleLanguages)
    }
    //   //(old) chnaged for better restrictions(28-09-2022)
    // if (this.lawyerList.length > 0) {
    //   if (this.lawyerList[0] == "Error") {
    //     this.snackBar.open('din e-postadress är ogiltig', 'ok');
    //     return false;
    //   }
    // }

    this.showloading = true;
    this.snackBar.open("Snälla vänta", '', {
      duration: 1500,
    });

    this.lawyer = [{
      'firstName': this.firstName,
      'lastName': this.lastName,
      'totalMeetingAssigned': this.totalMeetingAssigned,
      'email': this.email,
      'status': this.status,
      'showLawyerToUser': this.showLawyerToUser,
      'phoneNumber': this.phoneNumber,
      'training': this.training,
      'languages': this.languages,
      'multipleLanguages': this.multipleLanguages,
      'activityArea': this.activityArea,
      'title': this.title,
      'languagesOptions': this.languagesOptions,
    }]
    if (!this.email || !this.firstName || !this.lastName || !this.phoneNumber || !this.training || !this.languages || !this.activityArea || !this.title) {
      this.showloading = false;
      this.snackBar.open('Fyll i alla fält', 'ok');
      return;
    }
    this.getLawyersEmailWithAvailability();  //With Restrictions

    // this.makeLawyerWithoutRestrictions();       //Without Restrictions(30-11-2022)(Temporary)


    //     //(old) changed for better restrictions(28-09-2022)
    // this.api.updateLawyer(this.lawyer, this.id)
    //   .subscribe(
    //     res => {
    //       this.snackBar.open('Användaren uppdaterades lyckades', 'ok');
    //       this.showloading = false;
    //     },
    //     err => {
    //       this.showloading = false;
    //     }
    //   );
  }
  multiselectHandler(event) {
    // console.log("event",event.value)
    // this.languages = event.value;
    // console.log("this.languages",this.languages)
  }
  onChange(selectedId: any) {

    this.showLawyerToUser = selectedId;

  }
  redirect(): void {
    this.router.navigate(['/lawyer']);
  }
  //----------------Upload Lawyer Pic----------------

  onFileChange(event): any {
    if (event.target.files.length > 0) {
      this.preview(event.target.files);
      const file = event.target.files[0];
      this.fileSource = file;
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

  changeLawyerPic(): any {
    // this.showloading = true;
    const formData = new FormData();

    formData.append('file', this.fileSource);
    formData.append('lawyerId', this.id);
    if (this.fileSource != undefined) {
      this.api.uploadLawyerPic(formData)
        .subscribe(res => {
          this.snackBar.open('Advokatbild har uppdaterats', 'ok');
        });
    }
    else {
      this.snackBar.open('Advokatbilden kan inte uppdateras', 'ok');
    }
    // this.showloading = false;

  }
  checkRoleAction(): any {
    let RoleID = this.authService.getroleID();
    let roleactionID = menuactionspagename.lawyer.MAId;
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

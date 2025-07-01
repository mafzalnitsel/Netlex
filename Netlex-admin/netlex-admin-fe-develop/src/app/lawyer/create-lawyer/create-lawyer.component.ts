

import { Component, OnInit, ViewChild } from '@angular/core';
import { Lawyer } from 'src/app/models/lawyer.model';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { menuactionspagename } from 'src/app/models/pagesnameandId';
import { LawyerService } from 'src/app/services/lawyer.service';
import * as Editor from '../../../assets/ckeditor';
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-create-lawyer',
  templateUrl: './create-lawyer.component.html',
  styleUrls: ['./create-lawyer.component.scss']
})
export class CreateLawyerComponent implements OnInit {

  @ViewChild('ckEditorComp', { static: false }) ckEditorComp: any;

  alert: { success: boolean, text: string } = { success: true, text: '' };
  lawyer: Lawyer = { email: '', firstName: '', lastName: '', _id: '', totalMeetingAssigned: 0, status: '', lawyerPic: '', showLawyerToUser: false, phoneNumber: '', training: '', languages: '', multipleLanguages: false, activityArea: [], title: '', languagesOptions: [] };
  status = "Aktiv";
  totalMeetingAssigned = 0;
  statusValue = ['inAktiv', 'Aktiv'];
  // language = ['Svenska'];
  multipleLanguages = false;
  languagesOptions = ['Svenska', 'Engelska', 'Arabiska', 'Persiska', 'Spanska', 'Franska ', 'Kurmandji', 'Sorani', 'Dari', 'Kurdiska', 'Tyska', 'Slovakiska', 'Tjeckiska', 'Ryska', 'Polska', 'Italienska', 'Svenskt teckenspråk', 'Bosniska', 'Serbiska', 'Kroatiska', 'Syrianska', 'Turkiska', 'Albanska', 'Azerbajdzjanska'];
  activityAreaOptions: any = ['Familjerätt', 'Brottmål', 'Tvistemål', 'Migrationsrätt', 'Notarius Publicus', 'Socialrätt', "Migrationsverket"];
  activityAreaOptionsId: ''
  selectedLanguages: any;
  selectedActivityArea: any;
  moreLaws: any;
  removeLaws: any;

  // addMoreLanguages = false;
  moreLanguages: any;

  // removeMoreLanguages = false;
  removeLanguages: any;

  lawyerList = [];
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

  //if need select
  //  activityAreaValues= ['Migration Lag' , 'FamilJerätt', 'SocialRätt'];
  //  activityAreaValues= ['Migration Law' , 'Family law' , 'Social Law'];
  // languagesValues= ['Engelsk' , 'Italienska' ];
  //  languagesValues= ['English' , 'Italian' ];

  showloading = false;

  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });


  constructor(
    private authService: AuthService,
    private api: ApiService,
    private snackBar: MatSnackBar,
    private router: Router,
    private _LawyerService: LawyerService
  ) { }

  ngOnInit(): void {
    this.checkRoleAction();
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
    if (this.lawyer.email) {
      // console.log("this.lawyer.email", this.lawyer.email)
      this._LawyerService.getLawyersEmailWithAvailability(this.lawyer.email).subscribe(res => {
        // console.log("res", res)
        this.lawyerList = res.scheduleMap;
        // console.log("this.lawyerList",this.lawyerList);
        if (this.lawyerList.length > 0) {
          if (this.lawyerList[0] == "Error") {
            this.showloading = false;
            this.snackBar.open('Din e-postadress är ogiltig', 'ok');
            return;
          }
        }
        this.api.registerlawyer(this.lawyer)
          .subscribe(
            res => {
              this.showloading = false;
              this.snackBar.open('Skapades framgångsrikt', 'ok');
              this.updateActivityAreaOptions();
              this.redirect();
              this.clearFields();
            },
            err => {
              this.showloading = false;
              console.log("err", err)
              this.snackBar.open('Skapad misslyckad', 'ok');

            }
          );

      });
    }
  }
  //Temporary (30-11-2022)
  makeLawyerWithoutRestrictions() {
    this.api.registerlawyer(this.lawyer)
      .subscribe(
        res => {
          this.showloading = false;
          this.snackBar.open('Skapades framgångsrikt', 'ok');
          this.redirect();
          this.clearFields();
        },
        err => {
          this.showloading = false;
          console.log("err", err)
          this.snackBar.open('Skapad misslyckad', 'ok');

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
  onsubmit(): void {
    // console.log("lawyer.activityArea",this.lawyer.activityArea)
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

    if (!this.lawyer.email || !this.lawyer.firstName || !this.lawyer.lastName || !this.lawyer.phoneNumber || !this.lawyer.training || !this.lawyer.languages || !this.lawyer.activityArea || !this.lawyer.title) {
      this.showloading = false;
      this.snackBar.open('Fyll i alla fält', 'ok');
      return;
    }
    this.showloading = true;
    this.snackBar.open("Snälla vänta", '', {
      duration: 1500,
    });

    this.getLawyersEmailWithAvailability();  //With Restrictions

    // this.makeLawyerWithoutRestrictions(); //Without Restrictions(30-11-2022)(Temporary)

    //(old) changed for better restrictions(28-09-2022)
    // this.api.registerlawyer(this.lawyer)
    //     .subscribe(
    //         res => {
    //             this.snackBar.open('Skapades framgångsrikt', 'ok');

    //             this.redirect();
    //             this.clearFields();
    //         },
    //         err => {
    //           console.log(err)
    //             this.snackBar.open('Skapad misslyckad', 'ok');

    //         }
    //     );
  }
  clearFields(): void {
    this.lawyer.firstName = '';
    this.lawyer.lastName = '';
    this.lawyer.email = '';
    this.lawyer.status = '';
    this.lawyer.phoneNumber = '';
    this.lawyer.training = '';
    this.lawyer.languages = '';
    // this.lawyer.languages = [];
    this.lawyer.multipleLanguages = false;
    this.lawyer.activityArea = '';
    this.lawyer.title = '';


  }
  redirect(): void {
    this.router.navigate(['/lawyer']);
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

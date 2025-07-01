import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
// import {environment} from '../../../environments/environment.prod';

import { environment } from '../../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Lawyer } from '../../models/lawyer.model';
import { Role } from 'src/app/models/role';
import { LawyerService } from '../../services/lawyer.service';
import { menuactionspagename } from 'src/app/models/pagesnameandId';
import { AuthService } from '../../services/auth.service';
import * as Editor from '../../../assets/ckeditor';

@Component({
    selector: 'app-view-user',
    templateUrl: './view-user.component.html',
    styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {
    private sub: any;
    // lawyer: Lawyer[];
    role: Role[];
    id: '';
    firstName = '';
    lastName = '';
    userName = '';
    // userType = [
    //     { AdminUser: false , LawyerUser: false }
    // ];
    itsAdminUser: Boolean = false;
    itsLawyerUser: Boolean = false;
    email = '';
    roles = '';
    status = '';
    lawyerid = '';
    showloading = false;
    alert: { success: boolean, text: string } = { success: true, text: '' };
    profilePic: any;
    fileSource: any;
    imagePath: '';
    imgURL: string | ArrayBuffer;
    rolesValue = ['Administration', 'Advokat', 'Biträdande jurist'];
    statusValue = ['Aktiv', 'Inaktiv'];
    user: { firstName: string; lastName: string; userName: string; itsAdminUser: any; itsLawyerUser: any; roles: string; email: string; status: string; lawyerid: string; roleID: string; }[];

    roleID = '';
    roleValue: any;

    lawyerAlreadyExisting: Boolean = true;

    //New for email restrictions
    validUserList = [];

    //User Types Radio Options
    public userTypesRadios: any = [
        { label: 'Admin', value: 'Admin', checked: true },
        { label: 'Advokat', value: 'Advokat', checked: false }
    ];

    //New for edt lawyer details also (14-12-2022)
    lawyerDataExists = false;
    userPic = '';
    lawyer: { firstName: string; lastName: string; totalMeetingAssigned: number; email: string; status: string; showLawyerToUser: any; phoneNumber: string; training: string; languages: any; multipleLanguages: Boolean; activityArea: any; title: string; languagesOptions: any, lawyerPic: string }[];
    lawyerForCreate: Lawyer = { email: '', firstName: '', lastName: '', _id: '', totalMeetingAssigned: 0, status: '', lawyerPic: '', showLawyerToUser: false, phoneNumber: '', training: '', languages: '', multipleLanguages: false, activityArea: [], title: '', languagesOptions: [] };

    totalMeetingAssigned = 0;
    phoneNumber: '';
    training = '';
    languages = '';
    title = '';
    lawyerPic = '';

    itsForLawyer: Boolean;
    multipleLanguages = false;
    languagesOptions = ['Svenska', 'Engelska', 'Arabiska', 'Persiska', 'Spanska', 'Franska ', 'Kurmandji', 'Sorani', 'Dari', 'Kurdiska', 'Tyska', 'Slovakiska', 'Tjeckiska', 'Ryska', 'Polska', 'Italienska', 'Svenskt teckenspråk', 'Bosniska', 'Serbiska', 'Kroatiska', 'Syrianska', 'Turkiska', 'Albanska', 'Azerbajdzjanska'];
    activityAreaOptions: any = ['Familjerätt', 'Brottmål', 'Tvistemål', 'Migrationsrätt', 'Notarius Publicus', 'Socialrätt', "Migrationsverket"];
    activityAreaOptionsId: '';
    activityArea = [];

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
    ////////////////////////////////////////////////////////////////////////////////////////////

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private lawyerService: LawyerService,
        private api: ApiService,
        private snackBar: MatSnackBar,
        private authService: AuthService
    ) { }

    ngOnInit(): void {
        this.checkRoleAction();
        this.sub = this.route.params.subscribe(params => {
            this.id = params.id;
            this.getUserData();
        });
        // this.getLawyer();
        this.getRole();
        this.getActivityAreaForLawyer("activityAreaOptions");
    }
    // getLawyer(): void {
    //     this.lawyerService.getActiveLawyersList().subscribe(res => {
    //         this.lawyer = res.lawyer;
    //     },
    //         err => {
    //             console.log('err', err);
    //         }
    //     );
    // }

    getRole(): void {
        this.api.getactiverole().subscribe(res => {
            this.role = res.doc;
            this.findRoleValue();
        },
            err => {
                console.log('err', err);
            }
        );
    }
    onChangeRole(event): void {
        // console.log("event",event)
        this.role.forEach(ele => {
            if (event == ele._id) {
                // this.roleValue = ele.useForLawyer,
                // this.roleID = event._id,
                this.roleID = event,
                    this.roles = ele.name
                //  console.log('this.roles',this.roles)
            }
        })
        // console.log("this.roleID",this.roleID)
        // console.log("this.roles",this.roles)
    }
    findRoleValue() {
        this.role.forEach(ele => {
            if (this.roleID == ele._id) { this.roleValue = ele.useForLawyer }
        })
    }
    getUserData(): any {
        this.api.getUser(this.id)

            .subscribe(
                res => {
                    // console.log("res of getting user data", res)
                    this.firstName = res.firstName;
                    this.lastName = res.lastName;
                    this.userName = res.userName;
                    this.email = res.email;
                    this.roles = res.roles;
                    this.status = res.status;
                    this.lawyerid = res.lawyerid;
                    this.roleID = res.roleID;
                    this.itsAdminUser = res.itsAdminUser;
                    this.itsLawyerUser = res.itsLawyerUser;
                    if (res.profilePic) {
                        //  this.imgURL = environment.serviceURL + res.profilePic;
                        this.imgURL = environment.serviceURL + res.profilePic;
                        this.userPic = res.profilePic;
                        // console.log("this.userPic", this.userPic)


                    }

                    if (this.lawyerid) {
                        // console.log("this.lawyerid", this.lawyerid)
                        // this.lawyerDataExists = true;
                        this.itsForLawyer = true;
                        this.getLawyerDataForEdit();
                    }
                    // else {
                    //     this.lawyerDataExists = false;
                    // }
                },
                err => { }
            );


    }

    reset(): any {
        this.showloading = true;
        this.api.resetPassword(this.id)
            .subscribe(
                res => {
                    this.snackBar.open('Lösenordsåterställningen lyckades', 'ok');
                    this.showloading = false;
                },
                err => {
                    this.showloading = false;
                }
            );
    }
    checkAlreadyExistingLawyer(value) {
        // console.log("value",value)
        this.lawyerAlreadyExisting = value;
    }
    existingLawyerHandler(event) {
        // console.log("event",event)
        // this.lawyerRequired = false;
        this.firstName = event.firstName;
        this.lastName = event.lastName;
        this.userName = event.firstName.replace(/\s/g, '');
        this.email = event.email;

    }
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

    //--------------------------------------

    update(): any {
        // console.log("this.itsAdminUser", this.itsAdminUser)
        // console.log("this.itsLawyerUser", this.itsLawyerUser)

        // if (this.roleValue === true) {
        //     if (!this.lawyerid) {
        //         this.showloading = false;
        //         this.snackBar.open('Fyll i alla fält', 'ok');
        //         return;
        //     }
        // }

        this.showloading = true;
        this.snackBar.open("Snälla vänta", '', {
            duration: 1500,
        });

        this.user = [{
            'firstName': this.firstName,
            'lastName': this.lastName,
            'userName': this.userName,
            'roles': this.roles,
            'email': this.email,
            'status': this.status,
            'lawyerid': this.lawyerid,
            'roleID': this.roleID,
            'itsAdminUser': this.itsAdminUser,
            'itsLawyerUser': this.itsLawyerUser,

        }]

        if (!this.firstName || !this.lastName || !this.userName || !this.email || !this.roleID || !this.status
            || (!this.itsAdminUser && !this.itsLawyerUser)) {

            // console.log("this.firstName",this.firstName);
            // console.log("this.lastName",this.lastName);
            // console.log("this.userName",this.userName);
            // console.log("this.email",this.email);
            // console.log("this.roleID",this.roleID);
            // console.log("this.status",this.status);
            // console.log("this.itsAdminUser",this.itsAdminUser);
            // console.log("this.itsLawyerUser",this.itsLawyerUser);
            this.showloading = false;
            this.snackBar.open('Fyll i alla fält', 'ok');
            return;
        }

        if (this.itsForLawyer) {
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
            if (this.userPic) {
                // console.log("this.userPic", this.userPic)
                this.lawyerPic = this.userPic;
            }

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
                'lawyerPic': this.lawyerPic,
            }]

            // console.log("this.lawyer", this.lawyer[0])



            if (!this.email || !this.firstName || !this.lastName || !this.phoneNumber || !this.training || !this.languages || !this.activityArea || !this.title || this.languages.length === 0 || this.activityArea.length === 0) {
                // console.log("this.firstName",this.firstName);
                // console.log("this.lastName",this.lastName);
                // console.log("this.phoneNumber",this.phoneNumber);
                // console.log("this.training",this.training);
                // console.log("this.languages",this.languages);
                // console.log("this.status",this.status);
                // console.log("this.activityArea",this.activityArea);
                // console.log("this.title",this.title);
                this.showloading = false;
                this.snackBar.open('Fyll i alla fält.', 'ok');
                return;
            }

            if (!this.lawyerDataExists) {
                this.lawyerForCreate.firstName = this.firstName;
                this.lawyerForCreate.lastName = this.lastName;
                this.lawyerForCreate.totalMeetingAssigned = this.totalMeetingAssigned;
                this.lawyerForCreate.email = this.email;
                this.lawyerForCreate.status = this.status;
                this.lawyerForCreate.showLawyerToUser = this.showLawyerToUser;
                this.lawyerForCreate.phoneNumber = this.phoneNumber;
                this.lawyerForCreate.training = this.training;
                this.lawyerForCreate.languages = this.languages;
                this.lawyerForCreate.multipleLanguages = this.multipleLanguages;
                this.lawyerForCreate.activityArea = this.activityArea;
                this.lawyerForCreate.title = this.title;
                this.lawyerForCreate.languagesOptions = this.languagesOptions;
                this.lawyerForCreate.lawyerPic = this.lawyerPic;
            }

        }

        this.getLawyersEmailWithAvailability();

        //old before email restrictions (28-09-2022)
        // this.api.updateUser(this.user, this.id)
        //     .subscribe(
        //         res => {
        //             this.snackBar.open('Användaren uppdaterades lyckades', 'ok');
        //             this.showloading = false;
        //         },
        //         err => {
        //             this.showloading = false;
        //         }
        //     );
        // this.router.navigate(['/user']);

    }
    //New for email restrictions
    getLawyersEmailWithAvailability() {
        this.validUserList = [];
        if (this.email) {
            this.lawyerService.getLawyersEmailWithAvailability(this.email).subscribe(res => {
                // console.log('res:',res)
                this.validUserList = res.scheduleMap;
                // console.log("this.validUserList", this.validUserList);

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
                    this.updateLawyerFirst();
                }
                else {
                    this.updateUserData();
                }

                // }
            });
        }
    }
    updateLawyerFirst() {
        if (this.lawyerDataExists) {
            this.api.updateLawyer(this.lawyer, this.lawyerid)
                .subscribe(
                    res => {
                        this.snackBar.open('Användaren uppdaterades lyckades', 'ok');
                        // this.showloading = false;
                        this.updateActivityAreaOptions();
                        // this.redirect();
                        this.updateUserData();
                    },
                    err => {
                        this.showloading = false;
                    }
                );
        }
        else {
            // console.log("lawyer data not found")
            // console.log("lthis.lawyerForCreate",this.lawyerForCreate)
            if (!this.lawyerForCreate.email || !this.lawyerForCreate.firstName || !this.lawyerForCreate.lastName
                || !this.lawyerForCreate.phoneNumber || !this.lawyerForCreate.training || !this.lawyerForCreate.languages
                || !this.lawyerForCreate.activityArea || !this.lawyerForCreate.title) {
                this.showloading = false;
                this.snackBar.open('Fyll i alla fält..', 'Ok', {
                    duration: 3000,
                });
                return;
            }
            this.api.registerlawyer(this.lawyerForCreate)
                .subscribe(
                    res => {
                        // console.log("res of lawyer creation",res);
                        this.lawyerid = res._id;
                        // this.user.lawyerid = res._id;
                        this.user = [{
                            'firstName': this.firstName,
                            'lastName': this.lastName,
                            'userName': this.userName,
                            'roles': this.roles,
                            'email': this.email,
                            'status': this.status,
                            'lawyerid': res._id,
                            'roleID': this.roleID,
                            'itsAdminUser': this.itsAdminUser,
                            'itsLawyerUser': this.itsLawyerUser,

                        }]
                        // console.log("this.user after lawyer creation", this.user);

                        this.updateActivityAreaOptions();
                        // this.redirect();
                        // this.clearFields();
                        // this.submitUserData();
                        this.updateUserData();
                    },
                    err => {
                        this.showloading = false;
                        console.log("err", err)
                        this.snackBar.open('Advokat Användaren misslyckad', 'ok');
                        if (err.error.message && err.error.message.code && err.error.message.code === 11000) {
                            this.snackBar.open('Advokat Användaren finns redan', 'ok');
                        }

                    }
                );
        }

    }
    updateUserData() {

        if (this.fileSource != undefined) {
            this.changeProfile();
        }
        this.api.updateUser(this.user, this.id)
            .subscribe(
                res => {
                    this.snackBar.open('Användaren uppdaterades lyckades', 'ok');
                    this.showloading = false;
                },
                err => {
                    this.snackBar.open('Uppdateringen misslyckades', 'ok');
                    this.showloading = false;
                    console.log(err);
                }
            );
        this.router.navigate(['/user']);
    }

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
    clearLawyerField(): void {
        this.lawyerid = '';
    }
    changeProfile(): any {
        const formData = new FormData();
        formData.append('file', this.fileSource);
        formData.append('userId', this.id);
        if (this.lawyerid) {
            formData.append('lawyerId', this.lawyerid);
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

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    getLawyerDataForEdit() {
        this.api.getLawyer(this.lawyerid)
            .subscribe(
                res => {
                    // console.log("res of lawyer get",res);

                    // this.firstName = res.firstName;
                    // this.lastName = res.lastName;
                    // this.email = res.email;
                    // this.status = res.status;
                    this.totalMeetingAssigned = res.totalMeetingAssigned;
                    this.showLawyerToUser = res.showLawyerToUser;
                    this.phoneNumber = res.phoneNumber;
                    this.training = res.training;
                    this.languages = res.languages;
                    this.selectedLanguages = res.languages;
                    this.multipleLanguages = res.multipleLanguages;
                    if (res.languagesOptions && res.languagesOptions.length > 0) {
                        // console.log("res.languagesOptions",res.languagesOptions)
                        this.languagesOptions = res.languagesOptions;
                    }
                    // this.languages =['Svenska', 'Engelska',  'Arabiska', 'Persiska'];
                    this.activityArea = res.activityArea;
                    this.selectedActivityArea = res.activityArea;
                    this.title = res.title;

                    // if (res.lawyerPic) {
                    //     this.imgURL = environment.serviceURL + res.lawyerPic;
                    // }
                    if (this.showLawyerToUser == true) {
                        this.checkNotCheck = 1;
                    }

                    this.lawyerDataExists = true;

                    //commented 28-09-2022(may be no need)
                    // this.getLawyersEmailWithAvailability();
                    // console.log('this.checkNotCheck',this.checkNotCheck)

                },
                err => { }
            );
    }
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
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from "../../environments/environment";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

    userName = '';
    fullName = '';
    firstName = '';
    lastName = '';
    role = '';
    roleToShow = '';
    email = '';
    newEmail = '';
    confirmEmail = '';
    password = '';
    userId = '';
    confirmPassword = '';
    showLoader = false;
    alert: { success: boolean, text: string } = { success: true, text: '' };
    showChangePassword = false;
    showChangeEmail = false;
    profileImgURL: string | ArrayBuffer;
    loadingProfileImage = true;

    imgURL: string | ArrayBuffer;
    editProfile = false;
    anyDataChange = false;
    viewFullPic = false;
    //Image update
    imageUploadingLoader = false;
    profilePic: any;
    fileSource: any;
    imagePath: '';
    lawyerid = '';
    currentPath = '';
    //////////////
    user: {
        firstName: string; lastName: string; userName: string;
        //  itsAdminUser: any; itsLawyerUser: any; roles: string; email: string; status: string; lawyerid: string; roleID: string;
    }[];
    viewProfileDetails = true;
    viewLawyerBusyTime = false;
    isEditOfficeTimes = false;
    officeTimesId = '';
    timesOptions = [];
    officeStartTime = '';
    officeStartTimeIndex: any;
    officeEndTime = '';
    officeEndTimeIndex: any;
    selectedOfficeTimesArray: any;
    isSelectedTimeInvalid = false;

    constructor(
        private authService: AuthService,
        private router: Router,
        private snackBar: MatSnackBar,
        private api: ApiService) {
    }

    ngOnInit(): void {
        let currentPath = location.pathname;
        if (currentPath.includes('profile/busyCalendar')) {
            // console.log('currentPath', currentPath);
            this.editLawyerBusyTime();
        }
        this.userName = this.authService.getUser();
        this.fullName = this.authService.getFirst() + ' ' + this.authService.getLast();
        this.firstName = this.authService.getFirst();
        this.lastName = this.authService.getLast();
        this.role = this.authService.getRole();
        this.email = this.authService.getEmail();
        this.userId = this.authService.getId();
        this.getUserData();
        this.getAllOfficeTimes('netlexOfficeTimings');
    }

    getUserData(): void {
        this.api.getUser(this.userId)
            .subscribe(res => {
                // console.log("res", res);

                this.userName = res.userName;
                this.firstName = res.firstName;
                this.lastName = res.lastName;
                this.email = res.email;
                this.role = res.roles;
                this.userName = res.userName;
                this.fullName = res.firstName + ' ' + res.lastName;
                this.roleToShow = res.roles;

                // User have profile pic or not
                if (res.profilePic) {
                    // console.log("res.profilePic",res.profilePic);
                    this.profileImgURL = environment.serviceURL + res.profilePic;
                    setTimeout(() => {
                        this.loadingProfileImage = false;
                    }, 500)
                }
                else {
                    // this.profileImgURL = './assets/images/NoProfileImage.png';
                    setTimeout(() => {
                        this.loadingProfileImage = false;
                    }, 500)
                }

                // User have lawyer id or not
                if (res.lawyerid) {
                    // console.log("res.lawyerid", res.lawyerid);
                    this.lawyerid = res.lawyerid;
                }

            },
                err => { }
            );
    }

    changePassword(): void {

        // if (!this.password || !this.confirmEmail) {
        //     this.snackBar.open('Saknar e-post ',' ok ');  // Missing password
        //     return;
        // }
        if (!this.password) {
            this.snackBar.open('Lösenordet får inte vara tomt', ' ok ');  // Missing password
            return;
        }
        if (this.password.length < 4 || this.confirmPassword.length < 4) {
            this.snackBar.open('Lösenordslängden måste vara minst 4 tecken', 'ok');
            // Password length must be at least 4 character
            return;
        }

        if (!(this.password.length === this.confirmPassword.length)) {
            this.snackBar.open('Lösenord matchar inte', 'ok'); // Passwords Mismatch
            return;
        }

        this.showLoader = true;
        this.api.changePassword(this.password).subscribe(res => {
            this.snackBar.open('lösenordet har ändrats', 'ok'); // Password changed successfully
            this.showLoader = false;
            this.editProfile = false;
        },
            err => {
                this.showLoader = false;
            });
    }

    // changeEmail(): void {

    //     if (!this.newEmail || !this.confirmPassword) {
    //         this.snackBar.open('Lösenord saknas', 'ok');  // Missing password
    //         return;
    //     }

    //     if (this.password.length < 4 || this.confirmPassword.length < 4) {
    //         this.snackBar.open('Lösenordslängden måste vara minst 4 tecken', 'ok');
    //                                 // Password length must be at least 4 character
    //         return;
    //     }

    //     if (!(this.password.length === this.confirmPassword.length)) {
    //         this.snackBar.open('Lösenord matchar inte', 'ok'); // Passwords Mismatch
    //         return;
    //     }

    //     this.showLoader = true;
    //     this.api.changePassword(this.password).subscribe(res => {
    //             this.snackBar.open('lösenordet har ändrats', 'ok'); // Password changed successfully
    //             this.showLoader = false;
    //         },
    //         err => {
    //             this.showLoader = false;
    //         });
    // }

    displayChangePassword(): void {
        this.showChangePassword = true;
        // this.displayChangeEmail2();
    }
    // displayChangeEmail(): void{
    //     // this.showChangeEmail = true;
    //     this.showChangePassword = false;

    // }
    // displayChangeEmail2(): void{
    //     this.showChangeEmail = false;
    // }
    // displayChangeEmail2(): void{
    //     this.showChangeEmail = false;
    // }
    viewFullPicHandler(): void {
        console.log("pic click")
        this.viewFullPic = !this.viewFullPic;
    }
    editProfileHandler() {
        this.editProfile = true;
    }
    cancelEditProfileHandler() {
        this.editProfile = false;
        this.anyDataChange = false;

    }
    changePasswordHandler(value) {
        this.showChangePassword = value;
    }
    anyDataChangeHandler() {
        this.anyDataChange = true;
    }
    updateUserProfile() {
        this.showLoader = true;

        if (!this.anyDataChange) {
            this.snackBar.open('Snälla du, Ändra data före uppdatering', 'ok');
            this.showLoader = false;
            return;

        }
        if (!this.firstName || !this.lastName || !this.userName) {
            // console.log("any field is empty");
            this.showLoader = false;
            this.snackBar.open('Fyll i alla fält', 'ok');
            return;
        }
        if (this.showChangePassword) {
            // console.log("this.showChangePassword", this.showChangePassword);
            this.changePassword();
        }
        this.user = [{
            'firstName': this.firstName,
            'lastName': this.lastName,
            'userName': this.userName,
            // 'email': this.email,
            // 'status': this.status,
        }]
        if (this.fileSource != undefined) {
            this.changeProfile();
        }
        this.api.updateUser(this.user, this.userId)
            .subscribe(
                res => {
                    this.snackBar.open('Uppdateringen lyckades', 'ok');
                    this.showLoader = false;
                    this.editProfile = false;
                    this.anyDataChange = false
                    this.showChangePassword = false;
                },
                err => {
                    this.snackBar.open('Uppdateringen misslyckades', 'ok');
                    this.showLoader = false;
                    console.log(err);
                }
            );
    }
    onFileChange(event): any {
        // this.anyDataChange = true;
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
    changeProfile(): any {
        this.imageUploadingLoader = true;
        const formData = new FormData();
        formData.append('file', this.fileSource);
        formData.append('userId', this.userId);
        if (this.lawyerid) {
            formData.append('lawyerId', this.lawyerid);
        }

        if (this.fileSource != undefined) {
            this.api.uploadProfilePic(formData)
                .subscribe(res => {
                    this.snackBar.open('Profilbilden har uppdaterats', 'ok');
                    this.showLoader = false;
                    this.editProfile = false;
                    this.imageUploadingLoader = false;
                    window.location.reload();
                    // this.fileSource = undefined;
                });
        }
        else {
            this.snackBar.open('Profilbilden kan inte uppdateras(Välj bild igen)', 'ok');
            this.imageUploadingLoader = false;
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
            this.profileImgURL = reader.result;

        };
    }

    // ======= Edit Office Times (Office Working Hours) =======
    getAllOfficeTimes(name): any {
        this.api.getOfficeTimes(name).subscribe((res: any) => {
            let response = res.doc[0];
            // console.log("response", response);
            this.officeTimesId = response._id;
            this.timesOptions = response.allTimesOptions;

            this.officeStartTime = response.officeTimes[0];
            let index = this.timesOptions.findIndex((item) => item === response.officeTimes[response.officeTimes.length - 1]);
            // console.log('index',index);
            this.officeEndTime = this.timesOptions[index + 1];

            // Indexes of selected times
            this.officeStartTimeIndex = this.timesOptions.findIndex((item) => item === response.officeTimes[0])
            this.officeEndTimeIndex = index + 1;
            this.timeDifferenceHandler();
        },
            (error: any) => {
                console.log('Error while getting all office times', error);
            });
    }
    onUpdateOfficeTimes() {
        // console.log('this.timesOptions', this.timesOptions);
        // console.log('this.selectedOfficeTimesArray', this.selectedOfficeTimesArray);
        if (this.isSelectedTimeInvalid) {
            this.snackBar.open('Till tid borde vara större än Från tid', 'ok');
            return;
        }
        if (!this.selectedOfficeTimesArray) {
            this.snackBar.open('Fyll i alla fält', 'ok');
            return;
        }
        let contentPages = [{
            'officeTimes': this.selectedOfficeTimesArray,
        }]
        this.api.updateOfficeTimes(contentPages, this.officeTimesId).subscribe(
            (res: any) => {
                console.log('res', res);
                this.snackBar.open('Uppdateringen lyckades', 'ok');
                this.closeOfficeTimesHandler();
            },
            (error: any) => {
                this.snackBar.open('Uppdateringen misslyckades', 'ok');
                console.log('Error in updating office times', error);
            })
    }
    editOfficeTimes() {
        this.isEditOfficeTimes = true;
    }
    closeOfficeTimesHandler() {
        this.isEditOfficeTimes = false;
    }
    // ============== Edit Lawyer busy times ==============
    editLawyerBusyTime() {
        // console.log('editLawyerBusyTime Fun');
        this.viewProfileDetails = false;
        this.viewLawyerBusyTime = true;
    }
    startTimeChangeHandler(): any {
        // console.log('timesOptions',this.timesOptions);
        console.log('officeStartTime', this.officeStartTime);
        this.officeStartTimeIndex = this.timesOptions.findIndex((item) => item === this.officeStartTime)
        console.log('this.officeStartTimeIndex', this.officeStartTimeIndex);
        if (this.officeEndTimeIndex) this.timeDifferenceHandler();
    }
    endTimeChangeHandler(): any {
        // console.log('officeEndTime',this.officeEndTime);
        this.officeEndTimeIndex = this.timesOptions.findIndex((item) => item === this.officeEndTime)
        console.log('this.officeEndTimeIndex', this.officeEndTimeIndex);
        this.timeDifferenceHandler();
    }
    timeDifferenceHandler() {
        this.selectedOfficeTimesArray = this.timesOptions.slice(this.officeStartTimeIndex, this.officeEndTimeIndex);
        // console.log('this.selectedOfficeTimesArray', this.selectedOfficeTimesArray);
        if (this.selectedOfficeTimesArray.length === 0) {
            this.isSelectedTimeInvalid = true;
        } else {
            this.isSelectedTimeInvalid = false;
        }
    }
    errorClickHandler() {
        alert('Till tid borde vara större än Från tid');
    }
    closeBusyTimeHandler(value: string) {
        if (value === 'true') {
            this.viewProfileDetails = true;
            this.viewLawyerBusyTime = false;
            this.isEditOfficeTimes = false;
        }
    }

}

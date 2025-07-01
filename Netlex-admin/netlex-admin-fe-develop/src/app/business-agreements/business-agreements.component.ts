import { Component, HostListener, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Field } from '../models/field.model';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BusinessAgreementsService } from '../services/businessAgreement.service';
import { MatSelectionListChange } from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Constant } from '../../constant';
import { FieldService } from '../services/field.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { environment } from "../../environments/environment";
import * as Editor from '../../assets/ckeditor';
import Swal from "sweetalert2";
import { LocationStrategy } from '@angular/common';
import { query } from '@angular/animations';
import { menuactionspagename } from '../models/pagesnameandId';
import { AuthService } from "../services/auth.service";
import { ApiService } from "../services/api.service";
export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

@Component({
    selector: 'app-business-agreements',
    templateUrl: './business-agreements.component.html',
    styleUrls: ['./business-agreements.component.scss']
})
export class BusinessAgreementsComponent implements OnInit {
    @ViewChild('ckEditorComp', { static: false }) ckEditorComp: any;

    constructor(public dialog: MatDialog,
        public businessAgreementsService: BusinessAgreementsService,
        private snackBar: MatSnackBar,
        private router: ActivatedRoute,
        public route: Router,
        private location: LocationStrategy,
        private fieldService: FieldService, private authService: AuthService, private api: ApiService
    ) {

        // history.pushState(null, null, window.location.href);
        // // check if back or forward button is pressed.
        // this.location.onPopState(() => {
        //     history.pushState(null, null, window.location.href);

        // });
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
    // editorConfig2 = {
    //     toolbar: {
    //         items: [
    //             'bold',
    //             'italic',
    //             'underline',
    //             '|',
    //             '|',
    //             'fontSize',
    //             'fontFamily',
    //             '|',
    //             'heading',
    //             '|',
    //             'fontColor',
    //             'fontBackgroundColor',
    //             '|',
    //             'link',
    //             'blockQuote',
    //             'imageUpload',
    //             'insertTable',
    //             'mediaEmbed',
    //             '|',
    //             'undo',
    //             'redo',
    //             'findAndReplace',
    //             'highlight'
    //         ]
    //     },
    //     language: 'sv',
    //     licenseKey: environment.ckEditorLicense
    // };
    htmlContent = '';
    documentTitle = '';
    documentDescription = '';
    documentPrice = '';
    documentTax = '';
    status = '';
    id = '';
    editFieldId = '';

    fieldList: Field[];
    add: boolean;
    edit = false;
    field;
    panelOpenState: boolean;
    fieldsId = [];
    destroy = true;
    //-----------For Uploading Files------------

    //For Video
    agreementVideoSource: any;
    videoPath: any;
    // videoUrl: string | ArrayBuffer;
    videoUrl: any;
    agreementVideo: any;
    showLoader = false;
    uploadingLoader = false;
    videoEdit = false;
    editVideoUrl: any;
    //For Image
    agreementHeaderPicUrl: any;
    imagePath: any;
    agreementImage: any;
    agreementImageSource: any;

    //For Pdf Attachment
    pdfAttachment: any;
    pdfAttachmentSource: any;
    pdfUploadingLoader = false;

    // numaa = [{},{},{},{},{},{},{},{},{},{},{},];

    documentTitleErr = new FormControl('', [
        Validators.required,
    ]);
    documentPriceErr = new FormControl('', [
        Validators.required,
    ]);
    documentTaxErr = new FormControl('', [
        Validators.required,
    ]);

    matcher = new MyErrorStateMatcher();

    ngOnInit(): void {
        // this.checkRoleAction();
        this.add = false;
        this.panelOpenState = false;

        if (this.id === '') {
            this.router.params.subscribe(params => {
                this.id = params?.id;
            });
        }
        if (this.id !== '') {
            this.fetchBusinessAgreementById();
        }
        // this.getActiveFields();
        window.addEventListener('beforeunload', function (e) {
            const confirmationMessage = '\o/';
            e.returnValue = confirmationMessage;
            return confirmationMessage;
        });
    }
    ngOnDestroy(): void { // delete the local fields of unsaved document
        if (this.destroy) {
            this.fieldService.unsavedDocumentFieldsDelete(this.fieldsId).subscribe();
        }
    }
    fetchBusinessAgreementById(): any { // get the document by id

        if (this.id) {
            this.businessAgreementsService.getBusinessAgreementById(this.id).subscribe(response => {
                // console.log("response",response)
                // this.htmlContent = response.document;
                this.documentTitle = response.documentTitle;
                this.documentDescription = response.documentDescription;
                this.documentPrice = response.documentPrice;
                this.documentTax = response.documentTax;
                if (response.pdfAttachment) {
                    this.pdfAttachment = response.pdfAttachment;
                    // console.log("this.pdfAttachment",this.pdfAttachment); 
                    this.pdfAttachment = environment.serviceURL + this.pdfAttachment;
                    // console.log("this.pdfAttachment1111",this.pdfAttachment); 
                }

                // if (response.agreementConfirmPic) {
                //     this.agreementHeaderPicUrl = environment.serviceURL + response.agreementConfirmPic;
                // }
                // if (response.videoPaths) {
                //     // this.videoUrl = environment.serviceURL + response.videoPaths;
                //     this.videoEdit = true;
                //     this.editVideoUrl = environment.serviceURL;
                //     this.videoUrl = response.videoPaths;
                //     // console.log("this.videoUrl",this.videoUrl)
                // }
                // else {
                //     this.videoEdit = false;
                // }
            });
        }

    }
    viewFileHandler() {
        // this.route.navigate([this.pdfAttachment]);
        window.open(this.pdfAttachment, '_blank');
    }
    directSaveAndPublish(status) {
        this.status = 'Published'
        console.log('htmlContent', this.htmlContent, this.ckEditorComp.editorInstance.getData());
        this.businessAgreementsService.submitBusinessAgreement(this.id, this.documentTitle,
            this.documentDescription, this.documentPrice, this.documentTax, this.status).subscribe(res => {
                // console.log("dcccccc--res", res)
                this.destroy = false;
                if (status === 'publishSave') {
                    Swal.fire(
                        'Framgång',
                        'Dokument publicerat',
                        'success'
                    ).then();
                    this.route.navigate(['/businessAgreementsList']);
                }


                if (this.status === 'View') {

                } else {
                    this.htmlContent = this.documentTitle = this.documentDescription = this.documentPrice = this.documentTax =
                        this.status = '';
                }

            });
    }
    submitText(): void { // submit the document and redirect the screen to draft or published lists
        // if (!this.id) {
        //     // this.htmlContent = '<div style="margin: 70px">' + this.htmlContent + '</div>';
        //     this.htmlContent = '<div style="margin: 70px">' + "Heello" + '</div>';
        // }
        this.pdfUploadingLoader = true;
        console.log('htmlContent', this.htmlContent, this.ckEditorComp.editorInstance.getData());
        this.businessAgreementsService.submitBusinessAgreement(this.id, this.documentTitle,
            this.documentDescription, this.documentPrice, this.documentTax, this.status).subscribe(res => {
                // console.log("dcccccc--res", res)
                let newId = res._id;
                if (this.pdfAttachmentSource && this.pdfAttachmentSource != undefined) {
                    const formData = new FormData();
                    formData.append('file', this.pdfAttachmentSource);
                    formData.append('businessAgreementId', newId);
                    this.businessAgreementsService.uploadBusimessAgreementPdf(formData)
                        .subscribe(res => {
                            this.snackBar.open('Företag avtal Pdf har uppdaterats', 'ok');
                            // this.openDialog('publishSave')
                            this.pdfUploadingLoader = false;
                            this.redirect(newId)
                            this.destroy = false;

                        },
                            err => {
                                console.log('err', err);
                                this.pdfUploadingLoader = false;
                                this.snackBar.open('uploading failed', 'ok');

                            }
                        );

                }
                else {
                    // this.snackBar.open('Bilden kan inte uppdateras (Välj först)', 'ok');
                    // this.openDialog('publishSave')
                    // this.directSaveAndPublish('publishSave');
                    this.pdfUploadingLoader = false;
                    this.redirect("")
                    this.destroy = false;

                }
                // if (this.status === 'View') {
                //     const url = this.route.serializeUrl(
                //         this.route.createUrlTree([`/view/pdf/`], {
                //             queryParams: {
                //                 newId: res._id
                //             }
                //         })
                //     );
                //     window.open(url, '_blank');

                // }
                // if (this.status === 'Published') {
                //     Swal.fire(
                //         'Framgång',
                //         'Företag avtal publicerat',
                //         'success'
                //     ).then();
                //     this.route.navigate(['/businessAgreementsList']);

                // }
                // else if (this.status === 'Draft') {
                //     Swal.fire(
                //         'Framgång',
                //         'Företag avtal sparat',
                //         'success'
                //     ).then();
                //     this.route.navigate(['/businessAgreementsDraftList']);
                // }
                // if (this.status === 'View') {

                // } else {
                //     this.htmlContent = this.documentTitle = this.documentDescription = this.documentPrice = this.documentTax =
                //         this.status = '';
                // }

            });
    }
    redirect(newId) {

        if (this.status === 'View') {
            const url = this.route.serializeUrl(
                this.route.createUrlTree([`/view/pdf/`], {
                    queryParams: {
                        newId: newId
                    }
                })
            );
            window.open(url, '_blank');

        }
        if (this.status === 'Published') {
            Swal.fire(
                'Framgång',
                'Företag avtal publicerat',
                'success'
            ).then();
            this.route.navigate(['/businessAgreementsList']);

        }
        else if (this.status === 'Draft') {
            Swal.fire(
                'Framgång',
                'Företag avtal sparat',
                'success'
            ).then();
            this.route.navigate(['/businessAgreementsDraftList']);
        }
        if (this.status === 'View') {

        } else {
            this.htmlContent = this.documentTitle = this.documentDescription = this.documentPrice = this.documentTax =
                this.status = '';
        }
    }
    openAdd(): void {
        this.add = !this.add;
    }


    openDialog(event): void { // open a dialog for local id delete, publish and save
        console.log(event);

        if ((!this.documentTitle || !this.documentPrice || !this.documentTax || !this.documentDescription)
            && event === 'publishSave') {
            this.snackBar.open('Ange dokumentets detaljer!', 'OK');
            return;
        }

        const dialogRef = this.dialog.open(DialogForPublishComponent, {
            width: '350px',
            height: '202px',
            data: { dialogType: event }
        });

        dialogRef.afterClosed().subscribe(result => {

            // if (result === 'delete') {
            //     this.deleteLocalField(event);//
            // }

            if (result === 'Draft' || result === 'Published' || result === 'View') {
                this.status = result;
                this.submitText();
            }

        });
    }
    public onReady(editor) {
        editor.ui.getEditableElement().parentElement.insertBefore(
            editor.ui.view.toolbar.element,
            editor.ui.getEditableElement()
        );
    }
    taxAddition(event): void {
        this.documentTax = (event * 0.25).toString();
    }
    // checkRoleAction(): any {
    //     let RoleID = this.authService.getroleID();
    //     let roleactionID = menuactionspagename.businessAgreements.MAId;
    //     this.api.GetRoleActionByRoleIdRoleActionId(RoleID, roleactionID)
    //         .subscribe(
    //             res => {
    //                 // console.log("res",res)
    //                 if (res.menuactionslist.length == 0) {
    //                     this.authService.logout();
    //                 }

    //             },
    //             err => { }
    //         );
    // }
    //--------------Upload Pdf Attachment Video---------------
    onBusimessAgreementPdfChange(event): any {
        // console.log("event",event.target.files[0])
        // this.videoEdit = false;
        if (event.target.files.length > 0) {
            // this.showLoader = true;
            // this.previewFooterBgImage(event.target.files);
            // const file = event.target.files[0];
            const file = event.target.files;
            this.pdfAttachmentSource = file[0];
        }
    }
    uploadBusimessAgreementPdf(): any {
        this.pdfUploadingLoader = true;
        const formData = new FormData();
        if (this.pdfAttachmentSource != undefined) {
            formData.append('file', this.pdfAttachmentSource);
            formData.append('businessAgreementId', this.id);
            this.businessAgreementsService.uploadBusimessAgreementPdf(formData)
                .subscribe(res => {
                    this.snackBar.open('Företag avtal Pdf har uppdaterats', 'ok');
                    // this.openDialog('publishSave')
                    this.openDialog('publishSave');
                    this.pdfUploadingLoader = false;
                },
                    err => {
                        console.log('err', err);
                        this.pdfUploadingLoader = false;
                        this.snackBar.open('uploading failed', 'ok');

                    }
                );
        }
        else {
            this.snackBar.open('Bilden kan inte uppdateras (Välj först)', 'ok');
            // this.openDialog('publishSave')
            // this.directSaveAndPublish('publishSave');
            this.pdfUploadingLoader = false;
        }

    }
    //--------------Upload Agreement Video---------------
    onVideoChange(event): any {
        // console.log("event",event.target.files[0])
        this.videoEdit = false;
        if (event.target.files.length > 0 && event.target.files.length < 3) {
            this.showLoader = true;
            this.previewFooterBgImage(event.target.files);
            // const file = event.target.files[0];
            const file = event.target.files;
            this.agreementVideoSource = file;
        }
        else if (event.target.files.length === 0) {
            let array = [];
            array.push({ url: '' })
            this.videoUrl = array;
            this.agreementVideoSource = undefined;
        }
        else if (event.target.files.length >= 3) {
            this.snackBar.open('Högst två videor tillåtna', 'ok');
            let array = [];
            array.push({ url: '' }, { url: '' }, { url: '' })
            this.videoUrl = array;
            this.agreementVideoSource = undefined;

        }
    }
    previewFooterBgImage(files): any {
        if (files.length === 0) {
            return;
        }
        // console.log("files[0]", files[0])

        // const mimeType = files[0].type;
        // if (mimeType.match(/video\/*/) == null) {
        //     // this.message = 'Only images are supported.';
        //     return;
        // }
        this.videoPath = files;
        // reader.readAsDataURL(files[0]);
        // reader.onload = (event) => {
        //     this.videoUrl = reader.result;
        //     // console.log("this.videoUrl",this.videoUrl)
        // };
        const loopLimit = files.length;
        let array = [];
        for (var i = 0; i < loopLimit; i++) {
            // console.log("files[i]", files[i])
            const mimeType = files[i].type;
            if (mimeType.match(/video\/*/) == null) {
                // this.message = 'Only images are supported.';
                return;
            }
            // setTimeout(() => { })
            let reader = new FileReader();
            reader.readAsDataURL(files[i]);
            reader.onload = (event) => {
                // console.log("this.videoUrl",this.videoUrl)
                // this.videoUrl = reader.result;
                array.push({
                    url: reader.result
                })
                // console.log("array",array)
                // console.log("this.videoUrl",this.videoUrl)
                if (array.length === files.length) {
                    this.videoUrl = array;
                    // console.log("this.videoUrl", this.videoUrl)
                    setTimeout(() => {
                        this.showLoader = false;
                    }, 2000)
                }
            };
        }
        // files.FileList.forEach(element => {
        //     const mimeType = element.type;
        //     if (mimeType.match(/video\/*/) == null) {
        //         return;
        //     }
        //     reader.readAsDataURL(files[0]);
        //     reader.onload = (event) => {
        //         this.videoUrl = reader.result;
        //         // console.log("this.videoUrl",this.videoUrl)
        //     };
        // });
    }

    uploadVideoHandler(): any {
        // console.log("this.agreementVideoSource", this.agreementVideoSource)
        this.uploadingLoader = true;
        if (this.agreementVideoSource != undefined) {
            this.businessAgreementsService.uploadAgreementVideoReq(this.id)
                .subscribe(res => {
                    // this.snackBar.open('Laddades upp', 'ok');
                    if (res.msg === 'removedOldPaths') {
                        console.log("res.msg", res.msg)
                        let uploadingLoopLimit = this.agreementVideoSource.length;
                        let array = [];
                        const formData = new FormData();
                        for (var i = 0; i < uploadingLoopLimit; i++) {
                            // array.push({
                            //     videoFile : this.agreementVideoSource[i]
                            // })
                            formData.append('file', this.agreementVideoSource[i]);
                            formData.append('agreementId', this.id);
                            if (i === 0) {
                                formData.append('videoName', 'one');
                            }
                            else if (i === 1) {
                                formData.append('videoName', 'two');
                            }
                            // else if(i===2){
                            //     formData.append('videoName', 'three');
                            // }
                            this.businessAgreementsService.uploadAgreementVideos(formData)
                                .subscribe(res => {
                                    this.snackBar.open('Laddades upp', 'ok');
                                });
                            if (i === uploadingLoopLimit - 1) {
                                this.uploadingLoader = false;
                            }
                        }

                    }
                });
        }
        else {
            this.snackBar.open('Uppladdningen misslyckades (Välj en video först)', 'ok');
            this.uploadingLoader = false;
        }
        // this.agreementVideoSource = this.agreementVideoSource[0];


    }

    //--------------Upload Agreement Hero Banner Pic---------------
    onImageChange(event): any {
        // console.log("event",event.target.files[0])
        if (event.target.files.length > 0) {
            // this.showLoader = true;
            this.previewAgreementHeaderImage(event.target.files);
            const file = event.target.files[0];
            this.agreementImageSource = file;
        }
        else {
            this.agreementHeaderPicUrl = undefined;
            this.agreementImageSource = undefined;
            this.snackBar.open('Bild krävs', 'ok');
        }
    }
    previewAgreementHeaderImage(files): any {
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
            this.agreementHeaderPicUrl = reader.result;
        };
    }

    changeAgreementHeaderPic(): any {
        const formData = new FormData();
        if (this.agreementImageSource != undefined) {
            formData.append('file', this.agreementImageSource);
            formData.append('agreementId', this.id);
            this.businessAgreementsService.uploadAgreementHeaderPic(formData)
                .subscribe(res => {
                    this.snackBar.open('Avtal Header Bild har uppdaterats', 'ok');
                });
        }
        else {
            this.snackBar.open('Bilden kan inte uppdateras (Välj först)', 'ok');
        }

    }
}

@Component({
    selector: 'app-dialog-publish',
    templateUrl: 'dialog-publish.html',
    styleUrls: ['./business-agreements.component.scss']
})
export class DialogForPublishComponent {
    isDelete = false;
    isPublishOrDraft = false;
    isDocumentChange = false;


    constructor(
        public dialogRef: MatDialogRef<DialogForPublishComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { dialogType }) {
        // data.eventState === 'publishSave' ? this.isDelete = false : this.isDelete = true ;

        if (data.dialogType === 'publishSave') {
            this.isPublishOrDraft = true;
        } else if (data.dialogType === 'documentChange') {
            this.isDocumentChange = true;
        } else {
            this.isDelete = true;
        }
    }

    save(): void {
        this.dialogRef.close(Constant.draft);
    }

    view(): void {
        this.dialogRef.close(Constant.view);
    }

    ok(): void {
        this.dialogRef.close(Constant.ok);
    }

    cancel(): void {
        this.dialogRef.close(Constant.cancel);
    }

    publish(): void {
        this.dialogRef.close(Constant.published);
    }

    delete(event): void {
        event ? this.dialogRef.close('delete') : this.dialogRef.close(false);
    }

}

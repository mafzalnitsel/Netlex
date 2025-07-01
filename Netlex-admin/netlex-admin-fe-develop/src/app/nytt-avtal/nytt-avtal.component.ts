import {
  Component,
  HostListener,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { Field } from "../models/field.model";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from "@angular/material/dialog";
import { NyttAvtalService } from "../services/nyttavtal.service";
import { MatSelectionListChange } from "@angular/material/list";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { Constant } from "../../constant";
import { FieldService } from "../services/field.service";
import { ErrorStateMatcher } from "@angular/material/core";
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from "@angular/forms";
import { environment } from "../../environments/environment";
import * as Editor from "../../assets/ckeditor";
import Swal from "sweetalert2";
import { LocationStrategy } from "@angular/common";
import { query } from "@angular/animations";
import { menuactionspagename } from "../models/pagesnameandId";
import { AuthService } from "../services/auth.service";
import { ApiService } from "../services/api.service";
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: "app-nytt-avtal",
  templateUrl: "./nytt-avtal.component.html",
  styleUrls: ["./nytt-avtal.component.scss"],
})
export class NyttAvtalComponent implements OnInit, OnDestroy {
  @ViewChild("ckEditorComp", { static: false }) ckEditorComp: any;

  constructor(
    public dialog: MatDialog,
    public nyttAvtalService: NyttAvtalService,
    private snackBar: MatSnackBar,
    private router: ActivatedRoute,
    public route: Router,
    private location: LocationStrategy,
    private fieldService: FieldService,
    private authService: AuthService,
    private api: ApiService
  ) {
    history.pushState(null, null, window.location.href);
    // check if back or forward button is pressed.
    this.location.onPopState(() => {
      history.pushState(null, null, window.location.href);
    });
  }

  public ckEditor = Editor;
  editorConfig = {
    toolbar: {
      items: [
        // 'nextPage',
        // 'previousPage',
        "pageNavigation",
        "|",
        "alignment",
        "pageBreak",
        "|",
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "|",
        "outdent",
        "indent",
        "|",
        "fontSize",
        "fontFamily",
        "|",
        "heading",
        "|",
        "fontColor",
        "fontBackgroundColor",
        "|",
        "numberedList",
        "bulletedList",
        "|",
        "todoList",
        "link",
        "blockQuote",
        "imageUpload",
        "insertTable",
        "mediaEmbed",
        "|",
        "undo",
        "redo",
        "findAndReplace",
        "highlight",
      ],
    },
    language: "sv",
    image: {
      toolbar: [
        "imageTextAlternative",
        "imageStyle:inline",
        "imageStyle:block",
        "imageStyle:side",
      ],
    },
    table: {
      contentToolbar: [
        "tableColumn",
        "tableRow",
        "mergeTableCells",
        "tableCellProperties",
        "tableProperties",
      ],
    },
    pagination: {
      // A4
      pageWidth: "21cm",
      pageHeight: "29.7cm",

      pageMargins: {
        top: "20mm",
        bottom: "20mm",
        right: "12mm",
        left: "12mm",
      },
    },
    licenseKey: environment.ckEditorLicense,
  };
  editorConfig2 = {
    toolbar: {
      items: [
        "bold",
        "italic",
        "underline",
        "|",
        "|",
        "fontSize",
        "fontFamily",
        "|",
        "heading",
        "|",
        "fontColor",
        "fontBackgroundColor",
        "|",
        "link",
        "blockQuote",
        "imageUpload",
        "insertTable",
        "mediaEmbed",
        "|",
        "undo",
        "redo",
        "findAndReplace",
        "highlight",
      ],
    },
    language: "sv",
    licenseKey: environment.ckEditorLicense,
  };
  htmlContent = "";
  documentTitle = "";
  documentDescription = "";
  documentPrice = "";
  documentTax = "";
  status = "";
  id = "";
  editFieldId = "";

  fieldList: Field[];
  add: boolean;
  edit = false;
  field;
  panelOpenState: boolean;
  fieldsId = [];
  destroy = true;
  //------||||||||||-------New------||||||||------//
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
  //For Attachment
  pdfAttachment: any;
  pdfAttachmentSource: any;
  pdfUploadingLoader = false;

  attachmentExist = false;
  public agreementTypeOptions: any = [
    {
      label0: "Personligt Avtal",
      label: "Personligt",
      value: "personal",
      checked: true,
    },
    {
      label0: "Företag Avtal",
      label: "Företag",
      value: "business",
      checked: false,
    },
  ];
  // agreementType: any;
  agreementType = 'personal';
  public agreementContainsOptions: any = [
    {
      // label0: "Personligt Avtal",
      label: "Endast frågesvar",
      value: "QuestionAnswers",
      checked: true,
    },
    {
      // label0: "Företag Avtal",
      label: "Endast dokumentbilaga",
      value: "AttachmentDoc",
      checked: false,
    },
    {
      // label0: "Företag Avtal",
      label: "Både",
      value: "Both",
      checked: false,
    },
  ];
  // agreementContains: any;
  agreementContains = 'QuestionAnswers';
  globelKeys: any = [];
  userDummyKey = { _id: '62173c83173278ec7c631dd9', question: 'Användarnamn och personnummer' }
  counterPartiesDummyKey = { _id: '924c362h652590o26f365dr2', question: 'Alla motparter' }
  // numaa = [{},{},{},{},{},{},{},{},{},{},{},];
  isCloneDocument = false;
  //------||||||||||-------New------||||||||------//

  documentTitleErr = new FormControl("", [Validators.required]);
  documentPriceErr = new FormControl("", [Validators.required]);
  documentTaxErr = new FormControl("", [Validators.required]);

  matcher = new MyErrorStateMatcher();

  ngOnInit(): void {
    this.checkRoleAction();

    this.add = false;
    this.panelOpenState = false;

    if (this.id === "") {
      this.router.params.subscribe((params) => {
        // console.log('params',params);
        this.id = params?.id;
      });

    }

    if (this.id !== "") {
      this.fetchDocumentById();
    }

    this.getActiveFields();
    this.getAllClientsDetailsQuestion();
    window.addEventListener("beforeunload", function (e) {
      const confirmationMessage = "o/";
      e.returnValue = confirmationMessage;
      return confirmationMessage;
    });
  }
  getAllClientsDetailsQuestion() {
    this.api.getAllClientsDetailsQuestion().subscribe((response: any) => {
      // console.log('response',response);
      this.globelKeys = response.doc;
      // console.log('this.globelKeys', this.globelKeys);

    })
  }
  attachmentExistHandler(value: any) {
    console.log("value", value);
    this.attachmentExist = value;
  }
  agreementTypeHandler(value: any) {
    // console.log("value", value);
    this.agreementType = value;
  }
  agreementContainsHandler(value: any) {
    // console.log("value", value);
    this.agreementContains = value;
  }
  ngOnDestroy(): void {
    // delete the local fields of unsaved document
    if (this.destroy) {
      this.fieldService.unsavedDocumentFieldsDelete(this.fieldsId).subscribe();
    }
  }

  fetchDocumentById(): any {
    // get the document by id

    if (this.id) {
      this.nyttAvtalService.getDocumentById(this.id).subscribe((response) => {
        // console.log("response",response)
        this.htmlContent = response.document;
        this.documentTitle = response.documentTitle;
        this.documentDescription = response.documentDescription;
        this.documentPrice = response.documentPrice;
        this.documentTax = response.documentTax;
        this.attachmentExist = response.attachmentExist;
        this.agreementType = response.agreementType;
        // this.agreementContains = response.agreementContains;
        if (response.pdfAttachment) {
          this.pdfAttachment = response.pdfAttachment;
          // console.log("this.pdfAttachment",this.pdfAttachment); 
          this.pdfAttachment = environment.serviceURL + this.pdfAttachment;
          // console.log("this.pdfAttachment1111",this.pdfAttachment); 
        }
        if (response.agreementConfirmPic) {
          this.agreementHeaderPicUrl =
            environment.serviceURL + response.agreementConfirmPic;
        }
        if (response.videoPaths) {
          // this.videoUrl = environment.serviceURL + response.videoPaths;
          this.videoEdit = true;
          this.editVideoUrl = environment.serviceURL;
          this.videoUrl = response.videoPaths;
          // console.log("this.videoUrl",this.videoUrl)
        } else {
          this.videoEdit = false;
        }
      });

      this.router.queryParams.subscribe((queryParams) => {
        // console.log('queryParams',queryParams);
        if (queryParams.new == 'klona') {
          console.log('Its clone');
          this.isCloneDocument = true;
          this.id = undefined;
        }
        // console.log('queryParamsData',this.queryParamsData);
      })
    }
  }

  getActiveFields(): void {
    this.nyttAvtalService.getActiveFields(this.id).subscribe(
      (res) => {
        this.fieldList = res;
        this.field = this.fieldList.sort((a, b) =>
          a.field.name > b.field.name ? 1 : -1
        );
      },
      (err) => {
        console.log("err", err);
      }
    );
  }

  fieldSelectionChange($event: MatSelectionListChange): void {
    // append the selected field to document
    let newContent = "";
    let newContentD = "";
    if ($event.options[0].value.subQuestion) {
      newContent =
        "[[" +
        $event.options[0].value.field._id +
        "]]{{" +
        $event.options[0].value.field.name +
        "}}&nbsp;[[" +
        $event.options[0].value.subQuestion.field._id +
        "]]{{" +
        $event.options[0].value.subQuestion.field.name +
        "}}&nbsp;";

      newContentD =
        "[[" +
        $event.options[0].value.field._id +
        "]]{{" +
        $event.options[0].value.field.name +
        "}}&nbsp;[[" +
        $event.options[0].value.subQuestion.field._id +
        "]]{{" +
        $event.options[0].value.subQuestion.field.name +
        "}}";
    } else {
      newContent =
        "[[" +
        $event.options[0].value.field._id +
        "]]{{" +
        $event.options[0].value.field.name +
        "}}&nbsp;";

      newContentD =
        "[[" +
        $event.options[0].value.field._id +
        "]]{{" +
        $event.options[0].value.field.name +
        "}}";
    }
    var str = this.ckEditorComp.editorInstance.getData();
    if (str.indexOf(newContentD) !== -1) {
      Swal.fire({
        title: "Denna variabel",
        html:
          "Redan finns " +
          $event.options[0].value.field.name +
          " Lägger du till dubbelktvariabel klickar du på ja",
        icon: "warning",
        showDenyButton: true,
        confirmButtonText: "Ja",
        denyButtonText: "Nej",
        customClass: {
          actions: "my-actions",
          //cancelButton: 'order-1 right-gap',
          confirmButton: "order-2",
          denyButton: "order-3",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          const viewFragment =
            this.ckEditorComp.editorInstance.data.processor.toView(newContent);
          const modelFragment =
            this.ckEditorComp.editorInstance.data.toModel(viewFragment);
          this.ckEditorComp.editorInstance.model.insertContent(modelFragment);
        } else if (result.isDenied) {
        }
      });
    } else {
      const viewFragment =
        this.ckEditorComp.editorInstance.data.processor.toView(newContent);
      const modelFragment =
        this.ckEditorComp.editorInstance.data.toModel(viewFragment);
      this.ckEditorComp.editorInstance.model.insertContent(modelFragment);
    }
  }
  addGlobalKeyHandler(event: any) {
    console.log('event', event);

    let addKeyContent = "[#" + event._id + "#]" + "{#" + event.question + "#}"
    var str = this.ckEditorComp.editorInstance.getData();
    console.log('str', str);
    console.log('str.indexOf(newContentD)', str.indexOf(event._id));
    if (str.indexOf(event._id) !== -1) {
      Swal.fire({
        title: "Denna variabel",
        html:
          "Redan finns " +
          event.question +
          " Lägger du till dubbelktvariabel klickar du på ja",
        icon: "warning",
        showDenyButton: true,
        confirmButtonText: "Ja",
        denyButtonText: "Nej",
        customClass: {
          actions: "my-actions",
          //cancelButton: 'order-1 right-gap',
          confirmButton: "order-2",
          denyButton: "order-3",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          const viewFragment = this.ckEditorComp.editorInstance.data.processor.toView(addKeyContent);
          const modelFragment = this.ckEditorComp.editorInstance.data.toModel(viewFragment);
          this.ckEditorComp.editorInstance.model.insertContent(modelFragment);
        } else if (result.isDenied) { }
      });
    } else {
      const viewFragment = this.ckEditorComp.editorInstance.data.processor.toView(addKeyContent);
      const modelFragment = this.ckEditorComp.editorInstance.data.toModel(viewFragment);
      this.ckEditorComp.editorInstance.model.insertContent(modelFragment);
    }

  }
  submitText(): void {
    console.log("this.agreementType", this.agreementType);
    // submit the document and redirect the screen to draft or published lists
    // if (!this.id) { //Nadeem Commented on 04-04-2023 (because it should manage from backend)
    //   this.htmlContent =
    //     // '<div style="margin: 70px">' + this.htmlContent + "</div>";
    //     '<div style="margin: 150px">' + this.htmlContent + "</div>";
    // }
    console.log(
      "htmlContent",
      this.htmlContent,
      this.ckEditorComp.editorInstance.getData()
    );
    this.nyttAvtalService
      .submitDocument(
        this.id,
        this.htmlContent,
        this.documentTitle,
        this.documentDescription,
        this.documentPrice,
        this.documentTax,
        this.status,
        this.attachmentExist,
        this.agreementType,
        // this.agreementContains
      )
      .subscribe((res) => {
        this.destroy = false;

        if (this.status === "View") {
          const url = this.route.serializeUrl(
            this.route.createUrlTree([`/view/pdf/`], {
              queryParams: {
                newId: res._id,
              },
            })
          );
          window.open(url, "_blank");
        }
        if (this.status === "Published") {
          Swal.fire("Framgång", "Dokument publicerat", "success").then();
          this.route.navigate(["/documentList"]);
        } else if (this.status === "Draft") {
          Swal.fire("Framgång", "Dokument sparat", "success").then();
          this.route.navigate(["/documentDraftList"]);
        }
        if (this.status === "View") {
        } else {
          this.htmlContent =
            this.documentTitle =
            this.documentDescription =
            this.documentPrice =
            this.documentTax =
            this.status =
            "";
        }
        let newId = res._id;
        if (this.pdfAttachmentSource && this.pdfAttachmentSource != undefined) {
          this.uploadBusimessAgreementPdf(newId);
        }
        if (this.agreementImageSource && this.agreementImageSource != undefined) {
          this.changeAgreementHeaderPic(newId);
        }
      });
  }

  openAdd(): void {
    this.add = !this.add;
  }

  screenReset(event): void {
    // reset the add id screen, initial append of id, refresh the fields
    this.fieldsId.push(event._id);
    this.getActiveFields();

    // if (event.field) {
    //     this.htmlContent = this.htmlContent + ' <span style="background-color: #236fa1; color: #ecf0f1;"><strong>'
    //         + event.field.name + '</strong></span>&nbsp;';
    // }
    //
    // if (event.subQuestion) {
    //     this.htmlContent = this.htmlContent + ' <span style="background-color: #236fa1; color: #ecf0f1;"><strong>'
    //         + event.subQuestion.field.name + '</strong></span>&nbsp;';
    // }

    this.add = false;
  }

  editScreenReset(event): void {
    // reset the add id screen, initial append of id, refresh the fields
    this.getActiveFields();
    this.add = false;
    this.edit = false;
  }
  convertAllLocalVariablesToGlobal() {
    this.nyttAvtalService.convertLocalToGlobal(this.id).subscribe(
      (response: any) => {
        console.log('response', response);
        this.cloneDocumentHandler();
      }, (err: any) => {
        console.log('Error in converting variables local to global', err);
      }
    )
  }
  cloneDocumentHandler() {
    // console.log('location.href',location.href);
    window.open(location.href + '?new=klona')
  }
  openDialog(event): void {
    // open a dialog for local id delete, publish and save
    console.log(event);

    // if (
    //   (!this.documentTitle ||
    //     !this.documentPrice ||
    //     !this.documentTax ||
    //     !this.documentDescription ||
    //     !this.agreementType) &&
    //   event === "publishSave"
    // ) {
    //   this.snackBar.open("Ange dokumentets detaljer!", "OK");
    //   return;
    // }
    if (event === "publishSave") {
      if (!this.documentTitle) {
        this.snackBar.open("Dokument titel saknas!", "OK");
        return;
      }
      if (!this.documentPrice) {
        this.snackBar.open("Dokument Pris saknas!", "OK");
        return;
      }
      if (!this.documentTax) {
        this.snackBar.open("Dokument Beskatta saknas!", "OK");
        return;
      }
      if (!this.documentDescription) {
        this.snackBar.open("Dokument Beskrivning saknas!", "OK");
        return;
      }
      if (!this.agreementType) {
        // this.snackBar.open("Dokumenttyp(Avtalstyp) saknas!", "OK");
        this.snackBar.open("Dokumenttyp saknas!", "OK");
        return;
      }
      if (!this.agreementContains) {
        // this.snackBar.open("Dokumenttyp(Avtalstyp) saknas!", "OK");
        this.snackBar.open("Dokumentet innehåller saknas!", "OK");
        return;
      }
      // console.log("this.pdfAttachmentSource", this.pdfAttachmentSource);
      if (this.attachmentExist) {
        if (!this.pdfAttachment && this.pdfAttachmentSource == undefined) {
          this.snackBar.open("Pdf-bilaga saknas!", "OK");
          return;
        }
      }

    }

    const dialogRef = this.dialog.open(DialogForPublishComponent, {
      width: "350px",
      height: "202px",
      data: { dialogType: event },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === "delete") {
        this.deleteLocalField(event);
      }

      if (result === "Draft" || result === "Published" || result === "View") {
        this.status = result;
        this.submitText();
      }
    });
  }
  cloneWarningDialog(event): void {
    // console.log('event', event);
    const dialogRef = this.dialog.open(DialogForPublishComponent, {
      width: "350px",
      height: "270px",
      data: { dialogType: event },
    });
    dialogRef.afterClosed().subscribe((result) => {
      // console.log('result',result);
      if (result === "clone") {
        this.convertAllLocalVariablesToGlobal();
      }
    });
  }
  editField(fieldId): void {
    this.editFieldId = fieldId;
    this.edit = true;
    this.add = false;
  }

  deleteLocalField(fieldId): void {
    // Delete the local field of current template by field id
    this.nyttAvtalService
      .deleteLocalFieldById(fieldId)
      .subscribe((response) => {
        if (response.msg === "deleted") {
          this.getActiveFields();
          this.snackBar.open("Fältet har tagits bort", "OK");
        }
      });
  }

  public onReady(editor) {
    editor.ui
      .getEditableElement()
      .parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
      );
  }

  taxAddition(event): void {
    this.documentTax = (event * 0.25).toString();
  }
  checkRoleAction(): any {
    let RoleID = this.authService.getroleID();
    let roleactionID = menuactionspagename.nyttAvtal.MAId;
    this.api.GetRoleActionByRoleIdRoleActionId(RoleID, roleactionID).subscribe(
      (res) => {
        if (res.menuactionslist.length == 0) {
          this.authService.logout();
        }
      },
      (err) => { }
    );
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
    } else if (event.target.files.length === 0) {
      let array = [];
      array.push({ url: "" });
      this.videoUrl = array;
      this.agreementVideoSource = undefined;
    } else if (event.target.files.length >= 3) {
      this.snackBar.open("Högst två videor tillåtna", "ok");
      let array = [];
      array.push({ url: "" }, { url: "" }, { url: "" });
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
          url: reader.result,
        });
        // console.log("array",array)
        // console.log("this.videoUrl",this.videoUrl)
        if (array.length === files.length) {
          this.videoUrl = array;
          // console.log("this.videoUrl", this.videoUrl)
          setTimeout(() => {
            this.showLoader = false;
          }, 2000);
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
      this.nyttAvtalService
        .uploadAgreementVideoReq(this.id)
        .subscribe((res) => {
          // this.snackBar.open('Laddades upp', 'ok');
          if (res.msg === "removedOldPaths") {
            console.log("res.msg", res.msg);
            let uploadingLoopLimit = this.agreementVideoSource.length;
            let array = [];
            const formData = new FormData();
            for (var i = 0; i < uploadingLoopLimit; i++) {
              // array.push({
              //     videoFile : this.agreementVideoSource[i]
              // })
              formData.append("file", this.agreementVideoSource[i]);
              formData.append("agreementId", this.id);
              if (i === 0) {
                formData.append("videoName", "one");
              } else if (i === 1) {
                formData.append("videoName", "two");
              }
              // else if(i===2){
              //     formData.append('videoName', 'three');
              // }
              this.nyttAvtalService
                .uploadAgreementVideos(formData)
                .subscribe((res) => {
                  this.snackBar.open("Laddades upp", "ok");
                });
              if (i === uploadingLoopLimit - 1) {
                this.uploadingLoader = false;
              }
            }
          }
        });
    } else {
      this.snackBar.open(
        "Uppladdningen misslyckades (Välj en video först)",
        "ok"
      );
      this.uploadingLoader = false;
    }
    // this.agreementVideoSource = this.agreementVideoSource[0];
  }
  //--------------Upload Pdf Attachment---------------
  onAgreementPdfChange(event): any {
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
  uploadBusimessAgreementPdf(newId): any {
    this.pdfUploadingLoader = true;
    const formData = new FormData();
    if (this.pdfAttachmentSource != undefined) {
      formData.append('file', this.pdfAttachmentSource);
      formData.append('businessAgreementId', newId);
      this.nyttAvtalService.uploadAgreementPdf(formData)
        .subscribe(res => {
          console.log("res in pdf uploading", res)
          this.snackBar.open('Företag avtal Pdf har uppdaterats', 'ok');
          // this.openDialog('publishSave')
          // this.openDialog('publishSave');
          this.pdfUploadingLoader = false;
        },
          err => {
            console.log('err in pdf uploading', err);
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
  viewFileHandler() {
    // this.route.navigate([this.pdfAttachment]);
    window.open(this.pdfAttachment, '_blank');
  }
  //--------------Upload Agreement Hero Banner Pic---------------
  onImageChange(event): any {
    // console.log("event",event.target.files[0])
    if (event.target.files.length > 0) {
      // this.showLoader = true;
      this.previewAgreementHeaderImage(event.target.files);
      const file = event.target.files[0];
      this.agreementImageSource = file;
    } else {
      this.agreementHeaderPicUrl = undefined;
      this.agreementImageSource = undefined;
      this.snackBar.open("Bild krävs", "ok");
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

  changeAgreementHeaderPic(newId): any {
    const formData = new FormData();
    if (this.agreementImageSource != undefined) {
      formData.append("file", this.agreementImageSource);
      // formData.append("agreementId", this.id);
      formData.append("agreementId", newId);
      this.nyttAvtalService
        .uploadAgreementHeaderPic(formData)
        .subscribe((res) => {
          this.snackBar.open("Avtal Header Bild har uppdaterats", "ok");
        });
    } else {
      this.snackBar.open("Bilden kan inte uppdateras (Välj först)", "ok");
    }
  }
}

@Component({
  selector: "app-dialog-publish",
  templateUrl: "dialog-publish.html",
  styleUrls: ["./nytt-avtal.component.scss"],
})
export class DialogForPublishComponent {
  isDelete = false;
  isPublishOrDraft = false;
  isDocumentChange = false;
  isCloning = false;
  constructor(
    public dialogRef: MatDialogRef<DialogForPublishComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { dialogType }
  ) {
    // data.eventState === 'publishSave' ? this.isDelete = false : this.isDelete = true ;

    if (data.dialogType === "publishSave") {
      this.isPublishOrDraft = true;
    } else if (data.dialogType === "documentChange") {
      this.isDocumentChange = true;
    } else if (data.dialogType === 'cloneWarning') {
      this.isCloning = true;
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
    event ? this.dialogRef.close("delete") : this.dialogRef.close(false);
  }

  clone(event): void {
    event ? this.dialogRef.close("clone") : this.dialogRef.close(false);
  }
}

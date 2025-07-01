import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
// import {environment} from '../../../environments/environment.prod';
// import { environment } from '../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { menuactionspagename } from 'src/app/models/pagesnameandId';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { UpdateModalComponent } from "./update-modal/update-modal.component"

@Component({
  selector: 'app-swish-configuration',
  templateUrl: './swish-configuration.component.html',
  styleUrls: ['./swish-configuration.component.scss']
})
export class SwishConfigurationComponent implements OnInit {
  private sub: any;
  id: '';

  //pem_cert_file
  pem_cert_file: any;
  pem_cert_fileSource: any;

  //key_cert_file
  key_cert_file: any;
  key_cert_fileSource: any;

  //pem_root_file_file
  pem_root_file: any;
  pem_root_fileSource: any;
  // filePath: '';
  // pem_cert_fileURL: string | ArrayBuffer;



  swish_passPhrase = '';
  swish_payeeAlias = '';
  swish_payeePaymentReference = '';
  swish_payerAlias = '';
  
  // swish_pem_cert = '';
  // swish_key_cert = '';
  // swish_pem_root = '';

  total = '';
  showloading = false;
  alert: { success: boolean, text: string } = { success: true, text: '' };

  paymentsConfiguration: {
    // swish_pem_cert: String,
    // swish_key_cert: String,
    // swish_pem_root: String,
    swish_passPhrase: String,
    swish_payeeAlias: String,
    swish_payeePaymentReference: String,
    swish_payerAlias: String,
  }[];
  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private dialog: MatDialog,
  ) {
  }
  ngOnInit(): void {
    this.checkRoleAction();
    this.getSwishConfiguration('swishConfiguration');

  }
  getSwishConfiguration(name): any {

    this.api.getSwishConfiguration(name).subscribe(paymentsConfigurationData => {

      let response = paymentsConfigurationData.doc[0];
      // console.log('response', response);
      this.id = response._id;
      // this.swish_pem_cert = response.swish_pem_cert;
      // this.swish_key_cert = response.swish_key_cert;
      // this.swish_pem_root = response.swish_pem_root;
      this.swish_passPhrase = response.swish_passPhrase;
      this.swish_payeeAlias = response.swish_payeeAlias;
      this.swish_payeePaymentReference = response.swish_payeePaymentReference;
      this.swish_payerAlias = response.swish_payerAlias;
      // console.log(' this.swish_passPhrase',  this.swish_passPhrase)
    });
  }
  update(): any {
    this.showloading = true;
    this.paymentsConfiguration = [{
      // 'swish_pem_cert': this.swish_pem_cert,
      // 'swish_key_cert': this.swish_key_cert,
      // 'swish_pem_root': this.swish_pem_root,
      'swish_passPhrase': this.swish_passPhrase,
      'swish_payeeAlias': this.swish_payeeAlias,
      'swish_payeePaymentReference': this.swish_payeePaymentReference,
      'swish_payerAlias': this.swish_payerAlias,
    }]
    this.api.updateSwishConfiguration(this.paymentsConfiguration, this.id)
      .subscribe(
        res => {
          console.log("res.message", res.message)
          if (res.message === "PaymentsConfigurationUpdatedSuccessfully") {
            this.snackBar.open('Swish konfigurationen uppdaterats', 'ok');
          }
          else {
            this.snackBar.open('Swish konfigurationen kan inte uppdateras. Försök igen senare', 'ok');
          }
          this.showloading = false;
          // console.log('this.id',this.id)
          // console.log('this.clientsDetails',this.clientsDetails)
        },
        err => {
          this.snackBar.open('Swish konfigurationen kan inte uppdateras. Försök igen senare', 'ok');
          this.showloading = false;
        }
      );
  }
  openDialog() {
    const dialogRef = this.dialog.open(UpdateModalComponent, {
      height: '430px',
      width: '430px',
      panelClass: 'mat-dialog-container-primary',
      disableClose: true,
      data: {
        // eventID : this.eventId,
        // dateExpired: 'YES'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.updateCheck();
    });
  }
  updateCheck() {
    const check = localStorage.getItem('updateSwishConfiguration');
    localStorage.setItem('updateSwishConfiguration', null);

    if (check == 'Yes') {
      // console.log("update clicked")
      this.update();
    }
  }

  //----------------Upload pem_cert_file----------------
  changePemCertFile(): any {
    const formData = new FormData();

    formData.append('file', this.pem_cert_fileSource);
    formData.append('paymentsConfigurationId', this.id);
    if (this.pem_cert_fileSource != undefined) {
      this.api.uploadSwishPemCertFile(formData)
        .subscribe(res => {
          this.snackBar.open('Pem_Certificate har uppdaterats', 'ok');
        });
    }
    else {
      this.snackBar.open('Pem_Certificate kan inte uppdateras', 'ok');
    }
  }
  onFileChangePemCert(event): any {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.pem_cert_fileSource = file;
    }
  }
  //----------------Upload pem_key_file-----------------
  changeKeyCertFile(): any {
    const formData = new FormData();

    formData.append('file', this.key_cert_fileSource);
    formData.append('paymentsConfigurationId', this.id);
    if (this.key_cert_fileSource != undefined) {
      this.api.uploadSwishKeyCertFile(formData)
        .subscribe(res => {
          this.snackBar.open('Key_Certificate har uppdaterats', 'ok');
        });
    }
    else {
      this.snackBar.open('Key_Certificate kan inte uppdateras', 'ok');
    }
  }
  onFileChangeKeyCert(event): any {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.key_cert_fileSource = file;
    }
  }
  //----------------Upload pem_root_file----------------
  changePemRootFile(): any {
    const formData = new FormData();

    formData.append('file', this.pem_root_fileSource);
    formData.append('paymentsConfigurationId', this.id);
    if (this.pem_root_fileSource != undefined) {
      this.api.uploadSwishPemRootFile(formData)
        .subscribe(res => {
          this.snackBar.open('Pem_Root har uppdaterats', 'ok');
        });
    }
    else {
      this.snackBar.open('Pem_Root kan inte uppdateras', 'ok');
    }
  }
  onFileChangePemRoot(event): any {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.pem_root_fileSource = file;
    }
  }
  //----------------Check Role Action--------------------

  checkRoleAction(): any {
    let RoleID = this.authService.getroleID();
    let roleactionID = menuactionspagename.configurations.MAId;
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

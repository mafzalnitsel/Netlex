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
  selector: 'app-bank-id-configuration',
  templateUrl: './bank-id-configuration.component.html',
  styleUrls: ['./bank-id-configuration.component.scss']
})
export class BankIdConfigurationComponent implements OnInit {
  private sub: any;
  id: '';

  //-----bankid_fp_cert_file------
  // bankid_fp_cert: any;
  // bankid_fp_cert_fileSource: any;

  //------key_cert_file-------
  // key_cert_file: any;
  // key_cert_fileSource: any;

  //-----pem_root_file_file------
  // pem_root_file: any;
  // pem_root_fileSource: any;
  // filePath: '';
  // pem_cert_fileURL: string | ArrayBuffer;

  // BankID_Auth_API = '';
  // BankID_Collect_API = '';
  BankID_API = '';
  API_Key = '';
  Secret_Key = '';
  IP_Address = '';

  // swish_pem_cert = '';
  // swish_key_cert = '';
  // swish_pem_root = '';

  total = '';
  showloading = false;
  alert: { success: boolean, text: string } = { success: true, text: '' };

  bankIdConfiguration: {
    BankID_API: String,
    // BankID_Collect_API: String,
    API_Key: String,
    IP_Address: String,
    Secret_Key: String,
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
    this.getBankIdConfiguration('bankIdConfiguration');

  }
  getBankIdConfiguration(name): any {

    this.api.getBankIdConfiguration(name).subscribe(bankIdConfigurationData => {

      let response = bankIdConfigurationData.doc[0];
      console.log('response', response)
      this.id = response._id;
      this.BankID_API = response.BankID_API;
      // this.BankID_Collect_API = response.BankID_Collect_API;
      this.API_Key = response.API_Key;
      this.IP_Address = response.IP_Address;
      this.Secret_Key = response.Secret_Key;
    });
  }
  update(): any {
    this.showloading = true;
    this.bankIdConfiguration = [{
      'BankID_API': this.BankID_API,
      // 'BankID_Collect_API': this.BankID_Collect_API,
      'API_Key': this.API_Key,
      'IP_Address': this.IP_Address,
      'Secret_Key': this.Secret_Key,
    }]
    this.api.updateBankIdConfiguration(this.bankIdConfiguration, this.id)
      .subscribe(
        res => {
          console.log("res.message", res.message)
          if (res.message === "PaymentsConfigurationUpdatedSuccessfully") {
            this.snackBar.open('BankID konfigurationen uppdaterats', 'ok');
          }
          else {
            this.snackBar.open('BankID konfigurationen kan inte uppdateras. Försök igen senare', 'ok');
          }
          this.showloading = false;
        },
        err => {
          this.snackBar.open('BankID konfigurationen kan inte uppdateras. Försök igen senare', 'ok');
          this.showloading = false;
        }
      );
  }
  openDialog() { 
    this.bankIdConfiguration = [{
      'BankID_API': this.BankID_API,
      // 'BankID_Collect_API': this.BankID_Collect_API,
      'API_Key': this.API_Key,
      'IP_Address': this.IP_Address,
      'Secret_Key': this.Secret_Key,
    }]
    console.log('this.bankIdConfiguration[0]',this.bankIdConfiguration[0])

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
    const check = localStorage.getItem('updateBankIDConfiguration');
    // localStorage.setItem('updateBankIDConfiguration', null);
    localStorage.removeItem('updateBankIDConfiguration');

    if (check == 'Yes') {
      // console.log("update clicked")
      this.update();
    }
  }

  // //----------------Upload pem_cert_file----------------
  // updateBankIdFPCertFile(): any {
  //   const formData = new FormData();

  //   formData.append('file', this.bankid_fp_cert_fileSource);
  //   formData.append('bankIdConfigurationId', this.id);
  //   if (this.bankid_fp_cert_fileSource != undefined) {
  //     this.api.uploadSwishPemCertFile(formData)
  //       .subscribe(res => {
  //         this.snackBar.open('BankID_FP_Certificate har uppdaterats', 'ok');
  //       });
  //   }
  //   else {
  //     this.snackBar.open('BankID_FP_Certificate kan inte uppdateras', 'ok');
  //   }
  // }
  // onFileChangeBankIdFPCert(event): any {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     this.bankid_fp_cert_fileSource = file;
  //   }
  // }
  // //----------------Upload pem_key_file-----------------
  // changeKeyCertFile(): any {
  //   const formData = new FormData();

  //   formData.append('file', this.key_cert_fileSource);
  //   formData.append('bankIdConfigurationId', this.id);
  //   if (this.key_cert_fileSource != undefined) {
  //     this.api.uploadSwishKeyCertFile(formData)
  //       .subscribe(res => {
  //         this.snackBar.open('Key_Certificate har uppdaterats', 'ok');
  //       });
  //   }
  //   else {
  //     this.snackBar.open('Key_Certificate kan inte uppdateras', 'ok');
  //   }
  // }
  // onFileChangeKeyCert(event): any {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     this.key_cert_fileSource = file;
  //   }
  // }
  //----------------Upload pem_root_file----------------
  // changePemRootFile(): any {
  //   const formData = new FormData();

  //   formData.append('file', this.pem_root_fileSource);
  //   formData.append('bankIdConfigurationId', this.id);
  //   if (this.pem_root_fileSource != undefined) {
  //     this.api.uploadSwishPemRootFile(formData)
  //       .subscribe(res => {
  //         this.snackBar.open('Pem_Root har uppdaterats', 'ok');
  //       });
  //   }
  //   else {
  //     this.snackBar.open('Pem_Root kan inte uppdateras', 'ok');
  //   }
  // }
  // onFileChangePemRoot(event): any {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     this.pem_root_fileSource = file;
  //   }
  // }
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

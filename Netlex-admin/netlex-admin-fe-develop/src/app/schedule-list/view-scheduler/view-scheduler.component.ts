import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { ApiService } from "../../services/api.service";
import { ActivatedRoute, Router, } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';
import { LawyerService } from '../../services/lawyer.service';
import { Lawyer } from '../../models/lawyer.model';
import { BusinessTypeModel } from '../../models/businessType.model';
import { menuactionspagename } from 'src/app/models/pagesnameandId';
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-scheduler',
  templateUrl: './view-scheduler.component.html',
  styleUrls: ['./view-scheduler.component.scss']
})
export class ViewSchedulerComponent implements OnInit {
  lawyerGet: Lawyer[];
  allBusinessTypes: BusinessTypeModel[];
  businessTypeId = '';
  lawyerDetails = { id: '', firstName: '', lastName: '' }
  dataValue: any;
  selectedLawyer: any;
  private sub: any;
  id: '';
  heading = '';
  clientName = '';
  clientEmail = '';
  dateOf = '';
  time = '';
  description = '';
  status = '';
  statusConfirmTime: any;
  statusExpireTime: any;
  // meetingPaymentLink = ''
  lawyer = '';
  lawyerId = '';
  focnonfoc = '';
  attachment = '';
  viewattachment = '';
  reasonOfFoc = '';
  counterpartyName: any;
  counterPartyssn: any;


  constructor(private authService: AuthService, private api: ApiService, private router: Router, private lawyerService: LawyerService, private route: ActivatedRoute,
    private snackBar: MatSnackBar) { }
  schedulerForm = new FormGroup({
    attachment: new FormControl('', [Validators.required]),
  })
  data: { heading: string; dateOf: string; time: string; description: string; language: string; lawyer: string; status: string; lawyerId: string; focnonfoc: string; attachment: string; reasonOfFoc: string; statusConfirmTime: string; statusExpireTime: string; businessTypeId: string; /*meetingPaymentLink: string;*/ }[];
  session = "";
  sessionValuet = ['10 AM - 11AM (10 Minuter)', '12 PM - 01 PM (30 Minuter)', '03 PM - 04 PM'];
  sessionValue = [
    '09:00:00 - 09:30:00',
    '09:30:00 - 10:00:00',
    '10:00:00 - 10:30:00',
    '10:30:00 - 11:00:00',
    '11:00:00 - 11:30:00',
    '11:30:00 - 12:00:00',
    '12:00:00 - 12:30:00',
    '12:30:00 - 13:00:00',
    '13:00:00 - 13:30:00',
    '13:30:00 - 14:00:00',
    '14:00:00 - 14:30:00',
    '14:30:00 - 15:00:00',
    '15:00:00 - 15:30:00',
    '15:30:00 - 16:00:00',
    '16:00:00 - 16:30:00',
    '16:30:00 - 17:00:00',
    '17:00:00 - 17:30:00',
    '17:30:00 - 18:00:00',
    '18:00:00 - 18:30:00',
    '18:30:00 - 19:00:00',
  ];
  language = "";
  languageValue = ['Any', 'English', 'Swedish'];
  statuss = "";
  statusValue = ['Möte begärt', 'Ännu att bekräftas', 'Bekräftad', 'Avbryt'];
  docSubmit: any = false;
  showloading = false;
  showSchedule = true;
  // minDate = new Date();
  currentFullDate = new Date();
  tomorrowFullDate: any;
  minDate: any;
  ngOnInit(): void {

    this.checkRoleAction();

    this.tomorrowFullDate = new Date(this.currentFullDate.setDate(this.currentFullDate.getDate() + 1));
    this.minDate = this.tomorrowFullDate.toISOString().split('T')[0];

    this.getLawyer();
    this.getBusinessTypeAll();

    this.sub = this.route.params.subscribe(params => {
      this.id = params.id;
      this.getSchedulerData();
    });
    this.docSubmit = false;
  }
  getLawyer(): void {
    this.lawyerService.getActiveLawyersList().subscribe(res => {
      this.lawyerGet = res.lawyer;
    },
      err => {
        console.log('getLawyer Error', err);
      }

    );
  }
  getBusinessTypeAll(): void {
    this.api.getBusinessTypeall().subscribe(res => {
      // console.log("businesstype all",res)
      this.allBusinessTypes = res.doc;
      // console.log("this.allBusinessTypes",this.allBusinessTypes)

    },
      err => {
        console.log('getBusinessTypeAll Error', err);
      }

    );
  }
  changeFile(): any {
    let attachmentFile = this.schedulerForm.value.attachment;
    this.api.uploadFile(attachmentFile)
      .subscribe(res => {
      });
  }

  getSchedulerData(): any {

    this.api.getMeetData(this.id)

      .subscribe(
        res => {
          console.log('resssssss', res)

          this.heading = res.heading;
          this.clientName = res.userName;
          this.clientEmail = res.userEmail;
          this.dateOf = res.dateOf;
          this.time = res.time;
          this.description = res.description;
          this.language = res.language;
          this.lawyer = res.lawyer;
          this.lawyerId = res.lawyerId;
          this.status = res.status;
          this.attachment = res.attachment;
          this.focnonfoc = res.focnonfoc;
          this.reasonOfFoc = res.reasonOfFoc;
          this.businessTypeId = res.businessTypeId;
          this.counterpartyName = res.counterpartyName
          this.counterPartyssn = res.counterpartySSN


          if (res.attachment) {
            this.attachment = res.attachment;
            // console.log("this.attachment",this.attachment); 
            this.viewattachment = environment.serviceURL + this.attachment;
            // console.log("this.attachment1111",this.attachment); 
          }
          // let lawyer = this.lawyerGet.filter((ele)=>ele._id==this.lawyerId)
          // this.lawyer = lawyer[0].firstName + " "+ lawyer[0].lastName;
          //   console.log("this.lawyer",this.lawyer); 
        },
      );
  }

  update(): void {
    // console.log("this.lawyerid",this.lawyerId)

    this.api.getLawyer(this.lawyerId)
      .subscribe(
        res => {
          this.lawyer = res.firstName + " " + res.lastName;
          this.updateData();

        },
        err => { }
      );

  }
  updateData(): any {
    this.docSubmit = true;
    this.showloading = true;
console.log('Update Data')
    // if(this.schedulerForm.invalid){

    //   return
    // }else {

    // console.log( "this is heading " + this.heading);
    if (this.status == 'Ännu att bekräftas' || this.status == 'Bekräftad') {
      var today = new Date();
      var tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      tomorrow.toLocaleDateString();

      this.statusConfirmTime = today;
      this.statusExpireTime = tomorrow;
      // console.log('status', this.status)
      // console.log('statusConfirmTime', this.statusConfirmTime)
      // console.log('statusExpireTime', this.statusExpireTime)
    }
    else {
      this.statusConfirmTime = '';
      this.statusExpireTime = '';
    }
    this.data = [{
      'heading': this.heading,
      'dateOf': this.dateOf,
      'time': this.time,
      'description': this.description,
      'language': this.language,
      'lawyer': this.lawyer,
      'status': this.status,
      'lawyerId': this.lawyerId,
      'attachment': this.attachment,
      'focnonfoc': this.focnonfoc,
      'reasonOfFoc': this.reasonOfFoc,
      'statusConfirmTime': this.statusConfirmTime,
      'statusExpireTime': this.statusExpireTime,
      'businessTypeId': this.focnonfoc !== 'Foc' ? this.businessTypeId : '',

    }]
    console.log('Data')
    // console.log("this.businessTypeId",this.businessTypeId)
    if (!this.heading || !this.dateOf || !this.time  ||
      !this.language || !this.lawyer || !this.status || !this.lawyerId   /*|| !this.attachment*/) {

      this.snackBar.open('Fyll i alla fält', 'ok');
      return;
    }
    console.log('Before Foc')
    console.log('this.focnonfoc',this.focnonfoc)
if(this.focnonfoc !== 'Foc' && !this.businessTypeId){
  this.snackBar.open('Fyll i alla fält', 'ok');
  return;
}
    if (this.status == 'Bekräftad' && this.focnonfoc === 'Foc' ) {
      console.log('In-Foc---');
      window.open(`https://netlex.se/klarnasale/successsale?document_id=${this.id}&master_id=000&hppId=000&order_id=b3e4b56a-60cf-4afe-aedf-04efb95b998b`,'_self'); 
    }
      
      else{
      console.log('Non-Foc---Else');

        this.api.updateSchedule(this.data, this.id)
      .subscribe(

        res => {

        },
        err => {

        }
      );
      this.router.navigate(['/schedule-list']);
      }
      
  }

  viewAttachment() {
    if (this.viewattachment) {
      window.open(this.viewattachment, '_blank');
    }
  }
  checkRoleAction(): any {
    let RoleID = this.authService.getroleID();
    let roleactionID = menuactionspagename.schedule_list.MAId;
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

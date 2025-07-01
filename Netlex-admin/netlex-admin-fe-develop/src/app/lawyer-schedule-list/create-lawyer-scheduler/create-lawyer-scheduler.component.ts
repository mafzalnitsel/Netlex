import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { ApiService } from "../../services/api.service";
import { ActivatedRoute, Router, } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';
import { LawyerService } from '../../services/lawyer.service';
// import { Lawyer } from '../../models/lawyer.model';
import { BusinessTypeModel } from '../../models/businessType.model';
import { menuactionspagename } from 'src/app/models/pagesnameandId';

@Component({
  selector: 'app-scheduler',
  templateUrl: './create-lawyer-scheduler.component.html',
  styleUrls: ['./create-lawyer-scheduler.component.scss']
})
export class CreateLawyerSchedulerComponent implements OnInit {
  // lawyerGet: Lawyer[];
  allBusinessTypes: BusinessTypeModel[];
  businessTypeId= '';
  // lawyerDetails = { id: '', firstName: '', lastName: '' }
  dataValue: any;
  private sub: any;
  id: '';
  heading = '';
  dateOf = '';
  time = '';
  description = '';
  status = '';
  statusConfirmTime: any;
  statusExpireTime: any;
  lawyer = '';
  lawyerId = '';
  attachment = '';

  constructor(private authService: AuthService, private api: ApiService, private router: Router,
    //  private lawyerService: LawyerService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) { }
  schedulerForm = new FormGroup({
    heading: new FormControl('', [Validators.required]),
    dateOf: new FormControl(),
    time: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    language: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    attachment: new FormControl('', [Validators.required]),

  })
  data: { heading: string; dateOf: string; time: string; description: string; language: string; lawyer: string; status: string; lawyerId: string; attachment: string, statusConfirmTime: string; statusExpireTime: string; businessTypeId: string;  }[];
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
  statusValue = ['Möte begärt' ,'Ännu att bekräftas', 'Bekräftad', 'Avbryt'];
  docSubmit: any = false;
  showloading = false;
  showSchedule = true;
  // minDate = new Date();
  currentFullDate = new Date();
  tomorrowFullDate: any;
  minDate :any;
  ngOnInit(): void {
    this.checkRoleAction();
      
    this.tomorrowFullDate =  new Date(this.currentFullDate.setDate(this.currentFullDate.getDate() + 1));
    this.minDate = this.tomorrowFullDate.toISOString().split('T')[0];

    // this.getLawyer();
    this.route.queryParams.subscribe(params => {
      this.lawyerId = params.Lawyerid;
      // console.log('params.Lawyerid',params.Lawyerid)

    });
    this.sub = this.route.params.subscribe(params => {
      this.id = params.id;
      this.getSchedulerData();
    });
    this.docSubmit = false;
  }

  //  getLawyer(): void {
  //   this.lawyerService.getActiveLawyersList().subscribe(res => {
  //     this.lawyerGet = res.lawyer;
  //   },
  //     err => {
  //       console.log('err', err);
  //     }

  //   );
  // }
  submit(): void {

    console.log("this.lawyerid", this.lawyerId)
    
    if (!this.schedulerForm.value.heading || !this.schedulerForm.value.dateOf || !this.schedulerForm.value.time ||
      !this.schedulerForm.value.language || !this.schedulerForm.value.status || !this.businessTypeId /*|| !this.attachment*/) {

      this.snackBar.open('Fyll i alla fält', 'ok');
      return;
    }
    this.api.getLawyer(this.lawyerId)
      .subscribe(
        res => {
          console.log("res", res)

          this.lawyer = res.firstName + " " + res.lastName;
          this.submitData();
        },
        err => { }
      );

  }
  submitData(): void {
    this.docSubmit = true;
    // console.log('this.lawyerId',this.lawyerId)
    if (this.schedulerForm.invalid) {
      console.log('this.schedulerForm.invalid', this.schedulerForm.invalid)

      return
    }
    else {
      if (this.schedulerForm.value.status == 'Bekräftad' || this.schedulerForm.value.status == 'Ännu att bekräftas') {

        var today = new Date();
        var tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        tomorrow.toLocaleDateString();

        this.statusConfirmTime = today;
        this.statusExpireTime = tomorrow;

      }
      else {
        this.statusConfirmTime = '2022-01-24';
        this.statusExpireTime = '2022-01-24';
      }
      this.dataValue = {
        heading: this.schedulerForm.value.heading,
        dateOf: this.schedulerForm.value.dateOf,
        time: this.schedulerForm.value.time,
        description: this.schedulerForm.value.description,
        language: this.schedulerForm.value.language,
        lawyer: this.lawyer,
        status: this.schedulerForm.value.status,
        attachment: this.schedulerForm.value.attachment,
        lawyerId: this.lawyerId,
        statusConfirmTime: this.statusConfirmTime,
        statusExpireTime: this.statusExpireTime,
        businessTypeId: this.businessTypeId,
      }
      this.authService.schedule(this.dataValue)
        .subscribe(
          res => {
          }
        );
      this.changeFile()
      this.router.navigate(['/lawyer-schedule-list']);
    }
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
          this.heading = res.heading;
          this.dateOf = res.dateOf;
          this.session = res.time;
          this.description = res.description;
          this.language = res.language;
          this.lawyerId = res.lawyerId;
          this.status = res.status;
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

    // if(this.schedulerForm.invalid){

    //   return
    // }else {

    // console.log( "this is heading " + this.heading);
    if (this.status == 'Bekräftad' || this.status == 'Änu att bekräftasn') {
      var today = new Date();
      var tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      tomorrow.toLocaleDateString();

      this.statusConfirmTime = today;
      this.statusExpireTime = tomorrow;
    }
    else {
      this.statusConfirmTime = '';
      this.statusExpireTime = '';
    }
    this.data = [{

      heading: this.schedulerForm.value.heading,
      dateOf: this.schedulerForm.value.dateOf,
      time: this.schedulerForm.value.time,
      description: this.schedulerForm.value.description,
      language: this.schedulerForm.value.language,
      lawyer: this.lawyer,
      status: this.schedulerForm.value.status,
      attachment: this.schedulerForm.value.attachment,
      lawyerId: this.lawyerId,
      statusConfirmTime: this.statusConfirmTime,
      statusExpireTime: this.statusExpireTime,
      'businessTypeId': this.businessTypeId,

    }]
    // console.log("this.businessTypeId",this.businessTypeId)

    this.api.updateSchedule(this.data, this.id)
      .subscribe(

        res => {

        },
        err => {

        }
      );
    // }
  }
  checkRoleAction(): any {
    let RoleID = this.authService.getroleID();
    let roleactionID = menuactionspagename.lawyer_schedule_list.MAId;
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

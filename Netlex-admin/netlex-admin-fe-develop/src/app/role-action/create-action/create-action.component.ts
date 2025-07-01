import { Router } from '@angular/router';
import { Role } from 'src/app/models/role';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoleAction } from 'src/app/models/RoleAction.model';
import { MenuAction } from 'src/app/models/menuaction.model';
import { menuactionspagename } from 'src/app/models/pagesnameandId';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-create-action',
  templateUrl: './create-action.component.html',
  styleUrls: ['./create-action.component.scss']
})
export class CreateActionComponent implements OnInit {
  // roleActionData: RoleAction = {
  //   name: '', roleID: '', url: ''

  // };

  selectedroleId: string;
  name: string;
  useForLawyerData: string;
  RoleDetails = { name: '' };
  Role: Role[];
  MenuAction: MenuAction[];
  MenuActionForAdmin: MenuAction[];
  MenuActionForLawyer: MenuAction[];
  fb: FormBuilder;
  forCheck = 'false';


  showLoader = false;
  roleActionData: RoleAction = { name: '', roleID: '', menuActionID: '', useForLawyerData: '' };
  registerForm: any;
  editCategoryForm: any;
  editCategoryFor: Role[];
  empList: Array<{ roleactionID: string, roleID: string, name: string }> = [];

  constructor(
    private api: ApiService,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.checkRoleAction();
    // this.getrollist();
    // this.getMenuActionlist();
    // this.getActionsForLawyer(this.forCheck)
    this.getActionsForLawyer(false);


  }

  onChange(index: number, selectedId: any, isChecked: String) {
    // console.log("isChecked", isChecked);
    // console.log("selectedId", selectedId);
    // console.log("name", this.name);

    if (isChecked) {
      this.empList.push({ roleactionID: selectedId, roleID: '0', name: this.name });
      // console.log("empList", this.empList);
    }

    else {
      if (this.empList.find(x => x.roleactionID == selectedId)) {
        this.empList.splice(this.empList.findIndex(x => x.roleactionID == selectedId), 1);
        // console.log("empList", this.empList);
      }
    }
  }
  // onChangeLawyerUse(event) {
  //   this.useForLawyerData = event;
  //   this.getActionsForLawyer(event)
  //   console.log('event', event)


  // }
  onChangeLawyerUse(event) {
    this.useForLawyerData = event;
    this.getActionsForLawyer(event)
    // console.log('event', event)
    // if(event===true){
    //   // console.log("this.MenuAction",this.MenuAction)
    //   this.MenuActionForAdmin = this.MenuAction;
    //   console.log("this.MenuActionForAdmin",this.MenuActionForAdmin)

    //   // this.MenuAction.filter
    // }
    // if(event===false){
    //   this.getActionsForLawyer(event)
    // }


  }
  getActionsForLawyer(data): any {
    if (data === false) {
      // console.log("data", data);
      this.api.getActionsForLawyer(data).subscribe(actions => {
        // console.log('actions',actions);
        
        this.MenuAction = actions.doc;
        this.forCheck = actions.doc[0].useForLawyer;
      });
    }

    if (data === true) {
      // console.log("data", data);
      this.api.getActionsForLawyer(data).subscribe(actions => {
        // console.log('actions before',actions);

        this.MenuActionForLawyer = actions.doc;
        // console.log("MenuActionForLawyer",this.MenuActionForLawyer)

        this.MenuActionForLawyer.forEach((ele) => {
          // this.MenuAction.map((action, i) => {
          //   if (action.Name === 'Roll-handling' || action.Name === 'Användare' || action.Name === 'Advokat' || action.Name === 'Innehållssidor' || action.Name === 'Konfigurationer') {
          //     this.MenuAction = this.MenuAction.filter((e) => e.Name !== action.Name)
          //   }
          // })
          this.MenuAction.map((action, i) => {
            if (action.Name === ele.Name) {
              this.MenuAction[i] = ele
            }
          })

        })
        // console.log('this.MenuAction after',this.MenuAction);
        this.forCheck = actions.doc[0].useForLawyer;
      });
    }

  }
  onChangeroletypeValue() {
    let show = "true";
  }

  getrollist(): void {
    this.api.getactiverole().subscribe(res => {
      this.Role = res.doc;
    },
      err => {
        console.log('err', err);
      }
    );
  }

  // getMenuActionlist(): void {
  //   this.api.getactiveMenuAction().subscribe(res => {
  //     this.MenuAction = res.doc;
  //     // console.log('res.doc',res.doc)
  //   },
  //     err => {
  //       console.log('err', err);
  //     }
  //   );
  // }

  OnSubmit(): void {
    // console.log('useForLawyerData', this.useForLawyerData)
    if(this.useForLawyerData){
      let lawyerMeetingRole = this.MenuAction.filter((ele)=>ele.Name==='Schemalägg möte');
      // console.log("lawyerMeetingRole",lawyerMeetingRole[0])
      let lawyerMeetingRoleId = lawyerMeetingRole[0]._id;

      let roleAlreadyAdded = this.empList.filter((ele) => ele.roleactionID === lawyerMeetingRoleId);
      // console.log("roleAlreadyAdded", roleAlreadyAdded);

      if(roleAlreadyAdded.length<1){
      this.empList.push({ roleactionID: lawyerMeetingRoleId, roleID: '0', name: this.name });
      }
      // console.log("this.empList", this.empList);
    }

    this.showLoader = true;

    this.roleActionData = {
      name: this.name,
      roleID: '0',
      useForLawyerData: this.useForLawyerData,
      menuActionID: this.empList,
    }

    if (!this.roleActionData.name || this.empList.length == 0) {
      this.snackBar.open('Fyll i alla fält', 'ok');
      return;
    }
    this.api.createRoleAction(this.roleActionData)
      .subscribe(
        res => {
          this.snackBar.open('Skapades framgångsrikt', 'ok');
          this.redirect();
        },
        err => {
          console.log(err)
          this.snackBar.open('Skapad misslyckad', 'ok');

        }
      );
  }
  redirect(): void {
    this.router.navigate(['/roleaction']);
  }
  checkRoleAction(): any {
    let RoleID = this.authService.getroleID();
    let roleactionID = menuactionspagename.roleaction.MAId;
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

  // getrolebyID(): void {
  //   this.api.getroledataById(this.selectedroleId)
  //     .subscribe(res => {
  //       this.RoleDetails.name = res.name;
  //     },
  //       err => { console.log('err', err); }
  //     );

  // }

  // onChange(selectdata: String, isChecked: boolean){

  //   console.log("----------",selectdata);
  //   console.log("----------" + this.registerForm.value);


  //   const idFormArray = <FormArray>this.registerForm.controls.checkArry;
  // if(isChecked){
  //   idFormArray.push(new FormControl({selectdata}))

  // }
  // else{
  //   let index = idFormArray.controls.findIndex( x => x.value == {selectdata})
  //   idFormArray.removeAt(index);
  // }
  // }

}

import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { MenuAction } from 'src/app/models/menuaction.model';

import { ActivatedRoute } from '@angular/router';

import { ApiService } from '../../services/api.service';
import { environment } from '../../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { stringify } from 'querystring';
import { RoleAction } from 'src/app/models/RoleAction.model';
import { Role } from 'src/app/models/role';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { menuactionspagename } from 'src/app/models/pagesnameandId';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-view-action',
  templateUrl: './view-action.component.html',
  styleUrls: ['./view-action.component.scss']
})
export class ViewActionComponent implements OnInit {

  private sub: any;
  id: '';
  roleid: '';
  name = '';
  showLoader = false;
  ID: boolean;
  //MenuAction:  MenuAction[];
  MenuAction: Array<{ _id: string, Name: string, Url: string, __v: string }> = []
  MenuActionForLawyer: Array<{ _id: string, Name: string, Url: string, useForLawyer: string, __v: string }> = []
  Menu_Actioni: Array<{ _id: string, Name: string, Url: string, __v: string }> = []
  MenuAction_ForLawyeri: Array<{ _id: string, Name: string, Url: string, useForLawyer: string, __v: string }> = []

  newData: any;
  actionadd: FormGroup;
  checkBoxData: any;

  USERvalue: boolean;
  LAWYERvalue: boolean;
  NEW_DEALvalue: boolean;
  test: boolean;
  IDvale: boolean;
  USERvale: boolean;
  LAWYERvale: boolean;
  NEW_DEALvale: boolean;
  roleID = '';
  RoleDetails = { name: '', useForLawyer: '' };
  useForLawyer = '';
  forCheck: any;

  empList: Array<{ roleactionID: string, roleID: string, name: string }> = []

  lawyerSalesRoleId = '';

  roleActionData: RoleAction = { name: '', roleID: '', menuActionID: '', useForLawyerData: '' };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
    , private authService: AuthService) { }

  ngOnInit(): void {
    this.checkRoleAction();
    this.sub = this.route.params.subscribe(params => {
      this.id = params.id;
      this.getAllRoleActionData();
    });
  }


  getAllRoleActionData(): any {
    this.api.getAllRoleData(this.id)
      .subscribe(
        res => {
          console.log('RoleData Response', res)
          // console.log('RoleData Response', res.Role_List)
          //------------Role Name-----------------
          this.roleID = res.Role_List[0]._id;
          this.useForLawyer = res.Role_List[0].useForLawyer;
          this.RoleDetails.name = res.Role_List[0].name;

          //-------------MenuAction----------------
          this.MenuAction = res.MenuAction_ListFalse;
          this.MenuActionForLawyer = res.MenuAction_ListTrue;
          // this.MenuActionForLawyer = res.MenuAction_ListFalse;
          let MenuActionListTrue = res.MenuAction_ListTrue;

          // MenuActionListTrue.forEach((ele) => {
          //   this.MenuActionForLawyer.map((action, i) => {
          //     if (action.Name === ele.Name) {
          //       this.MenuActionForLawyer[i] = ele
          //     }
          //   })
          //   // this.MenuActionForLawyer.map((action, i) => {
          //   //   if (action.Name === 'Roll-handling' || action.Name === 'Användare' || action.Name === 'Advokat' || action.Name === 'Innehållssidor' || action.Name === 'Konfigurationer') {
          //   //     this.MenuActionForLawyer = this.MenuActionForLawyer.filter((e) => e.Name !== action.Name)
          //   //   }
          //   // })

          // })

          //-----------Role Actions----------------
          let dataa = res.RoleAction_List;

          dataa.forEach(element => {
            this.empList.push({
              roleactionID: element.roleactionID, roleID: this.roleID, name: this.RoleDetails.name
            });
            let index = this.MenuAction.findIndex(x => x._id === element.roleactionID);
            if (index != -1) {
              this.MenuAction[index].__v = "1"
            }
            let index2 = this.MenuActionForLawyer.findIndex(y => y._id === element.roleactionID);
            if (index2 != -1) {
              this.MenuActionForLawyer[index2].__v = "1"
            }
          })
          this.MenuAction_ForLawyeri = res.MenuAction_ListTrue;
          this.Menu_Actioni = res.MenuAction_ListFalse
          this.newData = res.RoleAction_List;
        },
        err => { }
      );
  }

  onChangeLawyerUse(event) {
    this.useForLawyer = event;
    this.clearOtherCheckbox();
  }
  onChange(index: number, selectedId: any, isChecked: String) {
    if (isChecked) {
      this.empList.push({ roleactionID: selectedId, roleID: this.roleID, name: this.RoleDetails.name });
    }
    else {
      if (this.empList.find(x => x.roleactionID == selectedId)) {
        this.empList.splice(this.empList.findIndex(x => x.roleactionID == selectedId), 1);
      }
      // If AdminSalesRole was replaced with LawyerSalesRole, So remove that 
      if(this.useForLawyer){
      // console.log('selectedId',selectedId);
      // console.log('this.lawyerSalesRoleId',this.lawyerSalesRoleId);
      if (this.empList.find(x => x.roleactionID == this.lawyerSalesRoleId)) {
        this.empList.splice(this.empList.findIndex(x => x.roleactionID == this.lawyerSalesRoleId), 1);
      }
      }
      
    }
  }

  OnSubmit(): void {
    // console.log("useForLawyer",this.useForLawyer);
    // console.log("this.empList", this.empList);

    if (this.useForLawyer) {

      //............Replace Meetings with lawyer meetings....................
      let lawyerMeetingRole = this.MenuActionForLawyer.filter((ele) => ele.Name === 'Schemalägg möte');
      // console.log("lawyerMeetingRole", lawyerMeetingRole[0]);
      let lawyerMeetingRoleId = lawyerMeetingRole[0]._id;
      let roleAlreadyAdded = this.empList.filter((ele) => ele.roleactionID === lawyerMeetingRoleId);
      // console.log("roleAlreadyAdded", roleAlreadyAdded);

      if(roleAlreadyAdded.length<1){
        this.empList.push({ roleactionID: lawyerMeetingRoleId, roleID: this.roleID, name: this.RoleDetails.name });
      }
      // console.log("this.empList", this.empList);
    //............................. Done ......................................
      
      //............Replace Sales with lawyer sales............................
      let lawyerSalesRole = this.MenuActionForLawyer.filter((ele) => ele.Name === 'Säljshistora');
      // console.log("lawyerSalesRole",lawyerSalesRole);
      this.lawyerSalesRoleId = lawyerSalesRole[0]._id;
      // console.log("lawyerSalesRoleId",lawyerSalesRoleId);
      this.MenuAction.filter((ele) =>{
        if(ele.Name==='Säljshistora'){
          // console.log('ele',ele);
          this.empList.map((role)=>{
            if(role.roleactionID===ele._id){
              // console.log('role before',role);
              role.roleactionID = this.lawyerSalesRoleId;
              // console.log('role after',role);
            } 
          })
        }
    });
    //............................... Done .....................................
    }
      // console.log("this.empList", this.empList);

    this.showLoader = true;
    // console.log("this.RoleDetails.useForLawyer",this.RoleDetails.useForLawyer);

    this.roleActionData = {
      name: this.RoleDetails.name,
      useForLawyerData: this.useForLawyer,
      roleID: this.roleID,
      menuActionID: this.empList,
    }

    if (!this.roleActionData.name || !this.roleActionData.roleID || !this.roleActionData.menuActionID) {
      this.snackBar.open('Fyll i alla fält', 'ok');
      return;
    }
    this.api.updateRoleAction(this.roleActionData)
      .subscribe(
        res => {
          this.snackBar.open('Uppdatera ', ' ok ');
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

  clearOtherCheckbox() {
    this.empList = [];
    this.MenuActionForLawyer.forEach(element => {
      let index = this.MenuActionForLawyer.findIndex(x => x._id === element._id);
      if (index != -1) {
        this.MenuActionForLawyer[index].__v = "0"
      }
    })
    this.MenuAction.forEach(element => {
      let index2 = this.MenuAction.findIndex(x => x._id === element._id);
      if (index2 != -1) {
        this.MenuAction[index2].__v = "0"
      }
    })
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

}


  // getRoleData(): any {

  //   this.api.getRole(this.id)
  //     .subscribe(
  //       res => {

  //         this.useForLawyer = res.useForLawyer;
  //         let value = res.useForLawyer;
  //         this.RoleDetails.name = res.name;
  //         // if(value==='true'){
  //         //   console.log('true',value)
  //         // }
  //         // this.getActionsForLawyer(value)
  //         // console.log('value', value)
  //         console.log('Role res', res)
  //         // this.getRoleActionData(this.id);
  //       },
  //       err => { }
  //     );
  // }

  // getallroleactionByroleID(roleID): any {
  //   this.api.getallroleaction(roleID)
  //     .subscribe(
  //       res => {
  //         // console.log('ressss',res)
  //         // this.roleid = res.roleactionlist[0].roleID;

  //         let dataa = res.roleactionlist;
  //         dataa.forEach(element => {

  //           this.empList.push({ roleactionID: element.roleactionID, roleID: this.roleID, name: this.RoleDetails.name });
  //           let index = this.MenuAction.findIndex(x => x._id === element.roleactionID);
  //           if (index != -1) {
  //             this.MenuAction[index].__v = "1"
  //           }
  //           let index2 = this.MenuActionForLawyer.findIndex(y => y._id === element.roleactionID);
  //           if (index2 != -1) {
  //             this.MenuActionForLawyer[index2].__v = "1"
  //           }
  //         })

  //       },
  //       err => { }
  //     );

  // }

  // getMenuActionlist(): any {
  //   this.api.getactiveMenuAction().subscribe(res => {
  //     this.MenuAction = res.doc;
  //   },
  //     err => {
  //       console.log('err', err);
  //     }
  //   );
  // }

  // getActionsForLawyer(data): any {
  //   this.api.getActionsForLawyer(data).subscribe(actions => {
  //     this.MenuActionForLawyer = actions.doc;
  //     console.log('this.MenuActionForLawyer', this.MenuActionForLawyer)
  //     this.forCheck = actions.doc[0].useForLawyer;

  //   });
  // }

  // getRoleActionData(IDD): any {
  //   console.log('this.IDD', IDD)

  //   this.api.getAllRoleActions(IDD).subscribe(actions => {
  //     this.MenuAction = actions.doc;
  //     console.log('this.MenuAction', this.MenuAction)
  //     // this.forCheck = actions.doc[0].useForLawyer;
  //   });
  // }

  // getRoleActionData(): any {
  //   this.api.getRoleAction(this.id)
  //     .subscribe(
  //       res => {
  //         this.roleID = res.roleID;
  //         // this.useForLawyer = res.useForLawyer;
  //         this.RoleDetails.name = res.name;
  //         this.getallroleactionByroleID(this.roleID);
  //         console.log('RoleAction res', res)
  //       },
  //       err => { }
  //     );
  // }

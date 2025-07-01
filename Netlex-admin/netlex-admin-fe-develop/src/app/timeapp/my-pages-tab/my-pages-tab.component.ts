import { Component, OnInit } from '@angular/core';
import { menuactionspagename } from 'src/app/models/pagesnameandId';
import { AuthService } from "../../services/auth.service";
import { ApiService } from "../../services/api.service";

@Component({
  selector: 'app-my-pages-tab',
  templateUrl: './my-pages-tab.component.html',
  styleUrls: ['./my-pages-tab.component.scss']
})
export class MyPagesTabComponent implements OnInit {

  constructor(private authService: AuthService, private api: ApiService) { }
  items = ['Byt Lösenord', 'Inställningar', 'Favoriter', 'Nyheter'];
  InnerItems=['Startsida', 'Profilbild', 'Språk', 'Tema'];
  expandedIndex = 0;
  ngOnInit(): void {
    // this.checkRoleAction();
  }
  changePassword(): any{
  }

}

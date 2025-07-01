import { ApiService } from 'src/app/services/api.service';
import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
//import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ContentPage } from '../models/contentpage.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';




@Component({
  selector: 'app-contentpage',
  templateUrl: './contentpage.component.html',
  styleUrls: ['./contentpage.component.scss']
})
export class ContentpageComponent implements OnInit {
    @Input('data') items: ContentPage[] = [];
    asyncItems: Observable<ContentPage[]>;
    p = 1;
    perPage = 10;
    total: number;
    loading: boolean;
    docs: any;
  
    constructor(public api: ApiService,
        public snackBar: MatSnackBar,
        public dialog: MatDialog,
        public router: Router,
   
    ) {
    }
    documentList = [];
    documents = [];
    alphabetHide: boolean;
    ngOnInit(): void {
      
        this.getPage(1);
        

        
    }
    edit(id): void {
        this.router.navigate(['/contentpageUpdate', id]).then();
    }

    getPage(page: number): any {
        this.loading = true;
        this.asyncItems = this.api.ContentpageList(page, this.perPage)
            .pipe(
                tap(res => {
                    this.total = 10;
                    this.p = page;
                    this.perPage = 10;
                    this.loading = false;
                }),
                map(({docs: docs1}) => docs1)
            );
    };

    viewBusiness(){}
}



import { Component, Pipe, PipeTransform, OnInit } from '@angular/core';
import { UtilService } from "../../services/util.service";
import { contentpagesService } from '../../services/contentpages.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { environment } from "../../../environments/environment";
import { ActivatedRoute, Router } from '@angular/router';

@Pipe({ name: "safeHtml" })
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }

  transform(value) {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}

@Component({
  selector: 'app-activity-areas',
  templateUrl: './activity-areas.component.html',
  styleUrls: ['./activity-areas.component.scss']
})
export class ActivityAreasComponent implements OnInit {
  headerImage: any;
  headerImageExist = false;
  expertise = '';
  constructor(private utilService: UtilService, private ContentpagesService: contentpagesService, private route: ActivatedRoute, public router: Router,) { }
  activityAreasPageContent: any;
  ngOnInit(): void {
    this.utilService.show();
    window.scroll(0, 0)
    localStorage.setItem('returnFrom','activityAreas');
    
    this.getContentPages('activityAreasPageContent');
    // this.getHeaderImage();
    let path = location.pathname;

    this.route.queryParams.subscribe(params => {
      //If no params exist
      if (!params.law && path.includes('activityAreas') && !path.includes('activityAreas?')) {
        // console.log("No params", params)
        this.router.navigate(['/activityAreas'], {
          queryParams: {
            law: 'expertise1',
          }
        });
      }
      //incoming params
      else {
        this.expertise = params.law;
        console.log("params exist", params);
      }
    })
  }
  getContentPages(Pagename) {
    this.ContentpagesService.getContentPages(Pagename).subscribe(response => {
      console.log("response", response);
      this.activityAreasPageContent = response.doc[0];
    });
  }

  getHeaderImage() {
    const Pagename = 'allHeaderImages'
    this.ContentpagesService.getContentPages(Pagename).subscribe(response => {
      // console.log("response",response)
      this.headerImageExist = response.doc[0].termsConditionsHeaderImgExist;
      let imageData = response.doc[0].termsConditionsHeaderImg;
      // console.log("imageData",imageData)
      this.headerImage = 'url(' + environment.adminserviceURL + imageData + ')';
      // console.log("this.headerImage",this.headerImage)
    });
  }
}

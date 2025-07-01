import { Component, Pipe, PipeTransform, ViewChild, AfterViewInit, OnInit, HostListener } from '@angular/core';
import { UtilService } from '../../../services/util.service';
import { contentpagesService } from 'src/app/services/contentpages.service';
import { htmlcontentModel } from '../../../models/contentpage';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment';
@Pipe({ name: "safeHtml" })
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }

  transform(value) {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}
@Component({
  selector: 'app-sample3',
  templateUrl: './sample3.component.html',
  styleUrls: ['./sample3.component.scss']
})
export class Sample3Component implements OnInit {
  innerWidth: any;
  hello = false;
  banner_box1 = false;
  dot_array = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']
  who_we_are_img = false;
  sevices = false;
  all_services_mobile = false;
  // @ViewChild("userHtml", { static: false }) userHtml;
  marked: boolean = true;
  userHtml: any;
  content_page: htmlcontentModel;
  home: htmlcontentModel;
  name: string;
  htmlcontent: string;
  handleYourLegal: String;
  aboutUsHeader: String;
  agreementOnline: String;

  heading: String;

  description: String;

  selectAgreement: String;

  selectAgreementDesc: String;

  fillAgreement: String;

  fillAgreementDesc: String;

  purchase: String;

  purchaseDescription: String;

  availability: String;

  availabilityDescription: String;

  welcomeNote: String;

  startAgreement: String;
  homeHeaderPic: String;
  homeHeaderPicMob: String;
  selectAgreementImg: String;

  fillAgreementImg: String;

  purchaseImg: String;

  availabilityImg: String;

  constructor(
    public utilService: UtilService, private ContentpagesService: contentpagesService, private sanitizer: DomSanitizer
  ) {
  }
  AfterViewInit(): void {

  }
  ngAfterViewInit(): void {

  }
  ngInit(): void {

  }
  ngOnInit(): void {
    this.utilService.show();
    this.utilService.edit = false;
    this.getContentPages();

    this.innerWidth = window.innerWidth;
    // if(this.innerWidth <= 959){
    //   this.banner_box1 = true
    // }
    // console.log(" this.innerWidth", this.innerWidth)
  }
  getContentPages(): any {
    //  debugger;
    const Pagename = 'home'
    this.ContentpagesService.getContentPages(Pagename).subscribe(contentpage => {
      this.home = contentpage.doc[0];
      this.handleYourLegal = this.home.handleYourLegal;
      this.name = this.home.name;
      this.htmlcontent = this.home.htmlcontent;

      this.aboutUsHeader = this.home.aboutUsHeader;
      this.agreementOnline = this.home.agreementOnline;

      this.heading = this.home.heading;

      this.description = this.home.description;

      this.selectAgreement = this.home.selectAgreement;

      this.selectAgreementDesc = this.home.selectAgreementDesc;

      this.fillAgreement = this.home.fillAgreement;

      this.fillAgreementDesc = this.home.fillAgreementDesc;

      this.purchase = this.home.purchase;

      this.purchaseDescription = this.home.purchaseDescription;

      this.availability = this.home.availability;

      this.availabilityDescription = this.home.availabilityDescription;

      this.welcomeNote = this.home.welcomeNote;

      this.startAgreement = this.home.startAgreement;
      this.homeHeaderPic = environment.adminserviceURL + this.home.homeHeaderPic
      this.homeHeaderPicMob = environment.adminserviceURL + this.home.homeHeaderPicMob
      this.selectAgreementImg = environment.adminserviceURL + this.home.selectAgreementImg

      this.fillAgreementImg = environment.adminserviceURL + this.home.fillAgreementImg

      this.purchaseImg = environment.adminserviceURL + this.home.purchaseImg

      this.availabilityImg = environment.adminserviceURL + this.home.availabilityImg
      // this.content_page=contentpage.contentpage[0];
      // this.userHtml=contentpage.contentpage[0].htmlcontent;
      // this.userHtml = this.sanitizer.bypassSecurityTrustHtml(contentpage.contentpage[0].htmlcontent);

    });



  }
  // @HostListener('window:scroll', ['$event'])
  // doSomething(event) {
  //   // console.debug("Scroll Event", document.body.scrollTop);
  //   // see András Szepesházi's comment below
  //   console.debug("Scroll Event", window.pageYOffset);
  // }
  @HostListener("document:scroll")
  scrollFunction() {
    // console.log("document.body.scrollTop",document.body.scrollHeight)
    // console.log("document.body.scrollTop", window.scrollY)
    if (this.innerWidth > 959) {


      if (window.scrollY > 10) {
        this.banner_box1 = true
      }
      if (window.scrollY < 10) {
        this.banner_box1 = false
      }
      // console.log("this.banner_box1", this.banner_box1)
      if (window.scrollY > 600) {
        this.who_we_are_img = true
      }
      // if (window.scrollY < 600) {
      //   this.who_we_are_img = false
      // }
      if (window.scrollY > 1100) {
        this.sevices = true
      }
      if (window.scrollY > 500) {
        this.hello = true
      }
      else if (window.scrollY < 500) {
        this.hello = false
      }
    }
    else{
      if (window.scrollY > 2) {
        this.banner_box1 = true
      }
      if (window.scrollY < 2) {
        this.banner_box1 = false
      }
    }
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
    // if(this.innerWidth <= 959){
    //   this.banner_box1 = true
    // }
    // console.log(" this.innerWidth", this.innerWidth)

  }
  show_all_services(){
    this.all_services_mobile = !this.all_services_mobile;
  }
}

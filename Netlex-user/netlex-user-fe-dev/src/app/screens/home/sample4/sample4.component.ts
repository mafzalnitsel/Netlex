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
  selector: 'app-sample4',
  templateUrl: './sample4.component.html',
  styleUrls: ['./sample4.component.scss']
})
export class Sample4Component implements OnInit {
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
  color='red'

    //---------||-------New-------||-------//
    bigHeaderHeading: String;
    smallHeaderHeading1: String;
    smallHeaderHeading2: String;
    crystal_navbar_color: String;
    colored_navbar_color: String;
    home_Bg_Color: String;
    desc_Bg_Color: String;
    services_bg_color: String;
    footer_bg_color: String;
  
    services_bg_type: String;
    footer_bg_type: String;
  
    heroBoxTexts: any;
    introTexts: any;
    servicesAllTexts: any;
    introImage: any;
    // footerparagraphTexts: any;
    //---------||-------New-------||-------//
    
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
  // getContentPages(): any {
  //   //  debugger;
  //   const Pagename = 'home'
  //   this.ContentpagesService.getContentPages(Pagename).subscribe(contentpage => {
  //     this.home = contentpage.doc[0];
  //     this.handleYourLegal = this.home.handleYourLegal;
  //     this.name = this.home.name;
  //     this.htmlcontent = this.home.htmlcontent;

  //     this.aboutUsHeader = this.home.aboutUsHeader;
  //     this.agreementOnline = this.home.agreementOnline;

  //     this.heading = this.home.heading;

  //     this.description = this.home.description;

  //     this.selectAgreement = this.home.selectAgreement;

  //     this.selectAgreementDesc = this.home.selectAgreementDesc;

  //     this.fillAgreement = this.home.fillAgreement;

  //     this.fillAgreementDesc = this.home.fillAgreementDesc;

  //     this.purchase = this.home.purchase;

  //     this.purchaseDescription = this.home.purchaseDescription;

  //     this.availability = this.home.availability;

  //     this.availabilityDescription = this.home.availabilityDescription;

  //     this.welcomeNote = this.home.welcomeNote;

  //     this.startAgreement = this.home.startAgreement;
  //     this.homeHeaderPic = environment.adminserviceURL + this.home.homeHeaderPic
  //     this.homeHeaderPicMob = environment.adminserviceURL + this.home.homeHeaderPicMob
  //     this.selectAgreementImg = environment.adminserviceURL + this.home.selectAgreementImg

  //     this.fillAgreementImg = environment.adminserviceURL + this.home.fillAgreementImg

  //     this.purchaseImg = environment.adminserviceURL + this.home.purchaseImg

  //     this.availabilityImg = environment.adminserviceURL + this.home.availabilityImg
  //     // this.content_page=contentpage.contentpage[0];
  //     // this.userHtml=contentpage.contentpage[0].htmlcontent;
  //     // this.userHtml = this.sanitizer.bypassSecurityTrustHtml(contentpage.contentpage[0].htmlcontent);
  //     // console.log("homeHeaderPic",this.homeHeaderPic)
  //   });



  // }

  getContentPages(): any {
    //  debugger;
    const Pagename = 'home'
    this.ContentpagesService.getContentPages(Pagename).subscribe(contentpage => {
      this.home = contentpage.doc[0];
      // console.log("this.home", this.home)
      //---------||-------New-------||-------//

      this.colored_navbar_color = this.home.coloredNavbarColor;
      this.home_Bg_Color = this.home.homeBgColor;
      this.desc_Bg_Color = this.home.descBgColor;
      this.services_bg_color = this.home.servicesBgColor;
      this.services_bg_type = this.home.servicesBgType;
      this.heroBoxTexts = this.home.heroBoxTexts;
      this.introTexts= this.home.introTexts;
      this.servicesAllTexts= this.home.servicesAllTexts;
      this.introImage = environment.adminserviceURL + this.home.introImage;
      // console.log("this.home_Bg_Color", this.home_Bg_Color)
      // console.log("this.servicesAllTexts", this.servicesAllTexts)

      // this.footer_bg_color = this.home.footerBgColor;
      // this.crystal_navbar_color = this.home.crystalNavbarColor;
      // this.footer_bg_type = this.home.footerBgType;

      // this.selected_Services_Bg_Image = this.home.servicesBgImage;
      // this.selected_Footer_Bg_Image = this.home.footerBgImage;

      this.bigHeaderHeading = this.home.handleYourLegal;
      let splitData = this.home.agreementOnline.split(',');
      // console.log("splitData",splitData)
      this.smallHeaderHeading1 = splitData[0];
      this.smallHeaderHeading2 = splitData[1];
      //---------||-------New-------||-------//


      // this.handleYourLegal = this.home.handleYourLegal; //Changed to bigHeaderHeading from handleYourLegal
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



      // this.smallHeaderHeading = this.home.smallHeaderHeading;
      // this.content_page=contentpage.contentpage[0];
      // this.userHtml=contentpage.contentpage[0].htmlcontent;
      // this.userHtml = this.sanitizer.bypassSecurityTrustHtml(contentpage.contentpage[0].htmlcontent);
      // console.log("homeHeaderPic",this.homeHeaderPic)

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

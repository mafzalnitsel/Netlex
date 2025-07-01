import { Component, OnInit, HostListener } from "@angular/core";
import { UtilService } from "../../services/util.service";
import { AuthService } from "../../services/auth.service";
import { MatDialog } from "@angular/material/dialog";
import { DialogForUserDetailComponent } from "../../screens/agreement/agreement.component";
import { contentpagesService } from "src/app/services/contentpages.service";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  userName;
  large_Navbar = true;
  small_Navbar = false;
  isChecked = false;

  //---------||-------New-------||-------//
  crystal_navbar_color: String;
  colored_navbar_color: String;
  //---------||-------New-------||-------//

  constructor(
    public utilService: UtilService,
    public auth: AuthService,
    public dialog: MatDialog,
    private ContentpagesService: contentpagesService,
    public router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getContentPages();
  }
  agreement(): void {
    this.dialog.open(DialogForUserDetailComponent, {
      data: {},
    });
  }
  getContentPages(): any {
    const Pagename = "home";
    this.ContentpagesService.getContentPages(Pagename).subscribe(
      (contentpage) => {
        // console.log("contentpage.doc[0]", contentpage.doc[0])
        this.crystal_navbar_color = contentpage.doc[0].crystalNavbarColor;
        this.colored_navbar_color = contentpage.doc[0].coloredNavbarColor;
      }
    );
  }
  onCheckboxChange() {
    if (this.isChecked) {
      const foretag = "checked";
      this.Data(foretag);
    } else {
      const foretag = "unchecked";
      this.Data(foretag);
    }
  }

  Data(foretag: string) {
    // Replace 'your-api-url' with the actual API endpoint to post the data
    console.log("foretag----", foretag);
    localStorage.setItem("CheckForetog", "Checked");

    // this.http.get('http://localhost:30000/CheckDataForetag', )
    //   .subscribe(response => {
    //     console.log('Data posted successfully:', response);
    //   }, error => {
    //     console.error('Error posting data:', error);
    //   });
  }

  agreementOpenHandlerPrivatePerson(value: any) {
    //     // this.http.get('http://localhost:3000/CheckDataForetag')

    //      this.http.get('http://localhost:3000/CheckDataPrivatePerson')
    this.ContentpagesService.getCheckPrivatePerson().subscribe(
      (response: any[]) => {
        const responseArray = response as any[];
        const length = responseArray.length;
        const dataValue = response[length - 1]?.privateperson;
        console.log("response---", response);

        if (dataValue === "unchecked") {
          this.router.navigate(["/agreements"], {
            queryParams: {
              showAgreement: value,
            },
          });
        } else {
          this.router.navigate(["/Kommersnartprivatperson"], {
            queryParams: {
              showAgreement: value,
            },
          });
        }
      },
      (error: any) => {
        console.error("Error posting data:", error);
      }
    );
  }

  agreementOpenHandlerForetag(value) {
    // this.http.get('http://localhost:3000/CheckDataForetag')
    this.ContentpagesService.getCheckDataForetag().subscribe(
      (response) => {
        const responseArray = response as any[];
        const length = responseArray.length;
        const dataValue = response[length - 1]?.foretag;
        if (dataValue === "unchecked") {
          this.router.navigate(["/agreements"], {
            queryParams: {
              showAgreement: value,
            },
          });
        } else {
          this.router.navigate(["/kommersnart"], {
            queryParams: {
              showAgreement: value,
            },
          });
        }
      },
      (error) => {
        console.error("Error posting data:", error);
      }
    );
  }

  @HostListener("document:scroll")
  scrollFunction() {
    // console.log("document.body.scrollTop",document.body.scrollHeight)
    // console.log("document.body.scrollTop", window.scrollY)

    //   if (this.innerWidth > 959) {
    if (window.scrollY < 50) {
      this.large_Navbar = true;
      this.small_Navbar = false;
    }
    if (window.scrollY > 50) {
      this.large_Navbar = false;
      this.small_Navbar = true;
    }
    // if (window.scrollY > 30) {
    //     this.small_Navbar = true
    // }
    // if (window.scrollY < 30) {
    //     this.small_Navbar = false
    // }
    //   }
    //   else{
    //     if (window.scrollY > 2) {
    //       this.banner_box1 = true
    //     }
    //   }
  }
}

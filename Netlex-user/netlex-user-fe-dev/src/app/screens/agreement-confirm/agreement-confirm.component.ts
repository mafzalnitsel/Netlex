import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../services/util.service';
import { ActivatedRoute, Router } from "@angular/router";
import { NewDealService } from '../../services/newDeal.service';
@Component({
  selector: 'app-agreement-confirm',
  templateUrl: './agreement-confirm.component.html',
  styleUrls: ['./agreement-confirm.component.scss']
})
export class AgreementConfirmComponent implements OnInit {

  //----||---New---||----//
  videoPauseStart: any;
  videoStarted = false;
  // videos = [{ id:'video1', path: 'assets/videos/video1.mp4' }, { id:'video2',  path: 'assets/videos/video1.mp4' }, { id:'video3',  path: 'assets/videos/video1.mp4' },]
  videos = [{ path: 'assets/videos/video1.mp4' }]
  videosExists = true;
  showUserInputQuestions = false;
  // showUserInputQuestions = true;
  //----||---New---||----//

  documentId: string;
  documentUnitPrice: number;
  documentTax: number;
  documentTitle: string;
  documentDescription: string;
  documentPrice: number;
  documentTotal: number;
  constructor(public utilService: UtilService, private route: ActivatedRoute, private newDealService: NewDealService,
    private router: Router,) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.documentId = params?._id;
      // localStorage.setItem('agreementUserInputs', this.documentId);

    });
    if (this.documentId) {
      this.newDealService.getDocumentById(this.documentId).subscribe(fields => {
        // debugger;
        this.documentTitle = fields.documentTitle;
        this.documentDescription = fields.documentDescription;
        this.documentPrice = Number(fields.documentPrice);
        this.documentUnitPrice = Number(fields.documentPrice);
        this.documentTax = Number(fields.documentTax);
        this.documentTotal = Number(fields.documentPrice) + Number(fields.documentTax);
      });

    }

    this.utilService.show();
  }
  submit(): void {
    this.router.navigate(['/userInput', this.documentId]).then();
    // 6285f4b1ba3ea1318493e2d8
    // this.showUserInputQuestions = true;
  }
  videoPlayPause() {
    // var myVideo: any = document.getElementById("my_video_1");
    this.videoPauseStart = document.getElementById("my_video_1");
    // if (this.videoPauseStart.paused) {
    //   this.videoPauseStart.play();
    //   this.videoStarted = true;
    // }
    // else {
    //   this.videoPauseStart.pause();
    //   this.videoStarted = false;
    // };
  }
  onVideoHoverHandler(event) {
    // console.log("event", event.type)
    this.videoPauseStart = document.getElementById("my_video_1");
    if (event.type === 'mouseover') {
      this.videoPauseStart.setAttribute("controls", "controls")
      this.videoStarted = true;
    }
    else if (event.type === 'mouseout') {
      this.videoPauseStart.removeAttribute("controls");
      if (this.videoPauseStart.paused) {
        this.videoStarted = false;
      }
      // this.videoStarted = false;
    }
  }
}

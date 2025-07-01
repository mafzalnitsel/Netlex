import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
// import { environment } from 'src/environments/environment'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { menuactionspagename } from 'src/app/models/pagesnameandId';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-view-question-and-answer',
  templateUrl: './view-question-and-answer.component.html',
  styleUrls: ['./view-question-and-answer.component.scss']
})
export class ViewQuestionAndAnswerComponent implements OnInit {

  private sub: any;
  id: '';
  question = '';
  answer = '';
  showloading = false;
  showBackLoading = false;
  alert: { success: boolean, text: string } = { success: true, text: '' };
  questionAndAnswer: { question: string; answer: string; category: string; }[];
  ////////////////----New------////////////////
  selectedQuestionsCategory: any;
  questionsCategoryOptions: any = ['agreement', 'meeting'];
  questionsCategoryOptionsId: ''
  editCategory = false;
  editCategoryAction = 'add';
  contentPages: { questionsCategoryOptions: []; }[];
  public editCategoryRadios: any = [
    { label: 'Lägg till fler kategorier', value: 'add', checked: true },
    { label: 'Ta bort kategorier', value: 'remove', checked: false }
  ];
  moreCategory: any;
  removeCategory: any;

  ///////////////////////////////////////////

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.getCategoryOptions('questionsCategoryOptions');

    this.checkRoleAction();
    this.sub = this.route.params.subscribe(params => {
      this.id = params.id;
      this.getQuestionAndAnswerData();
    });
  }


  getQuestionAndAnswerData(): any {

    this.api.getQuestionAndAnswer(this.id)

      .subscribe(
        res => {
          this.question = res.question;
          this.answer = res.answer;
          if (res.category) {
            this.selectedQuestionsCategory = res.category;
          }
        },
        err => {
          console.log("err while getting question answer", err);
        }
      );
  }

  update(): any {
    this.showloading = true;
    if (!this.question || !this.answer || !this.selectedQuestionsCategory) {
      this.snackBar.open('Fyll i alla fält', 'ok');
      this.showloading = false;
      return;
    }
    else {
      this.updateCategoryOptions();
    }
    this.questionAndAnswer = [{
      'question': this.question,
      'answer': this.answer,
      'category': this.selectedQuestionsCategory
    }]
    this.api.updateQuestionAndAnswer(this.questionAndAnswer, this.id)
      .subscribe(
        res => {

          this.snackBar.open('fråga och svar uppdaterades lyckades', 'ok');
          // console.log('this.question',this.question)
          // console.log('this.answer',this.answer)
          // console.log('this.questionAndAnswer',this.questionAndAnswer)
          this.redirect(2);
        },
        err => {
          this.showloading = false;
        }
      );

  }
  // redirect(): void {
  //   this.router.navigate(['/content-pages']);
  // }
  redirect(TabID): any {
    this.showBackLoading = true;
    setTimeout(() => {
      this.showloading = false;
      this.showBackLoading = false;
    }, 3000)
    setTimeout(() => {
      this.router.navigate(['/content-pages'], {
        queryParams: { tabID: TabID }
      });
    }, 100)
  }
  checkRoleAction(): any {
    let RoleID = this.authService.getroleID();
    let roleactionID = menuactionspagename.content_pages.MAId;
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

  ////////////////////////////////////////////////////////
  getCategoryOptions(name): any {
    this.api.getQuestionsCatergoryOptions(name).subscribe(data => {
      let response = data.doc[0];
      // console.log("response", response)
      this.questionsCategoryOptionsId = response._id;
      if (response.questionsCategoryOptions) {
        this.questionsCategoryOptions = response.questionsCategoryOptions;
      }
    });
  }
  updateCategoryOptions(): any {
    // this.showloading = true;
    this.contentPages = [{
      'questionsCategoryOptions': this.questionsCategoryOptions,
    }]
    if (this.contentPages[0].questionsCategoryOptions.length > 0) {
      // console.log("contentPages", this.contentPages)

      this.api.updateQuestionsCatergoryOptions(this.contentPages, this.questionsCategoryOptionsId)
        .subscribe(
          res => {
            // this.snackBar.open('Villkor och betingelser uppdaterades lyckades', 'ok');
            // this.showloading = false;
            // console.log('this.id',this.id)
            // console.log('this.clientsDetails',this.clientsDetails)
          },
          err => {
            console.log("err while updating category options", err);
            // this.showloading = false;
          }
        );
    }

  }
  //-------------Open Edit Section for more categories-------------
  editCategoryHandler() {
    this.editCategory = !this.editCategory;
    // console.log(" this.editCategory", this.editCategory)
  }

  //-------------Edit  type of category-----------------------
  checkForMoreCategory(event) {
    // console.log("event", event)
    this.editCategoryAction = event.value;

  }

  //-------------Add more laws into category Selection Array----------
  addMoreCategoryHandler() {
    // console.log("moreCategory", this.moreCategory)
    let newArray: any;
    if (this.selectedQuestionsCategory) {
      newArray = this.selectedQuestionsCategory;
    }
    else {
      newArray = [];
    }

    let more_Category_Single_Or_Multiple = this.moreCategory.includes(',');

    if (more_Category_Single_Or_Multiple) {
      this.moreCategory = this.moreCategory.replace(/\s/g, '')
      this.moreCategory = this.moreCategory.split(",")
      // console.log("moreCategory", this.moreCategory)
      this.moreCategory.forEach((ele) => {
        let categoryAlreadyExist = this.questionsCategoryOptions.includes(ele);
        // console.log("categoryAlreadyExist", categoryAlreadyExist)
        if (!categoryAlreadyExist) {
          // console.log("ele", ele);
          this.questionsCategoryOptions.push(ele);
        }
      })
      this.moreCategory = [];

    }
    else {
      // console.log("this.moreCategory", this.moreCategory)
      let categoryAlreadyExist = this.questionsCategoryOptions.includes(this.moreCategory);
      // console.log("categoryAlreadyExist", categoryAlreadyExist)
      if (!categoryAlreadyExist && this.moreCategory.length !== 0) {
        this.questionsCategoryOptions.push(this.moreCategory)
        this.selectedQuestionsCategory = this.moreCategory;
        this.moreCategory = [];

      }
    }
  }

  //-------------Remove laws from category Selection Array------------
  removeCategoryHandler() {
    if (this.removeCategory && this.removeCategory.length > 0) {
      // console.log("this.removeCategory",this.removeCategory)
      this.removeCategory.forEach((ele) => {
        // this.questionsCategoryOptions.includes(ele)
        this.questionsCategoryOptions = this.questionsCategoryOptions.filter((law) => law !== ele)
        this.removeCategory = this.removeCategory.filter((law) => law !== ele)
        if (this.selectedQuestionsCategory === ele) {
          this.selectedQuestionsCategory = ''
        }
        // console.log("selectedQuestionsCategory", this.selectedQuestionsCategory)

        // this.selectedQuestionsCategory = ''
        // if (this.selectedQuestionsCategory && this.selectedQuestionsCategory !== undefined) {
        //   this.selectedQuestionsCategory = this.selectedQuestionsCategory.filter((law) => law !== ele);
        // }
      })

    }
  }
  ///////////////////////////////////////////////////////
}

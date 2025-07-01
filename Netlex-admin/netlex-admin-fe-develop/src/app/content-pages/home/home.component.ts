import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
// import {environment} from '../../../environments/environment.prod';
import { environment } from '../../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { menuactionspagename } from 'src/app/models/pagesnameandId';
import { AuthService } from 'src/app/services/auth.service';
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    private sub: any;
    id: '';
    // name= "home";
    handleYourLegal = '';
    agreementOnline = '';
    description = '';
    selectAgreement = '';
    selectAgreementDesc = '';
    fillAgreement = '';
    fillAgreementDesc = '';
    purchase = '';
    purchaseDescription = '';
    availability = '';
    availabilityDescription = '';
    welcomeNote = '';
    startAgreement = '';

    homeHeaderPic: any;
    homeHeaderPicMob: any;
    introImage: any;
    servicesBgImage: any;
    footerBgImage: any;
    purchaseImg: any;
    availabilityImg: any;
    //------------------------
    fileSource: any;
    fileSourceMob: any;
    introFileSource: any;
    selectServicesBgfileSource: any;
    footerBgfileSource: any;
    purchasefileSource: any;
    availabilityfileSource: any;
    //------------------------
    imagePath: '';
    // selectAgreementImagePath: '';
    // fillAgreementImagePath: '';
    // purchaseImagePath: '';
    // availabilityImagePath: '';
    //------------------------

    webImgURL: string | ArrayBuffer;
    mobImgURL: string | ArrayBuffer;
    introImageURL: string | ArrayBuffer;
    servicesBgImageURL: string | ArrayBuffer;
    footerBgImageURL: string | ArrayBuffer;
    purchaseImgURL: string | ArrayBuffer;
    availabilityImgURL: string | ArrayBuffer;
    //------------------------

    //---------||||||||||||||||||---------------New--------------|||||||||||||||||||---------//
    total = '';
    showloading = false;
    alert: { success: boolean, text: string } = { success: true, text: '' };

    selected_Crystal_Navbar_Color = '';
    selected_Colored_Navbar_Color = '';
    selected_Home_Bg_Color = '';
    selected_Desc_Bg_Color = '';
    selected_Services_Bg_Color = '';
    selected_Footer_Bg_Color = '';
    selected_Services_Bg_Image = '';
    selected_Footer_Bg_Image = '';

    //---Hero Banner Boxes Texts---//
    editHeroBox = 'Tjänster Box 1';
    // heroBoxTexts = [{ label: 'Agreement Box', value: 'AgreementBoxText' }, { label: 'Book Meeting Box', value: 'BookMeetingBoxText' },]
    heroBoxTexts = [
        {
            "label": "Tjänster Box 1",
            "Rubrik": "Skriv avtal online",
            "Beskrivning": "Med vår digitala tjänst kan du enkelt skräddarsy ditt eget avtal. Vi har en mängd olika avtal för livets alla skeenden. Samtliga avtal är skapade av våra jurister och advokater.",
            "Knapp": "Skriv avtal",
        }, {
            "label": "Tjänster Box 2",
            "Rubrik": "Boka ett möte med en jurist",
            "Beskrivning": "Vid behövs av juridisk rådgivning kan du boka ett video möte med oss. Vi erbjuder ger rådgivning på flera olika språk. Du kan boka ett möte på 30 minuter (902 kr) eller en timme (1803kr).",
            "Knapp": "Boka möte",
        }]

    //---Introduction Texts---//
    editIntroType = 'Rubrik';
    introTexts = [{ label: 'Rubrik', value: 'Who we are' }, { label: 'Beskrivning', value: 'Lorem Ipsum is simply dummy text' },]

    //---Services Texts---//
    edit_Selected_Services_Text = 'Detaljer';
    // servicesAllTexts = [{ label: 'heading', value: 'servicesHeadingText' },
    //  { label: 'description', value: 'servicedescriptionText' },
    // { label: 'Family Law Desc', value: 'servicesBox1Text' }, { label: 'Criminal Law Desc', value: 'servicesBox2Text' },
    // { label: 'Civil Law Desc', value: 'servicesBox3Text' }, { label: 'Business Law Desc', value: 'servicesBox4Text' },
    // { label: 'Educational Law Desc', value: 'servicesBox5Text' }, { label: 'Insurance Law Desc', value: 'servicesBox6Text' },
    // ];
    servicesAllTexts = [{
        "label": "Detaljer",
        "Rubrik": "Services",
        "Beskrivning": "Services"
    }, {
        "label": "Expertis1",
        "Rubrik": "Familjerätt",
        "Beskrivning": "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    }, {
        "label": "Expertis2",
        "Rubrik": "Brottmål",
        "Beskrivning": "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    }, {
        "label": "Expertis3",
        "Rubrik": "Tvistemål",
        "Beskrivning": "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    }, {
        "label": "Expertis4",
        "Rubrik": "Migrationsrätt",
        "Beskrivning": "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    }, {
        "label": "Expertis5",
        "Rubrik": "Notarius Publicus",
        "Beskrivning": "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    }, {
        "label": "Expertis6",
        "Rubrik": "Socialrätt",
        "Beskrivning": "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    }]
    //---Footer Texts---//
    editFooterParagraphType = 'Paragraf1';
    footerparagraphTexts = [{ label: 'Paragraf1', value: 'Paragraf1' }, { label: 'Paragraf2', value: 'Paragraf2' },]

    //--Services heading description---
    servicesHeadingText = '';
    servicedescriptionText = '';
    //--Services boxes texts-----------
    servicesBox1Text = '';
    servicesBox2Text = '';
    servicesBox3Text = '';
    servicesBox4Text = '';
    servicesBox5Text = '';
    servicesBox6Text = '';

    //---Check Texts Console---//
    servicesTextArrayCheck() {
        console.log("heroBoxTexts", this.heroBoxTexts)
        console.log("introTexts", this.introTexts)
        console.log("servicesAllTexts", this.servicesAllTexts)
        console.log("footerparagraphTexts", this.footerparagraphTexts)
    }

    // whoWeAreTextType = [{ label: 'heading', value: 'heading' }, { label: 'description', value: 'description' },]

    // servicesTextType = [{ label: 'heading', value: 'heading' }, { label: 'description', value: 'description' },
    // { label: 'Family Law Desc', value: 'Family Law Desc' }, { label: 'Criminal Law Desc', value: 'Criminal Law Desc' },
    // { label: 'Civil Law Desc', value: 'Civil Law Desc' }, { label: 'Business Law Desc', value: 'Business Law Desc' },
    // { label: 'Educational Law Desc', value: 'Educational Law Desc' }, { label: 'Family Law Desc', value: 'Family Law Desc' },]

    // servicesAllTexts = [{ label: 'heading', value: 'heading' }, { label: 'description', value: 'description' },
    // { label: 'Family Law Desc', value: 'Family Law Desc' }, { label: 'Criminal Law', value: 'Criminal Law' },
    // { label: 'Civil Law', value: 'Civil Law' }, { label: 'Business Law', value: 'Business Law' },
    // { label: 'Educational Law', value: 'Educational Law' }, { label: 'Family Law', value: 'Family Law' },
    // ];

    // footerDescType = [{ label: 'heading', value: 'heading' }, { label: 'description', value: 'description' },]

    // color: string;
    // navbarColors = ['Crystal Tansparent', '#000234', '#734434', '#FFDADF', '#344567', '#CDBBB2',];

    // navbarColors = [{ label: 'Crystal Tansparent', value: '#ffffff21' }, { label: 'Blue', value: '#000234' },
    // { label: 'Brown', value: '#734434' }, { label: 'Baby Pink', value: '#FFDADF' },
    // { label: 'Gray', value: '#344567' }, { label: 'Voilet', value: '#CDBBB2' },];

    // servicesAndFoooterColors = [{ label: 'Blue', value: '#000234' },
    // { label: 'Brown', value: '#734434' }, { label: 'Baby Pink', value: '#FFDADF' },
    // { label: 'Gray', value: '#344567' }, { label: 'Voilet', value: '#CDBBB2' },];

    // homeAndDescriptionColors = [{ label: 'Ash White', value: '#F2F2FE' }, { label: 'Blue', value: '#000234' },
    // { label: 'White', value: 'white' }, { label: 'Black', value: 'black' },
    // { label: 'Brown', value: '#734434' }, { label: 'Baby Pink', value: '#FFDADF' },
    // { label: 'Gray', value: '#344567' }, { label: 'Violet', value: '#CDBBB2' },];

    navbarColors = []
    public serviceBgTypeOptions: any = [
        { label: 'Bild Tjänster', value: 'imageServices', checked: true },
        { label: 'Färg Tjänster', value: 'colorServices', checked: false }
    ];
    selectedServicesType: any;
    public footerBgTypeOptions: any = [
        { label: 'Bild Footer', value: 'imageFooter', checked: true },
        { label: 'Färg Footer', value: 'colorFooter', checked: false }
    ];
    selectedFooterType: any;
    public numOfColorsOptions: any = [
        { label: '2', value: '2', checked: true },
        { label: '3', value: '3', checked: false }
    ];
    numOfColors = 2;
    colorsClassOuter = 'color_picker_container';
    colorsClassInner = 'color_picker';

    gradient_first_color = '';
    gradient_second_color = '';
    gradient_third_color = '';
    // footerparagraphTexts = [{ label: 'Paragraf1', value: 'Paragraf1' }, { label: 'Paragraf2', value: 'Paragraf2' },]
    // gradient_colors= [{1:'',2:'',3:''}]
    // gradient_colors= {color1:'',color2:'',color3:''}
    // gradientArray= [{name:'Första färgen',color:'',value:true},{name:'Andra färgen',color:'',value:true},{name:'Tredje färgen',color:'',value:false},]
    gradientArray = [{ name: 'Första färgen', color: '#000000' }, { name: 'Andra färgen', color: '#000000' }, { name: 'Tredje färgen', color: '#000000' },]


    // gradientDirections = ['left','right','top','bottom'];
    selected_gradient_direction = '';
    gradientDirections = [
        { label0: 'right to left', label: 'höger till vänster', value: '270deg' },
        { label0: 'left to right', label: 'vänster till höger', value: '90deg' },
        { label0: 'top to bottom', label: 'topp till botten', value: '360deg' },
        { label0: 'bottom to top', label: 'botten till topp', value: '180deg' },
        { label0: 'center to corner', label: 'centrum till hörnen', value: 'center' },
        { label0: 'corner to center', label: 'hörnen till centrum', value: 'corner' },
    ];
    setAngleManually = false;
    manualAngleValue = 45;
    // let linearGradients=['270deg','90deg','360deg','180deg',]

    //---------||||||||||||||||||---------------New--------------|||||||||||||||||||---------//

    contentPages: {
        handleYourLegal: string; agreementOnline: string; description: string;
        selectAgreement: string; selectAgreementDesc: string; fillAgreement: string;
        fillAgreementDesc: string; purchase: string; purchaseDescription: string;
        availability: string; availabilityDescription: string; welcomeNote: string;
        startAgreement: string; crystalNavbarColor: string; coloredNavbarColor: string;
        servicesBgType: string; servicesBgColor: string; servicesBgImage: string;
        footerBgType: string; footerBgColor: string; footerBgImage: string;
        homeBgColor: string; descBgColor: string; heroBoxTexts: any; introTexts: any;
        servicesAllTexts: any; footerparagraphTexts: any;
    }[];

    constructor(
        private route: ActivatedRoute,
        private api: ApiService,
        private snackBar: MatSnackBar,
        private authService: AuthService
    ) {
    }

    ngOnInit(): void {
        this.checkRoleAction();
        this.getHome('home');
        this.getColorsData();
        // this.selected_Crystal_Navbar_Color = 'crystal';
        // this.selected_Colored_Navbar_Color = '#000234';
        // this.selected_Services_Bg_Color = '#734434';
        // this.selected_Footer_Bg_Color = '#344567';
        // this.sub = this.route.params.subscribe(params => {
        // this.id = params.id;
        // console.log('id',params.id)
        // this.getClientsDetails();
        // });
        // /////////////////////////////////////////////////
        // // this.selectedServicesType = 'imageServices';
        // this.selectedServicesType = 'colorServices';
        // //Services Radio checked condition
        // if (this.selectedServicesType === 'colorServices') {
        //     this.serviceBgTypeOptions[0].checked = false;
        //     this.serviceBgTypeOptions[1].checked = true;
        // }
        // else {
        //     this.serviceBgTypeOptions[0].checked = true;
        //     this.serviceBgTypeOptions[1].checked = false;
        // }
        // ///////////////////////////////////////////////
        // this.selectedFooterType = 'colorFooter';
        // //Footer Radio checked condition
        // if (this.selectedFooterType === 'colorFooter') {
        //     this.footerBgTypeOptions[0].checked = false;
        //     this.footerBgTypeOptions[1].checked = true;
        // }
        // else {
        //     this.footerBgTypeOptions[0].checked = true;
        //     this.footerBgTypeOptions[1].checked = false;
        // }
    }
    getColorsData(): any {
        this.api.getAllColors()
            .subscribe(
                res => {
                    let response = res.doc;
                    // console.log("response---------", response)
                    response.forEach(element => {
                        this.navbarColors.push({
                            label: element.colorName,
                            value: element.colorCode,
                        })
                    });
                    // console.log("this.navbarColors---------", this.navbarColors)
                    // this.navbarColors = colorArray;
                },
                err => { }
            );
    }
    // showConsole() {
    //     console.log('this.selected_Crystal_Navbar_Color', this.selected_Crystal_Navbar_Color)
    // }
    serviceBgTypeHandler(servicesType) {
        // console.log("servicesType.value",servicesType.value)
        this.selectedServicesType = servicesType.value;
    }
    footerBgTypeHandler(footerType) {
        // console.log("footerType.value",footerType.value)
        this.selectedFooterType = footerType.value;
    }
    // selectedColorHandler(event) {
    //     // console.log('event',event)
    //     if (event.value === 'Crystal Tansparent') {
    //         this.selected_Crystal_Navbar_Color = '#ffffff21';
    //     }
    //     else {
    //         this.selected_Crystal_Navbar_Color = event.value;
    //     }
    // }
    numOfColorsHandler(value) {
        // console.log("value", value);
        this.numOfColors = value;
        if (value == 2) {
            this.colorsClassInner = 'color_picker';
            this.colorsClassOuter = 'color_picker_container';

        } else {
            this.colorsClassInner = 'color_picker1';
            this.colorsClassOuter = 'color_picker_container1'
        }
        // this.gradientDirectionChangeHandler();
    }
    angleCheckHandler(value) {
        // console.log("value", value)
        // console.log("manualAngleValue", this.manualAngleValue)

        this.setAngleManually = value;
    }
    manuallyGredientAngleHandler(angleValue) {
        // console.log("heelo",angleValue);
        let color1 = this.gradientArray[0].color;
        let color2 = this.gradientArray[1].color;
        let color3 = this.gradientArray[2].color;
        if (this.numOfColors == 2) {
            this.selected_Desc_Bg_Color = 'linear-gradient('
                + angleValue + 'deg'
                + ',' + color1
                + ',' + color2 + ')';
        } else {
            this.selected_Desc_Bg_Color = 'linear-gradient('
                + angleValue + 'deg'
                + ',' + color1
                + ',' + color2
                + ',' + color3
                + ')';
        }
        // console.log("manuall selected_Desc_Bg_Color",this.selected_Desc_Bg_Color)
    }
    gradientDirectionChangeHandler() {
        // console.log("this.gradientArray",this.gradientArray);

        // this.selected_Desc_Bg_Color = 'linear-gradient(to '
        //     + this.selected_gradient_direction
        //     + ',' + this.gradient_first_color
        //     + ',' + this.gradient_second_color + ')';

        let linearGradients = ['270deg', '90deg', '360deg', '180deg',]
        // let linearGradients=['left','right','top','bottom']
        let color1 = this.gradientArray[0].color;
        let color2 = this.gradientArray[1].color;
        let color3 = this.gradientArray[2].color;
        if (linearGradients.includes(this.selected_gradient_direction)) {
            // console.log("this.selected_gradient_direction.split('deg')",this.selected_gradient_direction.split('deg'))
            this.manualAngleValue = Number(this.selected_gradient_direction.split('deg')[0]);
            let gradientAngle = this.manualAngleValue + 'deg';
            // console.log("gradientAngle",gradientAngle);
            // console.log('linearGradient')
            if (this.numOfColors == 2) {
                this.selected_Desc_Bg_Color = 'linear-gradient('
                    + gradientAngle
                    + ',' + color1
                    + ',' + color2 + ')';
            } else {
                this.selected_Desc_Bg_Color = 'linear-gradient('
                    + gradientAngle
                    + ',' + color1
                    + ',' + color2
                    + ',' + color3 + ')';
            }
            // console.log("result",this.selected_Desc_Bg_Color)

        } else {
            // console.log('radialGradient',this.selected_gradient_direction=='center'?'red':'white');
            if (this.numOfColors == 2) {
                this.selected_Desc_Bg_Color = 'radial-gradient(';
                this.selected_Desc_Bg_Color += this.selected_gradient_direction == 'center' ? color1 : color2;
                this.selected_Desc_Bg_Color += ',';
                this.selected_Desc_Bg_Color += this.selected_gradient_direction == 'center' ? color2 : color1;
                this.selected_Desc_Bg_Color += ')';
            }
            else {
                this.selected_Desc_Bg_Color = 'radial-gradient(';
                this.selected_Desc_Bg_Color += this.selected_gradient_direction == 'center' ? color1 : color3;
                this.selected_Desc_Bg_Color += ',';
                this.selected_Desc_Bg_Color += color2;
                this.selected_Desc_Bg_Color += ',';
                this.selected_Desc_Bg_Color += this.selected_gradient_direction == 'center' ? color3 : color1;
                this.selected_Desc_Bg_Color += ')';
            }
            // console.log("result",this.selected_Desc_Bg_Color)
        }
        // this.selected_Desc_Bg_Color = 'linear-gradient(to '
        // + this.selected_gradient_direction
        // + ',' + this.gradient_first_color
        // + ',' + this.gradient_second_color + ')';
    }
    numOfColorsInitialValues(value) {
        this.numOfColors = value;
        this.numOfColorsHandler(value);
        if (value == 2) {
            this.numOfColorsOptions[0].checked = true;
            this.numOfColorsOptions[1].checked = false;
        } else {
            this.numOfColorsOptions[0].checked = false;
            this.numOfColorsOptions[1].checked = true;
        }
    }

    getHome(name): any {

        this.api.getHome(name).subscribe(homeData => {

            let response = homeData.doc[0];
            // console.log('response', response);
            this.id = response._id;
            this.handleYourLegal = response.handleYourLegal;
            this.agreementOnline = response.agreementOnline;
            this.description = response.description;
            this.selectAgreement = response.selectAgreement;
            this.selectAgreementDesc = response.selectAgreementDesc;
            this.fillAgreement = response.fillAgreement;
            this.fillAgreementDesc = response.fillAgreementDesc;
            this.purchase = response.purchase;
            this.purchaseDescription = response.purchaseDescription;
            this.availability = response.availability;
            this.availabilityDescription = response.availabilityDescription;
            this.welcomeNote = response.welcomeNote;
            this.startAgreement = response.startAgreement;
            this.selected_Crystal_Navbar_Color = response.crystalNavbarColor;
            this.selected_Colored_Navbar_Color = response.coloredNavbarColor;
            this.selectedServicesType = response.servicesBgType;
            this.selected_Services_Bg_Color = response.servicesBgColor;
            this.selected_Services_Bg_Image = response.servicesBgImage;
            this.selectedFooterType = response.footerBgType;
            this.selected_Footer_Bg_Color = response.footerBgColor;
            this.selected_Footer_Bg_Image = response.footerBgImage;
            this.selected_Home_Bg_Color = response.homeBgColor;
            this.selected_Desc_Bg_Color = response.descBgColor;
            // this.selected_gradient_direction = response.descBgColor.split('to ')[1].split(',')[0];
            // console.log("response.descBgColor",response.descBgColor)
            if (response.descBgColor.includes('linear-gradient')) {
                // console.log("linear-gradient")
                this.selected_gradient_direction = response.descBgColor.split(',')[0].split('(')[1];
                // console.log("response.descBgColor.split(',').length",response.descBgColor.split(',').length)
                if (response.descBgColor.split(',').length == 4) {
                    // console.log("response.descBgColor.split(',')",response.descBgColor.split(','));
                    this.numOfColorsInitialValues(3);
                    this.gradientArray[0].color = response.descBgColor.split(',')[1];
                    this.gradientArray[1].color = response.descBgColor.split(',')[2];
                    this.gradientArray[2].color = response.descBgColor.split(',')[3].split(')')[0];
                }
                else {
                    this.numOfColorsInitialValues(2);
                    this.gradientArray[0].color = response.descBgColor.split(',')[1];
                    this.gradientArray[1].color = response.descBgColor.split(',')[2].split(')')[0];
                }
            }
            else {
                // console.log("radial-gradient")
                if (response.descBgColor.split(',').length == 3) {
                    // console.log("response.descBgColor.split(',')",response.descBgColor.split(','));
                    this.numOfColorsInitialValues(3);
                    this.gradientArray[0].color = response.descBgColor.split(',')[0].split('(')[1];
                    this.gradientArray[1].color = response.descBgColor.split(',')[1];
                    this.gradientArray[2].color = response.descBgColor.split(',')[2].split(')')[0];
                }
                else {
                    this.numOfColorsInitialValues(2);
                    this.gradientArray[0].color = response.descBgColor.split(',')[0].split('(')[1];
                    this.gradientArray[1].color = response.descBgColor.split(',')[1].split(')')[0];
                }
            }
            // console.log("this.gradientArray data",this.gradientArray);
            this.heroBoxTexts = response.heroBoxTexts;
            this.introTexts = response.introTexts;
            this.servicesAllTexts = response.servicesAllTexts;
            this.footerparagraphTexts = response.footerparagraphTexts;
            // console.log("response.servicesBgImage", response.servicesBgImage)
            if (response.homeHeaderPic) {
                //  this.imgURL = environment.serviceURL + response.homeHeaderPic;
                this.webImgURL = environment.serviceURL + response.homeHeaderPic;
            }
            if (response.homeHeaderPicMob) {
                this.mobImgURL = environment.serviceURL + response.homeHeaderPicMob;
            }
            if (response.introImage) {
                this.introImageURL = environment.serviceURL + response.introImage;
            }
            if (response.servicesBgImage) {
                this.servicesBgImageURL = environment.serviceURL + response.servicesBgImage;
            }
            if (response.footerBgImage) {
                this.footerBgImageURL = environment.serviceURL + response.footerBgImage;
            }
            if (response.purchaseImg) {
                this.purchaseImgURL = environment.serviceURL + response.purchaseImg;
            }
            if (response.availabilityImg) {
                this.availabilityImgURL = environment.serviceURL + response.availabilityImg;
            }
            //Services Radio checked condition
            if (this.selectedServicesType === 'colorServices') {
                this.serviceBgTypeOptions[0].checked = false;
                this.serviceBgTypeOptions[1].checked = true;
            }
            else if (this.selectedFooterType === 'imageServices') {
                this.serviceBgTypeOptions[0].checked = true;
                this.serviceBgTypeOptions[1].checked = false;
            }
            //Footer Radio checked condition
            if (this.selectedFooterType === 'colorFooter') {
                this.footerBgTypeOptions[0].checked = false;
                this.footerBgTypeOptions[1].checked = true;
            }
            else if (this.selectedFooterType === 'imageFooter') {
                this.footerBgTypeOptions[0].checked = true;
                this.footerBgTypeOptions[1].checked = false;
            }
        });
    }


    update(): any {
        this.showloading = true;
        this.contentPages = [{
            'handleYourLegal': this.handleYourLegal,
            'agreementOnline': this.agreementOnline,
            'description': this.description,
            'selectAgreement': this.selectAgreement,
            'selectAgreementDesc': this.selectAgreementDesc,
            'fillAgreement': this.fillAgreement,
            'fillAgreementDesc': this.fillAgreementDesc,
            'purchase': this.purchase,
            'purchaseDescription': this.purchaseDescription,
            'availability': this.availability,
            'availabilityDescription': this.availabilityDescription,
            'welcomeNote': this.welcomeNote,
            'startAgreement': this.startAgreement,
            'crystalNavbarColor': this.selected_Crystal_Navbar_Color,
            'coloredNavbarColor': this.selected_Colored_Navbar_Color,
            'servicesBgType': this.selectedServicesType,
            'servicesBgColor': this.selected_Services_Bg_Color,
            'servicesBgImage': this.selected_Services_Bg_Image,
            'footerBgType': this.selectedFooterType,
            'footerBgColor': this.selected_Footer_Bg_Color,
            'footerBgImage': this.selected_Footer_Bg_Image,
            'homeBgColor': this.selected_Home_Bg_Color,
            'descBgColor': this.selected_Desc_Bg_Color,
            'heroBoxTexts': this.heroBoxTexts,
            'introTexts': this.introTexts,
            'servicesAllTexts': this.servicesAllTexts,
            'footerparagraphTexts': this.footerparagraphTexts,
        }]
        this.api.updateContentPages(this.contentPages, this.id)
            .subscribe(
                res => {
                    this.snackBar.open('Hemmets innehåll uppdaterades lyckades', 'ok');
                    this.showloading = false;
                    // console.log('this.id',this.id)
                    // console.log('this.clientsDetails',this.clientsDetails)
                },
                err => {
                    this.showloading = false;
                }
            );
    }

    //--------------Upload Home Header Pic---------------

    onFileChange(event): any {
        if (event.target.files.length > 0) {
            this.preview(event.target.files);
            const file = event.target.files[0];
            this.fileSource = file;
        }
    }
    preview(files): any {
        if (files.length === 0) {
            return;
        }
        const mimeType = files[0].type;
        if (mimeType.match(/image\/*/) == null) {
            // this.message = 'Only images are supported.';
            return;
        }
        const reader = new FileReader();
        this.imagePath = files;
        reader.readAsDataURL(files[0]);
        reader.onload = (event) => {
            this.webImgURL = reader.result;
        };
    }
    changeHomeHeaderPic(): any {
        const formData = new FormData();
        formData.append('file', this.fileSource);
        formData.append('homePageId', this.id);
        if (this.fileSource != undefined) {
            this.api.uploadHomeHeaderPic(formData)
                .subscribe(res => {
                    this.snackBar.open('Hem Header Bild har uppdaterats', 'ok');
                });
        }
        else {
            this.snackBar.open('Bilden kan inte uppdateras (Välj först)', 'ok');
        }

    }


    //----------------Upload Home Header Pic For Mobile----------------

    onFileChangeMob(event): any {
        if (event.target.files.length > 0) {
            this.previewMob(event.target.files);
            const file = event.target.files[0];
            this.fileSourceMob = file;
        }
    }

    previewMob(files): any {
        if (files.length === 0) {
            return;
        }

        const mimeType = files[0].type;
        if (mimeType.match(/image\/*/) == null) {
            // this.message = 'Only images are supported.';
            return;
        }

        const reader = new FileReader();
        this.imagePath = files;
        reader.readAsDataURL(files[0]);
        reader.onload = (event) => {
            this.mobImgURL = reader.result;
        };
    }

    changeHomeHeaderPicMob(): any {
        const formData = new FormData();
        formData.append('file', this.fileSourceMob);
        formData.append('homePageId', this.id);
        if (this.fileSourceMob != undefined) {
            this.api.uploadHomeHeaderPicMob(formData)
                .subscribe(res => {
                    this.snackBar.open('Hem Header Bild mobil har uppdaterats', 'ok');
                });
        }
        else {
            this.snackBar.open('Bilden kan inte uppdateras (Välj först)', 'ok');
        }
    }


    //--------------Upload FooterBackground Pic---------------
    onIntroImageChange(event): any {
        if (event.target.files.length > 0) {
            this.previewIntroImage(event.target.files);
            const file = event.target.files[0];
            this.introFileSource = file;
        }
    }
    previewIntroImage(files): any {
        if (files.length === 0) {
            return;
        }
        const mimeType = files[0].type;
        if (mimeType.match(/image\/*/) == null) {
            // this.message = 'Only images are supported.';
            return;
        }
        const reader = new FileReader();
        this.imagePath = files;
        reader.readAsDataURL(files[0]);
        reader.onload = (event) => {
            this.introImageURL = reader.result;
        };
    }
    changeIntroPic(): any {
        const formData = new FormData();
        formData.append('file', this.introFileSource);
        formData.append('homePageId', this.id);
        if (this.introFileSource != undefined) {
            this.api.uploadIntroPic(formData)
                .subscribe(res => {
                    this.snackBar.open('Introduktion Bild har uppdaterats', 'ok');
                });
        }
        else {
            this.snackBar.open('Bilden kan inte uppdateras (Välj först)', 'ok');
        }

    }
    //--------------Upload ServicesBackground Pic---------------
    onServicesBgImageChange(event): any {
        if (event.target.files.length > 0) {
            this.previewSelectedServicesBgImage(event.target.files);
            const file = event.target.files[0];
            this.selectServicesBgfileSource = file;
        }
    }
    previewSelectedServicesBgImage(files): any {
        if (files.length === 0) {
            return;
        }
        const mimeType = files[0].type;
        if (mimeType.match(/image\/*/) == null) {
            // this.message = 'Only images are supported.';
            return;
        }
        const reader = new FileReader();
        this.imagePath = files;
        reader.readAsDataURL(files[0]);
        reader.onload = (event) => {
            this.servicesBgImageURL = reader.result;
        };
    }
    changeServicesBgPic(): any {
        const formData = new FormData();
        formData.append('file', this.selectServicesBgfileSource);
        formData.append('homePageId', this.id);
        if (this.selectServicesBgfileSource != undefined) {
            this.api.uploadServicesBgPic(formData)
                .subscribe(res => {
                    this.snackBar.open('Hem Header Bild har uppdaterats', 'ok');
                });
        }
        else {
            this.snackBar.open('Bilden kan inte uppdateras (Välj först)', 'ok');
        }

    }

    //--------------Upload FooterBackground Pic---------------
    onFooterBgImageChange(event): any {
        if (event.target.files.length > 0) {
            this.previewFooterBgImage(event.target.files);
            const file = event.target.files[0];
            this.footerBgfileSource = file;
        }
    }
    previewFooterBgImage(files): any {
        if (files.length === 0) {
            return;
        }
        const mimeType = files[0].type;
        if (mimeType.match(/image\/*/) == null) {
            // this.message = 'Only images are supported.';
            return;
        }
        const reader = new FileReader();
        this.imagePath = files;
        reader.readAsDataURL(files[0]);
        reader.onload = (event) => {
            this.footerBgImageURL = reader.result;
        };
    }
    changeFooterBgPic(): any {
        const formData = new FormData();
        formData.append('file', this.footerBgfileSource);
        formData.append('homePageId', this.id);
        if (this.footerBgfileSource != undefined) {
            this.api.uploadFooterBgPic(formData)
                .subscribe(res => {
                    this.snackBar.open('Hem Header Bild har uppdaterats', 'ok');
                });
        }
        else {
            this.snackBar.open('Bilden kan inte uppdateras (Välj först)', 'ok');
        }

    }
    // //--------------Upload pPurchase Pic---------------
    // onPurchasePicChange(event): any {
    //     if (event.target.files.length > 0) {
    //         this.previewPurchasePic(event.target.files);
    //         const file = event.target.files[0];
    //         this.purchasefileSource = file;
    //     }
    // }
    // previewPurchasePic(files): any {
    //     if (files.length === 0) {
    //         return;
    //     }
    //     const mimeType = files[0].type;
    //     if (mimeType.match(/image\/*/) == null) {
    //         // this.message = 'Only images are supported.';
    //         return;
    //     }
    //     const reader = new FileReader();
    //     this.imagePath = files;
    //     reader.readAsDataURL(files[0]);
    //     reader.onload = (event) => {
    //         this.purchaseImgURL = reader.result;
    //     };
    // }
    // changePurchasePic(): any {
    //     const formData = new FormData();
    //     formData.append('file', this.purchasefileSource);
    //     formData.append('homePageId', this.id);
    //     if (this.purchasefileSource != undefined) {
    //         this.api.uploadPurchasePic(formData)
    //             .subscribe(res => {
    //                 this.snackBar.open('Hem Header Bild har uppdaterats', 'ok');
    //             });
    //     }
    //     else {
    //         this.snackBar.open('Bilden kan inte uppdateras (Välj först)', 'ok');
    //     }
    // }
    // //--------------Upload Availability Pic---------------
    // onAvailabilityPicChange(event): any {
    //     if (event.target.files.length > 0) {
    //         this.previewAvailabilityPic(event.target.files);
    //         const file = event.target.files[0];
    //         this.availabilityfileSource = file;
    //     }
    // }
    // previewAvailabilityPic(files): any {
    //     if (files.length === 0) {
    //         return;
    //     }
    //     const mimeType = files[0].type;
    //     if (mimeType.match(/image\/*/) == null) {
    //         // this.message = 'Only images are supported.';
    //         return;
    //     }
    //     const reader = new FileReader();
    //     this.imagePath = files;
    //     reader.readAsDataURL(files[0]);
    //     reader.onload = (event) => {
    //         this.availabilityImgURL = reader.result;
    //     };
    // }
    // changeAvailabilityPic(): any {
    //     const formData = new FormData();
    //     formData.append('file', this.availabilityfileSource);
    //     formData.append('homePageId', this.id);
    //     if (this.availabilityfileSource != undefined) {
    //         this.api.uploadAvailabilityPic(formData)
    //             .subscribe(res => {
    //                 this.snackBar.open('Hem Header Bild har uppdaterats', 'ok');
    //             });
    //     }
    //     else {
    //         this.snackBar.open('Bilden kan inte uppdateras (Välj först)', 'ok');
    //     }
    // }

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

}

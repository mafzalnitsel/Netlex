import {Component, OnInit} from '@angular/core';
import {NewDealService} from "../../services/newDeal.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UtilService} from "../../services/util.service";


@Component({
    selector: 'app-preview-pdf',
    templateUrl: './preview-pdf.component.html',
    styleUrls: ['./preview-pdf.component.scss']
})

export class PreviewPdfComponent implements OnInit {
    pdfSrc: string;
    documentTemplateId: string;
    documentMasterId: string;

    constructor(private newDealService: NewDealService,
                private route: ActivatedRoute,
                private router: Router,
                private utilService: UtilService) {
    }

    ngOnInit(): void {

        this.route.queryParams.subscribe(params => { // To get the param from the  router

            this.documentMasterId = params?.documentMasterId;
            this.documentTemplateId = params?.documentTemplateId;
        });

        this.getAgreementPdf(); //To call the agreement pdf function.
        this.utilService.show();
    }


    getAgreementPdf() { // Function to get the pdf content by document Id and Master Id.

        this.newDealService.getPdfBuffer2(this.documentTemplateId, this.documentMasterId).subscribe((pdfBuffer) => {// Service Call to get the PDF Buffer Data.

            const byteArray = new Uint8Array(pdfBuffer.pdfBuffer.data);
            const blob = new Blob([byteArray], {type: 'application/pdf'});
            const objectUrl = URL.createObjectURL(blob);
            const file = document.createElement('a');
            file.href = objectUrl;
            this.pdfSrc = file.href;
        });
    }

    previewSummaryScreen(): void {
        this.router.navigate(['/preview-Agreement'], {
            queryParams: {
                master_id: this.documentMasterId,
                document_id: this.documentTemplateId
            }
        });
    }
}

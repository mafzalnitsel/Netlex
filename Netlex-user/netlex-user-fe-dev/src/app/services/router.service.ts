import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class RouterService {
    visible: boolean;
    isUserNamePresent = false;
    edit = false;
    userName: string;
    data: any;
    documentId: string;
    editDocumentId: string;

    removeDocument: string;


    masterId: string;
    pdfBlob: string;

    constructor() { this.visible = false; }



    userNameIcon(userName): void {

        if(userName !== null){
            this.userName = userName;
            this.isUserNamePresent = true;
        } else {
            this.isUserNamePresent = false;
        }

    }

    registerEditScreen(): void{
        this.edit = true;
    }

    toggle(): void { this.visible = !this.visible; }

    doSomethingElseUseful(): void { }

}

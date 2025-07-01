import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class UtilService {
    visible: boolean;
    isUserLoggedIn = false;
    edit = false;

    constructor() { this.visible = false; }

    hide(): void { this.visible = false; }

    show(): void { this.visible = true; }

    registerEditScreen(): void{
        this.edit = true;
    }
}

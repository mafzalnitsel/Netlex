import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {first} from 'rxjs/operators';
import {UserService} from '../services/user.service';
import {ApiService} from 'src/app/services/api.service';
import {AuthService} from '../services/auth.service';
import {RegisterModel} from '../models/Register.model';



@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private api: ApiService,
        private authService: AuthService,
        private userService: UserService,
    ) {
    }
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    apiService: any;
    showLoader = false;
    newUser = new RegisterModel('', '', '', '', '', '');


    ngOnInit(): void {
    }
    onsubmit(): void {
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.userService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.apiService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.apiService.error(error);
                    this.loading = false;
                });
    }
}




